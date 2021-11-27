import { useState, useCallback, useEffect, ChangeEvent } from "react";

import { CountryFilter } from "./filters/CountryFilter";
import { SearchTermFilter } from "./filters/SearchTermFilter";

import { Box, Text, FlatBox } from "../../ui/stitches.config";

import useDebounce from "../../customHooks/useDebounce";

interface FiltersBarProps {
	filters: { searchTerm: string; selectedCountry: string };
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

	const updateSearchTermFilter = useCallback(() => {
		setFilters({ searchTerm: searchTerm, selectedCountry: "all countries" });
		setSelectedCountry("all countries");
	}, [searchTerm, setFilters]);

	const updateComponent = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTermInputValue(e.target.value);
		setSearchTerm(e.target.value.toLowerCase());
	};
	const resetSearchTerm = useCallback(() => {
		setSearchTermInputValue("");
		setSearchTerm("");
	}, []);
	const resetSelectedCountry = useCallback(() => {
		setSelectedCountry("all countries");
		setFilters({ searchTerm: "", selectedCountry: "all countries" });
	}, [setFilters]);

	useDebounce(() => updateSearchTermFilter(), 400, [searchTerm]);

	const updateSelectedCountryFilter = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			const newCountrySelected = e.target.value;
			setSelectedCountry(newCountrySelected);
			setFilters({ searchTerm: "", selectedCountry: newCountrySelected });
			setSearchTermInputValue("");
		},
		[setFilters]
	);

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
					updateComponent={updateComponent}
				/>
				<CountryFilter
					selectedCountry={selectedCountry}
					resetSelectedCountry={resetSelectedCountry}
					updateSelectedCountryFilter={updateSelectedCountryFilter}
				/>
			</FlatBox>
		</Box>
	);
};
