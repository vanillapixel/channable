import { MouseEventHandler } from "react";

import { Box, Button } from "../../ui/stitches.config";

interface PageNumberProps {
	onClick: MouseEventHandler<HTMLButtonElement>;
	pageNumber: number;
	isActive: boolean;
}

export const PageNumber = ({
	onClick,
	pageNumber,
	isActive,
}: PageNumberProps) => {
	return (
		<Box margin="none" padding="none">
			<Button isActive={isActive} icon onClick={onClick}>
				{pageNumber}
			</Button>
		</Box>
	);
};
