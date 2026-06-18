import {useEffect, useState} from "react";
import {bannersAPI} from "@api";
import {Card, Collapse, List, Skeleton, Space, Spin, Typography} from "antd";
import {Link} from "react-router-dom";
import {EditOutlined} from "@ant-design/icons";
import type {Banner} from "@/types/banners.ts";

const IMAGES_URL = import.meta.env.VITE_PUBLIC_SITE_IMAGES_URL;

export default function BannersGrid() {
    const [items, setItems] = useState<Banner[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchItems = async () => {
        setLoading(true);
        const response = await bannersAPI.getAll();
        setLoading(false);

        if (response.success) {
            setItems(response.data);
        }
    };

    useEffect(() => {
        (() => void fetchItems())();
    }, []);

    return (
        <div>
            <Space style={{marginBottom: '30px', alignItems: "center"}}>
                <Typography.Title level={2} style={{margin: 0, marginBottom: '6px'}}>
                    Все баннеры
                </Typography.Title>
            </Space>
            {loading && items.length > 0 &&
                <div className="load-screen"><Spin size="large" description={"Загрузка..."} /></div>
            }
            <List
                grid={{gutter: ['10px', '10px'], xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1, xxxl: 1}}
                dataSource={loading && items.length === 0
                    ? Array.from({length: 10}).map((_, i) => ({id: i} as Banner))
                    : items
                }
                itemLayout="horizontal"
                renderItem={(item) => (
                    <List.Item style={{ margin: 0 }}>
                        {loading && items.length === 0 ? (
                            <Card style={{width: '100%', height: '320px'}}>
                                <Skeleton active paragraph={{rows: 1}}/>
                            </Card>
                        ) : (
                            <Card style={{width: '100%'}}
                                  actions={[
                                      <Link to={`/banners/edit/${item.id}`}><EditOutlined key="edit" /></Link>,
                                  ]}
                            >
                                <div>
                                    <Typography.Title level={4} style={{marginTop: 0}}>
                                        {item.name}&nbsp;&nbsp;
                                        <span style={{color: 'var(--ant-color-icon)'}}>({item.id})</span>
                                    </Typography.Title>
                                    <p style={{color: 'var(--ant-color-icon)'}}>
                                        Количество слайдов: {item.slides.length}
                                    </p>
                                </div>
                                {item.slides.length > 0 &&
                                    <Collapse
                                        ghost
                                        size={"large"}
                                        items={[{
                                            key: '1',
                                            label: (
                                                <Typography.Title level={4} style={{margin: 0, marginTop: "-2px"}}>
                                                    Слайды
                                                </Typography.Title>
                                            ),
                                            children: (
                                                <Space orientation="vertical" style={{width: '100%'}}>
                                                    {item.slides.map(slide => (
                                                        <Card size={"small"} key={slide.id}>
                                                            <Space>
                                                                <img
                                                                    src={`${IMAGES_URL}/${slide.image}`}
                                                                    alt={slide.title}
                                                                    style={{
                                                                        width: 100,
                                                                        height: 100,
                                                                        objectFit: 'contain'
                                                                    }}
                                                                    onError={({currentTarget}) => {
                                                                        currentTarget.src = '/public/no-image.png';
                                                                    }}
                                                                />
                                                                <div>
                                                                    <Typography.Title level={5} style={{margin: 0}}>
                                                                        {slide.title}&nbsp;&nbsp;
                                                                        <span style={{color: 'var(--ant-color-icon)'}}>
                                                                        ({slide.id})
                                                                    </span>
                                                                    </Typography.Title>
                                                                    <p style={{color: 'var(--ant-color-icon)'}}>
                                                                        Позиция: {slide.position}
                                                                    </p>
                                                                </div>
                                                            </Space>
                                                        </Card>
                                                    ))}
                                                </Space>
                                            )
                                        }]}
                                    />
                                }
                            </Card>
                        )}
                    </List.Item>
                )}
            />
        </div>
    );
}