import { useState } from "react";

import { ChannelsList } from "./channelsList/ChannelsList";
import { SelectedChannelsList } from "./selectedChannelsList/SelectedChannelsList";
import { Pagination } from "../pagination/Pagination";
import "./channelsLists.css";

interface ChannelsListProps {
	displayedChannels: {
		key: string;
		label: string;
		country: string;
	}[];
	displayedPage: number;
	maxRows: number;
	maxColumns: number;
	setDisplayedPage: Function;
}

export const ChannelsLists = ({
	displayedChannels,
	displayedPage,
	maxRows,
	maxColumns,
	setDisplayedPage,
}: ChannelsListProps) => {
	const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
	return (
		<>
			<div className="channels-lists-container">
				<div className="channels-list-container">
					{/* <span className="title-container">Select your channels</span> */}

					{/* CHANNELS LIST */}
					<ChannelsList
						displayedChannels={displayedChannels}
						maxRows={maxRows}
						maxColumns={maxColumns}
						displayedPage={displayedPage}
						selectedChannels={selectedChannels}
						setSelectedChannels={setSelectedChannels}
					/>
					<Pagination
						totalResults={displayedChannels.length}
						maxRows={maxRows}
						maxColumns={maxColumns}
						setDisplayedPage={setDisplayedPage}
						displayedPage={displayedPage}
					/>
				</div>

				{/* SELECTED LIST */}
				<SelectedChannelsList
					selectedChannels={selectedChannels}
					setSelectedChannels={setSelectedChannels}
				/>
			</div>
		</>
	);
};
