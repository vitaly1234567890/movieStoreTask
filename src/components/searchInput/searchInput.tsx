import { TextInput, TextInputProps, ActionIcon, useMantineTheme, rem } from '@mantine/core';
import { IconSearch} from '@tabler/icons-react';
import {Button} from "../button/button.tsx";
import s from './searchInput.module.scss'

export function InputWithButton(props: TextInputProps) {
    const theme = useMantineTheme();

    return (
        <div>
            <TextInput
                className={s.input}
                radius="xl"
                size="md"
                placeholder="Search movie title"
                rightSectionWidth={42}
                leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                rightSection={
                    <ActionIcon size={38}  color={theme.primaryColor} variant="filled">
                        <Button variant={'primaryS'} children={'Search'}/>
                    </ActionIcon>
                }
                {...props}
            />
        </div>

    );
}