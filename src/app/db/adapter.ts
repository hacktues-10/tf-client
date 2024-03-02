import { and, eq } from 'drizzle-orm';
import { AuthOptions } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';

import { accounts, sessions, users, verificationTokens, type DrizzleClient } from './schema';

type Adapter = AuthOptions['adapter'];

function generateUniqueID() {
	return uuidv4();
}

async function getSessionFromDB({ client, sessionToken }: { client: DrizzleClient; sessionToken: string }) {
	const res = (await client.select().from(sessions).where(eq(sessions.sessionToken, sessionToken)))[0];

	if (res) {
		return {
			sessionToken: res.sessionToken,
			userId: res.userId.toString(),
			expires: res.expires,
		};
	}
	return null;
}

export function DrizzleAdapter(client: DrizzleClient): Adapter {
	return {
		async createUser(user) {
			const res = (await client.insert(users).values(user).returning())[0];

			return {
				...res,
				id: res.id.toString(),
			};
		},

		async getUser(id) {
			const res =
				(
					await client
						.select()
						.from(users)
						.where(eq(users.id, parseInt(id)))
				)[0] ?? null;
			return res !== null
				? {
						...res,
						id: res.id.toString(),
				  }
				: null;
		},

		async getUserByEmail(email) {
			const res = (await client.select().from(users).where(eq(users.email, email)))[0];
			if (res) {
				return {
					...res,
					id: res.id.toString(),
				};
			} else {
				return null;
			}
		},

		async getUserByAccount({ providerAccountId, provider }) {
			const res = (
				await client
					.select()
					.from(users)
					.where(
						and(eq(accounts.providerAccountId, String(providerAccountId)), eq(accounts.provider, provider))
					)
			)[0];
			return {
				...res,
				id: res.id.toString(),
			};
		},

		async updateUser(user) {
			const res = (
				await client
					.update(users)
					.set({ ...user, id: parseInt(user.id) })
					.where(eq(users.id, parseInt(user.id)))
					.returning()
			)[0];
			return {
				...res,
				id: res.id.toString(),
			};
		},

		async deleteUser(userId) {
			const res = (
				await client
					.delete(users)
					.where(eq(users.id, parseInt(userId)))
					.returning()
			)[0];
			return { ...res, id: res.id.toString() };
		},

		async linkAccount(rawAccount) {
			await client
				.insert(accounts)
				.values({ ...rawAccount, id: generateUniqueID() })
				.returning();
		},

		async unlinkAccount({ providerAccountId, provider }) {
			await client
				.delete(accounts)
				.where(and(eq(accounts.provider, provider), eq(accounts.providerAccountId, providerAccountId)));
		},

		async createSession({ sessionToken, userId, expires }) {
			const newUserId = parseInt(userId);

			await client.insert(sessions).values({
				id: generateUniqueID(),
				sessionToken,
				userId: newUserId,
				expires,
			});

			return {
				sessionToken,
				userId,
				expires,
			};
		},

		async getSessionAndUser(sessionToken) {
			const session = await getSessionFromDB({ client, sessionToken });

			if (session) {
				const rawUser =
					(
						await client
							.select()
							.from(users)
							.where(eq(users.id, parseInt(session.userId)))
					)[0] ?? null;

				if (rawUser) {
					const user = {
						id: rawUser.id.toString(),
						email: rawUser.email,
						emailVerified: rawUser.emailVerified,
					};

					return { session: session, user: user };
				}
			}
			return null;
		},

		async updateSession({ sessionToken }) {
			const res =
				(
					await client
						.update(sessions)
						.set({ sessionToken: sessionToken })
						.where(eq(sessions.sessionToken, sessionToken))
						.returning()
				)[0] ?? null;

			if (res) {
				return {
					...res,
					userId: res.userId.toString(),
				};
			}
			return null;
		},

		async deleteSession(sessionToken) {
			await client.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
		},

		async createVerificationToken(newVerificationToken) {
			// HACK: next-auth issues tokens that expire immediately, so we add 24
			//hours to the expiration date until we figure out why that is (XXX:) (FIXME:)
			newVerificationToken.expires.setHours(newVerificationToken.expires.getHours() + 24);

			return (
				(
					await client
						.insert(verificationTokens)
						.values({ ...newVerificationToken })
						.returning()
				)[0] ?? null
			);
		},

		async useVerificationToken({ identifier, token }) {
			return (
				(
					await client
						.delete(verificationTokens)
						.where(and(eq(verificationTokens.identifier, identifier), eq(verificationTokens.token, token)))
						.returning()
				)[0] ?? null
			);
		},
	};
}
