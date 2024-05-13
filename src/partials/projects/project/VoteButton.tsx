'use client';

import { IfTfFeatureOn } from '@/app/_integrations/growthbook/components';
import { Button } from '@/components/ui/button';
import { useVoteContext } from '@/context/vote';

const VoteButton = ({
	id,
	name,
	thumbnail,
	category,
}: {
	id: number;
	name: string;
	thumbnail: string;
	category: string;
}) => {
	const { getVotes, addVote, removeVote } = useVoteContext();

	const vote = Object.values(getVotes()).find((v) => v?.id === id);

	const handleVote = () => {
		void addVote(category, id, name, thumbnail);
	};

	const handleUnvote = () => {
		if (!vote?.category) return;
		void removeVote(vote.category);
	};

	const handleClick = () => {
		if (vote) {
			handleUnvote();
		} else {
			handleVote();
		}
	};

	return (
		<IfTfFeatureOn feature="tf-vote-projects">
			<Button className="bg-sand text-black" onClick={handleClick} size="lg">
				{!vote ? 'Гласувай' : 'Премахни глас'}
			</Button>
		</IfTfFeatureOn>
	);
};

export default VoteButton;
