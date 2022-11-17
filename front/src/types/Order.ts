export interface Order {
    _id: string;
    table: string;
    status: "WAITING" | "IN_PRODUCTION" | "DONE";
    products: Products[];
}

interface Products {
    _id: string;
    quantity: number;
    product: Product;
}

interface Product {
    name: string;
    imagePath: string;
    price: number;
}
