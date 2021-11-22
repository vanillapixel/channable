import { ChangeEventHandler } from "react";

interface SearchTermFilterProps {
	searchTerm: string;
	updateComponent: ChangeEventHandler<HTMLInputElement>;
}

export const SearchTermFilter = ({
	searchTerm,
	updateComponent,
}: SearchTermFilterProps) => {
	return (
		<input
			type="text"
			id="search-term"
			className="filter-option"
			name="term"
			value={searchTerm}
			placeholder="Search for channels, e.g. Google"
			onChange={updateComponent}
		/>
	);
};
