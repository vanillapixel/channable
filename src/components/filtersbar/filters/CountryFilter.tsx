import { useMemo, ChangeEventHandler, MouseEventHandler } from "react";

import { channelsData } from "../../../data/channelsData";
import { countries } from "../../../data/countries";
import { FlatBox, Label, Button } from "../../../ui/stitches.config";
import { CloseIcon } from "../../../ui/Icons";

type Countries = {
	[key: string]: string;
};

interface CountryFilterProps {
	selectedCountry: string;
	resetSelectedCountry: MouseEventHandler<HTMLDivElement>;
	updateSelectedCountryFilter: ChangeEventHandler<HTMLSelectElement>;
}
const countriesFullNames: Countries = countries;

export const CountryFilter = ({
	selectedCountry,
	resetSelectedCountry,
	updateSelectedCountryFilter,
}: CountryFilterProps) => {
	// unique country names (filters out duplicates with new Set) sorted alphabetically
	let countriesList = useMemo(() => {
		return [
			...new Set([...channelsData].map((channel) => channel.country)),
		].sort((a, b) => {
			if (a < b) {
				return -1;
			}
			if (a > b) {
				return 1;
			}
			return 0;
		});
	}, []);

	return (
		<FlatBox inputField>
			<Label
				accent={
					selectedCountry.toLowerCase() !== "all countries" ? true : false
				}
				htmlFor="search-term"
			>
				Country:
			</Label>
			<select
				name="country options"
				value={selectedCountry}
				onChange={updateSelectedCountryFilter}
			>
				<option value="all countries">All countries</option>
				{countriesList.map((country: string, id) => (
					<>
						<option key={id} value={country}>
							{countriesFullNames[country.toLowerCase()]}
						</option>
					</>
				))}
			</select>
			<Button icon>
				{selectedCountry !== "all countries" ? (
					<CloseIcon className="icon" onClick={resetSelectedCountry} />
				) : null}
			</Button>
		</FlatBox>
	);
};
