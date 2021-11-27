import { useMemo } from "react";
import { ChannelSelect } from "./components/ChannelSelect";
import { channelsData } from "./data/channelsData";

import { globalStyle } from "./ui/stitches.config";

function App() {
	globalStyle();
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
	return <ChannelSelect channelsList={channelsList} />;
}

export default App;
