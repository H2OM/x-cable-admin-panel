import {Card, Checkbox, type CheckboxChangeEvent, List, Skeleton, Space, Spin, Typography} from "antd";
import {useEffect, useState} from "react";
import SelectActions from "@components/ui/grid/SelectActions.tsx";
import ContextMenu from "@components/ui/grid/ContextMenu.tsx";
import {gridMenuItems} from "@constants/menuItems/gridMenuItems.tsx";
import {Link, useSearchParams} from "react-router-dom";
import {EditOutlined} from "@ant-design/icons";
import type {GridBrand} from "@/types/brands.ts";
import {brandsAPI} from "@api";
import {brandMenuItems, brandsGridMenuItems} from "@constants/menuItems/brandsMenuItems.tsx";

export default function BrandsGrid() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '30', 10);
    const [items, setItems] = useState<GridBrand[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [selectMode, setSelectMode] = useState<boolean>(false);
    const [selected, setSelected] = useState<number[]>([]);

    const fetchItems = async () => {
        let total = count;

        setLoading(true);

        if (total === 0) {
            const countResponse = await brandsAPI.getCount();

            if (countResponse.success) {
                total = countResponse.data;

                setCount(total);
            }
        }

        const maxPage = total ? Math.ceil(total / limit) : 1;

        if (page > maxPage) {
            setSearchParams({
                page: String(maxPage),
                limit: String(limit),
            });

            setLoading(false);

            return;
        }

        const response = await brandsAPI.getAll(page, limit);

        setLoading(false);

        if (response.success) {
            setItems(response.data);
        }
    };

    useEffect(() => {
        (() => void fetchItems())();
    }, [page, limit]);

    const handlePageChange = (page: number, limit: number) => {
        setSearchParams({
            page: String(page),
            limit: String(limit),
        });
    };

    const deleteItemsHandler = async (ids: number[], safe = false) => {
        setLoading(true);
        const response = await brandsAPI.deleteMany(ids, safe);
        setLoading(false);

        if(response.success) {
            setItems(prev => prev.filter(item => !ids.includes(item.id)));

            void fetchItems();
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

    const contextDeleteItemsHandler = () => {
        void selectedAction(() => deleteItemsHandler(selected));
    }

    const contextSafeDeleteItemsHandler = () => {
        void selectedAction(() => deleteItemsHandler(selected, true));
    }

    return (
        <div>
            <Space style={{marginBottom: '30px', alignItems: "center"}}>
                <Typography.Title level={2} style={{margin: 0, marginBottom: '6px'}}>
                    Все бренды
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
                            menuItems={brandsGridMenuItems}
                            handlers={{
                                delete: contextDeleteItemsHandler,
                                safe_delete: contextSafeDeleteItemsHandler
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
                    ? Array.from({length: limit}).map((_, i) => ({id: i} as GridBrand))
                    : items
                }
                itemLayout="horizontal"
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: count,
                    align: 'center',
                    showSizeChanger: true,
                    pageSizeOptions: ['30', '60', '90'],
                    onChange: handlePageChange
                }}
                renderItem={(item) => (
                    <List.Item style={{ margin: 0 }}>
                        {loading && items.length === 0 ? (
                            <Card style={{width: '100%', height: '320px'}}>
                                <Skeleton active paragraph={{rows: 1}}/>
                            </Card>
                        ) : (
                            <Card style={{width: '100%'}}
                                  actions={[
                                      <Link to={`/brands/edit/${item.id}`}><EditOutlined key="edit" /></Link>,
                                      <ContextMenu
                                          menuItems={brandMenuItems}
                                          handlers={{
                                              delete: () => deleteItemsHandler([item.id]),
                                              safe_delete: () => deleteItemsHandler([item.id], true)
                                          }}
                                      />
                                  ]}
                            >
                                {selectMode &&
                                    <Checkbox
                                        className="checkbox _big"
                                        style={{position: "absolute", right: 10, top: 10}}
                                        checked={selected.includes(item.id)}
                                        onChange={({target}) => {
                                            setSelected(target.checked
                                                ? [...selected, item.id]
                                                : selected.filter(id => id !== item.id)
                                            );
                                        }}
                                    />
                                }
                                <div>
                                    <Typography.Title level={4} style={{marginTop: 0}}>
                                        {item.name}&nbsp;&nbsp;
                                        <span style={{color: 'var(--ant-color-icon)'}}>({item.id})</span>
                                    </Typography.Title>
                                    <p style={{color: 'var(--ant-color-icon)'}}>
                                        Количество товаров: {item.products_count}
                                    </p>
                                </div>
                            </Card>
                        )}
                    </List.Item>
                )}
            />
        </div>
    );
}

