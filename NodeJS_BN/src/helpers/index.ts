import { Response } from "express";

interface IParamsResponse {
    // res: any;
    res: Response;
    status: number;
    result: Object | Object[] | null;
    // result: Record<string, any> | Record<string, any>[] | null;
    message: string;
}

export const response = ({ res, status, result, message }: IParamsResponse) =>
    res.status(status).json({ data: result, message });

export const roundNumber = (number: number) => {
    return +parseFloat(number.toString()).toExponential(12);
};
