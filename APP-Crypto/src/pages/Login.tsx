import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../services/authServices";
import { validateLoginForm } from "../utils/validations";
import { LoginResponse } from "../utils/interfaces";
import { Container, Form, Input, ErrorMessage } from "../styles/sharedStyles";
import { StyledButton } from "../components/StyledButton";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { mutate: loginUser, isLoading } = useLoginUser();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateLoginForm(credentials);
        if (validationErrors) {
            setError(validationErrors);
            return;
        }

        loginUser(credentials, {
            onSuccess: (data: LoginResponse) => {
                localStorage.setItem("token", data.token);
                navigate("/home");
            },
            onError: (error: Error) => {
                setError(error.message);
            },
        });
    };

    return (
        <Container>
            <h1>Bienvenidos a Crypto-APP</h1>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="username"
                    placeholder="Usuario"
                    value={credentials.username}
                    onChange={handleInputChange}
                    autoComplete="username"
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={credentials.password}
                    onChange={handleInputChange}
                    autoComplete="current-password"
                />
                <StyledButton type="submit" disabled={isLoading}>
                    {isLoading ? "Cargando..." : "Iniciar Sesión"}
                </StyledButton>
                <StyledButton variant="secondary" onClick={() => navigate("/register")}>
                    Registrarse
                </StyledButton>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Form>
        </Container>
    );
};

export default Login;
