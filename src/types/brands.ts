export interface Brand {
    id: number;
    name: string;
    code: string;
}

export interface GridBrand extends Brand {
    products_count: number;
}