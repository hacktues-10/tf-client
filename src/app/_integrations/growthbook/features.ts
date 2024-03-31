export type TFFeatures = {
	'upload project': boolean;
	schedule: boolean;
	'tf-projects': boolean;
	'tf-register-projects': boolean;
	'tf-edit-projects': boolean;
};

export type TFFeature = keyof TFFeatures;
