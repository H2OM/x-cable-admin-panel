import {CopyOutlined} from "@ant-design/icons";
import type {ItemType} from "antd/es/menu/interface";

export const productMenuItems: ItemType[] = [
    {
        key: 'duplicate',
        label: 'Дублировать товар',
        icon: <CopyOutlined />,
    }
];