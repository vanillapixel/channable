import { useState, useCallback, useEffect } from "react";

interface SearchTermFilterProps {
	filters: {
		searchTerm: string;
		selectedCountry: string;
	};
	setFilters: Function;
}

export const SearchTermFilter = ({
	filters,
	setFilters,
}: SearchTermFilterProps) => {
	const [searchTerm, setSearchTerm] = useState(filters.searchTerm);

	const updateSearchTermFilter = useCallback(
		(e) => {
			e.preventDefault();
			console.log(searchTerm);
			setFilters({ searchTerm: searchTerm, selectedCountry: "all" });
		},
		[searchTerm, setFilters]
	);

	const updateSearchTermInputValue = useCallback((e) => {
		e.preventDefault();
		setSearchTerm(e.target.value.toLowerCase());
	}, []);

	useEffect(() => {
		setSearchTerm(filters.searchTerm);
	}, [filters.selectedCountry]);

	console.log("peto");

	return (
		<form
			onSubmit={updateSearchTermFilter}
			className="filter-option search-bar"
		>
			<input
				type="text"
				id="search-term"
				name="term"
				value={searchTerm}
				placeholder="Search for channels, e.g. Google"
				onChange={updateSearchTermInputValue}
			/>
			<button type="submit">Search</button>
		</form>
	);
};
