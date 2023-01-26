import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import EmpresaNewEditForm from '../../sections/@dashboard/empresa/EmpresaNewEditForm';

// ----------------------------------------------------------------------

export default function EmpresaCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> User: Create a new user | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Crear nueva empresa"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Empresa',
              href: PATH_DASHBOARD.user.list,
            },
            { name: 'Nueva Empresa' },
          ]}
        />
        <EmpresaNewEditForm />
      </Container>
    </>
  );
}
