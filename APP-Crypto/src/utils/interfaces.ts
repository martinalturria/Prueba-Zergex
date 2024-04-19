export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface LoginFormFields {
  username: string;
  password: string;
}

export interface Crypto {
  id: string;
  name: string;
  ticker: string;
  purchasePrice: number;
  quantityPurchased: number;
  investedAmount: number;
}

export interface CryptoFormData {
  name: string;
  ticker: string;
  purchasePrice: string;
  quantityPurchased: string;
}