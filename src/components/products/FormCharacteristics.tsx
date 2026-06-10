import {Button, Card, Form, Input, Space} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";

export default function FormCharacteristics() {
    return (
        <Card title="Характеристики товара" style={{ marginBottom: 24 }}>
            <Form.List name="characteristics">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'name']}
                                    style={{margin: 0}}
                                    rules={[{ required: true, message: 'Укажите параметр' }]}
                                >
                                    <Input placeholder="Наименование свойства" style={{ width: 250 }} />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'value']}
                                    style={{margin: 0}}
                                    rules={[{ required: true, message: 'Укажите значение' }]}
                                >
                                    <Input placeholder="Значение свойства" style={{ width: 350 }} />
                                </Form.Item>
                                <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => remove(name)}
                                />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Добавить характеристику
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Card>
    );
}