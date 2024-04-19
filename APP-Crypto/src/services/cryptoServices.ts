import { useQuery, useMutation, useQueryClient } from "react-query";
import { Crypto } from "../utils/interfaces";

const API_URL = "http://localhost:3000/api/cryptocurrencies";

function getAuthHeader(): HeadersInit {
    const token = localStorage.getItem("token"); 
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

async function getAllCryptos(): Promise<Crypto[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Problem fetching cryptos");
    return response.json();
}

async function getCryptoById(id: string): Promise<Crypto> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Problem fetching crypto");
    return response.json();
}

export type CreateCryptoData = Omit<Crypto, "id" | "investedAmount">;

async function createCrypto(data: CreateCryptoData): Promise<Crypto> {
    const headers = getAuthHeader();
    const response = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Problem creating crypto");
    return response.json();
}

type UpdateCryptoData = Partial<Crypto>;

async function updateCrypto({
    id,
    data,
}: {
    id: string;
    data: UpdateCryptoData;
}): Promise<Crypto> {
    const headers = getAuthHeader();
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Problem updating crypto");
    return response.json();
}

async function deleteCrypto(id: string): Promise<void> {
    const headers = getAuthHeader();
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers,
    });
    if (!response.ok) throw new Error("Problem deleting crypto");
}

export function useCryptos() {
    return useQuery<Crypto[]>("cryptos", getAllCryptos);
}

export function useCrypto(id: string) {
    return useQuery(["crypto", id], () => getCryptoById(id));
}

export function useCreateCrypto() {
    const queryClient = useQueryClient();
    return useMutation(createCrypto, {
        onSuccess: () => {
            queryClient.invalidateQueries("cryptos");
        },
    });
}

export function useUpdateCrypto() {
    const queryClient = useQueryClient();
    return useMutation(
        ({ id, data }: { id: string; data: UpdateCryptoData }) =>
            updateCrypto({ id, data }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("cryptos");
            },
        }
    );
}

export function useDeleteCrypto() {
    const queryClient = useQueryClient();
    return useMutation(deleteCrypto, {
        onSuccess: () => {
            queryClient.invalidateQueries("cryptos");
        },
    });
}
