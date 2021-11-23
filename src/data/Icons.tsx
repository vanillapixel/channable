export const SearchIcon = (props: any) => (
	<svg
		{...props}
		id="search-icon"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			fill="none"
			stroke="#000"
			stroke-width="1.1"
			cx="9"
			cy="9"
			r="7"
		></circle>
		<path
			fill="none"
			stroke="#000"
			stroke-width="1.1"
			d="M14,14 L18,18 L14,14 Z"
		></path>
	</svg>
);

export const CloseIcon = (props: any) => {
	return (
		<svg
			{...props}
			id="close-icon"
			width="20"
			height="20"
			viewBox="0 0 20 20"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill="none"
				stroke="#000"
				stroke-width="1.06"
				d="M16,16 L4,4"
			></path>
			<path
				fill="none"
				stroke="#000"
				stroke-width="1.06"
				d="M16,4 L4,16"
			></path>
		</svg>
	);
};

export const StarIcon = (props: any) => (
	<svg
		{...props}
		id="star-icon"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<polygon
			fill="none"
			stroke="#000"
			stroke-width="1.01"
			points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27"
		></polygon>
	</svg>
);
