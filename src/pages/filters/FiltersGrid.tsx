import {Card, Checkbox, type CheckboxChangeEvent, Collapse, List, Skeleton, Space, Spin, Typography} from "antd";
import SelectActions from "@components/ui/grid/SelectActions.tsx";
import ContextMenu from "@components/ui/grid/ContextMenu.tsx";
import {gridMenuItems} from "@constants/menuItems/gridMenuItems.tsx";
import {Link, useSearchParams} from "react-router-dom";
import {EditOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {filtersAPI} from "@api";
import type {Filter} from "@/types/filters.ts";
import {filterMenuItems, filtersGridMenuItems} from "@constants/menuItems/filtersMenuItems.tsx";

export default function FiltersGrid() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '15', 10);
    const [filters, setFilters] = useState<Filter[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [selectMode, setSelectMode] = useState<boolean>(false);
    const [selected, setSelected] = useState<number[]>([]);

    const fetchFilters = async () => {
        let total = count;

        setLoading(true);

        if (total === 0) {
            const countResponse = await filtersAPI.getCount();

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

        const response = await filtersAPI.getAll(page, limit);

        setLoading(false);

        if (response.success) {
            setFilters(response.data);
        }
    };

    useEffect(() => {
        (() => void fetchFilters())();
    }, [page, limit]);

    const handlePageChange = (page: number, limit: number) => {
        setSearchParams({
            page: String(page),
            limit: String(limit),
        });
    };

    const deleteFiltersHandler = async (ids: number[]) => {
        setLoading(true);
        const response = await filtersAPI.deleteMany(ids);
        setLoading(false);

        if(response.success) {
            setFilters(prev => prev.filter(filter => !ids.includes(filter.id)));

            void fetchFilters();
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

    const contextDeleteFiltersHandler = () => {
        void selectedAction(() => deleteFiltersHandler(selected));
    }

    return (
        <div>
            <Space style={{marginBottom: '30px', alignItems: "center"}}>
                <Typography.Title level={2} style={{margin: 0, marginBottom: '6px'}}>
                    Все фильтры
                </Typography.Title>

                {selectMode ?
                    <SelectActions
                        selected={selected}
                        maxCount={filters.length}
                        checkAllHandler={(e: CheckboxChangeEvent) => {
                            setSelected(e.target.checked ? filters.map(filter => filter.id) : [])
                        }}
                        abortHandler={() => {
                            setSelected([]);
                            setSelectMode(false);
                        }}
                    >
                        <ContextMenu
                            menuItems={filtersGridMenuItems}
                            handlers={{
                                delete: contextDeleteFiltersHandler
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
            {loading && filters.length > 0 &&
                <div className="load-screen"><Spin size="large" description={"Загрузка..."} /></div>
            }
            <List
                grid={{gutter: ['10px', '10px'], xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1, xxxl: 1}}
                dataSource={loading && filters.length === 0
                    ? Array.from({length: limit}).map((_, i) => ({id: i} as Filter))
                    : filters
                }
                itemLayout="horizontal"
                pagination={{
                    current: page,
                    pageSize: limit,
                    total: count,
                    align: 'center',
                    showSizeChanger: true,
                    pageSizeOptions: ['15', '30', '60', '90'],
                    onChange: handlePageChange
                }}
                renderItem={(filter) => (
                    <List.Item style={{ margin: 0 }}>
                        {loading && filters.length === 0 ? (
                            <Card style={{width: '100%', height: '320px'}}>
                                <Skeleton active paragraph={{rows: 1}}/>
                            </Card>
                        ) : (
                            <Card style={{width: '100%'}}
                                  actions={[
                                      <Link to={`/filters/edit/${filter.id}`}><EditOutlined key="edit" /></Link>,
                                      <ContextMenu
                                          menuItems={filterMenuItems}
                                          handlers={{
                                              delete: () => deleteFiltersHandler([filter.id]),
                                          }}
                                      />
                                  ]}
                            >
                                {selectMode &&
                                    <Checkbox
                                        className="checkbox _big"
                                        style={{position: "absolute", right: 10, top: 10}}
                                        checked={selected.includes(filter.id)}
                                        onChange={({target}) => {
                                            setSelected(target.checked
                                                ? [...selected, filter.id]
                                                : selected.filter(id => id !== filter.id)
                                            );
                                        }}
                                    />
                                }
                                <div>
                                    <Typography.Title level={4} style={{marginTop: 0}}>
                                        {filter.filter}&nbsp;&nbsp;
                                        <span style={{color: 'var(--ant-color-icon)'}}>({filter.id})</span>
                                    </Typography.Title>
                                    <p style={{color: 'var(--ant-color-icon)'}}>
                                        Количество значений: {filter.values.length}
                                    </p>
                                </div>
                                {filter.values.length > 0 &&
                                    <Collapse
                                        ghost
                                        size={"large"}
                                        items={[{
                                            key: '1',
                                            label: (
                                                <Typography.Title level={4} style={{margin: 0, marginTop: "-2px"}}>
                                                    Значения
                                                </Typography.Title>
                                            ),
                                            children: (
                                                <Space orientation="vertical" style={{width: '100%'}}>
                                                    {filter.values.map(value => (
                                                        <Card size={"small"} key={value.id}>
                                                            <Typography.Title level={5} style={{margin: 0}}>
                                                                {value.value}&nbsp;&nbsp;
                                                                <span style={{color: 'var(--ant-color-icon)'}}>
                                                                    {value.code}
                                                                </span>&nbsp;&nbsp;
                                                                <span style={{color: 'var(--ant-color-icon)'}}>
                                                                    ({value.id})
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