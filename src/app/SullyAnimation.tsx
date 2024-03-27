import SullyGravity from './SullyGravity';
import './animation.css';
export default function SullyAnimation() {
	return (
		<div className="absolute left-0 top-0 h-screen w-screen overflow-hidden">
			<SullyGravity className="image absolute z-0 h-[20%]" />{' '}
		</div>
	);
}
