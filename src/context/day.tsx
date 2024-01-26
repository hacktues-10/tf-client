'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { number } from 'zod';

interface DayContextProps {
	day: number;
	setDay: (day: number) => void;
}

const DayContext = createContext<DayContextProps>({
	day: 1,
	setDay: () => {},
});
export function DayProvider({ children }: { children: ReactNode }) {
	try {
		const [day, setDay] = useState(localStorage.getItem('day') ? parseInt(localStorage.getItem('day')!) : 1);

		useEffect(() => {
			try {
				const dayLocal = localStorage.getItem('day');
				if (dayLocal) {
					setDay(parseInt(dayLocal));
				}
			} catch (e) {
				setDay(1);
			}
		}, [day]);

		return <DayContext.Provider value={{ day, setDay }}>{children}</DayContext.Provider>;
	} catch (e) {
		const [day, setDay] = useState(1);

		return <DayContext.Provider value={{ day, setDay }}>{children}</DayContext.Provider>;
	}
}

export function useDay() {
	const context = useContext(DayContext);
	if (context === undefined) {
		throw new Error('useDay must be used within a DayProvider');
	}
	return context;
}
