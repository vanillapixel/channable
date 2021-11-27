import { useMemo, useCallback } from "react";

import {
	Box,
	FlatBox,
	Tab,
	Text,
	Image,
	ImageContainer,
	Button,
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

	return (
		<Box css={{ overflow: "hidden" }} padding="none" justifyContent="flexStart">
			<Box
				size="large"
				margin="none"
				css={{ borderRadius: "0", width: "100%", gap: "1rem" }}
				justifyContent="spaceBetween"
				flexDirection="row"
			>
				<Text title>Selected Channels</Text>
				<Text title>{selectedChannelCards.length}</Text>
			</Box>
			{selectedChannelCards.length > 0 ? (
				<FlatBox justifyContent="spaceBetween" css={{ height: "64rem" }}>
					<FlatBox justifyContent="flexStart" css={{ overflowY: "auto" }}>
						<>{selectedChannelCards}</>
					</FlatBox>
					<Button size="medium">Confirm</Button>
				</FlatBox>
			) : (
				<span className="no-results-warning">No channels selected</span>
			)}
		</Box>
	);
};
