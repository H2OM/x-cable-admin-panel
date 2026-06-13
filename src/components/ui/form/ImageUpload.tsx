import {Typography, Upload, type UploadFile} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import type {UploadChangeParam} from "antd/es/upload";

export default function ImageUpload({fileList = [], onChange} : {
    fileList?: UploadFile[];
    onChange?: (info: UploadChangeParam) => void
}) {
    return (
        <>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
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
        </>
    );
}