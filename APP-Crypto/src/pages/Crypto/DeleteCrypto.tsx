import { useParams, useNavigate } from 'react-router-dom';
import CryptoForm from '../../components/CryptoForm';
import { useCrypto, useDeleteCrypto } from '../../services/cryptoServices';
import { ContainerCrypto } from "../../styles/sharedStyles";
import LogoutButton from '../../components/LogoutButton';

const DeleteCrypto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: crypto, isError, isLoading } = useCrypto(id!);
  const { mutateAsync: deleteCrypto } = useDeleteCrypto();

  const handleSubmit = async () => {
    await deleteCrypto(id!);
    navigate('/home');
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <ContainerCrypto>
      <LogoutButton />
      <h1>Eliminar Criptomoneda</h1>
      {crypto && <CryptoForm initialCryptoData={crypto} onSubmit={handleSubmit} actionType="delete" />}
    </ContainerCrypto>
  );
};

export default DeleteCrypto;
