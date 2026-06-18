export interface Banner {
    id: number;
    name: string;
    slides: BannerSlide[];
}

export interface BannerSlide {
    id: number;
    title: string;
    text: string;
    image: string
    position: number;
}