import { MouseEventHandler, ReactElement } from "react";

import { Button } from "../../ui/stitches.config";

interface ControllerProps {
	id: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
	icon: ReactElement;
	isDisabled: boolean;
}

export const Controller = ({
	onClick,
	icon,
	isDisabled,
	id,
}: ControllerProps) => {
	return (
		<Button id={id} icon disabled={isDisabled} onClick={onClick}>
			{icon}
		</Button>
	);
};
