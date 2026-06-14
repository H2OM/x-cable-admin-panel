export type FilterType = 'switch' | 'multi' | 'range';

export interface Filter {
    id: number;
    filter: string;
    code: string;
    type: FilterType;
    position: number;
    values: FilterValues[];
}

export interface FilterValues {
    id: number;
    value: string;
    code: string;
    filter_id: number
}