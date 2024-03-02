export type TFFeatures = {
	'upload project': boolean;
	schedule: boolean;
	'tf-projects': boolean;
	login: boolean;
};

export type TFFeature = keyof TFFeatures;
