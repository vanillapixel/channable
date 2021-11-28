import { useState, useEffect, useCallback, useMemo } from "react";

import { Box, Button } from "../../ui/stitches.config";

import { NextIcon, PreviousIcon } from "../../ui/Icons";

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

	const setPreviousPageNumbersSet = useCallback(() => {
		if (currentPageNumbersSet === 0) return;
		setCurrentPageNumbersSet(currentPageNumbersSet - 1);
	}, [currentPageNumbersSet]);

	const setNextPageNumbersSet = useCallback(() => {
		if (currentPageNumbersSet === pageNumbersSets - 1) return;
		setCurrentPageNumbersSet(currentPageNumbersSet + 1);
	}, [currentPageNumbersSet, pageNumbersSets]);

	const filteredPageNumbers = useMemo(() => {
		return pageNumbers
			.slice(
				currentPageNumbersSet * PAGE_NUMBERS_LIMIT,
				(currentPageNumbersSet + 1) * PAGE_NUMBERS_LIMIT
			)
			.map((pageNumber) => (
				<Box margin="none" padding="none" key={pageNumber}>
					<Button
						icon
						onClick={() => setDisplayedPage(pageNumber)}
						isActive={displayedPage === pageNumber}
					>
						{pageNumber + 1}
					</Button>
				</Box>
			));
	}, [currentPageNumbersSet, displayedPage, pageNumbers, setDisplayedPage]);

	return (
		<Box
			gap="medium"
			css={{ minWidth: "50rem", borderRadius: "50px" }}
			flexDirection="row"
		>
			<Button
				icon
				isEnabled={currentPageNumbersSet !== 0}
				onClick={setPreviousPageNumbersSet}
			>
				<PreviousIcon></PreviousIcon>
			</Button>
			{currentPageNumbersSet > 0 && (
				<>
					<Box margin="none" padding="none">
						<Button
							isActive={displayedPage === 0}
							icon
							onClick={updatePageNumbersSets}
						>
							1
						</Button>
					</Box>
					<Button icon isEnabled={false}>
						...
					</Button>
				</>
			)}
			{filteredPageNumbers}
			{currentPageNumbersSet < pageNumbersSets - 1 && (
				<>
					<Button icon isEnabled={false}>
						...
					</Button>
					<Box margin="none" padding="none">
						<Button
							isActive={displayedPage === pageNumbers.length - 1}
							icon
							onClick={updatePageNumbersSets}
						>
							{pageNumbers.length}
						</Button>
					</Box>
				</>
			)}
			<Button
				icon
				isEnabled={currentPageNumbersSet < pageNumbersSets - 1 ? true : false}
				onClick={setNextPageNumbersSet}
			>
				<NextIcon></NextIcon>
			</Button>
		</Box>
	);
};
