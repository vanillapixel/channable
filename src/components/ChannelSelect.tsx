import React, { FC, useState, useEffect } from "react";
import "./channelSelect.css";
import "./channelsList.css";
import channelsList from "./channelsList";

import { Pagination } from "./pagination/Pagination";
import { FiltersBar } from "./filtersbar/FiltersBar";

export const ChannelSelect: FC = () => {
	const [maxRows] = useState(3);
	const [maxColumns] = useState(5);

	const [displayedPage, setDisplayedPage] = useState(0);

	let [displayedChannels, setDisplayedChannels] = useState([...channelsList]);

	let [selectedChannels, setSelectedChannels] = useState<Array<string>>([]);

	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCountry, setSelectedCountry] = useState("all");

	// name filter bar (text input)
	// country filter bar (select input)
	// channels list
	// OPTIONAL isFavourite -> star icon grey false default - filled yellow if true

	console.log("component loaded");

	const updateChannelsListBySearchTerm = () => {
		setSearchTerm(searchTerm);
		setSelectedCountry("");
		setDisplayedPage(0);
		setDisplayedChannels(
			[...channelsList].filter((channel) =>
				channel.key.toLowerCase().includes(searchTerm)
			)
		);
	};

	const updateChannelsListByCountry = () => {
		setSearchTerm("");
		setDisplayedPage(0);
		setSelectedCountry(selectedCountry);
		if (selectedCountry === "all") {
			setDisplayedChannels([...channelsList]);
			return;
		}
		setDisplayedChannels(
			[...channelsList].filter((channel) => channel.country === selectedCountry)
		);
		console.log("country run");
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

	const removeSelected = (channelLabel: string) => {
		setSelectedChannels(
			[...selectedChannels].filter((label) => label !== channelLabel)
		);
	};

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
								displayedPage * maxRows * maxColumns,
								maxRows * maxColumns * (displayedPage + 1)
							)
							.map((channel, id) => (
								// single channel component
								<div
									key={id}
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
		</div>
	);
};
