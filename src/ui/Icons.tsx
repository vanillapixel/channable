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
			stroke="inherit"
			strokeWidth="1.1"
			cx="9"
			cy="9"
			r="7"
		></circle>
		<path
			fill="none"
			stroke="inherit"
			strokeWidth="1.1"
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
				stroke="inherit"
				strokeWidth="1.06"
				d="M16,16 L4,4"
			></path>
			<path
				fill="none"
				stroke="inherit"
				strokeWidth="1.06"
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
			stroke="inherit"
			strokeWidth="1.01"
			points="10 2 12.63 7.27 18.5 8.12 14.25 12.22 15.25 18 10 15.27 4.75 18 5.75 12.22 1.5 8.12 7.37 7.27"
		></polygon>
	</svg>
);

export const PreviousIcon = (props: any) => (
	<svg
		{...props}
		id="previous-icon"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<polyline
			fill="none"
			stroke="inherit"
			strokeWidth="1.03"
			points="13 16 7 10 13 4"
		></polyline>
	</svg>
);

export const NextIcon = (props: any) => (
	<svg
		{...props}
		id="next-icon"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<polyline
			fill="none"
			stroke="inherit"
			strokeWidth="1.03"
			points="7 4 13 10 7 16"
		></polyline>
	</svg>
);

export const DoublePreviousIcon = (props: any) => (
	<svg
		{...props}
		id="double-forward-icon"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<polyline
			fill="none"
			stroke="inherit"
			strokeWidth="1.03"
			points="10 14 6 10 10 6"
		></polyline>
		<polyline
			fill="none"
			stroke="inherit"
			strokeWidth="1.03"
			points="14 14 10 10 14 6"
		></polyline>
	</svg>
);

export const DoubleNextIcon = (props: any) => (
	<svg
		{...props}
		id="double-next-icon"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<polyline
			fill="none"
			stroke="inherit"
			strokeWidth="1.03"
			points="10 6 14 10 10 14"
		></polyline>
		<polyline
			fill="none"
			stroke="inherit"
			strokeWidth="1.03"
			points="6 6 10 10 6 14"
		></polyline>
	</svg>
);

export const CheckIcon = (props: any) => (
	<svg
		{...props}
		id="check-icon"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<polyline
			fill="none"
			stroke="inherit"
			strokeWidth="1.1"
			points="4,10 8,15 17,4"
		></polyline>
	</svg>
);
