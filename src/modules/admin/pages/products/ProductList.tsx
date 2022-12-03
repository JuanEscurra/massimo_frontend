import React, { Fragment, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import {
	Button,
	Table,
	TableCell,
	TableCellProps,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
  Typography,
} from "@mui/material";

import { getProducts, getProductsByName } from "modules/admin/services/ProductService";
import Page from "shared/models/page";
import Product from "shared/models/Product";
import useTable from "shared/hooks/useTable";
import ProductTableBody from "./ProductTableBody";


const theadCells: TableCellProps[] = [
  {
	children: "#"
  },
  {
    children: 'imagen'
  },
	{
		children: "Nombre",
	},
	{
		children: "Stock",
    align: 'right'
	},
	{
		children: "Precio",
    align: 'right'
	},
	{
		align: "center",
		children: "Categoria",
	},
	{
		align: "center",
		children: "Acciones",
	},
];

export const ProductList = () => {

	const [page, setPage] = useState<Page<Product> | undefined>(undefined);
	const { pageNumber, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
		useTable({ numberPageInit: 0, rowsPerPageInit: 30 });
	const { register, handleSubmit } = useForm();


	useEffect(() => {
		getData();
	}, [pageNumber, rowsPerPage]);

	const searchByName = (data: any) => {
    getProductsByName(pageNumber, rowsPerPage, data.name)
      .then(pageProducts => setPage(pageProducts));
  };

  const getData = () => {
    getProducts(pageNumber, rowsPerPage)
      .then((pageProducts) => setPage(pageProducts));
  }

  if(!page) return <Typography mt={2} variant="subtitle1">No se ha encontrado datos</Typography>

	return (
		<Fragment>
			<form
				onSubmit={handleSubmit(searchByName)}
				style={{ display: "flex", gap: "15px", justifyContent: "end" }}
			>
				<TextField
					label="nombre"
					size="small"
					{...register("name")}
					style={{ width: "15rem" }}
				/>
				<Button type="submit" variant="contained">
					Buscar
				</Button>
			</form>
			<TableContainer style={{ margin: "50px 0" }}>
				<Table stickyHeader aria-label="sticky table" size="small">
					<TableHead>
						<TableRow>
							{theadCells.map((props, index) => (
								<TableCell {...props} key={index} />
							))}
						</TableRow>
					</TableHead>
					<ProductTableBody
						products={page.content}
						pageNumber={pageNumber}
						rowsPerPage={rowsPerPage}
						getData={getData} />
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				rowsPerPageOptions={[20, 30, 50]}
				count={page.totalElements}
				page={pageNumber}
				rowsPerPage={rowsPerPage}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Fragment>
	);
};
