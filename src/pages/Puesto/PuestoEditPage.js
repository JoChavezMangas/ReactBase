import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _userList } from '../../_mock/arrays';
// components
import { useSettingsContext } from '../../components/settings';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
// sections
import PuestoNewEditForm from '../../sections/@dashboard/puesto/PuestoNewEditForm';

// ----------------------------------------------------------------------

export default function PuestoEditPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const currentPuesto = _userList.find((puesto) => paramCase(puesto.name) === name);

  return (
    <>
      <Helmet>
        <title> Puesto</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={
            <Typography variant='h4' color='primary'>Editar puesto</Typography>
          }
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Puesto',
              href: PATH_DASHBOARD.puesto.list,
            },
            { name: currentPuesto?.name },
          ]}
        />

        <PuestoNewEditForm isEdit currentPuesto={currentPuesto} />
      </Container>
    </>
  );
}
