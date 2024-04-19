import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authServices";
import { validateRegisterForm } from "../utils/validations";
import { Container, Form, Input, ErrorMessage } from "../styles/sharedStyles";
import { StyledButton } from "../components/StyledButton";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateRegisterForm(formData);
        if (validationErrors) {
            setError(validationErrors);
            return;
        }

        try {
            await registerUser(formData);
            setSuccess("Usuario creado correctamente");
            setTimeout(() => navigate("/login"), 3000);
        } catch (errorInstance) {
            setError(
                errorInstance instanceof Error
                    ? errorInstance.message
                    : "Hubo un error al crear el usuario"
            );
        }
    };

    const handleBack = () => navigate("/");

    return (
        <Container>
            <h2>Registro</h2>
            <Form onSubmit={handleSubmit}>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <ErrorMessage>{success}</ErrorMessage>}
                <Input
                    type="text"
                    name="username"
                    placeholder="Nombre de usuario"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <StyledButton type="submit">Registrarse</StyledButton>
                <StyledButton variant="secondary" onClick={handleBack}>
                    Volver al Inicio
                </StyledButton>
            </Form>
        </Container>
    );
};

export default Register;
