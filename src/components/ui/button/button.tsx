import s from './button.module.scss'
import React from "react";

type Props = {
    className?: string;
    children: React.ReactNode;
    variant?: 'primaryS' | 'primaryM' | 'text' | 'icon'
    disabled?: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({ className, children, variant = 'primaryS', disabled, onClick, ...rest }: Props) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`${s[variant]} ${className}`} {...rest}>
            {children}
        </button>
    );
};


