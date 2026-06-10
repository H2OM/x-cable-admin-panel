import {Card, Form, Input, InputNumber, Space, Switch} from "antd";
import ImageUpload from "@components/ui/form/ImageUpload.tsx";
import TextArea from "antd/es/input/TextArea";

export default function FormMainInfo() {
    return (
        <Card title="Основная информация" style={{ marginBottom: 24 }}>
            <Form.Item
                label="Наименование"
                name="title"
                rules={[{ required: true, message: 'Введите название' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Артикул"
                name="article"
                rules={[{ required: true, message: 'Введите артикул' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Бренд"
                name="brand"
                rules={[{ required: true, message: 'Введите бренд' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Категория"
                name="category"
                rules={[{ required: true, message: 'Введите категорию' }]}
            >
                <Input/>
            </Form.Item>
            <Space.Compact>
                <Form.Item
                    label="Цена (₽)"
                    name={'price'}
                    rules={[{ required: true, message: 'Укажите цену' }]}
                >
                    <InputNumber min={0} style={{ width: 130 }} />
                </Form.Item>
                <Form.Item
                    label="Старая цена (₽)"
                    name={'price_old'}
                    dependencies={['price']}
                    rules={[
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                const currentPrice = getFieldValue('price');

                                if (!value || currentPrice === undefined || value > currentPrice) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(
                                    new Error('Старая цена должна быть больше текущей!')
                                );
                            },
                        }),
                    ]}
                >
                    <InputNumber min={0} style={{ width: 130 }} />
                </Form.Item>
            </Space.Compact>
            <br/>
            <Space.Compact>
                <Form.Item label="Остаток" name={'stock'}>
                    <InputNumber min={0} style={{ width: 130 }} />
                </Form.Item>
                <Form.Item label={'Ед. измерения'} name={'unit'}>
                    <Input style={{ width: 130 }} />
                </Form.Item>
            </Space.Compact>
            <Form.Item name="hit" valuePropName="checked">
                <Space>
                    <Switch />
                    <span>Популярный товар (Хит продаж)</span>
                </Space>
            </Form.Item>

            <Form.Item noStyle dependencies={['slider_images']}>
                {({getFieldValue}) => {
                    const images = getFieldValue('slider_images').split(',');

                    return (
                        <ImageUpload images={images} label={'Изображения товара'}/>
                    )
                }}
            </Form.Item>
            <Form.Item label="Описание" name="description">
                <TextArea/>
            </Form.Item>
        </Card>
    );
}