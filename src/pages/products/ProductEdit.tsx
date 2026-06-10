import {
    Button, Card,
    Form,
    Skeleton,
    Space,
    Spin, Tabs,
    Typography
} from "antd";
import {AppstoreOutlined, ArrowLeftOutlined, LinkOutlined, SaveOutlined, SettingOutlined, TagsOutlined} from "@ant-design/icons";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Product, ProductDetails} from "@/types/products.ts";
import {productsAPI} from "@api";
import {FormVariations} from "@components/products/FormVariations.tsx";
import FormCharacteristics from "@components/products/FormCharacteristics.tsx";
import FormMainInfo from "@components/products/FormMainInfo.tsx";
import FormRelated from "@components/products/FormRelated.tsx";

export default function ProductEdit() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [related, setRelated] = useState<Product[]>([]);
    const [activeTab, setActiveTab] = useState<string>('1');
    useEffect(() => {
        (async () => {
            const response = await productsAPI.get(Number(id));

            if(!response.success) {
                navigate("/products");
            }

            setLoading(false);
            setProduct(response.data.product);
            setRelated(response.data.related);
        })();
    }, [id]);

    const handleFinish = async (): Promise<void> => {

    }

    const tabItems = [
        {
            key: '1',
            label: (
                <Space>
                    <AppstoreOutlined />
                    Основные данные
                </Space>
            ),
            children: <FormMainInfo/>,
        },
        {
            key: '2',
            label: (
                <Space>
                    <SettingOutlined />
                    Характеристики
                </Space>
            ),
            children: <FormCharacteristics/>,
        },
        {
            key: '3',
            label: (
                <Space>
                    <TagsOutlined />
                    Вариации
                </Space>
            ),
            children: <FormVariations/>,
        },
        {
            key: '4',
            label: (
                <Space>
                    <LinkOutlined />
                    Связанные товары
                </Space>
            ),
            children: <FormRelated/>,
        },
    ];

    return (
        <div>
            <Space style={{ marginBottom: 30, justifyContent: 'space-between', width: '100%' }}>
                <Space>
                    <Button icon={<ArrowLeftOutlined />} type="text" onClick={() => window.history.back()} />
                    <Typography.Title level={2} style={{margin: 0}}>
                        Редактирование товара
                    </Typography.Title>
                </Space>
                <Button
                    color="primary"
                    variant="outlined"
                    icon={<SaveOutlined />}
                    size="large"
                    onClick={() => form.submit()}
                >
                    Сохранить изменения
                </Button>
            </Space>

            {loading && !product && (
                <>
                    <Skeleton active paragraph={{rows: 1}}/>
                    <Skeleton active paragraph={{rows: 8}}/>
                    <Skeleton active paragraph={{rows: 5}}/>
                    <Skeleton active paragraph={{rows: 2}}/>
                </>
            )}
            {loading && product &&
                <div className="load-screen"><Spin size="large" description={"Загрузка..."} /></div>
            }
            {product &&
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    initialValues={{
                        ...product,
                        characteristics: product.local_filters.map(filter => {
                            const value = filter.values.find(
                                val => val.product_id === product.id
                            )?.name;

                            return {
                                name: filter.name,
                                value: value
                            }
                        }),
                        relatedProducts: related
                    }}
                >
                    <Card style={{ borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <Tabs
                            activeKey={activeTab}
                            onChange={(key) => setActiveTab(key)}
                            items={tabItems}
                            type="line"
                            size="large"
                            tabBarStyle={{ marginBottom: 24 }}
                        />
                    </Card>
                </Form>
            }
        </div>
    );
}