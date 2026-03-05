import { Provider } from "react-redux"
import type { StateSchema } from "../config/state-schema"
import { createReduxStore } from "../config/config"
import type { PreloadedState } from "redux"
import type { ReactNode } from "react"

interface StoreProviderProps {
    children?: ReactNode
    initialState?: PreloadedState<StateSchema>
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState } = props

    const store = createReduxStore(initialState)

    return <Provider store={store}>{children}</Provider>
}
