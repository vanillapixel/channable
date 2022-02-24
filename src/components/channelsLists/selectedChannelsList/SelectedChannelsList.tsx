import { useMemo, useCallback } from "react";

import { Box, FlatBox, Text, Button, Tab } from "../../../ui/stitches.config";

import { SelectedChannel } from "./SelectedChannel";

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

	const removeAllSelected = () => {
		setSelectedChannels([]);
	};

	const selectedChannelCards = useMemo(() => {
		return selectedChannels.map((channelLabel) => (
			<SelectedChannel
				channelLabel={channelLabel}
				removeSelected={removeSelected}
			/>
		));
	}, [removeSelected, selectedChannels]);

	const confirmSelection = useCallback(() => {
		alert("This feature is ONLY available upon hiring the developer :)");
	}, []);

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
				<Button
					disabled={selectedChannelCards.length === 0}
					padding="small"
					icon
					onClick={removeAllSelected}
				>
					<CloseIcon />
				</Button>
			</Tab>
			<FlatBox>
				<FlatBox justifyContent="spaceBetween" css={{ height: "62rem" }}>
					{selectedChannelCards.length > 0 ? (
						<FlatBox justifyContent="flexStart" css={{ overflowY: "auto" }}>
							{selectedChannelCards}
						</FlatBox>
					) : (
						<span className="no-results-warning-wrapper">
							No channels selected
						</span>
					)}
				</FlatBox>
				<Button
					disabled={!selectedChannelCards.length}
					onClick={confirmSelection}
					cta
					size="medium"
				>
					Confirm
				</Button>
			</FlatBox>
		</Box>
	);
};
