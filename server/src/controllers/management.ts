import express from "express";
import mongoose from "mongoose";
import User from "../models/User"; 
import Transaction from "../models/Transaction"; 

export const getAdmins = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const admins = await User.find({ role: 'admin' }).select('-password');
        res.status(200).json(admins);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserPerformance = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id }: any = req.params;

        const userWithStats = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats",
                },
            },
            { $unwind: "$affiliateStats" },
        ]);

        const saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id: string) => {
                return Transaction.findById(id);
            })
        );
        const filteredSaleTransactions = saleTransactions.filter(
            (transaction) => transaction !== null
        );

        res
            .status(200)
            .json({ user: userWithStats[0], sales: filteredSaleTransactions });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
};