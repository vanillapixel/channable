import { useEffect, useState, useCallback } from "react";

import useDebounce from "../../../customHooks/useDebounce";

import { CloseIcon } from "../../../ui/Icons";
import { ACTIONS } from "../../ChannelSelect";

import { Button, Label, FlatBox } from "../../../ui/stitches.config";

interface SearchTermFilterProps {
	searchTerm: string;
	updateFilters: any;
}

export const SearchTermFilter = ({
	searchTerm,
	updateFilters,
}: SearchTermFilterProps) => {
	const [newSearchTerm, setNewSearchTerm] = useState(searchTerm);
	const debouncedValue = useDebounce(newSearchTerm, 300);

	const updateSearchTerm = useCallback(() => {
		updateFilters({
			type: ACTIONS.SET_SEARCH_TERM,
			payload: debouncedValue,
		});
	}, [debouncedValue, updateFilters]);

	useEffect(() => {
		updateSearchTerm();
	}, [debouncedValue, updateSearchTerm]);

	const resetsearchTerm = () => {
		updateFilters({ type: ACTIONS.RESET_SEARCH_TERM });
	};

	return (
		<FlatBox
			inputField
			css={{ minWidth: "35rem" }}
			overflow="hidden"
			gap="none"
		>
			<Label accent={searchTerm !== "" ? true : false} htmlFor="search-term">
				Channel name:
			</Label>
			<input
				style={{ flexGrow: 1 }}
				type="text"
				id="search-term"
				name="term"
				value={newSearchTerm}
				placeholder="Search for channels, e.g. Google"
				onChange={(e) => setNewSearchTerm(e.target.value)}
			/>
			<Button icon disabled={!(searchTerm !== "")}>
				<CloseIcon className="icon" onClick={resetsearchTerm} />
			</Button>
		</FlatBox>
	);
};
