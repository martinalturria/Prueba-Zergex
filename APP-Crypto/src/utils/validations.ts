import { CryptoFormData, LoginFormFields, RegisterFormData } from "./interfaces";

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRegisterForm = (formData: RegisterFormData): string | null => {
  if (!formData.username.trim()) {
    return 'El nombre es obligatorio.';
  }

  if (!validateEmail(formData.email)) {
    return 'El email no es válido.';
  }

  if (formData.password.length < 6) {
    return 'La contraseña debe tener al menos 6 caracteres.';
  }

  return null;
};

export const validateLoginForm = (fields: LoginFormFields): string | null => {
  if (!fields.username.trim()) return 'El nombre de usuario es obligatorio.';
  if (!fields.password) return 'La contraseña es obligatoria.';
  return null;
};

export const validateCryptoForm = (formData: CryptoFormData): string | null => {
  if (!formData.name.trim()) return 'El nombre es obligatorio.';
  if (!formData.ticker.trim()) return 'El ticker es obligatorio.';
  if (!formData.purchasePrice.trim()) return 'El precio de compra es obligatorio.';
  if (!formData.quantityPurchased.trim()) return 'La cantidad comprada es obligatoria.';

  if (isNaN(Number(formData.purchasePrice))) return 'El precio de compra debe ser un número válido.';
  if (Number(formData.purchasePrice) <= 0) return 'El precio de compra debe ser mayor que cero.';

  if (isNaN(Number(formData.quantityPurchased))) return 'La cantidad comprada debe ser un número válido.';
  if (Number(formData.quantityPurchased) <= 0) return 'La cantidad comprada debe ser mayor que cero.';

  return null;
};