import { useFeatureIsOn } from '@growthbook/growthbook-react';

import { TFFeatures } from './features';

type UseTFFeatureIsOn = typeof useFeatureIsOn<TFFeatures>;
export const useTFFeatureIsOn: UseTFFeatureIsOn = useFeatureIsOn;
