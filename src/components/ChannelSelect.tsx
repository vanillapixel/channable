import React, { FC, useState, useEffect, useCallback } from "react";
import "./channelSelect.css";
import "./channelsList.css";
import channelsList from "./channelsList";

import { Pagination } from "./pagination/Pagination";
import { FiltersBar } from "./filtersbar/FiltersBar";

const MAX_ROWS = 3;
const MAX_COLUMNS = 5;

export const ChannelSelect: FC = () => {
	const [displayedPage, setDisplayedPage] = useState(0);

	const [displayedChannels, setDisplayedChannels] = useState([...channelsList]);
	const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCountry, setSelectedCountry] = useState("all");

	// name filter bar (text input)
	// country filter bar (select input)
	// channels list
	// OPTIONAL isFavourite -> star icon grey false default - filled yellow if true

	console.log("component loaded");

	const updateChannelsListBySearchTerm = useCallback(() => {
		setSearchTerm(searchTerm);
		setSelectedCountry("");
		setDisplayedPage(0);
		setDisplayedChannels(
			[...channelsList].filter((channel) =>
				channel.key.toLowerCase().includes(searchTerm)
			)
		);
	}, [searchTerm]);

	const updateChannelsListByCountry = useCallback(() => {
		setSearchTerm("");
		setDisplayedPage(0);
		setSelectedCountry(selectedCountry);
		if (selectedCountry === "all" || selectedCountry === "") {
			setDisplayedChannels([...channelsList]);
			return;
		}
		setDisplayedChannels(
			[...channelsList].filter((channel) => channel.country === selectedCountry)
		);
		console.log("country run");
	}, [selectedCountry]);

	const paginate = useCallback((pageNumber: number) => {
		setDisplayedPage(pageNumber);
	}, []);

	const toggleSelectedChannel = useCallback(
		(channelLabel: string) => {
			if (selectedChannels.includes(channelLabel)) {
				setSelectedChannels(
					[...selectedChannels].filter((label) => label !== channelLabel)
				);
				return;
			}
			setSelectedChannels([...selectedChannels, channelLabel]);
		},
		[selectedChannels]
	);

	const removeSelected = useCallback(
		(channelLabel: string) => {
			setSelectedChannels(
				[...selectedChannels].filter((label) => label !== channelLabel)
			);
		},
		[selectedChannels]
	);

	useEffect(() => {
		updateChannelsListByCountry();
		// eslint-disable-next-line
	}, [selectedCountry]);

	useEffect(() => {
		updateChannelsListBySearchTerm();
		// eslint-disable-next-line
	}, [searchTerm]);

	console.log(displayedChannels);

	return (
		<div className="channels-select-container">
			<div className="channels-select">
				<FiltersBar
					selectedCountry={selectedCountry}
					setSelectedCountry={setSelectedCountry}
					setSearchTerm={setSearchTerm}
				/>

				{/* CHANNELS LIST */}
				<div className="channels-container">
					<div className="channels-list">
						{[...displayedChannels]
							.slice(
								displayedPage * MAX_ROWS * MAX_COLUMNS,
								MAX_ROWS * MAX_COLUMNS * (displayedPage + 1)
							)
							.map((channel) => (
								// single channel component
								<div
									key={channel.key}
									className="channel-card"
									onClick={() => toggleSelectedChannel(channel.label)}
								>
									<div className="card-details">
										<span className="channel-name">{channel.label}</span>
									</div>
									<div className="channel-banner-container">
										<img
											className="channel-banner-image"
											src="../imgs/logo-placeholder.png"
											alt={channel.label + "logo"}
										/>
									</div>
									<div className="card-details">
										<div className="flag">
											<img
												src={`../imgs/icons/flags/24x24/${channel.country.toLowerCase()}.png`}
												alt=""
											/>
										</div>
										<div
											className={
												selectedChannels.includes(channel.label)
													? "checkbox channel-selected"
													: "checkbox"
											}
										>
											{selectedChannels.includes(channel.label)
												? "Selected"
												: "Select channel"}
										</div>
									</div>
								</div>
							))}
					</div>
					{/* selected list */}
					<div className="selected-channels-list">
						<span>Selected Channels</span>
						{selectedChannels &&
							selectedChannels.map((channelName, id) => (
								<div key={id} className="selected-channel">
									<div className="logo-container">
										<img
											className="small-logo"
											src="../imgs/logo-mini.png"
											alt=""
										/>
									</div>
									<span>{channelName}</span>
									<div
										onClick={() => removeSelected(channelName)}
										className="remove-icon"
									>
										X
									</div>
								</div>
							))}
					</div>
				</div>

				{/* SELECTED LIST */}

				{/* PAGINATION BAR */}
				<Pagination
					totalResults={displayedChannels.length}
					maxRows={MAX_ROWS}
					maxColumns={MAX_COLUMNS}
					paginate={paginate}
					displayedPage={displayedPage}
				/>
			</div>
		</div>
	);
};
