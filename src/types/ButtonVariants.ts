export enum ButtonVariants {
    Primary,
    Secondary,
    Success,
    Danger,
    Warning,
    Info,
    Light,
    Dark,
    Link,
}

export const ButtonVariantClassNames: { [key in ButtonVariants]: string } = {
    [ButtonVariants.Primary]: 'tw-bg-blue-500 tw-text-white hover:tw-bg-blue-700',
    [ButtonVariants.Secondary]: 'tw-bg-gray-500 tw-text-white hover:tw-bg-gray-600',
    [ButtonVariants.Success]: 'tw-bg-green-500 tw-text-white hover:tw-bg-green-600',
    [ButtonVariants.Danger]: 'tw-bg-red-500 tw-text-white hover:tw-bg-red-600',
    [ButtonVariants.Warning]: 'tw-bg-yellow-500 tw-text-white hover:tw-bg-yellow-600',
    [ButtonVariants.Info]: 'tw-bg-blue-400 tw-text-white hover:tw-bg-blue-500',
    [ButtonVariants.Light]: 'tw-bg-gray-100 tw-text-gray-800 hover:tw-bg-gray-200',
    [ButtonVariants.Dark]: 'tw-bg-gray-800 tw-text-white hover:tw-bg-gray-900',
    [ButtonVariants.Link]: 'tw-bg-transparent tw-text-blue-500 hover:tw-underline',
};


export enum ButtonSizes {
    xs,
    sm,
    md,
    lg,
    xl,
}

export const ButtonSizeClassNames: { [key in ButtonSizes]: string } = {
    [ButtonSizes.xs]: 'px-2 py-1 text-xs', // Extra Small
    [ButtonSizes.sm]: 'px-2 py-1 text-sm', // Small
    [ButtonSizes.md]: 'px-2.5 py-1.5 text-sm', // Medium
    [ButtonSizes.lg]: 'px-3 py-2 text-sm', // Large
    [ButtonSizes.xl]: 'px-3.5 py-2.5 text-sm', // Extra Large
};