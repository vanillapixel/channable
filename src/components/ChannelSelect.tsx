import { FC, useState, useEffect, useCallback } from "react";

import { channelsData } from "../data/channelsData";

import { FiltersBar } from "./filtersBar/FiltersBar";
import { ChannelsLists } from "./channelsLists/ChannelsLists";

const MAX_ROWS = 3;
const MAX_COLUMNS = 5;

export const ChannelSelect: FC = () => {
	const [displayedChannels, setDisplayedChannels] = useState(channelsData);
	const [displayedPage, setDisplayedPage] = useState(0);

	const [filters, setFilters] = useState({
		searchTerm: "",
		selectedCountry: "all",
	});

	console.log(filters);

	// OPTIONAL isFavourite -> star icon grey false default - filled yellow if true

	const filterChannelsList = useCallback(() => {
		const { searchTerm, selectedCountry } = filters;
		const newFilteredChannelsList = [...channelsData].filter((channel) => {
			const { country, key } = channel;
			if (selectedCountry === "all" && searchTerm === "") return channel;
			if (searchTerm !== "" && key.includes(searchTerm)) return channel;
			if (country === selectedCountry) return channel;
		});

		setDisplayedChannels(newFilteredChannelsList);
		setDisplayedPage(0);
	}, [filters]);

	console.log("component loaded");

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
		</>
	);
};
