import { DataSource } from "typeorm";
import { Cryptocurrency } from "./models/Cryptocurrency";
import { User } from "./models/User";
import dotenv from "dotenv";

dotenv.config();

export const appDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Cryptocurrency, User],
    synchronize: true,
});

appDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
