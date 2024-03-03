'use client';

import { Session } from 'inspector';

import { PropsWithChildren } from 'react';
import { useSession } from 'next-auth/react';

export function IfHTSession({ children }: PropsWithChildren, clientsession: Session) {
	const { data: session } = useSession();
	return session ? <>{children || null}</> : null;
}

export function IfNotHTSession({ children }: PropsWithChildren<{}>) {
	const { data: session } = useSession();
	return session ? null : <>{children || null}</>;
}
