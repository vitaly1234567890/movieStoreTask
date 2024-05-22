import s from "./select.module.scss";
import React, {useEffect, useState} from "react";
import { Select } from '@mantine/core';

type Props = {
    defaultValue?: string
    label: string
    placeholder: string
    data?: string[]
    onChange?: (value: string) => void
    reset?: boolean
    size?: string
    rightSection?: React.ReactNode
    setOpened?: (value: boolean)=> void
}
export const CustomSelect = ({onChange,label,placeholder,data, defaultValue, reset, size, rightSection, setOpened}: Props) => {
    const [selectValue, setSelectValue] = useState<string | null>('');

    const handleChange = (value: string | null) => {
        setSelectValue(value || "");
        if (onChange) {
            onChange(value || ""); // Передаем актуальное значение `value`
        }
    };

    useEffect(() => {
        if (reset) {
            setSelectValue(null);
        }
    }, [reset]);


    return (
        <div>
            <Select label={label}
                    style={{ width: size }}
                    searchable
                    defaultValue={defaultValue}
                    allowDeselect
                    placeholder={placeholder}
                    data={data}
                    value={selectValue}
                    onChange={handleChange}
                    classNames={s}
                    rightSection={rightSection}
                    onDropdownOpen={() => setOpened?.(true)}
                    onDropdownClose={() => setOpened?.(false)}
            />
        </div>
    );
};
