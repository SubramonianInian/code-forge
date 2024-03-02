import { useEffect, useState } from 'react'

const LOCAL_STORAGE_KEY_PREFIX = 'code-forge-'

export default function useLocalStorage<T>(
    key: string,
    initialValue: T | (() => T)
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const storageKey = LOCAL_STORAGE_KEY_PREFIX + key

    const [value, setValue] = useState<T>(() => {
        const storedValue = localStorage.getItem(storageKey)
        return storedValue !== null
            ? JSON.parse(storedValue)
            : typeof initialValue === 'function'
              ? (initialValue as () => T)()
              : initialValue
    })

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value))
    }, [storageKey, value])

    return [value, setValue]
}
