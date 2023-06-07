import type { ReactElement, ReactNode } from 'voby'

export interface CustomLabelProps {
    isDefault: boolean
    children: Children
}

export default function CustomLabel({
    children,
    isDefault,
}: CustomLabelProps): Child {
    if (!isDefault) {
        return <>{children}</>
    }

    return (
        <>
            {children}{" "}
            <small>
                <i>(site default)</i>
            </small>
        </>
    )
}
