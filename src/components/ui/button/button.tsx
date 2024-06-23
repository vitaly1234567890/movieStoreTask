import s from './button.module.scss'
import {ComponentPropsWithoutRef} from "react";

type Props = ComponentPropsWithoutRef<'button'> & {
    className?: string;
    variant?: 'primaryS' | 'primaryM' | 'text' | 'icon'
};

export const Button = ({ className, children, variant = 'primaryS', ...rest }: Props) => {
    return (
        <button className={`${s[variant]} ${className}`} {...rest}>
            {children}
        </button>
    );
};


