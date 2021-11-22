import { useState, useCallback, useEffect, ChangeEvent } from "react";

import { CountryFilter } from "./filters/CountryFilter";
import { SearchTermFilter } from "./filters/SearchTermFilter";

import useDebounce from "../../customHooks/useDebounce";

import "./filtersBar.css";

interface FiltersBarProps {
	filters: { searchTerm: string; selectedCountry: string };
	setFilters: Function;
}

export const FiltersBar = ({ filters, setFilters }: FiltersBarProps) => {
	const [searchTerm, setSearchTerm] = useState(filters.searchTerm);
	const [selectedCountry, setSelectedCountry] = useState(
		filters.selectedCountry
	);

	const updateSearchTermFilter = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			console.log(searchTerm);
			setSearchTerm(e.target.value);
			setFilters({ searchTerm: e.target.value, selectedCountry: "all" });
			setSelectedCountry("all");
		},
		[setFilters]
	);

	const updateSelectedCountryFilter = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			setSelectedCountry(e.target.value);
			setFilters({ searchTerm: "", selectedCountry: e.target.value });
			setSearchTerm("");
		},
		[setFilters]
	);

	useEffect(() => {}, [filters]);

	console.log("filter bar render");

	return (
		<div className="filters-container">
			<p>Filters:</p>
			<SearchTermFilter
				searchTerm={searchTerm}
				updateSearchTermFilter={updateSearchTermFilter}
			/>
			<CountryFilter
				selectedCountry={selectedCountry}
				updateSelectedCountryFilter={updateSelectedCountryFilter}
			/>
		</div>
	);
};
