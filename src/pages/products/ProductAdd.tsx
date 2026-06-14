import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {productsAPI} from "@api";
import parseToFormData from "@utils/parseToFormData.ts";
import {ProductForm} from "@components/products/ProductForm.tsx";
import type {ProductDetails} from "@/types/products.ts";

export default function ProductAdd() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleFinish = async (values: Record<string, any>): Promise<void> => {
        const formData = parseToFormData(values);

        setLoading(true);

        const response = await productsAPI.add(formData);

        setLoading(false);

        if(response.success) {
            navigate('/products/add', {replace: true});
        }
    }

    return <ProductForm
        label={'Добавление товара'}
        product={{} as ProductDetails}
        related={[]}
        loading={loading}
        handleFinish={handleFinish}
    />;
}