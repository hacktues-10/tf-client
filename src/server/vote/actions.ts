'use server';

import { z } from 'zod';

const submitVoteSchema = z.object({
	email: z.string().email(),
	name: z.string().trim(),
	pm: z.string().trim(),
	cf: z.string().trim(),
	isSpam: z.literal(false),
});
export async function saveVote(data: z.infer<typeof submitVoteSchema>) {
	return {
		success: false,
	};
}
