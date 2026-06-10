import { Button, Card, List, Popconfirm, Skeleton, Typography} from "antd";
import {EditOutlined, EllipsisOutlined, DeleteOutlined, ExportOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import type {Product} from "@/types/products.ts";
import {productsAPI} from "@api";
import {Link, useSearchParams} from "react-router-dom";

const SITE_URL = import.meta.env.VITE_PUBLIC_SITE_URL;
const IMAGES_URL = import.meta.env.VITE_PUBLIC_SITE_IMAGES_URL;

export default function ProductsTable() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '30', 10);

    useEffect(() => {
        (async () => {
            let total = count;

            setLoading(true);

            if (total === 0) {
                const countResponse = await productsAPI.getCount();

                if (countResponse.success) {
                    total = countResponse.data;

                    setCount(total);
                }
            }

            const maxPage = Math.ceil(total / limit);

            if (page > maxPage) {
                setSearchParams({
                    page: String(maxPage),
                    limit: String(limit),
                });

                setLoading(false);

                return;
            }

            const response = await productsAPI.getAll(page, limit);

            setLoading(false);

            if (response.success) {
                setProducts(response.data);
            }
        })();
    }, [page, limit]);

    const handlePageChange = (page: number, limit: number) => {
        setSearchParams({
            page: String(page),
            limit: String(limit),
        });
    };

    return (
        <div>
            <Typography.Title level={2} style={{margin: 0, marginBottom: '30px'}}>
                Все товары
            </Typography.Title>
            <List
                grid={{gutter: ['10px', '10px'], xs: 1, sm: 1, md: 2, lg: 3, xl: 4, xxl: 5, xxxl: 5}}
                dataSource={loading
                    ? Array.from({length: limit}).map((_, i) => ({id: i} as Product))
                    : products
                }
                itemLayout="horizontal"
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: count,
                    align: 'center',
                    showSizeChanger: true,
                    pageSizeOptions: ['15', '30', '60', '90'],
                    onChange: handlePageChange
                }}
                renderItem={(product) => (
                    <List.Item style={{ margin: 0 }}>
                        {loading ? (
                            <Card style={{width: '100%', height: '320px'}}>
                                <Skeleton active paragraph={{rows: 3}}/>
                            </Card>
                        ) : (
                            <Card style={{width: '100%'}}
                                cover={
                                    <img
                                        draggable={false}
                                        alt={product.article}
                                        style={{height: 150, width: "auto", margin: "0 auto", padding: 5}}
                                        src={`${IMAGES_URL}/${product.image}`}
                                    />
                                }
                                actions={[
                                    <Link to={`${SITE_URL}/product/${product.id}`}><ExportOutlined key="link" /></Link>,
                                    <Link to={`/products/edit/${product.id}`}><EditOutlined key="edit" /></Link>,
                                    <Popconfirm
                                        key="delete"
                                        title="Удалить товар?"
                                        onConfirm={() => console.log('Удален:', product.id)}
                                        okText="Да"
                                        cancelText="Нет"
                                    >
                                        <DeleteOutlined/>
                                    </Popconfirm>,
                                    <Button type="text" icon={<EllipsisOutlined key="ellipsis" />}/>,
                                ]}
                            >
                                <p className="text-clamp _two-line">
                                    {product.title}
                                </p>
                                <Card.Meta
                                    title={product.price.toLocaleString('ru-RU', {
                                        style: 'currency',
                                        currency: 'RUB',
                                    })}
                                />
                                {product.price_old ?
                                    <p>
                                        Старая цена: {product.price_old.toLocaleString('ru-RU', {
                                            style: 'currency',
                                            currency: 'RUB',
                                        })}
                                    </p> : null
                                }
                                <p className="text-clamp">Бренд: {product.brand}</p>
                                <p className="text-clamp">Артикул: {product.article}</p>
                                <p className="text-clamp">Категория: {product.category}</p>
                                <p className="text-clamp">Хит: {product.hit ? 'Да' : 'Нет'}</p>
                                <p className={'stock' + (product.stock > 0 ? ' _in-stock' : ' _out-stock')}>
                                    Наличие: {product.stock} {product.unit}
                                </p>
                            </Card>
                        )}
                    </List.Item>
                )}
            />
        </div>
    );
}