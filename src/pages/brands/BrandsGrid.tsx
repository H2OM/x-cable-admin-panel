import {Space, Typography} from "antd";

export default function BrandsGrid() {
    return (
        <div>
            <Space style={{marginBottom: '30px', alignItems: "center"}}>
                <Typography.Title level={2} style={{margin: 0, marginBottom: '6px'}}>
                    Все бренды
                </Typography.Title>
            </Space>
        </div>
    );
}

