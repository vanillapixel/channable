import { CountryFilter } from "./filters/CountryFilter";
import { SearchTermFilter } from "./filters/SearchTermFilter";

import "./filtersBar.css";

interface FiltersBarProps {
	filters: { searchTerm: string; selectedCountry: string };
	setFilters: Function;
}

export const FiltersBar = ({ filters, setFilters }: FiltersBarProps) => {
	console.log("filter bar render");

	return (
		<div className="filters-container">
			<p>Filters:</p>
			<SearchTermFilter filters={filters} setFilters={setFilters} />
			<CountryFilter filters={filters} setFilters={setFilters} />
		</div>
	);
};
