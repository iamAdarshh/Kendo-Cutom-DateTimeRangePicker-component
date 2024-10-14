import { Switch as KendoSwitch, SwitchChangeEvent } from "@progress/kendo-react-inputs";

interface SwitchProps {
    id?: string;
    className?: string;
    name?: string;
    checked?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    onLabel?: string;
    offLabel?: string;
    size?: 'small' | 'medium' | 'large';
    onChange?: (value: boolean) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

function Switch({
    id,
    className = '',
    name,
    checked,
    disabled,
    children,
    onLabel,
    offLabel,
    size = 'medium',
    onChange,
    onFocus,
    onBlur
}: Readonly<SwitchProps>) {
    // Handle change event and call the parent onChange
    const handleChange = (e: SwitchChangeEvent) => {
        if (onChange) {
            onChange(e.value); // Correctly use `e.value` to get the checked state
        }
    };

    return (
        <div className={`tw-inline-flex tw-items-center tw-gap-1 ${className}`}>
            <KendoSwitch
                id={id}
                name={name}
                checked={checked}
                disabled={disabled}
                onLabel={onLabel}
                offLabel={offLabel}
                size={size}
                onChange={handleChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {children}
        </div>
    );
}

export default Switch;
