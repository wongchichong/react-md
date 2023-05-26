
/**
 * A small util to check if the badge is considered empty.
 *
 * @internal
 */
export function isEmpty(children: Children, disableNullOnZero: boolean): boolean {
    return (
        !disableNullOnZero &&
        (children === 0 || children === "0" || children === null)
    )
}
