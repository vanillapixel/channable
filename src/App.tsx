import { useMemo } from "react";
import { ChannelSelect } from "./components/ChannelSelect";
import { channelsData } from "./data/channelsData";

import { globalStyle } from "./ui/stitches.config";
import { Box } from "./ui/stitches.config";

function App() {
	globalStyle();

	const channelsList = useMemo(() => {
		// removes data clones - just in case :)
		return channelsData
			.filter(
				(channel, id, self) =>
					id ===
					self.findIndex(
						(x) =>
							x.label === channel.label &&
							x.key === channel.key &&
							x.country === channel.country
					)
			)
			.sort((a, b) => {
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
		<Box boxShadow="none">
			<ChannelSelect channelsList={channelsList} />
		</Box>
	);
}

export default App;
