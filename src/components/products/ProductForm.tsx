import {Button, Card, Form, Skeleton, Space, Spin, Tabs, Typography} from "antd";
import {
    AppstoreOutlined,
    ArrowLeftOutlined,
    LinkOutlined,
    SaveOutlined,
    SettingOutlined,
    TagsOutlined
} from "@ant-design/icons";
import type {Product, ProductDetails, ProductLocalFilter} from "@/types/products.ts";
import FormMainInfo from "./FormMainInfo";
import { FormVariations } from "./FormVariations";
import FormRelated from "./FormRelated";
import FormCharacteristics from "./FormCharacteristics";
import {useState} from "react";

export function ProductForm({
    label,
    product,
    related,
    loading,
    handleFinish
}: {
    label: string;
    product: ProductDetails | null;
    related: Product[];
    loading: boolean;
    handleFinish: (values: Record<string, any>) => Promise<void>
}) {
    const [form] = Form.useForm();
    const [activeTab, setActiveTab] = useState<string>('1');

    const tabItems = [
        {
            key: '1',
            label: (
                <Space>
                    <AppstoreOutlined/>
                    Основные данные
                </Space>
            ),
            children: <FormMainInfo/>,
        },
        {
            key: '2',
            label: (
                <Space>
                    <SettingOutlined/>
                    Характеристики
                </Space>
            ),
            children: <FormCharacteristics/>,
        },
        {
            key: '3',
            label: (
                <Space>
                    <TagsOutlined/>
                    Вариации
                </Space>
            ),
            children: <FormVariations/>,
        },
        {
            key: '4',
            label: (
                <Space>
                    <LinkOutlined/>
                    Связанные товары
                </Space>
            ),
            children: <FormRelated/>,
        },
    ];

    return (
        <div>
            <Space style={{marginBottom: 30, justifyContent: 'space-between', width: '100%'}}>
                <Space>
                    <Button icon={<ArrowLeftOutlined/>} type="text" onClick={() => window.history.back()}/>
                    <Typography.Title level={2} style={{margin: 0}}>
                        {label}
                    </Typography.Title>
                </Space>
                <Button
                    color="primary"
                    variant="outlined"
                    icon={<SaveOutlined/>}
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
                <div className="load-screen"><Spin size="large" description={"Загрузка..."}/></div>
            }
            {product &&
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    initialValues={{
                        ...product,
                        local_filters: product.local_filters?.map(filter => {
                            const value = filter.values.find(
                                val => val.product_id === product.id
                            ) as ProductLocalFilter;

                            return {
                                name: filter.name,
                                value: value.name,
                                value_id: value.id
                            }
                        }),
                        related_products: related
                    }}
                >
                    <Card style={{borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'}}>
                        <Tabs
                            activeKey={activeTab}
                            onChange={(key) => setActiveTab(key)}
                            items={tabItems}
                            type="line"
                            size="large"
                            tabBarStyle={{marginBottom: 24}}
                        />
                    </Card>
                </Form>
            }
        </div>
    );
}