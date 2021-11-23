interface SelectChannelButtonProps {
	toggleSelectedChannel: Function;
	channelLabel: string;
	selectedChannels: string[];
}
export const SelectChannelButton = ({
	toggleSelectedChannel,
	channelLabel,
	selectedChannels,
}: SelectChannelButtonProps) => {
	return (
		<div
			className={
				selectedChannels.includes(channelLabel)
					? "selected-checkbox channel-selected-active"
					: "selected-checkbox"
			}
			onClick={() => toggleSelectedChannel(channelLabel)}
		>
			{selectedChannels.includes(channelLabel) ? "Selected" : "Select channel"}
		</div>
	);
};
