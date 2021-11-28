import { ChangeEventHandler, MouseEventHandler } from "react";

import { CloseIcon } from "../../../ui/Icons";

import { Button, Label, FlatBox } from "../../../ui/stitches.config";

interface SearchTermFilterProps {
	searchTermInputValue: string;
	updateSearchTermComponent: ChangeEventHandler<HTMLInputElement>;
	resetSearchTerm: MouseEventHandler<HTMLDivElement>;
}

export const SearchTermFilter = ({
	searchTermInputValue,
	updateSearchTermComponent,
	resetSearchTerm,
}: SearchTermFilterProps) => {
	return (
		<FlatBox
			inputField
			css={{ minWidth: "35rem" }}
			overflow="hidden"
			gap="none"
		>
			<Label
				accent={searchTermInputValue !== "" ? true : false}
				htmlFor="search-term"
			>
				Channel name:
			</Label>
			<input
				style={{ flexGrow: 1 }}
				type="text"
				id="search-term"
				name="term"
				value={searchTermInputValue}
				placeholder="Search for channels, e.g. Google"
				onChange={updateSearchTermComponent}
			/>
			<Button icon isEnabled={searchTermInputValue !== ""}>
				<CloseIcon className="icon" onClick={resetSearchTerm} />
			</Button>
		</FlatBox>
	);
};
