import type {ItemType} from "antd/es/menu/interface";
import {CarryOutOutlined, CheckOutlined, DeleteOutlined, HourglassOutlined, PauseOutlined,
    RotateRightOutlined, TruckOutlined} from "@ant-design/icons";
import {Popconfirm} from "antd";

const statuses = [
    {
        key: 'status_in_progress',
        label: 'В обработке',
        icon:  <HourglassOutlined />,
    },
    {
        key: 'status_in_delivery',
        label: 'Передан в службу доставки',
        icon:  <RotateRightOutlined />,
    },
    {
        key: 'status_delivering',
        label: 'Доставляется',
        icon:  <TruckOutlined />,
    },
    {
        key: 'status_ready',
        label: 'Ожидает выдачи',
        icon:  <PauseOutlined />,
    },
    {
        key: 'status_finished',
        label: 'Выполнен',
        icon:  <CheckOutlined />,
    }
]

export const ordersMenuItems: ItemType[] = [
    {
        key: 'statuses',
        label: 'Проставить статус:',
        icon:  <CarryOutOutlined />,
        children: statuses
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
        icon:  <CarryOutOutlined />,
        children: statuses
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
