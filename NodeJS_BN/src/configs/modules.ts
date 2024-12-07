interface IConfig {
    timestamps: boolean;
    versionKey: boolean;
}

export const configSchema: IConfig = {
    timestamps: true,
    versionKey: false,
};
