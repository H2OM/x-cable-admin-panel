import {Card, Form, Input, InputNumber, Space, Switch} from "antd";
import ImageUpload from "@components/ui/form/ImageUpload.tsx";
import TextArea from "antd/es/input/TextArea";
import TagSearchSelect from "@components/ui/form/FormTagSearchSelect.tsx";
import {brandsAPI, categoriesAPI} from "@api";

const IMAGES_URL = import.meta.env.VITE_PUBLIC_SITE_IMAGES_URL;

export default function FormMainInfo() {
    return (
        <Card title="Основная информация" style={{ marginBottom: 24 }}>
            <Form.Item name="id" hidden />
            <Form.Item
                label="Наименование"
                name="title"
                rules={[{ required: true, message: 'Введите название' }]}
            >
                <Input placeholder={"Наименование товара"}/>
            </Form.Item>
            <Form.Item
                label="Артикул"
                name="article"
                rules={[{ required: true, message: 'Введите артикул' }]}
            >
                <Input placeholder={"Артикул товара"}/>
            </Form.Item>
            <Form.Item
                label="Бренд"
                name="brand_id"
                rules={[{ required: true, message: 'Выберите или введите бренд' }]}
            >
                <TagSearchSelect
                    fieldName={'brand'}
                    placeholder="Начните вводить название бренда..."
                    callback={async (query) => brandsAPI.search(query)}
                />
            </Form.Item>
            <Form.Item
                label="Категория"
                name="category_type_id"
                rules={[{ required: true, message: 'Выберите или введите категорию' }]}
            >
                <TagSearchSelect
                    fieldName={'category'}
                    placeholder="Начните вводить название категории..."
                    callback={async (query) => categoriesAPI.searchTypes(query)}
                />
            </Form.Item>
            <Space.Compact>
                <Form.Item
                    label="Цена (₽)"
                    name={'price'}
                    rules={[{ required: true, message: 'Укажите цену' }]}
                >
                    <InputNumber min={0} style={{ width: 130 }} placeholder={"0"}/>
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
                    <InputNumber min={0} style={{ width: 130 }}  placeholder={"0"}/>
                </Form.Item>
            </Space.Compact>
            <br/>
            <Space.Compact>
                <Form.Item label="Остаток" name={'stock'}>
                    <InputNumber min={0} style={{ width: 130 }}  placeholder={"0"}/>
                </Form.Item>
                <Form.Item
                    label={'Ед. измерения'}
                    name={'unit'}
                    rules={[{ required: true, message: 'Введите единицу измерения товара' }]}
                >
                    <Input style={{ width: 130 }}  placeholder={"шт."}/>
                </Form.Item>
            </Space.Compact>
            <br/>
            <Space>
                <Form.Item
                    name="hit"
                    valuePropName="checked"
                    getValueProps={(value) => ({
                        checked: value === '1' || value === 1 || value === true
                    })}
                    getValueFromEvent={(checked) => (checked ? '1' : '0')}
                    style={{margin:0}}
                >
                    <Switch/>
                </Form.Item>
                <span>Популярный товар (Хит продаж)</span>
            </Space>
            <br/>
            <br/>
            <Form.Item noStyle dependencies={['slider_images']}>
                {({ getFieldValue }) => {
                    const sliderImagesString = getFieldValue('slider_images');

                    const initialFileList = sliderImagesString && typeof sliderImagesString === 'string'
                        ? sliderImagesString.split(',').map((name, i) => ({
                            uid: `-existing-${i}`,
                            name: name,
                            existing: true,
                            url: `${IMAGES_URL}/${name}`
                        }))
                        : [];

                    return (
                        <Form.Item
                            label="Изображения"
                            name="images"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => {
                                if (Array.isArray(e)) return e;
                                return e?.fileList;
                            }}
                            initialValue={initialFileList}
                        >
                            <ImageUpload/>
                        </Form.Item>
                    );
                }}
            </Form.Item>
            <Form.Item label="Описание" name="description">
                <TextArea placeholder={"Описание товара"}/>
            </Form.Item>
        </Card>
    );
}