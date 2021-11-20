import { useState, useEffect } from "react";
import "./pagination.css";

interface PaginationProps {
	totalResults: number;
	maxRows: number;
	maxColumns: number;
	paginate: Function;
	displayedPage: number;
}

const PAGE_NUMBERS_LIMIT = 10;

const getPageNumbers = (
	totalResults: number,
	maxRows: number,
	maxColumns: number
) => {
	const arrayOfPages = Array.from(
		Array(Math.ceil(totalResults / (maxRows * maxColumns))).keys()
	);
	return arrayOfPages;
};

export const Pagination = ({
	totalResults,
	maxRows,
	maxColumns,
	paginate,
	displayedPage,
}: PaginationProps) => {
	// it fills an array with the range of numbers of the available pages
	const [pageNumbers, setPageNumbers] = useState<number[]>([]);
	const [pageNumbersSets, setPageNumbersSets] = useState<number>(0);

	const [currentPageNumbersSet, setCurrentPageNumbersSet] = useState<number>(0);

	useEffect(() => {
		const newPageNumbers = getPageNumbers(totalResults, maxRows, maxColumns);
		const pageNumberSets = Math.ceil(
			newPageNumbers.length / PAGE_NUMBERS_LIMIT
		);
		setPageNumbers(newPageNumbers);
		setPageNumbersSets(pageNumberSets);
		setCurrentPageNumbersSet(0);

		console.log(pageNumberSets);
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
