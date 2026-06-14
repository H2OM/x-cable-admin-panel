import type {ItemType} from "antd/es/menu/interface";
import {DeleteOutlined} from "@ant-design/icons";
import {Popconfirm} from "antd";

export const categoryMenuItems: ItemType[] = [
    {
        key: 'delete',
        label: (
            <Popconfirm title={'Удалить категорию?'} okText="Да" cancelText="Нет" placement={"right"}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{ width: '100%' }}
                >
                    Удалить
                </div>
            </Popconfirm>
        ),
        icon: <DeleteOutlined />,
        danger: true,
    }
];

export const categoriesGridMenuItems: ItemType[] = [
    {
        key: 'delete',
        label: (
            <Popconfirm title={'Удалить отмеченные категории?'} okText="Да" cancelText="Нет" placement={"right"}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{ width: '100%' }}
                >
                    Удалить
                </div>
            </Popconfirm>
        ),
        icon: <DeleteOutlined />,
        danger: true,
    }
];
