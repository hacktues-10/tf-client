'use client';

import { useEffect, useState } from 'react';
import { IfFeatureEnabled, useGrowthBook } from '@growthbook/growthbook-react';

import { TFFeature } from './features';

export function IfTfFeatureOn(props: { feature: TFFeature; children: React.ReactNode }) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	return <IfFeatureEnabled feature={props.feature}>{props.children}</IfFeatureEnabled>;
}
export function IfTfFeatureOff(props: { feature: TFFeature; children: React.ReactNode }) {
	const gb = useGrowthBook();
	return gb?.isOff(props.feature) ? <>{props.children}</> : <></>;
}
