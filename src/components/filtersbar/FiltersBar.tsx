import { useState, useCallback, useEffect, ChangeEvent } from "react";

import { CountryFilter } from "./filters/CountryFilter";
import { SearchTermFilter } from "./filters/SearchTermFilter";
import { CustomCheckboxFilter } from "./filters/CustomCheckboxFilter";

import { Box, Text, FlatBox } from "../../ui/stitches.config";

import useDebounce from "../../customHooks/useDebounce";

interface FiltersBarProps {
	filters: {
		searchTerm: string;
		selectedCountry: string;
		customCheckboxChecked: boolean;
	};
	setFilters: Function;
}

export const FiltersBar = ({ filters, setFilters }: FiltersBarProps) => {
	const [searchTermInputValue, setSearchTermInputValue] = useState(
		filters.searchTerm
	);
	const [searchTerm, setSearchTerm] = useState(searchTermInputValue);
	const [selectedCountry, setSelectedCountry] = useState(
		filters.selectedCountry
	);
	const [customCheckboxChecked, setCustomCheckboxChecked] = useState(
		filters.customCheckboxChecked
	);

	const updateSearchTermComponent = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTermInputValue(e.target.value);
		setSearchTerm(e.target.value.toLowerCase());
	};

	// filters updates

	const updateSearchTermFilter = useCallback(() => {
		setFilters({
			searchTerm: searchTerm,
			selectedCountry: "all countries",
			customCheckboxChecked: false,
		});
		setSelectedCountry("all countries");
		setCustomCheckboxChecked(false);
	}, [searchTerm, setFilters]);

	const updateSelectedCountryFilter = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			const newCountrySelected = e.target.value;
			setSelectedCountry(newCountrySelected);
			setFilters({
				searchTerm: "",
				selectedCountry: newCountrySelected,
				customCheckboxChecked: false,
			});
			setSearchTermInputValue("");
			setCustomCheckboxChecked(false);
		},
		[setFilters]
	);
	const updateCustomCheckBox = useCallback(() => {
		const newCheckboxValue = !customCheckboxChecked;
		setCustomCheckboxChecked(newCheckboxValue);
		setSelectedCountry("all countries");
		setFilters({
			searchTerm: "",
			selectedCountry: "all countries",
			customCheckboxChecked: newCheckboxValue,
		});
		setSearchTermInputValue("");
	}, [customCheckboxChecked, setFilters]);
	// inputs reset
	const resetSearchTerm = useCallback(() => {
		setSearchTermInputValue("");
		setSearchTerm("");
	}, []);

	const resetSelectedCountry = useCallback(() => {
		setSelectedCountry("all countries");
		setFilters({
			searchTerm: "",
			selectedCountry: "all countries",
			customCheckboxChecked: false,
		});
	}, [setFilters]);

	useDebounce(() => updateSearchTermFilter(), 400, [searchTerm]);

	useEffect(() => {}, [filters]);

	return (
		<Box
			justifyContent="flexStart"
			alignItems="start"
			padding="medium"
			css={{ alignSelf: "flex-start" }}
		>
			<Text fontSize="medium">Filter by:</Text>
			<FlatBox gap="large" padding="small" flexDirection="row">
				<SearchTermFilter
					resetSearchTerm={resetSearchTerm}
					searchTermInputValue={searchTermInputValue}
					updateSearchTermComponent={updateSearchTermComponent}
				/>
				<CountryFilter
					selectedCountry={selectedCountry}
					resetSelectedCountry={resetSelectedCountry}
					updateSelectedCountryFilter={updateSelectedCountryFilter}
				/>
				<CustomCheckboxFilter
					customCheckboxChecked={customCheckboxChecked}
					updateCustomCheckBox={updateCustomCheckBox}
				/>
			</FlatBox>
		</Box>
	);
};
