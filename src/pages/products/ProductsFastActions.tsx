import {Typography} from "antd";
import {SwapRightOutlined} from "@ant-design/icons";
import {productsAPI} from "@api";
import {useState} from "react";
import LinkSearch from "@components/ui/form/LinkSearch.tsx";

export default function ProductsFastActions() {
    const [isPending, setIsPending] = useState<boolean>(false);

    const handleOneWayPairVariation = async (values: Record<string, string>) => {
        console.log(values);return;
        setIsPending(true);

        const response = await productsAPI.oneWayPairVariation();

        setIsPending(false);
    };

    const handlePairVariation = async () => {

    };

    const handleOneWayPairRelated = async (values: Record<string, string>) => {

    };

    const handlePairRelated = async (values: Record<string, string>) => {

    };

//TODO!!!
    return (
        <div>
            <Typography.Title level={2} style={{margin: 0, marginBottom: '30px'}}>
                Быстрые действия с товарами
            </Typography.Title>
            <LinkSearch title={"Односторонняя привязка вариации товара"}
                        placeholder={"Введите имя, артикул или id товара"}
                        divider={<SwapRightOutlined />}
                        callback={productsAPI.search}
                        loading={isPending}
                        submit={handleOneWayPairVariation}
            />
            <br/><br/>
            <LinkSearch title={"Двустороняя привязка вариации товара"}
                        placeholder={"Введите имя, артикул или id товара"}
                        callback={productsAPI.search}
                        loading={isPending}
                        submit={handlePairVariation}
            />
            <br/><br/>
            <LinkSearch title={"Односторонняя привязка связанного товара"}
                        placeholder={"Введите имя, артикул или id товара"}
                        divider={<SwapRightOutlined />}
                        callback={productsAPI.search}
                        loading={isPending}
                        submit={handleOneWayPairRelated}
            />
            <br/><br/>
            <LinkSearch title={"Двустороняя привязка связанного товара"}
                        placeholder={"Введите имя, артикул или id товара"}
                        callback={productsAPI.search}
                        loading={isPending}
                        submit={handlePairRelated}
            />
        </div>
    );
}