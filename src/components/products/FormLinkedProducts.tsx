import {Button, Card, Form, Input, Space, Typography} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";

const IMAGES_URL = import.meta.env.VITE_PUBLIC_SITE_IMAGES_URL;

export function FormLinkedProducts({label, fieldName}: {label: string, fieldName: string}) {
    return (
        <Card title={label} style={{marginBottom: 24}}>
            <Form.List name={fieldName}>
                {(fields, {add, remove}) => (
                    <>
                        {fields.map(({key, name, ...restField}) => (
                            <div
                                key={key}
                                style={{
                                    background: '#fcfcfc',
                                    padding: 16,
                                    border: '1px solid #f0f0f0',
                                    borderRadius: 8,
                                    marginBottom: 16
                                }}
                            >
                                <Space style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
                                    <Form.Item noStyle dependencies={[[name, 'title']]}>
                                        {({getFieldValue}) => {
                                            const titleValue = getFieldValue([fieldName, name, 'title']);
                                            return (
                                                <Typography.Text strong>
                                                    №{name + 1} {titleValue ? `— ${titleValue}` : 'Выберите товар для привязки'}
                                                </Typography.Text>
                                            );
                                        }}
                                    </Form.Item>

                                    <Button
                                        type="text"
                                        danger
                                        icon={<DeleteOutlined/>}
                                        onClick={() => remove(name)}
                                    >
                                        Удалить
                                    </Button>
                                </Space>
                                <Form.Item noStyle dependencies={[[name, 'id']]}>
                                    {({getFieldValue}) => {
                                        const productId = getFieldValue([fieldName, name, 'id']);

                                        if (!productId) {
                                            return (
                                                <Form.Item
                                                    label="Выберите товар для добавления"
                                                    style={{margin: 0}}
                                                >
                                                    {/*<Select*/}
                                                    {/*    showSearch*/}
                                                    {/*    placeholder="Введите название или артикул товара..."*/}
                                                    {/*    defaultActiveFirstOption={false}*/}
                                                    {/*    suffixIcon={null}*/}
                                                    {/*    filterOption={false}*/}
                                                    {/*    onSearch={handleSearchProducts}*/}
                                                    {/*    onChange={(value) => handleSelectProduct(value, name)}*/}
                                                    {/*    notFoundContent={searchLoading ? <Spin size="small" /> : 'Товары не найдены'}*/}
                                                    {/*    style={{ width: '100%' }}*/}
                                                    {/*>*/}
                                                    {/*    {foundProducts.map(p => (*/}
                                                    {/*        <Option key={p.id} value={p.id}>*/}
                                                    {/*            {p.title} ({p.sku}) — {p.price} ₽*/}
                                                    {/*        </Option>*/}
                                                    {/*    ))}*/}
                                                    {/*</Select>*/}
                                                </Form.Item>
                                            );
                                        }

                                        const image = getFieldValue([fieldName, name, 'image']);

                                        return (
                                            <div style={{display: 'flex', gap: '24px', alignItems: 'center'}}>
                                                {image && (
                                                    <div style={{
                                                        width: 80,
                                                        height: 80,
                                                        border: '1px solid #e0e0e0',
                                                        borderRadius: 6,
                                                        overflow: 'hidden',
                                                        flexShrink: 0
                                                    }}>
                                                        <img src={`${IMAGES_URL}/${image}`}
                                                             alt="Товар"
                                                             style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                        />
                                                    </div>
                                                )}

                                                <div style={{flexGrow: 1}}>
                                                    <Form.Item {...restField} name={[name, 'id']} hidden>
                                                        <Input/>
                                                    </Form.Item>
                                                    <Form.Item
                                                        noStyle
                                                        dependencies={[
                                                            [name, 'article'],
                                                            [name, 'price']
                                                        ]}
                                                    >
                                                        {({getFieldValue}) => {
                                                            const article = getFieldValue([
                                                                fieldName, name, 'article'
                                                            ]);
                                                            const price = getFieldValue([
                                                                fieldName, name, 'price'
                                                            ]);
                                                            const formattedPrice = price.toLocaleString('ru-RU', {
                                                                style: 'currency',
                                                                currency: 'RUB',
                                                            });

                                                            return (
                                                                <Space size={40}
                                                                       align="baseline"
                                                                       style={{display: 'flex', flexWrap: 'wrap'}
                                                                       }>
                                                                    <Space orientation="vertical" size={4}>
                                                                        <span style={{
                                                                            color: '#8c8c8c',
                                                                            fontSize: '14px'
                                                                        }}>
                                                                            Артикул товара
                                                                        </span>
                                                                        <Typography.Text
                                                                            strong
                                                                            style={{fontSize: '15px', color: '#262626'}}
                                                                        >
                                                                            {article}
                                                                        </Typography.Text>
                                                                    </Space>

                                                                    <Space orientation="vertical" size={4}>
                                                                        <span style={{
                                                                            color: '#8c8c8c',
                                                                            fontSize: '14px'
                                                                        }}>
                                                                            Текущая цена
                                                                        </span>
                                                                        <Typography.Text strong style={{
                                                                            fontSize: '15px',
                                                                            color: '#262626'
                                                                        }}>
                                                                            {formattedPrice}
                                                                        </Typography.Text>
                                                                    </Space>
                                                                </Space>
                                                            );
                                                        }}
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        );
                                    }}
                                </Form.Item>
                            </div>
                        ))}

                        <Form.Item style={{marginTop: 16}}>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                Привязать еще один товар
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Card>
    );
}