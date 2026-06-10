import type {ReactNode} from "react";
import {Button, Card, Form, Space} from "antd";
import TagSearchSelect from "@components/ui/TagSearchSelect.tsx";
import {CheckOutlined, SwapOutlined} from "@ant-design/icons";

export default function LinkSearch({title, placeholder, divider = <SwapOutlined/>, callback, loading, submit}: {
    title: string;
    placeholder: string;
    divider?: ReactNode;
    callback: (query: string) => Promise<Record<string, unknown>>;
    loading: boolean;
    submit: (values: Record<string, string>) => Promise<void>;
}) {
    return (
        <Space vertical size={10} style={{width: '100%'}}>
            <Card title={title} style={{width: '100%'}}>
                <Form onFinish={submit} layout={"inline"} style={{gap: '10px'}}>
                    <Form.Item name={"id"} style={{margin: 0, flex: 1}}
                               rules={[{message: 'Выберите вариант из списка!'}]}>
                        <TagSearchSelect
                            callback={callback}
                            placeholder={placeholder}
                        />
                    </Form.Item>
                    {divider}
                    <Form.Item name={"variation_id"} style={{margin: 0, flex: 1}}
                               rules={[{message: 'Выберите вариант из списка!'}]}>
                        <TagSearchSelect
                            callback={callback}
                            placeholder={placeholder}
                        />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        size={"large"}
                        icon={<CheckOutlined/>}
                        loading={loading}
                    />
                </Form>
            </Card>
        </Space>
    );
}