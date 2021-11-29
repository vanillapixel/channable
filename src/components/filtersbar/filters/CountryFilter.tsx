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
	// unique countries names sorted alphabetically not including custom channels (labelled as 'rs')
	let countriesList = useMemo(() => {
		return [...new Set([...channelsData].map((channel) => channel.country))]
			.sort((a, b) => {
				if (a < b) {
					return -1;
				}
				if (a > b) {
					return 1;
				}
				return 0;
			})
			.filter((x) => !x.toLowerCase().includes("rs"));
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
				{countriesList.map((country: string) => (
					<option key={country} value={country}>
						{countriesFullNames[country.toLowerCase()]}
					</option>
				))}
			</select>
			<Button icon disabled={!(selectedCountry !== "all countries")}>
				<CloseIcon className="icon" onClick={resetSelectedCountry} />
			</Button>
		</FlatBox>
	);
};
