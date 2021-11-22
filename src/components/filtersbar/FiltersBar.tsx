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
	const [newSearchTerm, setNewSearchTerm] = useState(searchTerm);
	const [selectedCountry, setSelectedCountry] = useState(
		filters.selectedCountry
	);

	const updateSearchTermFilter = () => {
		setFilters({ searchTerm: newSearchTerm, selectedCountry: "all" });
		setSelectedCountry("all");
	};

	const updateComponent = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
		setNewSearchTerm(e.target.value);
	};
	useDebounce(() => updateSearchTermFilter(), 400, [newSearchTerm]);

	const updateSelectedCountryFilter = useCallback(
		(e: ChangeEvent<HTMLSelectElement>) => {
			const newCountrySelected = e.target.value;
			setSelectedCountry(newCountrySelected);
			setFilters({ searchTerm: "", selectedCountry: newCountrySelected });
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
				updateComponent={updateComponent}
			/>
			<CountryFilter
				selectedCountry={selectedCountry}
				updateSelectedCountryFilter={updateSelectedCountryFilter}
			/>
		</div>
	);
};
