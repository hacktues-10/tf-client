import { GrowthBook } from '@growthbook/growthbook';

import { TFFeatures } from './features';
import { env } from '../../../env.mjs';

export const getServerSideGrowthBook = async (id?: string) => {
	const growthbook = new GrowthBook<TFFeatures>({
		apiHost: env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
		clientKey: env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
		enableDevMode: env.VERCEL_ENV === 'development',
		attributes: {
			id,
		},
	});
	const { features } = await fetch(
		`${env.NEXT_PUBLIC_GROWTHBOOK_API_HOST}/api/features/${env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY}`,
		{
			cache: 'no-store',
		}
	).then((res) => res.json());
	growthbook.setFeatures(features);
	return growthbook;
};
