import { useState, useEffect, useCallback } from "react";

import { FiltersBar } from "./filtersBar/FiltersBar";
import { ChannelsLists } from "./channelsLists/ChannelsLists";
import { Pagination } from "./pagination/Pagination";

interface Channel {
	key: string;
	label: string;
	country: string;
}

interface ChannelsSelectProps {
	channelsList: Channel[];
}

const MAX_ROWS = 3;
const MAX_COLUMNS = 5;

export const ChannelSelect = ({ channelsList }: ChannelsSelectProps) => {
	const [displayedChannels, setDisplayedChannels] = useState(channelsList);
	const [displayedPage, setDisplayedPage] = useState(0);

	const [filters, setFilters] = useState({
		searchTerm: "",
		selectedCountry: "all",
	});

	// OPTIONAL isFavourite -> star icon grey false default - filled yellow if true

	const filterChannelsList = useCallback(() => {
		const { searchTerm, selectedCountry } = filters;
		const newFilteredChannelsList = channelsList.filter((channel) => {
			const { country, key } = channel;
			if (selectedCountry === "all" && searchTerm === "") return channel;
			if (searchTerm !== "" && key.includes(searchTerm)) return channel;
			if (country === selectedCountry) return channel;
		});

		setDisplayedChannels(newFilteredChannelsList);
		setDisplayedPage(0);
	}, [channelsList, filters]);

	useEffect(() => {
		filterChannelsList();
	}, [filterChannelsList, filters]);

	return (
		<>
			<FiltersBar filters={filters} setFilters={setFilters} />
			<ChannelsLists
				maxRows={MAX_ROWS}
				maxColumns={MAX_COLUMNS}
				displayedPage={displayedPage}
				setDisplayedPage={setDisplayedPage}
				displayedChannels={displayedChannels}
			/>
			<Pagination
				totalResults={displayedChannels.length}
				maxRows={MAX_ROWS}
				maxColumns={MAX_COLUMNS}
				setDisplayedPage={setDisplayedPage}
				displayedPage={displayedPage}
			/>
		</>
	);
};
