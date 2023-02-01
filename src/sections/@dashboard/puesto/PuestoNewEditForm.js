import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import { countries } from '../../../assets/data';
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------

PuestoNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentPuesto: PropTypes.object,
};

export default function PuestoNewEditForm({ isEdit = false, currentPuesto }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewPuestoSchema = Yup.object().shape({
    businessName: Yup.string().required('Ingrese la Razón social'),
    businessReason: Yup.string().required('Ingrese la Razón comercial'),
    RFC: Yup.string().required('Ingrese RFC'),
    email: Yup.string().required('Ingrese correo electrónico').email('De ser una dirección valida'),
    phoneNumber: Yup.string().required('Ingresé número de teléfono'),
    address: Yup.string().required('Ingrese dirección'),
    colony: Yup.string().required('Seleccione una colonia'),
    // company: Yup.string().required('Company is required'),
    state: Yup.string().required('Ingrese un estado'),
    city: Yup.string().required('Ingrese una ciudad'),
    // role: Yup.string().required('Role is required'),
    avatarUrl: Yup.string().required('Cargar imagen').nullable(true),
  });

  const defaultValues = useMemo(
    () => ({
      businessName: currentPuesto?.businessName || '',
      businessReason: currentPuesto?.businessReason || '',
      RFC: currentPuesto?. RFC || '',
      email: currentPuesto?.email || '',
      phoneNumber: currentPuesto?.phoneNumber || '',
      address: currentPuesto?.address || '',
      zipCode: currentPuesto?.zipCode || '',
      colony: currentPuesto?.colony || '',
      state: currentPuesto?.state || '',
      city: currentPuesto?.city || '',
      avatarUrl: currentPuesto?.avatarUrl || null,
      isVerified: currentPuesto?.isVerified || true,
      // status: currentPuesto?.status,
      // company: currentPuesto?.company || '',
      // role: currentPuesto?.role || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPuesto]
  );

  const methods = useForm({
    resolver: yupResolver(NewPuestoSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentPuesto) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentPuesto]);

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? '¡Su puesto fue creada!' : '¡Sus cambios fueron actualizados!');
      navigate(PATH_DASHBOARD.puesto.list);
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status === 'active' ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Formatos *.jpeg, *.jpg, *.png, *.gif
                    <br /> Tamaño máximo {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={9}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name="businessName" label="Razón social" />
              <RHFTextField name="businessReason" label="Razón comercial" />
              <RHFTextField name="RFC" label="RFC" />
              <RHFTextField name="email" label="Correo electrónico" />
              <RHFTextField name="phoneNumber" label="Teléfono" />
              <RHFTextField name="address" label="Dirección" />
              <RHFTextField name="zipCode" label="Código postal" />

              {/* <RHFSelect native name="country" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect> */}
              <RHFSelect native name="colony" label="Colonia" placeholder="Colonia">
                <option value="" />
                {countries.map((country) => (
                  <option key={country.code} value={country.label}>
                    {country.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="state" label="Estado" />
              <RHFTextField name="city" label="Delegación" />

            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear Puesto' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
