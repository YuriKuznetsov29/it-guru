import { Provider } from "react-redux"
import type { StateSchema } from "../config/state-schema"
import { createReduxStore } from "../config/config"
import type { ReactNode } from "react"

interface StoreProviderProps {
    children?: ReactNode
    initialState?: StateSchema
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState } = props

    const store = createReduxStore(initialState)

    return <Provider store={store}>{children}</Provider>
}
