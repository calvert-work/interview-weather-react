import { createContext } from "react";
import type { TAppContextType } from "./AppContextType.types";

export const AppContext = createContext<TAppContextType>({
	toastMsg: undefined,
	setToastMsg: () => null
});
