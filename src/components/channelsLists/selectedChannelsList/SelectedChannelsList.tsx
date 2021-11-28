import { useMemo, useCallback } from "react";

import {
	Box,
	FlatBox,
	Text,
	Image,
	ImageContainer,
	Button,
	Tab,
} from "../../../ui/stitches.config";

import { CloseIcon } from "../../../ui/Icons";

interface SelectedListProps {
	selectedChannels: string[];
	setSelectedChannels: Function;
}

export const SelectedChannelsList = ({
	selectedChannels,
	setSelectedChannels,
}: SelectedListProps) => {
	const removeSelected = useCallback(
		(channelLabel) => {
			setSelectedChannels(
				[...selectedChannels].filter((label) => label !== channelLabel)
			);
		},
		[selectedChannels, setSelectedChannels]
	);

	const selectedChannelCards = useMemo(() => {
		return selectedChannels.map((channelLabel) => (
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
				<Button
					padding="small"
					icon
					onClick={() => removeSelected(channelLabel)}
				>
					<CloseIcon />
				</Button>
			</Box>
		));
	}, [removeSelected, selectedChannels]);

	const confirm = useCallback(() => {
		alert(
			"You selected the following channels: " + [...selectedChannels].join(", ")
		);
	}, [selectedChannels]);

	return (
		<Box
			css={{ overflow: "hidden" }}
			padding="none"
			margin="none"
			justifyContent="flexStart"
			gap="medium"
		>
			<Tab
				size="large"
				css={{ borderRadius: "0", width: "100%", margin: "0" }}
				justifyContent="spaceBetween"
				flexDirection="row"
			>
				<Text color="white" title>
					Selected Channels
				</Text>
				<Text color="white" title>
					{selectedChannelCards.length}
				</Text>
			</Tab>
			{selectedChannelCards.length > 0 ? (
				<FlatBox justifyContent="spaceBetween" css={{ height: "62rem" }}>
					<FlatBox justifyContent="flexStart" css={{ overflowY: "auto" }}>
						{selectedChannelCards}
					</FlatBox>
					<Button onClick={confirm} cta size="medium">
						Confirm
					</Button>
				</FlatBox>
			) : (
				<span className="no-results-warning">No channels selected</span>
			)}
		</Box>
	);
};
