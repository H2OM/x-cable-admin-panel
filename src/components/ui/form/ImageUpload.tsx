import {useState} from "react";
import {Form, Typography, Upload, type UploadFile} from "antd";
import {PlusOutlined} from "@ant-design/icons";

const IMAGES_URL = import.meta.env.VITE_PUBLIC_SITE_IMAGES_URL;

export default function ImageUpload({images, label = 'Изображения'} : {images: string[], label?: string}) {
    const [fileList, setFileList] = useState<UploadFile[]>(images.map((name, i) => ({
        uid: `-existing-${i}`,
        name: name,
        status: 'done',
        url: `${IMAGES_URL}/${name}`
    })));

    return (
        <Form.Item label={label}>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={({ fileList: newFileList }) => {
                    setFileList(newFileList);
                }}
                beforeUpload={() => false}
            >
                <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Загрузить</div>
                </div>
            </Upload>
            <Typography.Text type="secondary">
                Доступно к загрузке неограниченное количество изображений.
            </Typography.Text>
        </Form.Item>
    );
}