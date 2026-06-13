export default function parseToFormData(values: Record<string, any>): FormData {
    const formData = new FormData();

    Object.keys(values).forEach(key => {
        const value = values[key];

        if(key === 'images' && Array.isArray(value)) {
            value.forEach((file: any) => {
                if (file.originFileObj) {
                    formData.append('new_images[]', file.originFileObj);

                } else if (file.existing) {
                    formData.append('images[]', file.name);
                }
            });

            return;
        }

        if (value && (Array.isArray(value) || typeof value === 'object')) {
            formData.append(key, JSON.stringify(value));

        } else if (value !== undefined) {
            formData.append(key, String(value));
        }
    });

    return formData;
}