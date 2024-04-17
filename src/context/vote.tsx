'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import CATEGORY from '@/constants/projects/CATEGORY';
import { saveVote } from '@/server/vote/actions';
import { encodeBitmap, projectIdsToMapString, projectMapStringToIds } from '@/utils/vote-projects-map';

export interface Vote {
	id: number;
	name: string;
	image?: string; // not sure if we need this
	category?: string;
}

const VoteContext = createContext(
	{} as {
		addVote: (category: string, id: number, name: string, image?: string) => void;
		addInfo: (name: string, email: string) => void;
		removeVote: (category: string) => void;
		getVotes: () => {
			software: Vote | null;
			embedded: Vote | null;
			battlebot: Vote | null;
			networks: Vote | null;
		};
		anyVotes: () => boolean;
		getErrors: () => {
			softwareError: boolean;
			embeddedError: boolean;
			battlebotError: boolean;
			networksError: boolean;
			emailError: boolean;
			nameError: boolean;
			votingError: string;
		};
		validateVote: () => boolean;
		validateInfo: () => boolean;
		validateGivenInfo: (name: string, email: string) => boolean;
		submitVote: () => Promise<boolean>;
	}
);

const { Provider } = VoteContext;

const VoteProvider = ({ children }: { children: React.ReactNode }) => {
	const [software, setSoftware] = useState<Vote | null>(null);
	const [embedded, setEmbedded] = useState<Vote | null>(null);
	const [battlebot, setBattlebot] = useState<Vote | null>(null);
	const [networks, setNetworks] = useState<Vote | null>(null);

	const [softwareError, setSoftwareError] = useState(false);
	const [embeddedError, setEmbeddedError] = useState(false);
	const [battlebotError, setBattlebotError] = useState(false);
	const [networksError, setNetworksError] = useState(false);

	const [email, setEmail] = useState('');
	const [name, setName] = useState('');

	const [emailError, setEmailError] = useState(false);
	const [nameError, setNameError] = useState(false);

	const [votingError, setVotingError] = useState('');

	const addVote = (category: string, id: number, name: string, image?: string) => {
		const value = { id, name, image, category };

		switch (category) {
			case CATEGORY.software:
				setSoftware(value);
				setSoftwareError(false);
				break;
			case CATEGORY.embedded:
				setEmbedded(value);
				setEmbeddedError(false);
				break;
			case CATEGORY.battlebot:
				setBattlebot(value);
				setBattlebotError(false);
				break;
			case CATEGORY.networks:
				setNetworks(value);
				setNetworksError(false);
				break;
			default:
				break;
		}
	};

	const addInfo = (name: string, email: string) => {
		setName(name);
		setEmail(email);
	};

	const removeVote = (category: string) => {
		switch (category) {
			case CATEGORY.software:
				setSoftware(null);
				break;
			case CATEGORY.embedded:
				setEmbedded(null);
				break;
			case CATEGORY.battlebot:
				setBattlebot(null);
				break;
			case CATEGORY.networks:
				setNetworks(null);
				break;
			default:
				break;
		}
	};

	const getVotes = () => {
		return {
			software,
			embedded,
			battlebot,
			networks,
		};
	};

	const getErrors = () => {
		return {
			softwareError,
			embeddedError,
			battlebotError,
			networksError,
			emailError,
			nameError,
			votingError,
		};
	};

	const anyVotes = () => {
		return software !== null || embedded !== null || battlebot !== null || networks !== null;
	};

	const validateVote = () => {
		setSoftwareError(software === null);
		setEmbeddedError(embedded === null);
		setBattlebotError(battlebot === null);
		setNetworksError(networks === null);

		return !!(software && embedded && battlebot && networks);
	};

	const validateInfo = () => {
		setEmailError(email === '');
		setNameError(name === '');

		const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

		if (emailRegex.test(email) && name !== '') {
			return true;
		} else {
			return false;
		}
	};

	const validateGivenInfo = (name: string, email: string) => {
		setEmailError(email === '');
		setNameError(name === '');

		const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

		if (emailRegex.test(email) && name !== '') {
			return true;
		} else {
			return false;
		}
	};

	const submitVote = async () => {
		if (validateVote() && validateInfo()) {
			const response = await saveVote({
				email,
				name,
				pm: encodeBitmap(
					BigInt(projectIdsToMapString([software!.id, embedded!.id, battlebot!.id, networks!.id]))
				),
				cf: '',
				isSpam: false,
			}).catch((e) => {
				return {
					success: false,
					error: 'Нещо се обърка при гласуването. Моля, опитайте по-късно.',
				} as const;
			});
			if (!response.success) {
				setVotingError(response.error);
			}
			return response.success;
		} else {
			setVotingError('Моля попълнете всички полета');
			return false;
		}
	};

	useEffect(() => {
		console.warn(softwareError, embeddedError, battlebotError, networksError);
	}, [softwareError, embeddedError, battlebotError, networksError]);

	// save to local storage on change
	useMemo(() => {
		if (!anyVotes()) return; // TODO: Fix this, for removing last vote

		localStorage?.setItem(CATEGORY.software, JSON.stringify(software));
		localStorage?.setItem(CATEGORY.embedded, JSON.stringify(embedded));
		localStorage?.setItem(CATEGORY.battlebot, JSON.stringify(battlebot));
		localStorage?.setItem(CATEGORY.networks, JSON.stringify(networks));
	}, [software, embedded, battlebot, networks]);

	// load from local storage on mount
	useEffect(() => {
		const software = localStorage?.getItem(CATEGORY.software);
		const embedded = localStorage?.getItem(CATEGORY.embedded);
		const battlebot = localStorage?.getItem(CATEGORY.battlebot);
		const networks = localStorage?.getItem(CATEGORY.networks);

		console.log('LOADED FROM LOCAL STORAGE');
		console.log(software);
		console.log(embedded);
		console.log(battlebot);
		console.log(networks);

		if (software) setSoftware(JSON.parse(software));
		if (embedded) setEmbedded(JSON.parse(embedded));
		if (battlebot) setBattlebot(JSON.parse(battlebot));
		if (networks) setNetworks(JSON.parse(networks));
	}, []);

	useEffect(() => {
		console.log({
			software,
			embedded,
			battlebot,
			networks,
		});
	}, [software, embedded, battlebot, networks]);

	return (
		<Provider
			value={{
				addVote,
				addInfo,
				removeVote,
				getVotes,
				getErrors,
				anyVotes,
				validateVote,
				validateInfo,
				validateGivenInfo,
				submitVote,
			}}
		>
			{children}
		</Provider>
	);
};

export const useVoteContext = () => useContext(VoteContext);
export default VoteProvider;
