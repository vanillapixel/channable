import { useMemo } from "react";

import { ChannelCard } from "./channelCard/ChannelCard";

import { Grid } from "../../../ui/stitches.config";

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
				.map((channel, id) => (
					<ChannelCard
						key={channel.label + id}
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
		<Grid
			css={{
				gridTemplateColumns: `repeat(${maxColumns}, 1fr)`,
				gridTemplateRows: `repeat(${maxRows}, 1fr)`,
				gap: ".5rem",
				minHeight: "63rem",
				width: "100%",
			}}
		>
			{slicedChannels.length > 0 ? (
				slicedChannels
			) : (
				<span className="no-results-warning">No results matched</span>
			)}
		</Grid>
	);
};
