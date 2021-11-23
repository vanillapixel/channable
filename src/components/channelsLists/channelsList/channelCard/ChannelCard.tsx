import { useCallback } from "react";
import "./channelCard.css";

import { StarIcon } from "../../../../data/Icons";
import { SelectChannelButton } from "./SelectChannelButton";

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
		<div key={channel.key} className="channel-card">
			<div className="card-details">
				<span className="channel-name">{channel.label}</span>
				<StarIcon className="icon" />
			</div>
			<div className="channel-banner-container">
				<img
					className="channel-banner-image"
					src="../imgs/logo-placeholder.png"
					alt={channel.label + "logo"}
				/>
			</div>
			<div className="card-details">
				<div className="flag">
					<img
						src={`../imgs/icons/flags/24x24/${channel.country.toLowerCase()}.png`}
						alt=""
					/>
				</div>
				<SelectChannelButton
					selectedChannels={selectedChannels}
					channelLabel={channel.label}
					toggleSelectedChannel={toggleSelectedChannel}
				/>
			</div>
		</div>
	);
};
