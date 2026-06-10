import {FormLinkedProducts} from "@components/products/FormLinkedProducts.tsx";

export default function FormRelated() {

    return (
        <FormLinkedProducts label={"Связанные товары"} fieldName={'relatedProducts'}/>
    );
}