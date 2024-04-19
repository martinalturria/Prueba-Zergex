import { Link } from "react-router-dom";
import styled from "styled-components";
import {
    HomeContainer,
    PrimaryButton,
    SuccessButton,
    ErrorButton,
    ActionButtonsContainer,
} from "../../styles/sharedStyles";
import { useCryptos } from "../../services/cryptoServices";
import { Crypto } from "../../utils/interfaces";
import LogoutButton from "../../components/LogoutButton";

const CryptoList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    width: 70%;

    @media (max-width: 860px) {
        width: 90%;
    }
`;

const CryptoItem = styled.div`
    background-color: #f7f7f7;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;

    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
    }
`;

const Message = styled.p`
    color: var(--color-text);
`;

const Home = () => {
    const { data: cryptos, isLoading, isError } = useCryptos();

    if (isLoading) return <Message>Cargando...</Message>;
    if (isError) return <Message>Error al cargar las criptomonedas.</Message>;

    return (
        <HomeContainer>
            <LogoutButton />
            <h1>Criptomonedas</h1>
            {cryptos && cryptos.length > 0 ? (
                <CryptoList>
                    {cryptos.map((crypto: Crypto) => (
                        <CryptoItem key={crypto.id}>
                            <span>
                                {crypto.name} ({crypto.ticker})
                            </span>
                            <span>
                                Precio de compra: ${crypto.purchasePrice}
                            </span>
                            <span>Cantidad: {crypto.quantityPurchased}</span>
                            <span>Invertido: ${crypto.investedAmount}</span>
                            <ActionButtonsContainer>
                                <Link to={`/crypto/edit/${crypto.id}`}>
                                    <SuccessButton>Editar</SuccessButton>
                                </Link>
                                <Link to={`/crypto/delete/${crypto.id}`}>
                                    <ErrorButton>Eliminar</ErrorButton>
                                </Link>
                            </ActionButtonsContainer>
                        </CryptoItem>
                    ))}
                </CryptoList>
            ) : (
                <Message>No hay criptomonedas creadas.</Message>
            )}
            <Link to="/crypto/add">
                <PrimaryButton>Agregar Criptomoneda</PrimaryButton>
            </Link>
        </HomeContainer>
    );
};

export default Home;
