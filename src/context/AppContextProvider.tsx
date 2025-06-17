import { useState } from 'react';
import type { TAppContextType, TToast } from './AppContextType.types';
import { AppContext } from './AppContext';

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [toastMsg, setToastMsg] = useState<TToast | undefined>(undefined)

	const value: TAppContextType = {
		toastMsg,
		setToastMsg
	};

	return (
		<AppContext.Provider value={value}>
			{children}
		</AppContext.Provider>
	);
};
