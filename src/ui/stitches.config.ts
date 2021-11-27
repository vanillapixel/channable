import { createStitches, globalCss, PropertyValue } from "@stitches/react";

interface GridTemplate {
	columns: PropertyValue<"gridTemplateColumns">;
	rows: PropertyValue<"gridTemplateRows">;
}

export const { styled } = createStitches({
	theme: {
		colors: {
			color1: "hsl(206deg 23% 94%)",
			color2: "hsl(252deg 12% 17%)",
			gray25: "hsl(0deg 0% 25%)",
			gray50: "hsl(0deg 0% 50%)",
			gray75: "hsl(0deg 0% 75%)",
			white: "hsl(0deg 0% 100%)",
			accentColor1: "hsl(0deg 88% 66%)",
		},
		fontSizes: {
			small: "1.2rem",
			medium: "1.6rem",
			large: "2rem",
		},
		space: {
			none: "0",
			small: ".5rem",
			medium: "1rem",
			large: "2rem",
		},
		shadows: {
			none: "none",
			neumorph:
				"-3px -3px 7px hsla(0deg, 0%, 100%, 1), 3px 3px 5px hsla(240deg, 0%, 80%, 1)",
		},
		sizes: {
			auto: "auto",
			"100%": "100%",
		},
	},
});

export const globalStyle = globalCss({
	"*": {
		margin: 0,
		padding: 0,
		boxSizing: "border-box",
		position: "relative",
		fontSize: "$small",
		lineHeight: "1",
	},
});

export const Grid = styled("div", {
	display: "grid",
});

export const Box = styled("div", {
	borderRadius: "10px",
	boxShadow: "$neumorph",
	padding: "2rem",
	transition: ".3s",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	gap: ".5rem",
	variants: {
		size: {
			small: {
				fontSize: "$small",
				margin: "$small",
				padding: "$small",
				gap: "$small",
			},
			medium: {
				fontSize: "$medium",
				margin: "$medium",
				padding: "$medium",
				gap: "$medium",
			},
			large: {
				fontSize: "$large",
				margin: "$large",
				padding: "$large",
				gap: "$large",
			},
		},
		gap: {
			none: { gap: "$none" },
		},
		boxShadow: {
			none: {
				boxShadow: "$none",
			},
		},
		justifyContent: {
			center: {
				justifyContent: "center",
			},
			flexStart: {
				justifyContent: "flex-start",
			},
			flexEnd: {
				justifyContent: "flex-end",
			},
			spaceBetween: {
				justifyContent: "space-between",
			},
		},
		alignItems: {
			center: {
				alignItems: "center",
			},
			start: {
				alignItems: "start",
			},
			end: {
				alignItems: "end",
			},
		},
		flexDirection: {
			row: { flexDirection: "row" },
		},
		fontSize: {
			small: { fontSize: "$small" },
			medium: { fontSize: "$medium" },
			large: { fontSize: "$large" },
		},
		padding: {
			none: { padding: "$none" },
			small: { padding: "$small" },
			medium: { padding: "$medium" },
			large: { padding: "$large" },
		},
		margin: {
			none: { margin: "$none" },
			small: { margin: "$small" },
			medium: { margin: "$medium" },
			large: { margin: "$large" },
		},
		isActive: {
			false: {
				backgroundColor: "$color1",
				color: "$color2",
			},
			true: {
				backgroundColor: "$accentColor1",
				color: "$color1",
			},
		},
		overflow: {
			hidden: {
				overflow: "hidden",
			},
		},
	},
});

export const FlatBox = styled(Box, {
	width: "100%",
	boxShadow: "$none",
	padding: "$none",
	margin: "$none",
	variants: {
		width: {
			auto: { width: "auto" },
		},
		inputField: {
			true: {
				backgroundColor: "$white",
				gap: "none",
				overflow: "hidden",
				flexDirection: "row",
			},
		},
	},
});

export const Button = styled(Box, {
	cursor: "pointer",
	padding: "$medium",
	"&:hover": {
		backgroundColor: "$accentColor1",
		color: "$color1",
	},
	variants: {
		isClickable: {
			false: {
				stroke: "$gray50",
				boxShadow: "none",
			},
		},
		enabled: {
			true: {
				stroke: "$gray50",
				boxShadow: "none",
				"&:hover": {
					backgroundColor: "$accentColor1",
					stroke: "$color1",
				},
			},
			false: {
				true: {
					cursor: "no-drop",
					stroke: "$gray25",
					boxShadow: "none",
					"&:hover": {
						backgroundColor: "$transparent",
						stroke: "$color1",
					},
				},
			},
		},
		icon: {
			true: {
				stroke: "$gray50",
				boxShadow: "none",
				padding: "$small",
				"&:hover": {
					backgroundColor: "$transparent",

					stroke: "$accentColor1",
				},
			},
		},
	},
});
export const Tab = styled(FlatBox, {
	padding: "$medium",
	backgroundColor: "$accentColor1",
	color: "$color1",
	variants: {
		gray: { true: { backgroundColor: "$gray50" } },
	},
});

export const Label = styled("label", {
	padding: "$medium",
	backgroundColor: "$gray50",
	color: "$color1",
	borderRadius: "10px 0px 0px 10px",
	whiteSpace: "nowrap",
	variants: {
		accent: { true: { backgroundColor: "$accentColor1" } },
	},
});

export const Icon = styled(FlatBox, {
	width: "auto",
});
export const Image = styled("img", {
	margin: "$none",
	width: "100%",
});

export const ImageContainer = styled("div", {
	margin: "$none",
	width: "100%",
	variants: {
		small: { true: { width: "24px" } },
		medium: { true: { width: "36px" } },
		large: { true: { width: "48px" } },
	},
});

export const Text = styled("p", {
	color: "$color2",
	fontSize: "$medium",
	variants: {
		title: {
			true: {
				fontSize: "$large",
				color: "$accentColor1",
			},
		},
		color: {
			white: {
				color: "$color1",
			},
		},
		fontSize: {
			small: { fontSize: "$small" },
			medium: { fontSize: "$medium" },
			large: { fontSize: "$large" },
		},
		padding: {
			small: { padding: "$small" },
			medium: { padding: "$medium" },
			large: { padding: "$large" },
		},
		margin: {
			small: { margin: "$small" },
			medium: { margin: "$medium" },
			large: { margin: "$large" },
		},
	},
});
