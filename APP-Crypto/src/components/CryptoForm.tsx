import { useEffect, useState } from "react";
import { Crypto, CryptoFormData } from "../utils/interfaces";
import { validateCryptoForm } from "../utils/validations";
import { useNavigate } from "react-router-dom";
import {
    PrimaryButton,
    DangerButton,
    SuccessButton,
    BackButton,
    ErrorMessage,
} from "../styles/sharedStyles";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 90%;
    max-width: 400px;
    padding: 2rem;
    border-radius: 10px;
    background: white;
    box-shadow: 0 4px 8px var(--color-shadow);
    margin: auto;

    @media (min-width: 768px) {
        padding: 2rem;
        width: 50%;
    }
`;

const Input = styled.input`
    padding: 0.8rem;
    border-radius: 5px;
    border: 1px solid var(--color-primary-light);
    outline-color: var(--color-primary);

    &:focus {
        border-color: var(--color-primary);
    }
`;

const CryptoForm = ({
    initialCryptoData,
    onSubmit,
    actionType,
}: {
    initialCryptoData?: Crypto;
    onSubmit: (data: CryptoFormData) => Promise<void>;
    actionType: "add" | "edit" | "delete";
}) => {
    const [formData, setFormData] = useState<CryptoFormData>({
        name: "",
        ticker: "",
        purchasePrice: "",
        quantityPurchased: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (
            initialCryptoData &&
            (actionType === "edit" || actionType === "delete")
        ) {
            setFormData({
                name: initialCryptoData.name,
                ticker: initialCryptoData.ticker,
                purchasePrice: initialCryptoData.purchasePrice.toString(),
                quantityPurchased:
                    initialCryptoData.quantityPurchased.toString(),
            });
        }
    }, [initialCryptoData, actionType]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (actionType !== "delete") {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        if (actionType !== "delete") {
            const validationError = validateCryptoForm(formData);
            if (validationError) {
                setError(validationError);
                return;
            }
        }
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ocurrió un error inesperado");
            }
        }
        setIsSubmitting(false);
    };

    const handleBack = () => {
        navigate("/home");
    };

    const getActionButton = () => {
        switch (actionType) {
            case "add":
                return (
                    <PrimaryButton type="submit" disabled={isSubmitting}>
                        Agregar
                    </PrimaryButton>
                );
            case "edit":
                return (
                    <SuccessButton type="submit" disabled={isSubmitting}>
                        Actualizar
                    </SuccessButton>
                );
            case "delete":
                return (
                    <DangerButton type="submit" disabled={isSubmitting}>
                        Eliminar
                    </DangerButton>
                );
            default:
                return null;
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Input
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={actionType === "delete"}
            />
            <Input
                type="text"
                name="ticker"
                placeholder="Ticker"
                value={formData.ticker}
                onChange={handleInputChange}
                required
                disabled={actionType === "delete"}
            />
            <Input
                type="text"
                name="purchasePrice"
                placeholder="Precio de Compra"
                value={formData.purchasePrice}
                onChange={handleInputChange}
                required
                disabled={actionType === "delete"}
            />
            <Input
                type="text"
                name="quantityPurchased"
                placeholder="Cantidad Comprada"
                value={formData.quantityPurchased}
                onChange={handleInputChange}
                required
                disabled={actionType === "delete"}
            />
            {getActionButton()}
            <BackButton type="button" onClick={handleBack}>
                Volver al Inicio
            </BackButton>
        </Form>
    );
};

export default CryptoForm;
