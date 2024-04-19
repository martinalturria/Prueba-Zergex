import { Request, Response } from "express";
import { CryptocurrencyService } from "../services/cryptocurrencyService";
import { Cryptocurrency } from "../models/Cryptocurrency";

export class CryptocurrencyController {
    private service: CryptocurrencyService = new CryptocurrencyService();

    public getAll = async (req: Request, res: Response): Promise<Response> => {
        try {
            const cryptocurrencies = await this.service.getAllCryptocurrencies();
            return res.json(cryptocurrencies);
        } catch (e) {
            if (e instanceof Error) {
                return res.status(500).json({ error: e.message });
            } else {
                return res.status(500).json({ error: "An unknown error occurred" });
            }
        }
    };

    public getById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);
            const cryptocurrency = await this.service.getCryptocurrencyById(id);
            if (cryptocurrency) {
                return res.json(cryptocurrency);
            }
            return res.status(404).send("Cryptocurrency not found");
        } catch (e) {
            if (e instanceof Error) {
                return res.status(500).json({ error: e.message });
            } else {
                return res
                    .status(500)
                    .json({ error: "An unknown error occurred" });
            }
        }
    };

    public create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const cryptocurrency = await this.service.createCryptocurrency(req.body);
            return res.status(201).json(cryptocurrency);
        } catch (e) {
            if (e instanceof Error) {
                return res.status(500).json({ error: e.message });
            } else {
                return res
                    .status(500)
                    .json({ error: "An unknown error occurred" });
            }
        }
    };

    public update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);
            const cryptocurrencyData: Partial<Cryptocurrency> = req.body;
            const cryptocurrency = await this.service.updateCryptocurrency(
                id,
                cryptocurrencyData
            );
            if (cryptocurrency) {
                return res.json(cryptocurrency);
            }
            return res.status(404).send("Cryptocurrency not found");
        } catch (e) {
            if (e instanceof Error) {
                return res.status(500).json({ error: e.message });
            } else {
                return res
                    .status(500)
                    .json({ error: "An unknown error occurred" });
            }
        }
    };

    public delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);
            await this.service.deleteCryptocurrency(id);
            return res.status(200).json({ message: "Cryptocurrency deleted successfully" });
        } catch (e) {
            if (e instanceof Error) {
                return res.status(404).json({ error: e.message });
            } else {
                return res.status(500).json({ error: "An unknown error occurred" });
            }
        }
    };
}
