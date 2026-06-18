import {Card, Checkbox, type CheckboxChangeEvent, Collapse, List, Skeleton, Space, Spin, Typography} from "antd";
import {useEffect, useState} from "react";
import {categoriesAPI} from "@api";
import type {Category} from "@/types/categories.ts";
import SelectActions from "@components/ui/grid/SelectActions.tsx";
import ContextMenu from "@components/ui/grid/ContextMenu.tsx";
import {gridMenuItems} from "@constants/menuItems/gridMenuItems.tsx";
import {categoriesGridMenuItems} from "@constants/menuItems/categoriesMenuItems.tsx";
import {Link} from "react-router-dom";
import {EditOutlined} from "@ant-design/icons";

const IMAGES_URL = import.meta.env.VITE_PUBLIC_SITE_IMAGES_URL;

export default function CategoriesGrid() {
    const [items, setItems] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectMode, setSelectMode] = useState<boolean>(false);
    const [selected, setSelected] = useState<number[]>([]);

    const fetchItems = async () => {
        setLoading(true);
        const response = await categoriesAPI.getAll();
        setLoading(false);

        if (response.success) {
            setItems(response.data);
        }
    };

    useEffect(() => {
        (() => void fetchItems())();
    }, []);

    const deleteCategoriesHandler = async (ids: number[]) => {
        setLoading(true);
        const response = await categoriesAPI.deleteMany(ids);
        setLoading(false);

        if(response.success) {
            setItems(prev => prev.filter(cat => !ids.includes(cat.id)));
        }

        return response;
    }

    const selectedAction = async (
        callback: () => Promise<Record<string, string>>
    )=> {
        setLoading(true);
        const response = await callback();
        setLoading(false);

        if(response.success) {
            setSelected([]);
            setSelectMode(false);
        }
    }

    const contextDeleteCategoriesHandler = () => {
        void selectedAction(() => deleteCategoriesHandler(selected));
    }

    return (
        <div>
            <Space style={{marginBottom: '30px', alignItems: "center"}}>
                <Typography.Title level={2} style={{margin: 0, marginBottom: '6px'}}>
                    Все категории
                </Typography.Title>
                {selectMode ?
                    <SelectActions
                        selected={selected}
                        maxCount={items.length}
                        checkAllHandler={(e: CheckboxChangeEvent) => {
                            setSelected(e.target.checked ? items.map(item => item.id) : [])
                        }}
                        abortHandler={() => {
                            setSelected([]);
                            setSelectMode(false);
                        }}
                    >
                        <ContextMenu
                            menuItems={categoriesGridMenuItems}
                            handlers={{
                                delete: contextDeleteCategoriesHandler
                            }}
                        />
                    </SelectActions>
                    :
                    <ContextMenu
                        menuItems={gridMenuItems}
                        handlers={{
                            select: () => setSelectMode(true)
                        }}
                    />
                }
            </Space>
            {loading && items.length > 0 &&
                <div className="load-screen"><Spin size="large" description={"Загрузка..."} /></div>
            }
            <List
                grid={{gutter: ['10px', '10px'], xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1, xxxl: 1}}
                dataSource={loading && items.length === 0
                    ? Array.from({length: 10}).map((_, i) => ({id: i} as Category))
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
                                      <Link to={`/categories/edit/${item.id}`}><EditOutlined key="edit" /></Link>,
                                      <ContextMenu
                                          menuItems={categoriesGridMenuItems}
                                          handlers={{
                                              delete: () => deleteCategoriesHandler([item.id]),
                                          }}
                                      />
                                  ]}
                            >
                                {selectMode &&
                                    <Checkbox
                                        className="checkbox _big"
                                        style={{position: "absolute", left: 10, top: 10}}
                                        checked={selected.includes(item.id)}
                                        onChange={({target}) => {
                                            setSelected(target.checked
                                                ? [...selected, item.id]
                                                : selected.filter(id => id !== item.id)
                                            );
                                        }}
                                    />
                                }
                                <Space>
                                    <img
                                        src={`${IMAGES_URL}/${item.image}`}
                                        alt={item.title}
                                        style={{width: 100, height: 100, objectFit: 'contain'}}
                                        onError={({currentTarget}) => {
                                            currentTarget.src = '/public/no-image.png';
                                        }}
                                    />
                                    <div>
                                        <Typography.Title level={4} style={{marginTop: 0}}>
                                            {item.title}&nbsp;&nbsp;
                                            <span style={{color: 'var(--ant-color-icon)'}}>({item.id})</span>
                                        </Typography.Title>
                                        <p style={{color: 'var(--ant-color-icon)'}}>
                                            Количество подкатегорий: {item.types.length}
                                        </p>
                                    </div>
                                </Space>
                                {item.types.length > 0 &&
                                    <Collapse
                                        ghost
                                        size={"large"}
                                        items={[{
                                            key: '1',
                                            label: (
                                                <Typography.Title level={4} style={{margin: 0, marginTop: "-2px"}}>
                                                    Подкатегории
                                                </Typography.Title>
                                            ),
                                            children: (
                                                <Space orientation="vertical" style={{width: '100%'}}>
                                                    {item.types.map(type => (
                                                        <Card size={"small"} key={type.id}>
                                                            <Typography.Title level={5} style={{margin: 0}}>
                                                                {type.name}&nbsp;&nbsp;
                                                                <span style={{color: 'var(--ant-color-icon)'}}>
                                                                    ({type.id})
                                                                </span>
                                                            </Typography.Title>
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