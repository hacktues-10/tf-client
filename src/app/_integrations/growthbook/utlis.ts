import { useFeatureIsOn } from '@growthbook/growthbook-react';

import { TFFeatures } from './features';

type UseTFFeaturesIsOn = typeof useFeatureIsOn<TFFeatures>;
export const UseTFFeaturesIsOn: UseTFFeaturesIsOn = useFeatureIsOn;
