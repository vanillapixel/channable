import { ChangeEventHandler } from "react";

interface SearchTermFilterProps {
	searchTerm: string;
	updateSearchTermFilter: ChangeEventHandler<HTMLInputElement>;
	// updateSearchTermFilter: Function;
}

export const SearchTermFilter = ({
	searchTerm,
	updateSearchTermFilter,
}: // updateSearchTermFilter,
SearchTermFilterProps) => {
	return (
		<div
			// onSubmit={() => updateSearchTermFilter()}
			className="filter-option search-bar"
		>
			<input
				type="text"
				id="search-term"
				name="term"
				value={searchTerm}
				placeholder="Search for channels, e.g. Google"
				onChange={updateSearchTermFilter}
			/>
			<button type="submit">Search</button>
		</div>
	);
};
