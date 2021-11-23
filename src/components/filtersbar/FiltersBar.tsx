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
	const [searchTermInputValue, setSearchTermInputValue] = useState(
		filters.searchTerm
	);
	const [searchTerm, setSearchTerm] = useState(searchTermInputValue);
	const [selectedCountry, setSelectedCountry] = useState(
		filters.selectedCountry
	);

	const updateSearchTermFilter = () => {
		setFilters({ searchTerm: searchTerm, selectedCountry: "all" });
		setSelectedCountry("all");
	};

	const updateComponent = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTermInputValue(e.target.value);
		setSearchTerm(e.target.value);
	};
	const resetSearchTerm = () => {
		setSearchTermInputValue("");
		setSearchTerm("");
	};
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
		<div className="filters-container">
			<p>Filters:</p>
			<SearchTermFilter
				resetSearchTerm={resetSearchTerm}
				searchTermInputValue={searchTermInputValue}
				updateComponent={updateComponent}
			/>
			<CountryFilter
				selectedCountry={selectedCountry}
				updateSelectedCountryFilter={updateSelectedCountryFilter}
			/>
		</div>
	);
};
