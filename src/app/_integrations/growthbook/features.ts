export type TFFeatures = {
	'upload project': boolean;
	schedule: boolean;
	'tf-projects': boolean;
	'tf-register-projects': boolean;
};

export type TFFeature = keyof TFFeatures;
