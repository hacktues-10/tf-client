const TUESTalksPage = () => (
	<div className="relative flex min-h-screen items-center justify-center !pt-28">
		<div className="relative flex h-full w-full items-center justify-center">
			<iframe
				id="embedPlayer"
				src="https://embed.podcasts.apple.com/us/podcast/tues-talks/id1589981184?itsct=podcast_box_player&amp;itscg=30200&amp;ls=1&amp;theme=dark"
				height="450px"
				sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
				allow="autoplay *; encrypted-media *; clipboard-write"
				className="border border-stroke"
				style={{
					width: '100%',
					maxWidth: '660px',
					overflow: 'hidden',
					borderRadius: '15px',
					animation: '2s ease 0s 6 normal none running loading-indicator',
					backgroundColor: 'rgb(228, 228, 228)',
				}}
			></iframe>
		</div>
	</div>
);

export default TUESTalksPage;
