import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _userList } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import EmpleadoNewEditForm from '../../sections/@dashboard/empleado/EmpleadoNewEditForm';

// ----------------------------------------------------------------------

export default function EmpleadoEditPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const currentEmpleado = _userList.find((empleado) => paramCase(empleado.name) === name);

  return (
    <>
      <Helmet>
        <title> User: Edit user | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Editar empleado"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Empleado',
              href: PATH_DASHBOARD.empleado.list,
            },
            { name: currentEmpleado?.name },
          ]}
        />

        <EmpleadoNewEditForm isEdit currentEmpleado={currentEmpleado} />
      </Container>
    </>
  );
}
