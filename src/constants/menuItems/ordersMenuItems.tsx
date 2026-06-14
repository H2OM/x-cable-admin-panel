import type {ItemType} from "antd/es/menu/interface";
import {DeleteOutlined, SwapOutlined} from "@ant-design/icons";
import {Popconfirm} from "antd";

export const ordersMenuItems: ItemType[] = [
    {
        key: 'statuses',
        label: 'Проставить статус:',
        icon:  <SwapOutlined />,
        children: [
            {
                key: 'status_in_progress',
                label: 'В обработке',
                icon:  <SwapOutlined />,
            },
            {
                key: 'status_in_delivery',
                label: 'Передан в службу доставки',
                icon:  <SwapOutlined />,
            },
            {
                key: 'status_delivering',
                label: 'Доставляется',
                icon:  <SwapOutlined />,
            },
            {
                key: 'status_ready',
                label: 'Ожидает выдачи',
                icon:  <SwapOutlined />,
            },
            {
                key: 'status_finished',
                label: 'Выполнен',
                icon:  <SwapOutlined />,
            }
        ]
    },
    {
        type: 'divider'
    },
    {
        key: 'delete',
        label: (
            <Popconfirm title={'Удалить заказ?'} okText="Да" cancelText="Нет" placement={"right"}>
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

export const orderGridMenuItems: ItemType[] = [
    {
        key: 'statuses',
        label: 'Проставить статус:',
        icon:  <SwapOutlined />,
        children: [
            {
                key: 'status_in_progress',
                label: 'В обработке',
                icon:  <SwapOutlined />,
            },
            {
                key: 'status_in_delivery',
                label: 'Передан в службу доставки',
                icon:  <SwapOutlined />,
            },
            {
                key: 'status_delivering',
                label: 'Доставляется',
                icon:  <SwapOutlined />,
            },
            {
                key: 'status_ready',
                label: 'Ожидает выдачи',
                icon:  <SwapOutlined />,
            },
            {
                key: 'status_finished',
                label: 'Выполнен',
                icon:  <SwapOutlined />,
            }
        ]
    },
    {
        type: 'divider',
    },
    {
        key: 'delete',
        label: (
            <Popconfirm title={'Удалить отмеченные заказы?'} okText="Да" cancelText="Нет" placement={"right"}>
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
