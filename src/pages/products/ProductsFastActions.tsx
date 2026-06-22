import {Spin, Typography} from "antd";
import {SwapRightOutlined} from "@ant-design/icons";
import {productsAPI} from "@api";
import {useState} from "react";
import LinkSearch from "@components/ui/form/LinkSearch.tsx";

export default function ProductsFastActions() {
    const [loading, setLoading] = useState<boolean>(false);

    const handleOneWayPairVariation = async (values: Record<string, string>) => {
        console.log(values);return;
        setLoading(true);

        const response = await productsAPI.oneWayPairVariations();

        setLoading(false);
    };

    const handlePairVariation = async () => {

    };

    const handleOneWayPairRelated = async (values: Record<string, string>) => {

    };

    const handlePairRelated = async (values: Record<string, string>) => {

    };

//TODO!!!
    return (
        <div style={{position: 'relative'}}>
            <Typography.Title level={2} style={{margin: 0, marginBottom: '30px'}}>
                Быстрые действия с товарами
            </Typography.Title>
            {loading &&
                <div className="load-screen"><Spin size="large" description={"Загрузка..."} /></div>
            }
            <LinkSearch title={"Односторонняя привязка вариации товара"}
                        placeholder={"Введите имя, артикул или id товара"}
                        divider={<SwapRightOutlined />}
                        callback={productsAPI.search}
                        loading={loading}
                        submit={handleOneWayPairVariation}
            />
            <br/><br/>
            <LinkSearch title={"Двусторонняя привязка вариации товара"}
                        placeholder={"Введите имя, артикул или id товара"}
                        callback={productsAPI.search}
                        loading={loading}
                        submit={handlePairVariation}
            />
            <br/><br/>
            <LinkSearch title={"Односторонняя привязка связанного товара"}
                        placeholder={"Введите имя, артикул или id товара"}
                        divider={<SwapRightOutlined />}
                        callback={productsAPI.search}
                        loading={loading}
                        submit={handleOneWayPairRelated}
            />
            <br/><br/>
            <LinkSearch title={"Двусторонняя привязка связанного товара"}
                        placeholder={"Введите имя, артикул или id товара"}
                        callback={productsAPI.search}
                        loading={loading}
                        submit={handlePairRelated}
            />
        </div>
    );
}