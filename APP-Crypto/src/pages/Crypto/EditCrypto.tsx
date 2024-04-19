import { useParams, useNavigate } from "react-router-dom";
import CryptoForm from "../../components/CryptoForm";
import { useCrypto, useUpdateCrypto } from "../../services/cryptoServices";
import { CryptoFormData, Crypto } from "../../utils/interfaces";
import { ContainerCrypto } from "../../styles/sharedStyles";
import LogoutButton from "../../components/LogoutButton";

const EditCrypto = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: crypto, isError, isLoading } = useCrypto(id!);
    const { mutateAsync: updateCrypto } = useUpdateCrypto();

    const handleSubmit = async (formData: CryptoFormData) => {
        if (!id) {
            console.error("ID is undefined.");
            return;
        }

        const dataToSubmit: Partial<Crypto> = {
            name: formData.name,
            ticker: formData.ticker,
            purchasePrice: parseFloat(formData.purchasePrice),
            quantityPurchased: parseInt(formData.quantityPurchased),
        };

        await updateCrypto({ id, data: dataToSubmit });
        navigate("/home");
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    return (
        <ContainerCrypto>
            <LogoutButton />
            <h1>Editar Criptomoneda</h1>
            {crypto && (
                <CryptoForm
                    initialCryptoData={crypto}
                    onSubmit={handleSubmit}
                    actionType="edit"
                />
            )}
        </ContainerCrypto>
    );
};

export default EditCrypto;
