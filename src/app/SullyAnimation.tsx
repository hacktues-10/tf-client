import SullyHeader from './SullyHeader';
import './animation.css';
export default function SullyAnimation() {
	return (
		<div className="header fixed w-full h-screen">
			<SullyHeader className="z-0 image h-[20%] absolute" />{' '}
		</div>
	);
}
