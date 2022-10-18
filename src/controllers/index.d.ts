import { Socket } from 'net';

export type ControllerResponse<T> = {
    message?: string;
    data?: T | T[] | Record<any, any> | null;
    error?: string;
};

export type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
};

type Order = {
    id?: string;
    client?: Socket;
    deliver_man?: string;
    price: number;
    items: string[];
    status?: string;
    change?: number;
};

type Client = {
    name?: string;
    address?: string;
    uuid?: string;
};

// export type Delivery = {
//   id: number;
//   type: string;
//   product: Product;
//   payment_type: string;
//   costumer: Costumer;
//   deliveryman: string;
// };
