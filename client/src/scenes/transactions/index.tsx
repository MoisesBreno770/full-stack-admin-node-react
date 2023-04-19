import { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "../../state/api";
import { Header } from "../../components/Header";
import { DataGridCustomToolbar } from "../../components/DataGridCustomToolbar";

export const Transactions = () => {
    const theme: any = useTheme();

    // values to be sent to the backend
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize]: any = useState(20);
    const [sort, setSort]: any = useState({});
    const [search, setSearch] = useState('');

    const [searchInput, setSearchInput] = useState("");
    const { data, isLoading }: any = useGetTransactionsQuery({
        page, pageSize, sort: JSON.stringify(sort), search,
    });

    const columns = [
        {
            field: '_id',
            headerName: 'ID',
            flex: 1,
        },
        {
            field: 'userId',
            headerName: 'User ID',
            flex: 1,
        },
        {
            field: 'createdAt',
            headerName: 'CreatedAt',
            flex: 1,
        },
        {
            field: 'products',
            headerName: '# of Products',
            flex: 0.5,
            sortable: false,
            renderCell: (params: any) => params.value.length
        },
        {
            field: 'cost',
            headerName: 'Cost',
            flex: 1,
            renderCell: (params: any) => `$${Number(params.value).toFixed(2)}`
        },
    ]

    return <Box m='1.5rem 2.5rem'>
        <Header title='TRANSACTIONS' subtitle='Entire list of transactions'></Header>
        <Box height='80vh' mt='40px'
            sx={{
                '& .MuiDataGrid-root': {
                    border: 'none'
                },
                '& .MuiDataGrid-cell': {
                    borderBottom: 'none'
                },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderBottom: 'none'
                },
                '& .MuiDataGrid-virtualScroller': {
                    backgroundColor: theme.palette.primary.light,
                },
                '& .MuiDataGrid-footerContainer': {
                    backgroundColor: theme.palette.background.alt,
                    color: theme.palette.secondary[100],
                    borderTop: 'none'
                },
                '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                    color: `${theme.palette.secondary[200]} !important`
                }
            }}
        >
            <DataGrid
                loading={isLoading || !data}
                getRowId={(row: any) => row._id}
                rows={(data && data.transactions) || []}
                columns={columns}
                rowCount={(data && data.total) || 0}
                rowsPerPageOptions={[20, 50, 100]}
                pagination
                page={page}
                pageSize={pageSize}
                paginationMode='server'
                sortingMode='server'
                onPageChange={(newPage: any) => setPage(newPage)}
                onPageSizeChange={(newPageSize: any) => setPageSize(newPageSize)}
                onSortModelChange={(newSortModel: any) => setSort(...newSortModel)}
                components={{ Toolbar: DataGridCustomToolbar }}
                componentsProps={{
                    toolbar: { searchInput, setSearchInput, setSearch}
                }}
            />
        </Box>
    </Box>
}