import { Helmet } from 'react-helmet-async';

import { useForm, FormProvider } from "react-hook-form";
// @mui
import {
    Container,
    Typography,
    TextField,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Divider,
    Stack,
    Card
} from '@mui/material';
import Box from '@mui/material/Box';

// components
import { useSettingsContext } from '../../components/settings';
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';
// ----------------------------------------------------------------------
export default function BlankPage() {
  const { themeStretch } = useSettingsContext();
    const { register, handleSubmit } = useForm();
    const onSubmit = data => console.log(data);
  return (
    <>
      <Helmet>
        <title> Creacion de Broker </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
              {/* <Typography variant="h6"> Hoja de Prueba </Typography> */}
        {/* <UserNewEditForm /> */}
      </Container>




          <Container maxWidth={themeStretch ? false : 'xl'}>
              <Typography variant="h3" component="h1" paragraph>
                  Registrar Broker
              </Typography>

              <Box
                  component="form"
                  sx={{
                      '& .MuiTextField-root': { m: 3, width: '40%' },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
              >

                  <h3>Datos del Broker</h3>
                  <Card>
                      <TextField
                          id="outlined-number"
                          label="Razon Social"
                          InputLabelProps={{
                              shrink: true,
                          }}
                          variant="standard"
                      />
                      <TextField
                          id="outlined-helperText"
                          label="Razon comercial"
                          defaultValue=""
                          helperText="Si es persona fisica solo primer nombre y apellido"
                      />
                      <TextField
                          id="outlined-number"
                          label="RFC"
                      />
                      <TextField
                          id="outlined-number"
                          label="Fecha de alta de la franquicia"
                          InputLabelProps={{
                              shrink: true,
                          }}
                      />
                      <Grid container margin="24px">
                          <Grid>
                              <FormControlLabel control={<Checkbox defaultChecked />} label="Elegir usuario" />
                          </Grid>
                      </Grid>
                      <TextField
                          id="outlined-number"
                          label="Usuario Asignado"
                          InputLabelProps={{
                              shrink: true,
                          }}
                      />


                      <Grid container margin="24px">

                          <FormLabel id="BrokerType">Tipo de Broker</FormLabel>
                          <Grid container >
                              <RadioGroup
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  defaultValue="female"
                                  name="radio-buttons-group"

                              >
                                  <FormControlLabel value="female" control={<Radio />} label="Persona Fisica" />
                                  <FormControlLabel value="male" control={<Radio />} label="Perosona Moral" />
                              </RadioGroup>
                          </Grid>
                      </Grid>


                      <TextField
                          id="outlined-helperText"
                          label="RFC"
                          defaultValue=""
                      />


                      <FormControl variant="filled" sx={{ m: 3, width: '40%' }}>
                          <InputLabel id="demo-simple-select-filled-label">Tipo de Broker</InputLabel>
                          <Select
                              labelId="demo-simple-select-filled-label"
                              id="demo-simple-select-filled"
                              value={10}
                          >
                              <MenuItem value="">
                                  <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Completa</MenuItem>
                              <MenuItem value={20}>Parcial</MenuItem>
                          </Select>
                      </FormControl>

                      <Divider variant="middle" />
                  </Card>
                  <h3>Datos del Representate legal</h3>

                  <Card>
                      <TextField
                          id="outlined-number"
                          label="Nombre"
                          InputLabelProps={{
                              shrink: true,
                          }}
                          variant="standard"
                      />
                      <TextField
                          id="outlined-number"
                          label="Segundo nombre"
                          InputLabelProps={{
                              shrink: true,
                          }}
                          variant="standard"
                      />
                      <TextField
                          id="outlined-number"
                          label="Apellido"
                          InputLabelProps={{
                              shrink: true,
                          }}
                          variant="standard"
                      />
                      <TextField
                          id="outlined-number"
                          label="Segundo apellido"
                          InputLabelProps={{
                              shrink: true,
                          }}
                          variant="standard"
                      />

                      <TextField
                          id="outlined-helperText"
                          label="CURP"
                          defaultValue=""
                      />
                      <TextField
                          id="outlined-helperText"
                          label="Telefono"
                          defaultValue=""
                      />
                      <TextField
                          id="outlined-helperText"
                          label="Correo"
                          defaultValue=""
                      />
                      <FormControlLabel variant="filled" sx={{ m: 3, width: '40%' }} control={<Checkbox />} label="Requiere notificacion" />
                  </Card>
                  <Divider variant="middle" />
                  <h3>Datos Bancarios</h3>
                  <Card>
                      <TextField
                          id="outlined-helperText"
                          label="Cuenta de banco"
                          defaultValue=""
                      />
                      <TextField
                          id="outlined-helperText"
                          label="Clave"
                          defaultValue=""
                      />

                      <Stack variant="filled" sx={{ m: 3, width: '40%' }}>
                          <InputLabel id="demo-simple-select-filled-label">Banco</InputLabel>
                          <Select
                              labelId="demo-simple-select-filled-label"
                              id="demo-simple-select-filled"
                              value={10}
                          >
                              <MenuItem value="">
                                  <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Banorte</MenuItem>
                              <MenuItem value={20}>HSBC</MenuItem>
                              <MenuItem value={30}>City Babamex</MenuItem>
                              <MenuItem value={40}>Afirme</MenuItem>
                          </Select>
                      </Stack>


                      <Stack direction="row" sx={{
                          m: 3, width: '40%'
                      }}>
                          <Button type="submit" variant="contained">Guardar</Button>
                      </Stack>
                  </Card>
              </Box>

          </Container>




    </>
  );
}
