import type { StateSchema } from "@/providers/store-provider/config/state-schema";

export const getAuthStore = (store: StateSchema) => store.auth;
