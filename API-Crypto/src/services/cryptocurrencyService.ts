import { Repository } from 'typeorm';
import { Cryptocurrency } from "../models/Cryptocurrency";
import { appDataSource } from '../appDataSource';

export class CryptocurrencyService {
    private cryptoRepository: Repository<Cryptocurrency>;

    constructor() {
        this.cryptoRepository = appDataSource.getRepository(Cryptocurrency);
      }

    public getAllCryptocurrencies = async (): Promise<Cryptocurrency[]> => {
        return this.cryptoRepository.find();
    };

    public getCryptocurrencyById = async (
        id: number
    ): Promise<Cryptocurrency | null> => {
        try {
            const cryptocurrency = await this.cryptoRepository.findOne({ where: { id } });
            if (!cryptocurrency) throw new Error("Cryptocurrency not found");
            return cryptocurrency;
        } catch (error) {
            throw error instanceof Error ? error : new Error('An error occurred');
        }
    };

    public async createCryptocurrency(data: Partial<Cryptocurrency>): Promise<Cryptocurrency> {        
        if (typeof data.purchasePrice === 'number' && typeof data.quantityPurchased === 'number') {
          const investedAmount = data.purchasePrice * data.quantityPurchased;
          const newCryptocurrency = this.cryptoRepository.create({
            ...data,
            investedAmount 
          });
          await this.cryptoRepository.save(newCryptocurrency);
          return newCryptocurrency;
        } else {
          throw new Error('Missing data for purchasePrice or quantityPurchased.');
        }
      }

      public async updateCryptocurrency(id: number, data: Partial<Cryptocurrency>): Promise<Cryptocurrency> {
        let cryptocurrency = await this.cryptoRepository.findOneOrFail({ where: { id }});
        
        if (typeof data.purchasePrice === 'number' && typeof data.quantityPurchased === 'number') {
          data.investedAmount = data.purchasePrice * data.quantityPurchased;
        }
        cryptocurrency = this.cryptoRepository.merge(cryptocurrency, data);
        await this.cryptoRepository.save(cryptocurrency);
        return cryptocurrency;
      }

    public deleteCryptocurrency = async (id: number): Promise<void> => {
        const cryptocurrency = await this.cryptoRepository.findOne({ where: { id } });
        if (!cryptocurrency) throw new Error("Cryptocurrency not found");

        await this.cryptoRepository.remove(cryptocurrency);
    };
}
