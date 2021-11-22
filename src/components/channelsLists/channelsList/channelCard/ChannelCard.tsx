import { useCallback } from "react";
import "./channelCard.css";

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
				<svg
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
				<div
					className={
						selectedChannels.includes(channel.label)
							? "selected-checkbox channel-selected-active"
							: "selected-checkbox"
					}
					onClick={() => toggleSelectedChannel(channel.label)}
				>
					{selectedChannels.includes(channel.label)
						? "Selected"
						: "Select channel"}
				</div>
			</div>
		</div>
	);
};
