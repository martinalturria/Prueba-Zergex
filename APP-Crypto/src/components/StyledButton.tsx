import styled from "styled-components";
import { Button } from "../styles/sharedStyles";

interface StyledButtonProps {
    variant?: "primary" | "secondary";
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export const StyledButton: React.FC<StyledButtonProps> = ({
    variant = "primary",
    children,
    onClick,
    type = "button",
    disabled = false,
}) => {
    const ButtonVariant = styled(Button)`
        background-color: ${variant === "primary" ? "var(--color-primary)" : "transparent"};
        color: ${variant === "primary" ? "white" : "var(--color-text)"};
        border: ${variant === "secondary" ? "1px solid var(--color-primary)" : "none"};

        &:hover {
            background-color: ${variant === "primary" ? "var(--color-primary-dark)" : "var(--color-primary-light)"};
        }
    `;

    return (
        <ButtonVariant onClick={onClick} type={type} disabled={disabled}>
            {children}
        </ButtonVariant>
    );
};
