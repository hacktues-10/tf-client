import SullyGravity from './SullyGravity';
import './animation.css';
export default function SullyAnimation() {
	return (
		<div className="absolute top-0 left-0 w-screen h-screen overflow-hidden">
			<SullyGravity className="z-0 image h-[20%] absolute" />{' '}
		</div>
	);
}
