import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Box, Rating, LinearProgress, IconButton } from '@mui/material';
import { DataGrid, GridToolbar, getGridNumericOperators } from '@mui/x-data-grid';
// utils
import { fPercent } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Iconify from '../../../../components/iconify';
import { CustomAvatar } from '../../../../components/custom-avatar';

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

GenericDataGridCustom.propTypes = {
    data: PropTypes.array,
    columns: PropTypes.array,
};

export default function GenericDataGridCustom({ data, columns }) {
    const [selectionModel, setSelectionModel] = useState([]);

    if (columns.length > 0) {
        const ratingColumn = columns.find((column) => column.field === 'rating');
        const ratingColIndex = columns.findIndex((col) => col.field === 'rating');

        const ratingFilterOperators = getGridNumericOperators().map((operator) => ({
            ...operator,
            InputComponent: RatingInputValue,
        }));

        columns[ratingColIndex] = {
            ...ratingColumn,
            filterOperators: ratingFilterOperators,
        };

    }

    const selected = data.filter((row) => selectionModel.includes(row.id));

    console.log('SELECTED', selected);

    return (
        <DataGrid
            checkboxSelection
            disableSelectionOnClick
            rows={data}
            columns={columns}
            pagination
            onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel(newSelectionModel);
            }}
            components={{
                Toolbar: GridToolbar,
            }}


        />
    );
}

// ----------------------------------------------------------------------



// ----------------------------------------------------------------------

RatingInputValue.propTypes = {
    item: PropTypes.object,
    applyValue: PropTypes.func,
};

function RatingInputValue({ item, applyValue }) {
    return (
        <Box sx={{ p: 1, height: 1, alignItems: 'flex-end', display: 'flex' }}>
            <Rating
                size="small"
                precision={0.5}
                placeholder="Buscar"
                value={Number(item.value)}
                onChange={(event, newValue) => {
                    applyValue({ ...item, value: newValue });
                }}
            />
        </Box>
    );
}
