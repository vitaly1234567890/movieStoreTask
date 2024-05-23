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
    iconSelect?: (opened: boolean) => React.ReactNode;
}
export const CustomSelect = ({onChange,label,placeholder,data, defaultValue, reset, size, iconSelect}: Props) => {
    const [selectValue, setSelectValue] = useState<string | null>('');
    const [opened, setOpened] = useState(false);

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
                    rightSection={iconSelect?.(opened)}
                    onDropdownOpen={()=>setOpened(true)}
                    onDropdownClose={()=>setOpened(false)}
            />
        </div>
    );
};
