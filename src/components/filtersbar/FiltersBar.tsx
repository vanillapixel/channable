import { CountryFilter } from "./filters/CountryFilter";
import { SearchTermFilter } from "./filters/SearchTermFilter";
import { CustomCheckboxFilter } from "./filters/CustomCheckboxFilter";

import { Box, Text, FlatBox } from "../../ui/stitches.config";

interface FiltersBarProps {
	filters: {
		searchTerm: string;
		selectedCountry: string;
		customCheckboxChecked: boolean;
	};
	updateFilters: Function;
}

export const FiltersBar = ({ updateFilters, filters }: FiltersBarProps) => {
	return (
		<Box
			justifyContent="flexStart"
			alignItems="start"
			padding="medium"
			css={{ alignSelf: "flex-start" }}
		>
			<Text fontSize="medium">Filter by:</Text>
			<FlatBox gap="large" padding="small" flexDirection="row">
				<SearchTermFilter filters={filters} updateFilters={updateFilters} />
				<CountryFilter
					selectedCountry={filters.selectedCountry}
					updateFilters={updateFilters}
				/>
				<CustomCheckboxFilter
					customCheckboxChecked={filters.customCheckboxChecked}
					updateFilters={updateFilters}
				/>
			</FlatBox>
		</Box>
	);
};
