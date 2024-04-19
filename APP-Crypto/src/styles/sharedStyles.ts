import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    animation: ${fadeInUp} 2s;
`;

export const ContainerCrypto = styled(Container)`
    animation: none;
`;

export const HomeContainer = styled.div`
    min-height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px var(--color-shadow);
    background-color: white;
    height: 60%;
    width: 80%;
    max-width: 400px;
    animation: ${fadeInUp} 1s ease-out;

    @media (min-width: 768px) {
        height: 60%;
        width: 80%;
        max-width: 500px;
    }

    @media (min-width: 1024px) {
        height: 50%;
        width: 60%;
        max-width: 600px;
    }
`;

export const Input = styled.input`
    width: 90%;
    padding: 12px;
    margin: 15px 0;
    border-radius: 5px;
    border: 1px solid var(--color-primary-light);
    font-size: 1rem;
    &:focus {
        outline: none;
        border-color: var(--color-primary);
    }

    @media (min-width: 768px) {
        padding: 12px;
        font-size: 1.2rem;
    }

    @media (min-width: 1024px) {
        width: 70%;
        padding: 15px;
        font-size: 1rem;
    }
`;

export const Button = styled.button`
    padding: 12px;
    width: 90%;
    border: none;
    border-radius: 5px;
    background-color: var(--color-primary);
    color: white;
    cursor: pointer;
    margin-top: 15px;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: var(--color-primary-dark);
    }

    @media (min-width: 768px) {
        padding: 12px;
        font-size: 1.2rem;
    }

    @media (min-width: 1024px) {
        width: 70%;
        padding: 15px;
        font-size: 1rem;
    }
`;

export const BaseButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;
    margin: 10px 0; // Asegúrate de que los botones no se toquen entre sí

    &:hover {
        opacity: 0.8;
    }

    &:disabled {
        background-color: var(--color-disabled);
        cursor: not-allowed;
    }
`;

export const PrimaryButton = styled(BaseButton)`
    background-color: var(--color-primary);
    color: white;

    &:hover {
        background-color: var(--color-primary-dark);
    }
`;

export const DangerButton = styled(BaseButton)`
    background-color: var(--color-error);
    color: white;

    &:hover {
        background-color: var(--color-error-dark);
    }
`;

export const SuccessButton = styled(BaseButton)`
    background-color: var(--color-success);
    color: white;

    &:hover {
        background-color: var(--color-success-dark);
    }
`;

export const BackButton = styled(BaseButton)`
    background-color: transparent;
    color: var(--color-text);
    border: 1px solid var(--color-primary);

    &:hover {
        background-color: var(--color-primary-light);
    }
`;

export const ErrorButton = styled(BaseButton)`
    background-color: var(--color-error);
    color: white;

    &:hover {
        background-color: var(--color-error-dark);
    }
`;

export const ActionButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;

    @media (min-width: 768px) {
        justify-content: flex-start;
    }
`;

export const ErrorMessage = styled.p`
    color: var(--color-error);
    text-align: center;
`;
