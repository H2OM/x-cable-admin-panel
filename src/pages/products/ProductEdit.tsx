import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import type {Product, ProductDetails} from "@/types/products.ts";
import {productsAPI} from "@api";
import parseToFormData from "@utils/parseToFormData.ts";
import {ProductForm} from "@components/products/ProductForm.tsx";

export default function ProductEdit() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [related, setRelated] = useState<Product[]>([]);
    useEffect(() => {
        (async () => {
            const response = await productsAPI.get(Number(id));

            if(!response.success) {
                navigate("/products");
            }

            setLoading(false);
            setProduct(response.data.product);
            setRelated(response.data.related);
        })();
    }, [id]);

    const handleFinish = async (values: Record<string, any>): Promise<void> => {
        const formData = parseToFormData(values);

        setLoading(true);

        const response = await productsAPI.update(formData);

        setLoading(false);

        if(response.success) {
            navigate('/products');
        }
    }

    return <ProductForm
        label={'Редактирование товара'}
        product={product}
        related={related}
        loading={loading}
        handleFinish={handleFinish}
    />;
}