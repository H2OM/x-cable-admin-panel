export interface Metric {
    visits: number;
    unique_visits: number;
    page_views: number;
    date: string;
}

export interface StatusesCount {
    status: string;
    count: number;
}