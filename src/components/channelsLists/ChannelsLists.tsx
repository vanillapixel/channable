import { useState } from "react";

import { ChannelsList } from "./channelsList/ChannelsList";
import { SelectedChannelsList } from "./selectedChannelsList/SelectedChannelsList";

import { Grid, FlatBox } from "../../ui/stitches.config";

interface ChannelsListProps {
	displayedChannels: {
		key: string;
		label: string;
		country: string;
	}[];
	displayedPage: number;
	maxRows: number;
	maxColumns: number;
	setDisplayedPage: Function;
}

export const ChannelsLists = ({
	displayedChannels,
	displayedPage,
	maxRows,
	maxColumns,
}: ChannelsListProps) => {
	const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
	return (
		<Grid
			css={{
				height: "70rem",
				gridTemplateColumns: "5fr 1fr",
				gap: "1rem",
				width: "100%",
			}}
		>
			{/* <span className="title-container">Select your channels</span> */}
			<ChannelsList
				displayedChannels={displayedChannels}
				maxRows={maxRows}
				maxColumns={maxColumns}
				displayedPage={displayedPage}
				selectedChannels={selectedChannels}
				setSelectedChannels={setSelectedChannels}
			/>
			<SelectedChannelsList
				selectedChannels={selectedChannels}
				setSelectedChannels={setSelectedChannels}
			/>
		</Grid>
	);
};
