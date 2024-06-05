import {MultiSelect} from "@mantine/core";
import React, {useEffect, useState} from "react";
import s from "../select/select.module.scss";

type Props = {
    label: string
    placeholder: string
    data?: string[]
    onChange?: (value: string[]) => void
    reset?: boolean
    size?: string
    iconSelect?: (opened: boolean) => React.ReactNode;
}

export const CustomMultiSelect = ({onChange,label,placeholder,data, reset, size, iconSelect}: Props) => {
    const [selectValue, setSelectValue] = useState<string[]>([]);
    const [opened, setOpened] = useState(false);

    const handleChange = (value: string[]) => {
        setSelectValue(value);
        if (onChange) {
            onChange(value);
        }
    };

    useEffect(() => {
        if (reset) {
            setSelectValue([]);
        }
    }, [reset]);


    return (
        <MultiSelect
            label={label}
            style={{width: size}}
            searchable
            placeholder={placeholder}
            data={data}
            value={selectValue}
            onChange={handleChange}
            classNames={s}
            rightSection={iconSelect?.(opened)}
            onDropdownOpen={()=>setOpened(true)}
            onDropdownClose={()=>setOpened(false)}
        />
    );
};
