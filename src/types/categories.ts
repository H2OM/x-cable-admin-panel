export interface Category {
    id: number;
    title: string;
    code: string;
    image: string;
    types: CategoryType[];
}

export interface CategoryType {
    id: number;
    code: string;
    name: string;
}