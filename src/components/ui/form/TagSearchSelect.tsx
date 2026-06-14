import {useState, useMemo, useEffect, type CSSProperties} from 'react';
import {Select, Spin} from 'antd';
import debounce from "debounce";

interface SelectOption {
    label: string;
    value: string;
}

export default function TagSearchSelect({
    callback,
    placeholder = "Введите название или выберите тег...",
    style
}: {
    callback: (query: string) => Promise<Record<string, unknown>>;
    placeholder?: string;
    style?: CSSProperties;
}) {
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const debouncedFetch = useMemo(() => {
        return debounce(fetchSearchSuggestions, 500);
    }, []);

    useEffect(() => {
        return () => debouncedFetch.clear();
    }, [debouncedFetch]);

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
            value: hint.id || hint
        }));

        setOptions(formattedOptions);
    }

    const handleChange = (values: string[]) => {
        if (values.length === 0) {
            setSelectedValues([]);
            return;
        }

        const lastSelectedValue = values[values.length - 1];
        setSelectedValues([lastSelectedValue]);
    }

    return (
        <Select
            mode="tags"
            showSearch={{
                onSearch: debouncedFetch,
                filterOption: false
            }}
            value={selectedValues}
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
