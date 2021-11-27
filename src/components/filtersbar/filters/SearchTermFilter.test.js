import { SearchTermFilter } from "./SearchTermFilter";
import { SearchIcon, CloseIcon } from "../../../ui/Icons";

import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

test("pito nero", () => {
	// const inputNode = screen.getByLabelText("search-term");
	render(<SearchIcon />);
});
