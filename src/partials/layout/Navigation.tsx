'use client';

import Link from 'next/link';

import { TbMenu2, TbSchool } from 'react-icons/tb';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const LINKS = [
	{
		href: '/',
		title: 'Начало',
	},
	{
		href: '/projects',
		title: 'Проекти',
	},
	// {
	// 	href: '/apply',
	// 	title: 'Кандидатстване',
	// },
	{
		href: '#schedule',
		title: 'Програма',
	},
	// {
	// 	href: '/projects',
	// 	title: 'Гласуване',
	// },
	// {
	// 	href: '/tuestalks',
	// 	title: 'TUES Talks',
	// },
];

const DESKTOP_LINKS = [
	{
		href: '/about',
		title: 'За училището',
	},
	{
		href: '/apply',
		title: 'Кандидатстване',
	},
	{
		href: '/tuestalks',
		title: 'TUES Talks',
	},
];

const Linky = ({ href, children }: { href: string; children: string }) => {
	// const [selected, setSelected] = useState(false); - would've been used, but it was deemed unnecessary

	return (
		<Link
			href={href}
			className={`mx-8 flex py-2  text-base font-semibold whitespace-nowrap
				text-[#bababa]
			hover:text-white lg:mr-0 lg:inline-flex lg:py-7 lg:px-0`}
		>
			{children}
		</Link>
	);
};

const Navigation = () => {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [desktopOpen, setDesktopOpen] = useState(false);

	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const mobileButtonRef = useRef<HTMLButtonElement>(null);
	const desktopMenuRef = useRef<HTMLDivElement>(null);
	const desktopButtonRef = useRef<HTMLButtonElement>(null);

	const handleScroll = () => {
		const offset = window.scrollY;
		if (offset > 50) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
	}, []);

	//if desktopOpen make mobileOpen false and vice versa
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (mobileOpen && mobileMenuRef.current && mobileButtonRef.current) {
				if (
					!mobileMenuRef.current.contains(event.target as Node) &&
					!mobileButtonRef.current.contains(event.target as Node)
				) {
					setMobileOpen(false);
				}
			}
			if (desktopOpen && desktopMenuRef.current && desktopButtonRef.current) {
				if (
					!desktopMenuRef.current.contains(event.target as Node) &&
					!desktopButtonRef.current.contains(event.target as Node)
				) {
					setDesktopOpen(false);
				}
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [mobileOpen, mobileMenuRef, mobileButtonRef, desktopOpen, desktopMenuRef, desktopButtonRef]);

	let navbarClasses = [
		'header',
		'top-0',
		'left-0',
		'py-2',
		'flex',
		'w-full',
		'items-center',
		'transition',
		'fixed',
		'duration-500',
		...(scrolled
			? ['z-50', 'bg-dark', 'bg-opacity-70', 'shadow-sticky', 'backdrop-blur-lg', 'duration-500']
			: ['bg-transparent', 'z-50']),
	];

	return (
		<>
			<header className={navbarClasses.join(' ')}>
				<div className="container">
					<div className=" flex items-center ">
						<div className="max-w-full px-4 flex justify-start">
							<Link
								href="/"
								className={`header-logo block w-full font-origin text-xl whitespace-nowrap  ${
									scrolled ? ' py-4 lg:py-2' : ' py-5 lg:py-7'
								}`}
							>
								tues{' '}
								<span className="font-origin font-normal bg-gradient text-transparent bg-clip-text ">
									fest
								</span>{' '}
								2023
							</Link>
							<div>
								<ul className="hidden lg:flex">
									{LINKS.map((link) => (
										<li className="w-max group" key={link.title}>
											<Linky href={link.href}>{link.title}</Linky>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div id="countdown" className="flex justify-center w-full pl-8">
							<h1>00:00:00:00</h1>
						</div>
						<div className="flex w-full items-center justify-between px-4">
							<div>
								<button
									onClick={() => {
										setMobileOpen(!mobileOpen);
										setDesktopOpen(false);
									}}
									id="navbarToggler"
									name="navbarToggler"
									ref={mobileButtonRef}
									className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-3 ring-primary focus:ring-2 sm:hidden"
								>
									<TbMenu2 size={32} />
								</button>
								<nav
									id="navbarCollapse"
									ref={mobileMenuRef}
									className={
										`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-bg-color shadow-lg py-3 lg:py-0 lg:px-4 lg:shadow-none xl:px-6` +
										(mobileOpen ? ' block' : ' hidden')
									}
								>
									<ul className="block">
										{LINKS.map((link) => (
											<li
												className="group relative"
												onClick={() => setMobileOpen(false)}
												key={link.title}
											>
												<Linky href={link.href}>{link.title}</Linky>
											</li>
										))}
										<li className="sm:hidden group relative" onClick={() => setMobileOpen(false)}>
											<Linky href="/about">За ТУЕС</Linky>
										</li>
									</ul>
								</nav>
							</div>
							<div className="hidden justify-end pr-16 sm:flex ">
								<button
									onClick={() => {
										setDesktopOpen(!desktopOpen);
										setMobileOpen(false);
									}}
									className="flex items-center justify-center rounded-md border-2 border-white py-3 px-6 text-base font-semibold text-white transition duration-300 ease-in-out hover:border-primary hover:bg-primary"
								>
									ТУЕС
									<span className="pl-2">
										<TbSchool size={24} />
									</span>
								</button>
								<nav
									id="navbarCollapse"
									ref={desktopMenuRef}
									className={
										`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-bg-color shadow-lg py-3` +
										(desktopOpen ? 'block' : ' hidden')
									}
								>
									<ul className="block">
										{DESKTOP_LINKS.map((link) => (
											<li
												className="group relative"
												onClick={() => setMobileOpen(false)}
												key={link.title}
											>
												<Linky href={link.href}>{link.title}</Linky>
											</li>
										))}
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Navigation;
