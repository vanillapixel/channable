import { ChangeEventHandler, MouseEventHandler } from "react";

import { SearchIcon, CloseIcon } from "../../../data/Icons";

interface SearchTermFilterProps {
	searchTermInputValue: string;
	updateComponent: ChangeEventHandler<HTMLInputElement>;
	resetSearchTerm: MouseEventHandler<HTMLDivElement>;
}

export const SearchTermFilter = ({
	searchTermInputValue,
	updateComponent,
	resetSearchTerm,
}: SearchTermFilterProps) => {
	return (
		<div className="search-bar">
			<SearchIcon />
			<input
				type="text"
				id="search-term"
				className="filter-option"
				name="term"
				value={searchTermInputValue}
				placeholder="Search for channels, e.g. Google"
				onChange={updateComponent}
			/>
			{searchTermInputValue && (
				<div onClick={resetSearchTerm}>
					<CloseIcon className="icon" />
				</div>
			)}
		</div>
	);
};
