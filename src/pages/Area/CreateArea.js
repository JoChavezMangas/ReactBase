import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import EmpleadoNewEditForm from '../../sections/@dashboard/empleado/EmpleadoNewEditForm';

// ----------------------------------------------------------------------

export default function EmpleadoCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Empleado</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Crear nuevo empleado"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Empleado',
              href: PATH_DASHBOARD.empleado.list,
            },
            { name: 'Nuevo Empleado' },
          ]}
        />
        <EmpleadoNewEditForm />
      </Container>
    </>
  );
}
