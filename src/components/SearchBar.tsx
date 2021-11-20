import React, { FC, useState } from "react";

export interface Props {
	Props: {
		searchTerm: string;
		setSearchTerm: () => void;
	};
}

export const SearchBar: FC<Props> = () => {
	return (
		<div>
			<form></form>
			<input
				type="text"
				name="searchTerm"
				onChange={() => console.log("ciao")}
			/>
		</div>
	);
};
