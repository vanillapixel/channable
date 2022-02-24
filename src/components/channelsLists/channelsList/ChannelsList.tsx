import { useMemo } from "react";

import { ChannelCard } from "./channelCard/ChannelCard";

import { Grid } from "../../../ui/stitches.config";
import { countries } from "../../../data/countries";

interface ChannelsListProps {
	displayedChannels: {
		key: string;
		label: string;
		country: string;
	}[];
	filters: {
		searchTerm: string;
		selectedCountry: string;
		customCheckboxChecked: boolean;
	};
	maxRows: number;
	maxColumns: number;
	currentPage: number;
	selectedChannels: string[];
	setSelectedChannels: Function;
}
type Countries = {
	[key: string]: string;
};

export const ChannelsList = ({
	displayedChannels,
	maxRows,
	maxColumns,
	currentPage,
	selectedChannels,
	setSelectedChannels,
	filters,
}: ChannelsListProps) => {
	const countriesFullNames: Countries = countries;
	const slicedChannels = useMemo(
		() =>
			[...displayedChannels]
				.slice(
					currentPage * maxRows * maxColumns,
					maxRows * maxColumns * (currentPage + 1)
				)
				.map((channel, id) => (
					<ChannelCard
						key={channel.label + id}
						channel={channel}
						selectedChannels={selectedChannels}
						setSelectedChannels={setSelectedChannels}
					/>
				)),
		[
			displayedChannels,
			currentPage,
			maxColumns,
			maxRows,
			selectedChannels,
			setSelectedChannels,
		]
	);
	return (
		<Grid
			css={{
				gridTemplateColumns: `repeat(${maxColumns}, 1fr)`,
				gridTemplateRows: `repeat(${maxRows}, 1fr)`,
				gap: ".5rem",
				minHeight: "63rem",
				width: "100%",
			}}
		>
			{slicedChannels.length > 0 ? (
				slicedChannels
			) : (
				<div className="no-results-warning-wrapper">
					<div>
						<p>No matched results for:</p>
					</div>
					<div>
						<b>
							<span>{filters.searchTerm}</span>
						</b>
						{filters.selectedCountry && (
							<>
								<span>in </span>
								<b>
									<span>
										{countriesFullNames[filters.selectedCountry.toLowerCase()]}
									</span>
								</b>
							</>
						)}
					</div>
				</div>
			)}
		</Grid>
	);
};
