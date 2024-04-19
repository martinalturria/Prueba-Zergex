import { useMutation } from "react-query";
import { LoginFormFields, LoginResponse, RegisterFormData } from "../utils/interfaces";

const API_ENDPOINT = "http://localhost:3000/api/users/register";
const API_LOGIN_ENDPOINT = "http://localhost:3000/api/users/login";

export const registerUser = async (
    formData: RegisterFormData
): Promise<void> => {
    const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar al usuario");
    }

    return;
};

async function loginUser(credentials: LoginFormFields): Promise<LoginResponse> {
    const response = await fetch(API_LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials)
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al iniciar sesión.");
    }
  
    return await response.json();
  }
  
  export function useLoginUser() {
    return useMutation<LoginResponse, Error, LoginFormFields>(loginUser);
  }
