export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
}

export type Response<T> = {
    data: T;
    message: string;
    success: boolean;
};