import { useState, useEffect, useCallback, useMemo } from "react";

import { Box, FlatBox, Button } from "../../ui/stitches.config";

import {
	NextIcon,
	PreviousIcon,
	DoubleNextIcon,
	DoublePreviousIcon,
} from "../../ui/Icons";

interface PaginationProps {
	totalResults: number;
	maxRows: number;
	maxColumns: number;
	setCurrentPage: Function;
	currentPage: number;
}

const PAGE_NUMBERS_LIMIT = 10;

export const Pagination = ({
	totalResults,
	maxRows,
	maxColumns,
	setCurrentPage,
	currentPage,
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

	const updatePageNumbersSets = useCallback(
		(e) => {
			const newPageNumber = e.target.textContent - 1;
			setCurrentPage(newPageNumber);
			setCurrentPageNumbersSet(Math.floor(newPageNumber / PAGE_NUMBERS_LIMIT));
		},
		[setCurrentPage]
	);

	const setPreviousPage = useCallback(() => {
		if (currentPage === 0) return;
		setCurrentPage(currentPage - 1);
		setCurrentPageNumbersSet(
			Math.floor((currentPage - 1) / PAGE_NUMBERS_LIMIT)
		);
	}, [currentPage, setCurrentPage]);

	const setNextPage = useCallback(() => {
		if (currentPage === pageNumbers[pageNumbers.length]) return;
		setCurrentPage(currentPage + 1);
		setCurrentPageNumbersSet(
			Math.floor((currentPage + 1) / PAGE_NUMBERS_LIMIT)
		);
	}, [currentPage, pageNumbers, setCurrentPage]);

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
						onClick={() => setCurrentPage(pageNumber)}
						isActive={currentPage === pageNumber}
					>
						{pageNumber + 1}
					</Button>
				</Box>
			));
	}, [currentPageNumbersSet, currentPage, pageNumbers, setCurrentPage]);

	useEffect(() => {
		const newPageNumbers = getPageNumbers(totalResults, maxRows, maxColumns);
		const pageNumberSets = Math.ceil(
			newPageNumbers.length / PAGE_NUMBERS_LIMIT
		);
		setPageNumbers(newPageNumbers);
		setPageNumbersSets(pageNumberSets);
		setCurrentPageNumbersSet(0);
	}, [getPageNumbers, maxColumns, maxRows, totalResults]);

	return (
		<Box
			gap="medium"
			css={{ minWidth: "65rem", borderRadius: "50px" }}
			flexDirection="row"
			justifyContent="spaceBetween"
		>
			<Button
				icon
				isEnabled={currentPageNumbersSet !== 0}
				onClick={setPreviousPageNumbersSet}
			>
				<DoublePreviousIcon></DoublePreviousIcon>
			</Button>
			<Button icon isEnabled={currentPage >= 1} onClick={setPreviousPage}>
				<PreviousIcon></PreviousIcon>
			</Button>
			<FlatBox flexDirection="row">
				{currentPageNumbersSet > 0 && (
					<>
						<Box margin="none" padding="none">
							<Button
								isActive={currentPage === 0}
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
								isActive={currentPage === pageNumbers.length - 1}
								icon
								onClick={updatePageNumbersSets}
							>
								{pageNumbers.length}
							</Button>
						</Box>
					</>
				)}
			</FlatBox>

			<Button
				icon
				isEnabled={currentPage < pageNumbers.length - 1 ? true : false}
				onClick={setNextPage}
			>
				<NextIcon></NextIcon>
			</Button>
			<Button
				icon
				isEnabled={currentPageNumbersSet < pageNumbersSets - 1 ? true : false}
				onClick={setNextPageNumbersSet}
			>
				<DoubleNextIcon></DoubleNextIcon>
			</Button>
		</Box>
	);
};
