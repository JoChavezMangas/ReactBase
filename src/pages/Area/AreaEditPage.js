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
import AreaNewEditForm from '../../sections/@dashboard/area/AreaNewEditForm';

// ----------------------------------------------------------------------

export default function AreaEditPage() {
  const { themeStretch } = useSettingsContext();

  const { name } = useParams();

  const currentArea = _userList.find((area) => paramCase(area.name) === name);

  return (
    <>
      <Helmet>
        <title> User: Edit user | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={
            <Typography variant='h4' color='primary'>Editar Área</Typography>
          }
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Area',
              href: PATH_DASHBOARD.area.list,
            },
            { name: currentArea?.name },
          ]}
        />

        <AreaNewEditForm isEdit currentArea={currentArea} />
      </Container>
    </>
  );
}
