import type {ReactNode} from "react";

export interface MenuItems {
    key: string;
    icon: ReactNode;
    label: ReactNode | string;
    children?: MenuItems[]
}