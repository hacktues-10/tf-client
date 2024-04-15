const TUESTalksPage = () => (
	<div className="relative flex min-h-screen items-center justify-center !pt-28">
		<div className="relative flex h-full w-full items-center justify-center">
			<iframe
				className=" w-[90%] max-w-[660px] overflow-hidden rounded-xl sm:w-[40%] "
				src="https://open.spotify.com/embed/show/2HGIZmqHAFtNwfXOrlTu7v?utm_source=generator"
				height="352"
				style={{
					animation: '2s ease 0s 6 normal none running loading-indicator',
				}}
				sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
				allow="autoplay *; encrypted-media *; clipboard-write"
				frameBorder="0"
				loading="lazy"
			></iframe>
		</div>
	</div>
);

export default TUESTalksPage;
