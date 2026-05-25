import {Button, Card, Form, Space, Typography} from "antd";
import {CheckOutlined, SwapRightOutlined} from "@ant-design/icons";
import TagSearchSelect from "@components/ui/TagSearchSelect.tsx";
import {productsAPI} from "@api";
import {useState} from "react";

export default function ProductsFastActions() {
    const [isPending, setIsPending] = useState<boolean>(false);

    const handleOneWayPairVariation = async (values: Record<string, string>) => {
        console.log(values);return;
        setIsPending(true);

        const response = await productsAPI.oneWayPairVariation();

        setIsPending(false);
    };

    const handlePairVariation = async () => {

    };
//TODO!!!
    return (
        <div>
            <Typography.Title level={2} style={{margin: 0, marginBottom: '30px'}}>
                Быстрые действия с товарами
            </Typography.Title>
            <Space vertical size={10} style={{width: '100%'}}>
                <Card title="Односторонняя привязка вариации товара" style={{width: '100%'}}>
                    <Form onFinish={handleOneWayPairVariation} layout={"inline"} style={{gap: '10px'}}>
                        <Form.Item name={"id"} style={{margin: 0, flex: 1}}
                                   rules={[{ message: 'Выберите товар!' }]}>
                            <TagSearchSelect
                                callback={productsAPI.searchIds}
                                placeholder={'Введите имя, артикул или id товара'}
                            />
                        </Form.Item>
                        <SwapRightOutlined />
                        <Form.Item name={"variation_id"} style={{margin: 0, flex: 1}}
                                   rules={[{ message: 'Выберите вариацию товара!' }]}>
                            <TagSearchSelect
                                callback={productsAPI.searchIds}
                                placeholder={'Введите имя, артикул или id товара'}
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size={"large"}
                            icon={<CheckOutlined />}
                            loading={isPending}
                        />
                    </Form>
                </Card>
            </Space>

        </div>
    );
}