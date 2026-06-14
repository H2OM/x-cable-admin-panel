import {useState, useMemo, useEffect, type CSSProperties} from 'react';
import {Form, Select, Spin} from 'antd';
import debounce from "debounce";

interface SelectOption {
    label: string;
    value: string;
}

export default function TagSearchSelect({
    callback,
    fieldName,
    placeholder = "Введите название или выберите тег...",
    style,
    value,
    onChange
}: {
    callback: (query: string) => Promise<Record<string, unknown>>;
    fieldName: string;
    placeholder?: string;
    style?: CSSProperties;
    value?: string;
    onChange?: (value: string | null) => void;
}) {
    const form = Form.useFormInstance();
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);

    const debouncedFetch = useMemo(() => {
        return debounce(fetchSearchSuggestions, 500);
    }, []);

    useEffect(() => {
        if (!form) return;

        const currentBrandName = form.getFieldValue(fieldName);

        if (value && currentBrandName && options.length === 0) {
            (() => setOptions([{
                label: `${value} | ${currentBrandName}`,
                value: String(value)
            }]))();
        }
    }, [value, form]);

    async function fetchSearchSuggestions(searchText: string) {
        if (!searchText.trim()) {
            setOptions([]);
            return;
        }

        setFetching(true);
        const response = await callback(searchText);
        setFetching(false);

        if (!response.success || !Array.isArray(response.data)) return;

        const formattedOptions = response.data.map(hint => ({
            label: `${hint.id || ''} | ${hint.name || hint}`,
            value: String(hint.id || hint),
            originalName: hint.name || hint
        }));

        setOptions(formattedOptions);
    }

    const handleChange = (selected: string[]) => {
        if (!selected || selected.length === 0) {
            if (onChange) onChange(null);

            form.setFieldsValue({[fieldName]: ''});

            return;
        }

        const lastSelectedValue = selected[selected.length - 1];
        const targetOption = options.find(opt => opt.value === lastSelectedValue);
        const cleanBrandName = targetOption && 'originalName' in targetOption
            ? (targetOption as any).originalName
            : lastSelectedValue;

        if (onChange) {
            onChange(lastSelectedValue);
        }

        form.setFieldsValue({[fieldName]: cleanBrandName});
    };

    const selectValue = value ? [String(value)] : [];

    return (
        <Select
            mode="tags"
            showSearch={{
                filterOption: false
            }}
            onSearch={debouncedFetch}
            value={selectValue}
            placeholder={placeholder}
            onChange={handleChange}
            notFoundContent={fetching ? <Spin size="small"/> : 'Ничего не найдено'}
            options={options}
            style={style}
            className={'admin-search-select'}
            size="large"
            allowClear
        />
    );
}
