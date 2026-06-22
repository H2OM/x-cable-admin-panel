import {Card, Col, Progress, Row, Spin, Statistic, Typography} from "antd";
import Chart from "@components/ui/chart/Chart.tsx";
import {useEffect, useState} from "react";
import type {Metric, StatusesCount} from "@/types/statistic.ts";
import {statisticAPI} from "@api";
import {
    BarcodeOutlined,
    PartitionOutlined,
    ShoppingOutlined,
    TeamOutlined
} from "@ant-design/icons";

export default function Main() {
    const [loading, setLoading] = useState<boolean>(false);
    const [metrics, setMetrics] = useState<Metric[]>([]);
    const [totals, setTotals] = useState<Record<string, number>>({});
    const [orders, setOrders] = useState<StatusesCount[]>([]);
    const [callbacks, setCallbacks] = useState<StatusesCount[]>([]);

    const fetchStatistics = async (periodFrom: string, periodTo: string) => {
        setLoading(true);
        const response = await statisticAPI.get(periodFrom, periodTo);
        setLoading(false);

        if(response.success) {
            setMetrics(response.data.metrics);
            setTotals(response.data.totals);
            setOrders(response.data.orders);
            setCallbacks(response.data.callbacks);
        }
    }

    useEffect(() => {
        (() => {
            const date = new Date();
            const to = date.toISOString().split('T')[0];

            date.setDate(date.getDate() - 7);

            const from = date.toISOString().split('T')[0];

            void fetchStatistics(from, to);
        })();
    }, []);

    const getTotal = (data: StatusesCount[]) => {
        let total: number = 0;

        data.forEach(s => {
            total += s.count;
        });

        return total;
    }

    const getOriginal = (data: StatusesCount[], originalKey: string) => {
        const original = data.find(s => s.status === originalKey);

        if(!original) return 0;

        return original.count;
    }

    const getPercent = (data: StatusesCount[], originalKey: string) => {
        const original = getOriginal(data, originalKey) ?? 1;
        const total = getTotal(data) ?? 1;

        return Math.round(original / total * 100);
    }

    return (
        <div style={{position: 'relative'}}>
            <Typography.Title level={2} style={{margin: 0, marginBottom: 36, marginRight: 22, position: "relative"}}>
                Главная
            </Typography.Title>
            {loading &&
                <div className="load-screen"><Spin size="large" description={"Загрузка..."}/></div>
            }
            <Card title={"Статистика посещений"} style={{width: '100%', marginBottom: 16}}>
                <Chart
                    type={'line'}
                    data={{
                        labels: metrics.map(m => m.date),
                        datasets: [
                            {
                                label: 'Просмотры',
                                data: metrics.map(m => m.visits),
                                borderColor: '#35BAEAFF',
                                backgroundColor: '#35BAEAFF',
                            },
                            {
                                label: 'Посетители',
                                data: metrics.map(m => m.unique_visits),
                                borderColor: '#8C05FBFF',
                                backgroundColor: '#8C05FBFF',
                            },
                            {
                                label: 'Просмотры страниц',
                                data: metrics.map(m => m.page_views),
                                borderColor: '#FBAD05FF',
                                backgroundColor: '#FBAD05FF',
                            },
                        ]
                    }}
                    height={200}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    usePointStyle: false,
                                    boxWidth: 10,
                                    boxHeight: 2,
                                }
                            }
                        },
                        datasets: {
                            line: {
                                borderWidth: 2,
                            }
                        }
                    }}
                />
            </Card>
            <Card title={"Основная статистика"} style={{width: '100%', marginBottom: 16}}>
                <div style={{display: "flex", justifyContent: "space-around", gap: 20}}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Typography.Title level={5} style={{margin: 0}}>
                            Заказов завершено {`${getOriginal(orders, '4')} / ${getTotal(orders)}`}
                        </Typography.Title>
                        <Progress
                            type="dashboard"
                            gapDegree={100}
                            percent={getPercent(orders, '4')}
                            gapPlacement={'top'}
                            size={[150, 150]}
                        />
                    </div>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Typography.Title level={5} style={{margin: 0}}>
                            Обращений обработано {`${getOriginal(callbacks, '2')} / ${getTotal(callbacks)}`}
                        </Typography.Title>
                        <Progress
                            type="dashboard"
                            gapDegree={100}
                            percent={getPercent(callbacks, '2')}
                            gapPlacement={'top'}
                            size={[150, 150]}
                        />
                    </div>
                </div>
            </Card>
            <div style={{display: "flex", gap: 16, marginBottom: 16}}>
                <Card title={"Общая статистика"} style={{width: '100%'}}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Statistic title="Пользователей" value={totals['users']} prefix={<TeamOutlined/>} />
                        </Col>
                        <Col span={6}>
                            <Statistic title="Товаров" value={totals['products']} prefix={<ShoppingOutlined/>} />
                        </Col>
                        <Col span={6}>
                            <Statistic title="Брендов" value={totals['brands']} prefix={<BarcodeOutlined/>} />
                        </Col>
                        <Col span={6}>
                            <Statistic title="Категорий" value={totals['categories']} prefix={<PartitionOutlined/>} />
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    )
}