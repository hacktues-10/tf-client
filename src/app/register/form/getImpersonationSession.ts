import { getSession } from '@/app/api/auth/session';

export async function getImpersonationSession() {
	// return {
	// 	user: {
	// 		email: 'ТОВА НЕ ТРЯБВА ДА СЕ ИЗПЪЛНИ!!!',
	// 	},
	// };
	return getSession();
}