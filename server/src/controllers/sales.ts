import express from 'express'
import OverallStat from "../models/OverallStat";

export const getSales: any = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const overallStats = await OverallStat.find();

        res.status(200).json(overallStats[0]);
    } catch (error: any) {
        res.status(404).json({ message: error.message }) ;
    }
}