import { useState } from "react";

import { ChannelsList } from "./channelsList/ChannelsList";
import { SelectedChannelsList } from "./selectedChannelsList/SelectedChannelsList";

import { Grid, Box, FlatBox, Text } from "../../ui/stitches.config";
import { Pagination } from "../pagination/Pagination";

interface ChannelsListProps {
	displayedChannels: {
		key: string;
		label: string;
		country: string;
	}[];
	filters: {
		searchTerm: string;
		selectedCountry: string;
		customCheckboxChecked: boolean;
	};
	currentPage: number;
	maxRows: number;
	maxColumns: number;
	setCurrentPage: Function;
}

export const ChannelsLists = ({
	displayedChannels,
	currentPage,
	maxRows,
	maxColumns,
	filters,
	setCurrentPage,
}: ChannelsListProps) => {
	const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
	return (
		<Grid
			css={{
				minHeight: "73rem",
				gridTemplateColumns: "5fr 1fr",
				gap: "1rem",
				width: "100%",
			}}
		>
			<Box justifyContent="spaceAround" gap="small">
				<FlatBox padding="small" width="auto" css={{ alignSelf: "start" }}>
					<Text title>Select your channels: </Text>
				</FlatBox>
				<ChannelsList
					displayedChannels={displayedChannels}
					maxRows={maxRows}
					maxColumns={maxColumns}
					currentPage={currentPage}
					selectedChannels={selectedChannels}
					setSelectedChannels={setSelectedChannels}
					filters={filters}
				/>
				<Pagination
					totalResults={displayedChannels.length}
					maxRows={maxRows}
					maxColumns={maxColumns}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			</Box>
			<SelectedChannelsList
				selectedChannels={selectedChannels}
				setSelectedChannels={setSelectedChannels}
			/>
		</Grid>
	);
};
