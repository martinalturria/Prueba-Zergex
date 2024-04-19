import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledLogoutButton = styled.button`
    position: fixed;
    top: 20px;
    right: 40px;
    background-color: #ff0000;
    color: #ffffff;
    padding: 8px;
    border: none;
    border-radius: 20%;
    cursor: pointer;
    font-size: 24px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        background-color: #e60000;
    }

    &:before {
        content: "X";
    }
`;

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/"); 
    };

    return <StyledLogoutButton onClick={handleLogout}></StyledLogoutButton>;
};

export default LogoutButton;