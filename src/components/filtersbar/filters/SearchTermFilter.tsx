import { useEffect, useState, useCallback } from "react";

import useDebounce from "../../../customHooks/useDebounce";

import { CloseIcon } from "../../../ui/Icons";
import { ACTIONS } from "../../ChannelSelect";

import { Button, Label, FlatBox } from "../../../ui/stitches.config";

interface SearchTermFilterProps {
	filters: {
		searchTerm: string;
		selectedCountry: string;
		customCheckboxChecked: boolean;
	};
	updateFilters: any;
}

export const SearchTermFilter = ({
	filters: { searchTerm, customCheckboxChecked },
	updateFilters,
}: SearchTermFilterProps) => {
	const [term, setTerm] = useState(searchTerm);
	const [newSearchTerm, setNewSearchTerm] = useState(searchTerm);
	const debouncedValue = useDebounce(newSearchTerm, 300);

	const updateSearchTerm = useCallback(() => {
		updateFilters({
			type: ACTIONS.SET_SEARCH_TERM,
			payload: debouncedValue,
		});
	}, [debouncedValue, updateFilters]);

	const updateNewSearchTerm = (term: string) => {
		setTerm(term);
		setNewSearchTerm(term);
	};

	useEffect(() => {
		updateSearchTerm();
	}, [debouncedValue, updateSearchTerm]);

	useEffect(() => {
		let previousTerm = term;
		if (customCheckboxChecked) {
			setTerm("");
		} else {
			setTerm(previousTerm);
		}
		return;
	}, [customCheckboxChecked]);

	const resetsearchTerm = () => {
		setTerm("");
		setNewSearchTerm("");
		updateFilters({ type: ACTIONS.RESET_SEARCH_TERM });
	};

	return (
		<FlatBox
			inputField
			css={{ minWidth: "35rem" }}
			overflow="hidden"
			gap="none"
		>
			<Label accent={term !== "" ? true : false} htmlFor="search-term">
				Channel name:
			</Label>
			<input
				style={{ flexGrow: 1 }}
				type="text"
				id="search-term"
				name="term"
				value={term}
				placeholder="Search for channels, e.g. Google"
				onChange={(e) => updateNewSearchTerm(e.target.value)}
			/>
			<Button icon disabled={!(term !== "")}>
				<CloseIcon className="icon" onClick={resetsearchTerm} />
			</Button>
		</FlatBox>
	);
};
