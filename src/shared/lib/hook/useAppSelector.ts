import { useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import type { StateSchema } from "../../../providers/store-provider/config/state-schema"

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector
