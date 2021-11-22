import { useMemo, useCallback } from "react";
import "./selectedChannelsList.css";

interface SelectedListProps {
	selectedChannels: string[];
	setSelectedChannels: Function;
}

export const SelectedChannelsList = ({
	selectedChannels,
	setSelectedChannels,
}: SelectedListProps) => {
	const removeSelected = useCallback(
		(channelLabel) => {
			setSelectedChannels(
				[...selectedChannels].filter((label) => label !== channelLabel)
			);
		},
		[selectedChannels, setSelectedChannels]
	);

	const selectedChannelCards = useMemo(() => {
		return selectedChannels.map((channelLabel) => (
			<div key={channelLabel} className="selected-channel fade-in-vertical">
				<div className="logo-container">
					<img className="small-logo" src="../imgs/logo-mini.png" alt="" />
				</div>
				<span>{channelLabel}</span>
				<div
					onClick={() => removeSelected(channelLabel)}
					className="icon remove-icon"
				>
					X
				</div>
			</div>
		));
	}, [removeSelected, selectedChannels]);

	return (
		<div className="selected-channels-list">
			<div className="selected-channels-title-container">
				<span className="title-container">Selected Channels</span>
				<span className="icon remove-icon">{selectedChannelCards.length}</span>
			</div>
			{selectedChannelCards.length > 0 ? (
				selectedChannelCards
			) : (
				<span className="no-results-warning">No channels selected</span>
			)}
		</div>
	);
};
