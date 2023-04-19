import { Search } from '@mui/icons-material';
import { IconButton, TextField, InputAdornment } from '@mui/material';
import { GridToolbarDensitySelector, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton } from '@mui/x-data-grid';
import FlexBetween from './FlexBetween';

export const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch}: any) => {
    return <GridToolbarContainer>
        <FlexBetween width='100%'>
            <FlexBetween>
                <GridToolbarColumnsButton></GridToolbarColumnsButton>
                <GridToolbarDensitySelector></GridToolbarDensitySelector>
                <GridToolbarExport></GridToolbarExport>
            </FlexBetween>
            <TextField
                label='search'
                sx={{ mb: '0.5rem', width: '15rem' }}
                onChange={(e) => setSearchInput(e.target.value) }
                value={searchInput}
                variant="standard"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position='end'>
                            <IconButton
                                onClick={() => {
                                    setSearch(searchInput);
                                    setSearchInput("");
                                }}
                            >
                                <Search></Search>
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            >
            </TextField>
        </FlexBetween>
    </GridToolbarContainer>
}