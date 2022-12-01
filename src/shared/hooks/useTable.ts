import { ChangeEvent, MouseEvent, useState } from "react"

interface Props {
  numberPageInit: number,
  rowsPerPageInit: number
}

const useTable = ({numberPageInit = 0, rowsPerPageInit = 30}: Props) => {

  const [pageNumber, setPageNumber] = useState<number>(numberPageInit);
  const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageInit);

  const handleChangePage = (
		event: MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPageNumber(newPage);
	};

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPageNumber(0);
	};

  return {
    pageNumber,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage
  }
}




export default useTable;