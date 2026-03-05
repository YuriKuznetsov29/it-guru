import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../../providers/store-provider/config/config"

export const useAppDispatch = () => useDispatch<AppDispatch>()
