import React, { FC, useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import "./channelSelect.css";
import "./channelsList.css";
import channelsList from "./channelsList";

import { Pagination } from "./pagination/Pagination";

export const ChannelSelect: FC = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCountry, setSelectedCountry] = useState("NL");

	const [maxRows, setMaxRows] = useState(3);
	const [maxColumns, setMaxColumns] = useState(5);

	const [displayedPage, setDisplayedPage] = useState(0);

	let [displayedChannels, setDisplayedChannels] = useState([...channelsList]);

	let [selectedChannels, setSelectedChannels] = useState<Array<string>>([]);

	// unique country names sorted alphabetically
	let countriesList = [
		...new Set([...channelsList].map((country) => country.country)),
	].sort((a, b) => {
		if (a < b) {
			return -1;
		}
		if (a > b) {
			return 1;
		}
		return 0;
	});

	// ];

	// name filter bar (text input)
	// country filter bar (select input)
	// channels list
	// channel card (C)
	// channel placeholder picture
	// OPTIONAL isFavourite -> star icon grey false default - filled yellow if true
	// channel name
	// channel input -> isSelected (default false) isFavourite default true
	// pagination (C)

	console.log("component loaded");

	const onSubmit = (e: any) => {
		e.preventDefault();
		setSelectedCountry("");
		setDisplayedPage(0);
		setDisplayedChannels(
			[...channelsList].filter((channel) =>
				channel.key.toLowerCase().includes(searchTerm)
			)
		);
	};

	const updateChannelsList = (e: any) => {
		setSearchTerm("");
		setDisplayedPage(0);
		setSelectedCountry(e.target.value);
		setDisplayedChannels(
			[...channelsList].filter((channel) => channel.country === selectedCountry)
		);
	};

	const paginate = (pageNumber: number) => {
		setDisplayedPage(pageNumber);
	};

	const toggleSelectedChannel = (channelLabel: string) => {
		if (selectedChannels.includes(channelLabel)) {
			setSelectedChannels(
				[...selectedChannels].filter((label) => label !== channelLabel)
			);
			return;
		}
		setSelectedChannels([...selectedChannels, channelLabel]);
	};

	// const paginate () => {

	// }

	useEffect(() => {}, [displayedChannels]);

	return (
		<div className="channels-select-container">
			<div className="channels-select">
				{/* NAME SEARCH BAR FILTER */}
				<div className="filters-container">
					{selectedChannels && selectedChannels.map((x) => <h2>{x}</h2>)}
					<div className="search-bar-container">
						<form
							className="filter-option search-bar"
							onSubmit={(e) => onSubmit(e)}
						>
							<p>
								<label htmlFor="search-term">Channel:</label>
								<input
									type="text"
									id="search-term"
									name="searchTerm"
									value={searchTerm}
									placeholder="Search for channels, e.g. Google"
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</p>
							<button type="submit"> Search</button>
						</form>
					</div>

					{/* COUNTRY SEARCH BAR FILTER */}
					<select
						className="filter-option"
						name="country options"
						value={selectedCountry}
						onChange={(e) => updateChannelsList(e)}
					>
						{countriesList.map((country) => (
							<>
								<option value={country}>{country}</option>
								<div className="flag">
									<img
										src={`../imgs/icons/flags/24x24/${country.toLowerCase()}.png`}
										alt=""
									/>
								</div>
							</>
						))}
					</select>
				</div>

				{/* CHANNELS LIST */}
				<div className="channels-list">
					{[...displayedChannels]
						.slice(
							displayedPage * maxRows * maxColumns,
							maxRows * maxColumns * (displayedPage + 1)
						)
						.map((channel) => (
							// single channel component
							<div
								className={
									selectedChannels.includes(channel.label)
										? "channel-card channel-card-selected"
										: "channel-card"
								}
								onClick={() => toggleSelectedChannel(channel.label)}
							>
								<span className="channel-name">{channel.label}</span>
								<div className="channel-logo-container">
									<img
										className="channel-logo-image"
										src={
											Math.random() > 0.5
												? `../imgs/logo-placeholder.png`
												: `../imgs/channable-logo.png`
										}
										alt={channel.label + "logo"}
									/>
								</div>
								<div className="flag">
									<img
										src={`../imgs/icons/flags/24x24/${channel.country.toLowerCase()}.png`}
										alt=""
									/>
								</div>
							</div>
						))}
				</div>

				{/* SELECTED LIST */}

				<div className="selected-list"></div>

				{/* PAGINATION BAR */}
				<Pagination
					totalResults={displayedChannels.length}
					maxRows={maxRows}
					maxColumns={maxColumns}
					paginate={paginate}
					displayedPage={displayedPage}
				/>
			</div>
			<div className="selected-channels"></div>
		</div>
	);
};
