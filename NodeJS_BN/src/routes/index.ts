import express, { Application } from "express";
import userRoute from "./api";

export const definedRoutes = (app: Application) => {
    app.use(`/v1/api/user`, userRoute);
};
