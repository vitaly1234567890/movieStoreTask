import s from './button.module.scss'

type Props = {
    className?: string;
    children: React.ReactNode;
    variant?: 'primaryS' | 'primaryM' | 'text'
    onClick?: () => void;
    disabled?: boolean
};

export const Button = ({ className, children, variant = 'primaryS', disabled, onClick,  ...rest }: Props) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`${s[variant]} ${className}`} {...rest}>
            {children}
        </button>
    );
};


