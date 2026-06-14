import type {ItemType} from "antd/es/menu/interface";
import {DeleteOutlined} from "@ant-design/icons";
import {Popconfirm} from "antd";

export const filterMenuItems: ItemType[] = [
    {
        key: 'delete',
        label: (
            <Popconfirm title={'Удалить фильтр?'} okText="Да" cancelText="Нет" placement={"right"}>
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

export const filtersGridMenuItems: ItemType[] = [
    {
        key: 'delete',
        label: (
            <Popconfirm title={'Удалить отмеченные фильтры?'} okText="Да" cancelText="Нет" placement={"right"}>
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
