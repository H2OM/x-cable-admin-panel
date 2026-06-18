import type {ItemType} from "antd/es/menu/interface";
import {DeleteOutlined} from "@ant-design/icons";
import {Popconfirm} from "antd";

const deleteItem = (key: string, label: string, tip: string) => ({
    key,
    label: (
        <Popconfirm title={tip} okText="Да" cancelText="Нет" placement={"right"}>
            <div
                onClick={(e) => e.stopPropagation()}
                style={{ width: '100%' }}
            >
                {label}
            </div>
        </Popconfirm>
    ),
    icon: <DeleteOutlined />,
    danger: true,
});

export const brandMenuItems: ItemType[] = [
    deleteItem('safe_delete', 'Удалить с сохранением товаров', 'Удалить бренд?'),
    deleteItem('delete', 'Удалить', 'Удалить бренд?')
];

export const brandsGridMenuItems: ItemType[] = [
    deleteItem('safe_delete', 'Удалить с сохранением товаров', 'Удалить отмеченные бренды?'),
    deleteItem('delete', 'Удалить', 'Удалить отмеченные бренды?')
];
