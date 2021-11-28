import { useState, useEffect, useCallback } from "react";

import { FiltersBar } from "./filtersBar/FiltersBar";
import { ChannelsLists } from "./channelsLists/ChannelsLists";
import { Pagination } from "./pagination/Pagination";

import { FlatBox } from "./../ui/stitches.config";

interface Channel {
	key: string;
	label: string;
	country: string;
}

interface ChannelsSelectProps {
	channelsList: Channel[];
	customChannelsList: Channel[];
}

const MAX_ROWS = 3;
const MAX_COLUMNS = 5;

export const ChannelSelect = ({
	channelsList,
	customChannelsList,
}: ChannelsSelectProps) => {
	const [displayedChannels, setDisplayedChannels] = useState(channelsList);
	const [displayedPage, setDisplayedPage] = useState(0);

	const [filters, setFilters] = useState({
		searchTerm: "",
		selectedCountry: "all countries",
		customCheckboxChecked: false,
	});
	// OPTIONAL isFavourite -> star icon grey false default - filled yellow if true

	const filterChannelsList = useCallback(() => {
		const { searchTerm, selectedCountry, customCheckboxChecked } = filters;
		const newFilteredChannelsList = channelsList.filter((channel) => {
			const { country, label } = channel;
			if (
				selectedCountry === "all countries" &&
				searchTerm === "" &&
				!customCheckboxChecked
			)
				return channel;
			if (
				searchTerm !== "" &&
				label.toLowerCase().includes(searchTerm.toLowerCase()) &&
				!customCheckboxChecked
			)
				return channel;
			if (country === selectedCountry && !customCheckboxChecked) return channel;
		});
		setDisplayedChannels(newFilteredChannelsList);
		setDisplayedPage(0);
	}, [channelsList, filters]);

	useEffect(() => {
		const { searchTerm, selectedCountry, customCheckboxChecked } = filters;

		if (!customCheckboxChecked) {
			filterChannelsList();
			return;
		}
		if (
			searchTerm === "" &&
			selectedCountry === "all countries" &&
			customCheckboxChecked
		) {
			setDisplayedChannels(customChannelsList);
			setDisplayedPage(0);
		}
	}, [customChannelsList, filterChannelsList, filters]);

	return (
		<FlatBox gap="medium" css={{ width: "94%" }}>
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
		</FlatBox>
	);
};
