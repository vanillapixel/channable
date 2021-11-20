import React, { useState, useEffect } from "react";
import "./pagination.css";

interface PaginationProps {
	totalResults: number;
	maxRows: number;
	maxColumns: number;
	paginate: Function;
	displayedPage: number;
}
export const Pagination = ({
	totalResults,
	maxRows,
	maxColumns,
	paginate,
	displayedPage,
}: PaginationProps) => {
	// it fills an array with the range of numbers of the available pages
	const getPagesNumbers = () => {
		let arrayOfPages = Array.from(
			Array(Math.ceil(totalResults / (maxRows * maxColumns))).keys()
		);
		return arrayOfPages;
	};

	let [pagesNumbers, setPagesNumbers] = useState(getPagesNumbers());

	useEffect(() => {
		setPagesNumbers(getPagesNumbers());
	}, [totalResults]);

	return (
		<div className="page-selector-bar">
			{pagesNumbers.map((pageNumber) => (
				<div
					onClick={() => paginate(pageNumber)}
					className={
						displayedPage === pageNumber
							? "page-selector-icon page-selector-icon-selector-active"
							: "page-selector-icon"
					}
				>
					{pageNumber + 1}
				</div>
			))}
		</div>
	);
};
