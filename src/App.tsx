import { useMemo } from "react";
import { ChannelSelect } from "./components/ChannelSelect";
import { channelsData } from "./data/channelsData";

import "./app.css";

function App() {
	const channelsList = useMemo(() => {
		return [...channelsData].sort((a, b) => {
			if (a.label < b.label) {
				return -1;
			}
			if (a.label > b.label) {
				return 1;
			}
			return 0;
		});
	}, []);
	return (
		<div className="channels-select-container">
			<div className="channels-select">
				<ChannelSelect channelsList={channelsList} />;
			</div>
		</div>
	);
}

export default App;
