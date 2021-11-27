import { Button } from "../../../../ui/stitches.config";

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
		<Button
			isActive={selectedChannels.includes(channelLabel)}
			onClick={() => toggleSelectedChannel(channelLabel)}
		>
			{selectedChannels.includes(channelLabel) ? "Selected" : "Select channel"}
		</Button>
	);
};
