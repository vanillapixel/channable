import { useState, useEffect, useCallback, useMemo } from "react";
import "./pagination.css";

interface PaginationProps {
	totalResults: number;
	maxRows: number;
	maxColumns: number;
	setDisplayedPage: Function;
	displayedPage: number;
}

const PAGE_NUMBERS_LIMIT = 10;

export const Pagination = ({
	totalResults,
	maxRows,
	maxColumns,
	setDisplayedPage,
	displayedPage,
}: PaginationProps) => {
	const [pageNumbers, setPageNumbers] = useState<number[]>([]);
	const [pageNumbersSets, setPageNumbersSets] = useState<number>(0);

	const [currentPageNumbersSet, setCurrentPageNumbersSet] = useState<number>(0);

	// it fills an array with the range of numbers of the available pages
	const getPageNumbers = useCallback(
		(totalResults: number, maxRows: number, maxColumns: number) => {
			const arrayOfPages = Array.from(
				Array(Math.ceil(totalResults / (maxRows * maxColumns))).keys()
			);
			return arrayOfPages;
		},
		[]
	);

	useEffect(() => {
		const newPageNumbers = getPageNumbers(totalResults, maxRows, maxColumns);
		const pageNumberSets = Math.ceil(
			newPageNumbers.length / PAGE_NUMBERS_LIMIT
		);
		setPageNumbers(newPageNumbers);
		setPageNumbersSets(pageNumberSets);
		setCurrentPageNumbersSet(0);
	}, [getPageNumbers, maxColumns, maxRows, totalResults]);

	const updatePageNumbersSets = useCallback(
		(e) => {
			const newPageNumber = e.target.textContent - 1;
			setDisplayedPage(newPageNumber);
			setCurrentPageNumbersSet(Math.floor(newPageNumber / PAGE_NUMBERS_LIMIT));
		},
		[setDisplayedPage]
	);

	const filteredPageNumbers = useMemo(() => {
		return pageNumbers
			.slice(
				currentPageNumbersSet * PAGE_NUMBERS_LIMIT,
				(currentPageNumbersSet + 1) * PAGE_NUMBERS_LIMIT
			)
			.map((pageNumber, id) => (
				<div
					key={id}
					onClick={() => setDisplayedPage(pageNumber)}
					className={
						displayedPage === pageNumber
							? "page-selector-icon page-selector-active"
							: "page-selector-icon"
					}
				>
					{pageNumber + 1}
				</div>
			));
	}, [currentPageNumbersSet, displayedPage, pageNumbers, setDisplayedPage]);

	console.log("pagination render");

	return (
		<div className="page-selector-bar">
			<div
				data-disabled={currentPageNumbersSet === 0 ? true : false}
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
			{currentPageNumbersSet > 0 && (
				<>
					<div
						onClick={(e) => updatePageNumbersSets(e)}
						className="page-selector-icon"
					>
						1
					</div>
					<div data-disabled="true" className="page-selector-icon">
						...
					</div>
				</>
			)}
			{filteredPageNumbers}

			{currentPageNumbersSet < pageNumbersSets - 1 && (
				<>
					<div data-disabled="true" className="page-selector-icon ">
						...
					</div>
					<div
						onClick={(e) => updatePageNumbersSets(e)}
						className="page-selector-icon"
					>
						{pageNumbers.length}
					</div>
				</>
			)}
			<div
				data-disabled={
					currentPageNumbersSet === pageNumbersSets - 1 ? true : false
				}
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
