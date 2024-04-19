import { useNavigate } from "react-router-dom";
import CryptoForm from "../../components/CryptoForm";
import { useCreateCrypto } from "../../services/cryptoServices";
import { CryptoFormData } from "../../utils/interfaces";
import { ContainerCrypto } from "../../styles/sharedStyles";
import LogoutButton from "../../components/LogoutButton";

const AddCrypto = () => {
    const navigate = useNavigate();
    const { mutateAsync: createCrypto } = useCreateCrypto();

    const handleSubmit = async (formData: CryptoFormData) => {
        const dataToSubmit = {
            name: formData.name,
            ticker: formData.ticker,
            purchasePrice: parseFloat(formData.purchasePrice),
            quantityPurchased: parseInt(formData.quantityPurchased),
        };

        await createCrypto(dataToSubmit);
        navigate("/home");
    };

    return (
        <ContainerCrypto>
            <LogoutButton />
            <h1>Agregar Criptomoneda</h1>
            <CryptoForm onSubmit={handleSubmit} actionType="add" />
        </ContainerCrypto>
    );
};

export default AddCrypto;
