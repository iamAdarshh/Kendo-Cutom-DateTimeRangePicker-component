import React from 'react';

interface LabelProps {
    id?: string;
    className?: string;
    htmlFor?: string;
    children?: React.ReactNode; // Use ReactNode for children elements
}

function Label({ id, className = '', htmlFor, children }: Readonly<LabelProps>) {
    return (
        <label
            id={id}
            className={`tw-block tw-text-sm tw-font-semibold tw-leading-6 tw-text-neutral-800 ${className}`}
            htmlFor={htmlFor}
        >
            {children}
        </label>
    );
}

export default Label;
