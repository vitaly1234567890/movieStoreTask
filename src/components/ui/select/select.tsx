import s from "./select.module.scss";
import {useState} from "react";
import { Select } from '@mantine/core';

type Props = {
    defaultValue?: string
    label: string
    placeholder: string
    data?: string[]
    onChange?: (value: string) => void
}
export const CustomSelect = ({onChange,label,placeholder,data, defaultValue}: Props) => {
    const [selectValue, setSelectValue] = useState<string>('');

    const handleChange = (value: string | null) => {
        setSelectValue(value || "");
        if (onChange) {
            onChange(value || ""); // Передаем актуальное значение `value`
        }
    };

    return (
        <div>
            <Select label={label}
                    searchable
                    defaultValue={defaultValue}
                    allowDeselect
                    placeholder={placeholder}
                    data={data}
                    value={selectValue}
                    onChange={handleChange}
                    classNames={s}
            />
        </div>
    );
};
