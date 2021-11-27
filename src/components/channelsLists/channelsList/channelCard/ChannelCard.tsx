import { useCallback } from "react";

import { StarIcon } from "../../../../ui/Icons";
import { SelectChannelButton } from "./SelectChannelButton";

import {
	Box,
	FlatBox,
	Text,
	Image,
	ImageContainer,
} from "../../../../ui/stitches.config";

interface ChannelCardProps {
	channel: {
		key: string;
		label: string;
		country: string;
	};
	selectedChannels: string[];
	setSelectedChannels: Function;
}

export const ChannelCard = ({
	channel,
	selectedChannels,
	setSelectedChannels,
}: ChannelCardProps) => {
	const toggleSelectedChannel = useCallback(
		(channelLabel: string) => {
			if (selectedChannels.includes(channelLabel)) {
				setSelectedChannels(
					[...selectedChannels].filter((label) => label !== channelLabel)
				);
				return;
			}
			setSelectedChannels([...selectedChannels, channelLabel]);
		},
		[selectedChannels, setSelectedChannels]
	);
	return (
		<Box size="medium" margin="small" key={channel.key}>
			<FlatBox justifyContent="spaceBetween" flexDirection="row">
				<FlatBox justifyContent="spaceBetween" flexDirection="row">
					<Text padding="small" fontSize="medium">
						{channel.label}
					</Text>
					<ImageContainer small>
						<Image
							src={`../imgs/icons/flags/24x24/${channel.country.toLowerCase()}.png`}
							alt={`${channel.country}-flag.png`}
						/>
					</ImageContainer>
				</FlatBox>
			</FlatBox>
			<ImageContainer>
				<Image
					src="../imgs/logo-placeholder.png"
					alt={channel.label + "logo"}
				/>
			</ImageContainer>
			<FlatBox alignItems="end">
				<SelectChannelButton
					selectedChannels={selectedChannels}
					channelLabel={channel.label}
					toggleSelectedChannel={toggleSelectedChannel}
				/>
			</FlatBox>
		</Box>
	);
};
