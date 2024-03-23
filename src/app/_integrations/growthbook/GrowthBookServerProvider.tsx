import { PropsWithChildren } from 'react';

import { getServerSideGrowthBook } from './growthbook';
import { env } from '../../../../env.mjs';
import { GrowthBookClientProvider } from './GrowthBookClientProvier';

export async function GrowthBookServerProvider({ children }: PropsWithChildren<{}>) {
	const growthbook = await getServerSideGrowthBook();
	const attributes = growthbook.getAttributes();
	const features = growthbook.getFeatures();

	return (
		<GrowthBookClientProvider
			attributes={attributes}
			features={features}
			enableDevMode={env.VERCEL_ENV === 'development'}
		>
			{children}
		</GrowthBookClientProvider>
	);
}
