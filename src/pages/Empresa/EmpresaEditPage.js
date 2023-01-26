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
import EmpresaNewEditForm from '../../sections/@dashboard/empresa/EmpresaNewEditForm';

// ----------------------------------------------------------------------

export default function EmpresaEditPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const currentEmpresa = _userList.find((empresa) => paramCase(empresa.name) === name);

  return (
    <>
      <Helmet>
        <title> User: Edit user | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Editar empresa"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'empresa',
              href: PATH_DASHBOARD.empresa.list,
            },
            { name: currentEmpresa?.name },
          ]}
        />

        <EmpresaNewEditForm isEdit currentEmpresa={currentEmpresa} />
      </Container>
    </>
  );
}
