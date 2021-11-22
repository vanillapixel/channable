import { useMemo } from "react";

import { ChannelCard } from "./channelCard/ChannelCard";

interface ChannelsListProps {
	displayedChannels: {
		key: string;
		label: string;
		country: string;
	}[];
	maxRows: number;
	maxColumns: number;
	displayedPage: number;
	selectedChannels: string[];
	setSelectedChannels: Function;
}

export const ChannelsList = ({
	displayedChannels,
	maxRows,
	maxColumns,
	displayedPage,
	selectedChannels,
	setSelectedChannels,
}: ChannelsListProps) => {
	const slicedChannels = useMemo(
		() =>
			[...displayedChannels]
				.slice(
					displayedPage * maxRows * maxColumns,
					maxRows * maxColumns * (displayedPage + 1)
				)
				.map((channel) => (
					<ChannelCard
						channel={channel}
						selectedChannels={selectedChannels}
						setSelectedChannels={setSelectedChannels}
					/>
				)),
		[
			displayedChannels,
			displayedPage,
			maxColumns,
			maxRows,
			selectedChannels,
			setSelectedChannels,
		]
	);
	return (
		<div className="channels-list">
			{slicedChannels.length > 0 ? (
				slicedChannels
			) : (
				<span className="no-results-warning">No results matched</span>
			)}
		</div>
	);
};
