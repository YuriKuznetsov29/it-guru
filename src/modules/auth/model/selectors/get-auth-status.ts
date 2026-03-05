import type { StateSchema } from "../../../../providers/store-provider/config/state-schema"

export const getAuthStatus = (store: StateSchema) => store.auth?.isAuth
