import { useMemo } from "react";

import { channelsData } from "../../../data/channelsData";
import { countries } from "../../../data/countries";
import { FlatBox, Label, Button } from "../../../ui/stitches.config";
import { CloseIcon } from "../../../ui/Icons";

import { ACTIONS } from "../../ChannelSelect";

type Countries = {
	[key: string]: string;
};

interface CountryFilterProps {
	selectedCountry: string;
	updateFilters: any;
}
const countriesFullNames: Countries = countries;

export const CountryFilter = ({
	updateFilters,
	selectedCountry,
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

	const updateCountry = (e: any) => {
		updateFilters({
			type: ACTIONS.SET_SELECTED_COUNTRY,
			payload: e.target.value,
		});
	};
	const resetCountry = () => {
		updateFilters({ type: ACTIONS.RESET_SELECTED_COUNTRY });
	};

	return (
		<FlatBox inputField>
			<Label
				accent={selectedCountry !== "" ? true : false}
				htmlFor="search-term"
			>
				Country:
			</Label>
			<select
				name="country options"
				value={selectedCountry}
				onChange={updateCountry}
			>
				<option value="">All countries</option>
				{countriesList.map((country: string) => (
					<option key={country} value={country}>
						{countriesFullNames[country.toLowerCase()]}
					</option>
				))}
			</select>
			<Button icon disabled={!(selectedCountry !== "")}>
				<CloseIcon className="icon" onClick={resetCountry} />
			</Button>
		</FlatBox>
	);
};
