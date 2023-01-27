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
    Typography
} from '@mui/material';
// routes
import { paramCase } from 'change-case';
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
// import { _userList, _companyList } from '../../_mock/arrays';
import {_companyList } from '../../_mock/arrays';
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
import { UserTableRow } from '../../sections/@dashboard/user/list';
import { FiltroBandeja, RowEmpresaBandeja } from '../../sections/@dashboard/empresa/EmpresaBandeja';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'CompanyName', label: 'Razon social', align: 'left' },
    { id: 'ContactPhone', label: 'Telefono de contacto', align: 'left' },
    { id: 'CompanyMail', label: 'Correo Electronico', align: 'left' },
    { id: '', label: 'Acciones', align: 'center' },    
];

// ----------------------------------------------------------------------

export default function UserListPage() {
    const {
        dense,
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        //
        selected,
        setSelected,
        onSelectRow,
        onSelectAllRows,
        //
        onSort,
        onChangeDense,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable();

    const { themeStretch } = useSettingsContext();

    const navigate = useNavigate();
    // Crea la constante de la informacion a la tabla
    const [tableData, setTableData] = useState(_companyList);

    const [openConfirm, setOpenConfirm] = useState(false);

    const [filterName, setFilterName] = useState('');

    const [filterRole, setFilterRole] = useState('all');

    const [filterStatus, setFilterStatus] = useState('all');

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(order, orderBy),
        filterName,
        filterRole,
        filterStatus,
    });

    const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const denseHeight = dense ? 52 : 72;

    const isFiltered = filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

    const isNotFound =
        (!dataFiltered.length && !!filterName) ||
        (!dataFiltered.length && !!filterRole) ||
        (!dataFiltered.length && !!filterStatus);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleFilterName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const handleDeleteRows = (selectedRows) => {
        const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
        setSelected([]);
        setTableData(deleteRows);

        if (page > 0) {
            if (selectedRows.length === dataInPage.length) {
                setPage(page - 1);
            } else if (selectedRows.length === dataFiltered.length) {
                setPage(0);
            } else if (selectedRows.length > dataInPage.length) {
                const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
                setPage(newPage);
            }
        }
    };

    // Redirije en caso de edición
    const handleEditRow = (id) => {
        // const ruteID = paramCase(id);
        // navigate(PATH_DASHBOARD.user.edit(id));
        navigate(PATH_DASHBOARD.user.edit(paramCase(id)));
    };

    const handleResetFilter = () => {
        setFilterName('');
        setFilterRole('all');
        setFilterStatus('all');
    };

    const Company = "Empresa"
    const [openPopover, setOpenPopover] = useState(null);
    const handleOpenPopover = (event) => {
        setOpenPopover(event.currentTarget);
    };

    // const handleClosePopover = () => {
    //     setOpenPopover(null);
    // };


    return (
        <>
            <Helmet>
                <title> {Company} </title>
            </Helmet>

            <Container maxWidth={themeStretch ? false : 'lg'}>


                <CustomBreadcrumbs
                    heading={Company}
                    links={[
                        { name: '' },
                    ]}
                    action={
                        <Button
                            component={RouterLink}
                            to={PATH_DASHBOARD.user.new}
                            variant="contained"
                            startIcon={<Iconify icon="eva:plus-fill" />}
                        >
                            Crear nueva {Company}
                        </Button>
                    }
                />

                
                <Card>

                    {/* Seccion de filtro, debe moverse a un componente aparte  */}
                    <FiltroBandeja
                        isFiltered={isFiltered}
                        filterName={filterName}
                        onFilterName={handleFilterName}
                        onResetFilter={handleResetFilter}
                    />
                    {/* Fin Filtro  */}



                    <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>



                    {/* Seccion de Herramientas para seleccion de densidad,cantidad de registros y pagina, debe moverse a un componente aparte  */}
                        <TableSelectedAction
                            dense={false}
                            numSelected={selected.length}
                            rowCount={tableData.length}
                            onSelectAllRows={(checked) =>
                                onSelectAllRows(
                                    checked,
                                    tableData.map((row) => row.id)
                                )
                            }
                            action={
                                <Tooltip title="Borrar">
                                    <IconButton color="primary" onClick={handleOpenConfirm}>
                                        <Iconify icon="eva:trash-2-outline" />
                                    </IconButton>
                                </Tooltip>
                            }
                        />
                    {/* Fin seccion herramientas  */}



                        <Scrollbar>
                            <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={tableData.length}
                                    numSelected={selected.length}
                                    onSort={onSort}
                                    onSelectAllRows={(checked) =>
                                        onSelectAllRows(
                                            checked,
                                            tableData.map((row) => row.id)
                                        )
                                    }
                                />

                                <TableBody>
                                    {dataFiltered
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <RowEmpresaBandeja
                                                key={row.id}
                                                row={row}
                                                selected={selected.includes(row.id)}
                                                onSelectRow={() => onSelectRow(row.id)}
                                                onDeleteRow={() => handleDeleteRows(row.id)}
                                                onEditRow={() => handleEditRow(row.name)}
                                            />
                                        ))}


                                    <TableEmptyRows
                                        height={denseHeight}
                                        emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                                    />

                                    <TableNoData isNotFound={isNotFound} />
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </TableContainer>

                    <TablePaginationCustom
                        count={dataFiltered.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={onChangePage}
                        onRowsPerPageChange={onChangeRowsPerPage}
                        //
                        dense={dense}
                        onChangeDense={onChangeDense}
                    />
                </Card>
            </Container>

            <ConfirmDialog
                open={openConfirm}
                onClose={handleCloseConfirm}
                title="Borrar"
                content={
                    <>
                        Seguro que deseas borrar <strong> {selected.length} </strong> Empresas?
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDeleteRows(selected);
                            handleCloseConfirm();
                        }}
                    >
                        Borrar
                    </Button>
                }
            />
        </>
    );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterStatus, filterRole }) {
    const stabilizedThis = inputData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        inputData = inputData.filter(
            (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
        );
    }

    if (filterStatus !== 'all') {
        inputData = inputData.filter((user) => user.status === filterStatus);
    }

    if (filterRole !== 'all') {
        inputData = inputData.filter((user) => user.role === filterRole);
    }

    return inputData;
}
