'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

function getItem() {
	try {
		const dayLocal = localStorage.getItem('day');
		if (dayLocal) {
			return parseInt(dayLocal);
		}
		return 1;
	} catch (e) {
		return 1;
	}
}

interface DayContextProps {
	day: number;
	setDay: (day: number) => void;
}

const DayContext = createContext<DayContextProps>({
	day: 1,
	setDay: () => {},
});
export function DayProvider({ children }: { children: ReactNode }) {
	const [day, setDay] = useState(getItem());

	useEffect(() => {
		const dayLocal = getItem();
		if (dayLocal) {
			setDay(dayLocal);
		}
	}, [day]);

	return <DayContext.Provider value={{ day, setDay }}>{children}</DayContext.Provider>;
}

export function useDay() {
	const context = useContext(DayContext);
	if (context === undefined) {
		throw new Error('useDay must be used within a DayProvider');
	}
	return context;
}
