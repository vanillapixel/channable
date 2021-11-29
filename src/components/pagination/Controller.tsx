import { MouseEventHandler, ReactElement } from "react";

import { Button } from "../../ui/stitches.config";

interface ControllerProps {
	onClick: MouseEventHandler<HTMLButtonElement>;
	icon: ReactElement;
	isDisabled: boolean;
}

export const Controller = ({ onClick, icon, isDisabled }: ControllerProps) => {
	return (
		<Button icon disabled={isDisabled} onClick={onClick}>
			{icon}
		</Button>
	);
};
