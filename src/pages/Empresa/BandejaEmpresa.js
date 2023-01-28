import { Helmet } from 'react-helmet-async';
// import { paramCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
    Card,
    Table,
    Button,
    Tooltip,
    // Divider,
    TableBody,
    Container,
    IconButton,
    TableContainer,
    InputAdornment,
    TextField,
    Stack,
    TableRow,
    TableCell,
    Checkbox,
    Typography,
    CardHeader,
    Box,
    MenuItem
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
// routes
import { paramCase } from 'change-case';
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// import { _userList, _companyList } from '../../_mock/arrays';
import { _companyList, _dataList } from '../../_mock/arrays';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import ConfirmDialog from '../../components/confirm-dialog';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../components/settings';
import {
    useTable,
    getComparator,
    emptyRows,
    TableNoData,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedAction,
    TablePaginationCustom,
} from '../../components/table';
// sections
import GenericDataGridCustom from '../../sections/_examples/mui/data-grid/GenericDataGridCostom';
import Label from '../../components/label';
import { CustomAvatar } from '../../components/custom-avatar';
import MenuPopover from '../../components/menu-popover';




export default function BandejaEmpresa() {

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openPopover, setOpenPopover] = useState(null);
    const navigate = useNavigate();
    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };
    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
    const handleOpenPopover = (event,id) => {
        console.log(event)
        console.log(event.currentTarget)
        setOpenPopover(event.currentTarget);
    };
    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const handleEditRow = (id) => {
        console.log(id)
        navigate(PATH_DASHBOARD.empresa.edit(paramCase(id)));
    };

    // const handleDeleteRow = (id) => {
    //    const deleteRow = tableData.filter((row) => row.id !== id);
    //    setSelected([]);
    //    setTableData(deleteRow);

    //    if (page > 0) {
    //        if (dataInPage.length < 2) {
    //            setPage(page - 1);
    //        }
    //    }
    // };


    const columns = [
        {
            field: 'id',
            hide: true,
        },
        {
            field: 'avatar',
            headerName: '',
            align: 'center',
            headerAlign: 'center',
            width: 64,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => <CustomAvatar name={params.row.name} sx={{ width: 36, height: 36 }} />,
        },
        {
            field: 'name',
            headerName: 'Razon Social',
            flex: 1,
            editable: true,
        },
        {
            field: 'Phone',
            headerName: 'Telefono',
            flex: 1,
            editable: false,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ textDecoration: 'underline' }} noWrap>
                    {params.row.phone}
                </Typography>
            ),
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            editable: true,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ textDecoration: 'underline' }} noWrap>
                    {params.row.email}
                </Typography>
            ),
        },
        {
            field: 'status',
            type: 'singleSelect',
            headerName: 'Status',
            valueOptions: ['Activo', 'Inactivo', 'Bloqueado'],
            align: 'center',
            headerAlign: 'center',
            width: 120,
            renderCell: (params) => RenderStatus(params.row.status),
        },
        {
            field: 'action',
            headerName: 'Acciones',
            align: 'center',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover }>
                    <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
            ),
        },
    ];






    return (
        <>
            <Helmet>
                <title> Empresa </title>
            </Helmet>

            <Container>
                <Card>
                    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                        <Box sx={{ height: 800 }}>
                                <GenericDataGridCustom data={_dataList} columns={columns} />
                        </Box>
                    </TableContainer>
                </Card>
            </Container>



            <MenuPopover
                open={openPopover}
                onClose={handleClosePopover}
                arrow="right-top"
                sx={{ width: 140 }}
            >
                <MenuItem
                    onClick={() => {
                        handleOpenConfirm();
                        handleClosePopover();
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon="eva:trash-2-outline" />
                    Borrar
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        handleEditRow('some');
                        handleClosePopover();
                    }}
                >
                    <Iconify icon="eva:edit-fill" />
                    Editar
                </MenuItem>
            </MenuPopover>


            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Borrar"
                content="Deseas borrar esta empresa?"
                action={
                    <Button variant="contained" color="error" onClick={console.log(this)}>
                        Borrar
                    </Button>
                }
            />

        </>
    );
}


 function RenderStatus(getStatus) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    return (
        <Label
            variant={isLight ? 'soft' : 'filled'}
            color={(getStatus === 'Bloqueado' && 'error') || (getStatus === 'Inactivo' && 'warning') || 'success'}
            sx={{ mx: 'auto' }}
        >
            {getStatus}
        </Label>
    );
 }
