import { useCallback, useRef, type RefObject } from "react"

export function useDebounce(callback: (...args: unknown[]) => void, delay: number) {
    const timer = useRef(false) as RefObject<any>

    return useCallback(
        (...args: unknown[]) => {
            if (timer.current) {
                clearTimeout(timer.current)
            }

            timer.current = setTimeout(() => {
                callback(...args)
            }, delay)
        },
        [callback, delay],
    )
}
