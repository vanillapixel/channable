import { ACTIONS } from "../../ChannelSelect";

import { FlatBox, Label, Button } from "../../../ui/stitches.config";

import { CheckIcon } from "../../../ui/Icons";

interface CustomCheckboxFilterProps {
	customCheckboxChecked: boolean;
	updateFilters: any;
}

export const CustomCheckboxFilter = ({
	customCheckboxChecked,
	updateFilters,
}: CustomCheckboxFilterProps) => {
	return (
		<FlatBox
			inputField
			css={{ maxWidth: "35rem" }}
			overflow="hidden"
			gap="none"
		>
			<Label accent={customCheckboxChecked} htmlFor="search-term">
				Custom channels:
			</Label>
			<Button
				boxShadow="none"
				margin="small"
				onClick={(e) =>
					updateFilters({
						type: ACTIONS.SET_CUSTOM_CHECKBOX,
						payload: !customCheckboxChecked,
					})
				}
				isActive={customCheckboxChecked}
				css={{ padding: "$xsmall" }}
			>
				<CheckIcon
					style={
						customCheckboxChecked
							? { stroke: "var(--colors-color1)" }
							: { stroke: "white" }
					}
				></CheckIcon>
			</Button>
		</FlatBox>
	);
};
