import { getSession } from './session';

export const IfHTSession = async ({ children }: React.PropsWithChildren) => {
	const session = await getSession();
	return session ? <>{children}</> : null;
};

export const IfNotHTSession = async ({ children }: React.PropsWithChildren) => {
	const session = await getSession();
	return session ? null : <>{children}</>;
};
