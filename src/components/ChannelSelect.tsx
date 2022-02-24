import { useState, useEffect, useCallback, useReducer, Reducer } from "react";

import { FiltersBar } from "./filtersBar/FiltersBar";
import { ChannelsLists } from "./channelsLists/ChannelsLists";

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
type FiltersAction = {
	type: string;
	payload: any;
};

export const ACTIONS = {
	SET_SEARCH_TERM: "set-search-term",
	SET_SELECTED_COUNTRY: "set-country",
	SET_CUSTOM_CHECKBOX: "set-custom-checkbox",
	RESET_SEARCH_TERM: "reset-search-term",
	RESET_SELECTED_COUNTRY: "reset-selected-country",
};

const MAX_ROWS = 3;
const MAX_COLUMNS = 5;

export const ChannelSelect = ({
	channelsList,
	customChannelsList,
}: ChannelsSelectProps) => {
	const [displayedChannels, setDisplayedChannels] = useState(channelsList);
	const [currentPage, setCurrentPage] = useState(0);

	const defaultFilters = {
		searchTerm: "",
		selectedCountry: "",
		customCheckboxChecked: false,
	};
	// OPTIONAL isFavourite -> star icon grey false default - filled yellow if true

	const filterReducer: Reducer<any, FiltersAction> = (filters, action) => {
		switch (action.type) {
			case ACTIONS.SET_SEARCH_TERM:
				return {
					...filters,
					customCheckboxChecked: false,
					searchTerm: action.payload,
				};
			case ACTIONS.SET_SELECTED_COUNTRY:
				console.log(action.payload);
				return {
					...filters,
					customCheckboxChecked: false,
					selectedCountry: action.payload,
				};
			case ACTIONS.SET_CUSTOM_CHECKBOX:
				return {
					searchTerm: "",
					selectedCountry: "",
					customCheckboxChecked: action.payload,
				};
			case ACTIONS.RESET_SEARCH_TERM:
				return {
					...filters,
					searchTerm: "",
				};
			case ACTIONS.RESET_SELECTED_COUNTRY:
				return {
					...filters,
					selectedCountry: "",
				};
			default:
				return;
		}
	};

	const [filterState, updateFilters] = useReducer(
		filterReducer,
		defaultFilters
	);

	const filterChannelsList = useCallback(() => {
		const { searchTerm, selectedCountry } = filterState;
		let newFilteredChannelsList = channelsList.filter((channel) => {
			const { country, label } = channel;
			if (searchTerm === "") {
				if (selectedCountry === "") {
					return channel;
				}
				return country === selectedCountry;
			} else if (!selectedCountry) {
				return label.toLowerCase().includes(searchTerm.toLowerCase());
			}
			return (
				label.toLowerCase().includes(searchTerm.toLowerCase()) &&
				country === selectedCountry
			);
		});

		setDisplayedChannels(newFilteredChannelsList);
		setCurrentPage(0);
	}, [channelsList, filterState]);

	useEffect(() => {
		const { customCheckboxChecked } = filterState;

		if (!customCheckboxChecked) {
			filterChannelsList();
			return;
		}
		setDisplayedChannels(customChannelsList);
		setCurrentPage(0);
	}, [customChannelsList, filterChannelsList, filterState]);

	return (
		<FlatBox gap="medium" css={{ width: "94%" }}>
			<FiltersBar updateFilters={updateFilters} filters={filterState} />
			<ChannelsLists
				maxRows={MAX_ROWS}
				maxColumns={MAX_COLUMNS}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				displayedChannels={displayedChannels}
				filters={filterState}
			/>
		</FlatBox>
	);
};
