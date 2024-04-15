import CATEGORY from '@/constants/projects/CATEGORY';

const CATEGORY_MAP = Object.entries(CATEGORY).reduce(
	(acc, [key, value]) => ({
		...acc,
		[key]: {
			text: value,
			href: `/projects/category/${key.toLowerCase()}`,
			category: key,
		},
	}),
	{} as { [key in keyof typeof CATEGORY]: { text: string; href: string; category: key } }
);

export type CategoryMapValue = (typeof CATEGORY_MAP)[keyof typeof CATEGORY_MAP];

export default CATEGORY_MAP;
