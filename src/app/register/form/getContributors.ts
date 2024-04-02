import { z } from 'zod';

export function getContributors(projectSubmission: { contributors: string }) {
	return projectSubmission.contributors.split('\n').map((line: string) => {
		const [firstName, lastName, gradeParallel, tShirt, email, phoneNumber] = line.split(';');
		const gradeUnvalidated = gradeParallel.slice(0, -1);
		const parallelUnvalidated = gradeParallel.slice(-1);
		const grade = z.union([z.enum(['8', '9', '10', '11', '12']), z.undefined()]).parse(gradeUnvalidated);
		const parallel = z.union([z.enum(['А', 'Б', 'В', 'Г']), z.undefined()]).parse(parallelUnvalidated);
		const tshirt = z.union([z.enum(['S', 'M', 'L', 'XL', 'XXL']), z.undefined()]).parse(tShirt);
		return { firstName, lastName, grade, parallel, tshirt, email, phoneNumber: phoneNumber.slice(1) };
	});
}