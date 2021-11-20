import { useState, useEffect } from "react";
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
	const getPageNumbers = () => {
		let arrayOfPages = Array.from(
			Array(Math.ceil(totalResults / (maxRows * maxColumns))).keys()
		);
		return arrayOfPages;
	};
	let [pageNumbers, setPageNumbers] = useState(getPageNumbers());

	const PAGE_NUMBERS_LIMIT = 10;
	const calculatePageNumbersSets: Function = () =>
		Math.ceil(pageNumbers.length / PAGE_NUMBERS_LIMIT);

	let pageNumbersSets: number = calculatePageNumbersSets();

	let [currentPageNumbersSet, setCurrentPageNumbersSet] = useState<number>(0);

	useEffect(() => {
		setPageNumbers(getPageNumbers());
		console.log("peto");
		// eslint-disable-next-line
	}, [totalResults]);

	console.log("pagination render");

	return (
		<div className="page-selector-bar">
			<div
				onClick={() =>
					setCurrentPageNumbersSet(
						currentPageNumbersSet > 0
							? currentPageNumbersSet - 1
							: currentPageNumbersSet
					)
				}
				className="pagination-set-controller backward-controller page-selector-icon"
			>
				{"<<"}
			</div>

			{pageNumbers
				.slice(
					currentPageNumbersSet * PAGE_NUMBERS_LIMIT,
					(currentPageNumbersSet + 1) * PAGE_NUMBERS_LIMIT
				)
				.map((pageNumber, id) => (
					<div
						key={id}
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
			<div
				onClick={() =>
					setCurrentPageNumbersSet(
						currentPageNumbersSet < pageNumbersSets - 1
							? currentPageNumbersSet + 1
							: currentPageNumbersSet
					)
				}
				className="pagination-set-controller forward-controller page-selector-icon"
			>
				{" "}
				{">>"}
			</div>
		</div>
	);
};
