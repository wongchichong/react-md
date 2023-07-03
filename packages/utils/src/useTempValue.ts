import type { ObservableMaybe } from 'voby'
import { $, useEffect } from 'voby'

/**
 * Creates a temporary value that gets reset every `x`ms back to the provided
 * default value. This is useful when doing keyboard searching or other
 * interactions.
 *
 * NOTE: This does not force a re-render when the value changes and instead uses
 * a ref value instead.
 *
 * @typeParam T - the type for the value
 * @param defaultValue - The default value to use. Each time the reset timeout
 * is triggered, this value will be set again.
 * @param resetTime - The amount of time before the value is reset back to the
 * default value
 */
export function useTempValue<T>(
    defaultValue: T,
    resetTime = 500
){
    const value = $(defaultValue)
    const timeout = $<number>()
    const resetValue = () => {
        window.clearTimeout(timeout())
        value(defaultValue)
    }

    useEffect(()=>{
        if(value() != defaultValue){
            // if(timeout()){
            //     window.clearTimeout(timeout())  
            // }    
            timeout(window.setTimeout(resetValue, resetTime))
        }
    })

    return [value, resetValue]
}
