import {Button} from "./button.tsx";
import {Meta, StoryObj} from "@storybook/react";

const meta = {
    argTypes: {
        variant: {
            control: {type: 'radio'},
            options: ['primaryS', 'primaryM', 'text'],
        },
    },
    component: Button,
    tags: ['autodocs'],
    title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const PrimaryM: Story = {
    args: {
        children: 'Search',
        disabled: false,
        variant: 'primaryM',
    },
}


