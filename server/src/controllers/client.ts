import express from 'express';
import Product from "../models/Product"; 
import ProductStat from "../models/ProductStat";
import Transaction from "../models/Transaction";
import User from "../models/User"; 
import { getCountryISO3 } from '../data/dataCountry'; 

export const getProducts = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const products: any = await Product.find();

        const productsWithStats = await Promise.all(
            products.map(async (product: any) => {
                const stat = await ProductStat.find({
                    productId: product._id
                });
                return {
                    ...product._doc,
                    stat,
                };    
            })
        );
        res.status(200).json(productsWithStats);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

export const getCustomers = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const customers = await User.find({ role: 'user' }).select('-password');
        res.status(200).json(customers);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

export const getTransactions = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        // sort should look like this: { "field": "userId", "sort": "desc" }
        const { page = 1, pageSize = 20, sort = null, search = ''}: any = req.query;
        
        // formated sort should look like { userId: -1 }
        const generatSort = () => {
            const sortParsed = JSON.parse(sort as any);
            const sortFormated = {
                [sortParsed.field]: sortParsed.sort = "asc" ? 1 : -1
            };

            return sortFormated;
        }

        const sortFormatted : any = Boolean(sort) ? generatSort() : {};

        const transactions = await Transaction.find({
           $or: [
            { cost: { $regex: new RegExp(search, 'i')} },
            { userId: { $regex: new RegExp(search, 'i')} },
        ], 
        })
            .sort(sortFormatted)
            .skip(page * pageSize)
            .limit(pageSize);
        
        const total = await Transaction.countDocuments({
            name: { $regex: search, $options: 'i' }
        });
        
        res.status(200).json({
            transactions,
            total,            
        });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};

export const getGeography = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const users = await User.find();
        
        const mappedLocations = users.reduce((acc: any, { country }: any) => {
            const countryISO3: any = getCountryISO3(country);
            if (!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++;
            return acc;
        }, {});

        const formattedLocations = Object.entries(mappedLocations).map(
            ([country, count]) => {
                return { id: country, value: count };
            }
        );

        res.status(200).json(formattedLocations);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}