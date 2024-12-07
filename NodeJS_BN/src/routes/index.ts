import userRoute from "./api";

export const definedRoutes = (app: any) => {
    app.use(`/v1/api/user`, userRoute);
};