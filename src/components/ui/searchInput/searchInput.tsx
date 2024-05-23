import { TextInput, TextInputProps, rem } from '@mantine/core';
import { IconSearch} from '@tabler/icons-react';
import {Button} from "../button/button.tsx";
import s from './searchInput.module.scss'
import React from "react";

type props = {
    onSearch: () => void
    onEnterPress: (e: React.KeyboardEvent<HTMLInputElement>)=> void
}

type maimType = TextInputProps & props

export function InputWithButton({ onSearch, onEnterPress, ...props }: maimType) {

       return (
        <div className={s.root}>
            <TextInput
                onKeyDown={onEnterPress}
                className={s.input}
                radius={8}
                size="md"
                placeholder="Search movie title"
                rightSectionWidth={120}
                leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                rightSection={<Button onClick={onSearch} className={s.button} variant={'primaryS'} children={'Search'}/>}
                {...props}
            />
        </div>
    );
}