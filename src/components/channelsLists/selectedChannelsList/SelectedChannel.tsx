import {
	Box,
	FlatBox,
	Text,
	Image,
	ImageContainer,
	Button,
} from "../../../ui/stitches.config";

import { CloseIcon } from "../../../ui/Icons";

interface SelectedChannelProps {
	channelLabel: string;
	removeSelected: Function;
}

export const SelectedChannel = ({
	channelLabel,
	removeSelected,
}: SelectedChannelProps) => {
	return (
		<Box
			fadeInVertical
			justifyContent="spaceBetween"
			flexDirection="row"
			margin="small"
			css={{ width: "90%" }}
			key={channelLabel}
		>
			<FlatBox flexDirection="row" justifyContent="flexStart">
				<ImageContainer small>
					<Image src="../imgs/logo-mini.png" alt="" />
				</ImageContainer>
				<Text fontSize="medium">{channelLabel}</Text>
			</FlatBox>
			<Button padding="small" icon onClick={() => removeSelected(channelLabel)}>
				<CloseIcon />
			</Button>
		</Box>
	);
};
