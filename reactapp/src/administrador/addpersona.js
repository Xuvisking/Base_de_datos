import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit,
    minWidth: 150,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
  button: {
    position: 'fixed',
    bottom: 20,
    right: 20,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class SimpleSelect extends React.Component {
  state = {
		estado: '',
    muni: '',
    Suc: '',
    labelWidth: 0,
    comision: '',
	sueldo: '',
	open: false,
	resultado: null,
  };

  handleChange1 = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleClose = () => {
    this.setState({ open: false });
    };
    sendCI = () => {
        this.setState({ open: true });
        fetch('http://127.0.0.1:8080/Tabla/IngresoTabla/', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                Muniid: this.state.muniid, Municipalidad: this.state.muni, Sucursal: this.state.Suc,  Sucid: this.state.Sucid,
                Rut: this.state.rut, Nombre: this.state.nombre, Apellido_P: this.state.AP, 
                Apellido_M: this.state.AM, Direccion: this.state.dir, Fecha_nacimiento: this.state.fecha,
                Patente: this.state.patente, Modelo: this.state.modelo, Marca: this.state.marca,
                Anoauto: this.state.yearauto, Nchasis: this.state.NChasis, Nmotor:this.state.NMotor,
                Multaid: this.state.MultaID , Valormulta: this.state.valor , Fechamulta: this.state.FEmis,
                Desmulta: this.state.descripcion, Estmulta: this.state.estado,
                Perid: this.state.PerID, Fechaper: this.state.VenPer , Precioper: this.state.PrecioPer,
                Revisionid: this.state.RevID , Vigenciarev: this.state.vigenciaRev,
                Soid: this.state.SOID, Fechaso: this.state.venSO
            })
          })
              .then(res => res.text())
              .then(res => this.setState({
                  resultado: (parseInt(this.state.rut, 10) > 0) ? res : 'Por favor ingrese datos válidos'
              }))
      }

  render() {
    const { classes } = this.props;

    return (
            <div className="TabContainer">
                <Typography variant="h6" color="inherit" noWrap>
                        Inserte datos de persona con multa
                </Typography>
                <form className={classes.root} autoComplete="off">
											<FormControl className={classes.margin}>
										<InputLabel htmlFor="adornment-muniid">Municipalidad ID</InputLabel>
										<Input
											id="adornment-muniid"
											value={this.state.muniid}
											onChange={this.handleChange('muniid')}
											startAdornment={<InputAdornment position="start">></InputAdornment>}
										/>
									</FormControl>
                    <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="adornment-muni">Municipalidad</InputLabel>
                    <Select
                        value={this.state.muni}
                        onChange={this.handleChange1}
                        inputProps={{
                        name: 'muni',
                        id: 'adornment-muni',
                        }}
                    >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Lo Prado'}>Lo Prado</MenuItem>
                    <MenuItem value={'Maipu'}>Maipu</MenuItem>
                    <MenuItem value={'Pudahuel'}>Pudahuel</MenuItem>
                    </Select>
                    </FormControl>
										<FormControl className={classes.margin}>
										<InputLabel htmlFor="adornment-Sucid">Sucursal ID</InputLabel>
										<Input
											id="adornment-Sucid"
											value={this.state.Sucid}
											onChange={this.handleChange('Sucid')}
											startAdornment={<InputAdornment position="start">></InputAdornment>}
										/>
									</FormControl>
                    <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="adornment-Suc">Sucursal</InputLabel>
                    <Select
                        value={this.state.Suc}
                        onChange={this.handleChange1}
                        inputProps={{
                        name: 'Suc',
                        id: 'adornment-Suc',
                        }}
                    >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Sucursal A'}>Sucursal A</MenuItem>
                    <MenuItem value={'Sucursal B'}>Sucursal B</MenuItem>
                    </Select>
                    </FormControl>
                    <FormControl className={classes.margin}>
		        </FormControl>
                </form>
                <Typography variant="h6" color="inherit" noWrap>
                        Persona
                </Typography>
                <div className={classes.root}>
		        <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-rut">Rut (ENTERO)</InputLabel>
		          <Input
								id="adornment-rut"
		            value={this.state.rut}
		            onChange={this.handleChange('rut')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
		       
		        <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-nombre">Nombre</InputLabel>
		          <Input
		            id="adornment-nombre"
		            value={this.state.nombre}
		            onChange={this.handleChange('nombre')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
		       
		        <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-AP">Apellido Paterno</InputLabel>
		          <Input
								id="adornment-AP"
		            value={this.state.AP}
		            onChange={this.handleChange('AP')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
		       
		        <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-AM">Apellido Materno</InputLabel>
		          <Input
								id="adornment-AM"
		            value={this.state.AM}
		            onChange={this.handleChange('AM')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
		        </div>
						<div className={classes.root}>
		        <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-dir">Direccion</InputLabel>
		          <Input
								id="adornment-dir"
		            value={this.state.dir}
		            onChange={this.handleChange('dir')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
		        
		        <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-fecha">Fecha de nacimiento (AÑO-MES-DIA)</InputLabel>
		          <Input
								id="adornment-fecha"
		            value={this.state.fecha}
		            onChange={this.handleChange('fecha')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
                </div>
                <Typography variant="h6" color="inherit" noWrap>
                        Vehiculo
                </Typography>
                <div className={classes.root}>
		        <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-patente">Patente</InputLabel>
		          <Input
								id="adornment-patente"
		            value={this.state.patente}
		            onChange={this.handleChange('patente')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>

		        <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-modelo">Modelo</InputLabel>
		          <Input
								id="adornment-modelo"
		            value={this.state.modelo}
		            onChange={this.handleChange('modelo')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
                <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-marca">Marca</InputLabel>
		          <Input
								id="adornment-marca"
		            value={this.state.marca}
		            onChange={this.handleChange('marca')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
		        <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-yearauto">Año (AÑO-MES-DIA)</InputLabel>
		          <Input
								id="adornment-yearauto"
		            value={this.state.yearauto}
		            onChange={this.handleChange('yearauto')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl> 
                </div>             
                <div className={classes.root}>
                <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-NChasis">Numero de chasis (ENTERO)</InputLabel>
		          <Input
								id="adornment-NChasis"
		            value={this.state.NChasis}
		            onChange={this.handleChange('NChasis')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
		        <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-NMotor">Numero de motor (ENTERO)</InputLabel>
		          <Input
								id="adornment-NMotor"
		            value={this.state.NMotor}
		            onChange={this.handleChange('NMotor')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
                </div>
                <Typography variant="h6" color="inherit" noWrap>
                    Datos de la multa
                </Typography>
                <div className={classes.root}>
                <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-MultaID">MultaID</InputLabel>
		          <Input
								id="adornment-MultaID"
		            value={this.state.MultaID}
		            onChange={this.handleChange('MultaID')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
		        <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-valor">Valor (ENTERO)</InputLabel>
		          <Input
								id="adornment-valor"
		            value={this.state.valor}
		            onChange={this.handleChange('valor')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
                <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-FEmis">Fecha de emision (AÑO-MES-DIA)</InputLabel>
		          <Input
								id="adornment-FEmis"
		            value={this.state.FEmis}
		            onChange={this.handleChange('FEmis')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
                <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-descripcion">Descripcion</InputLabel>
		          <Input
								id="adornment-descripcion"
		            value={this.state.descripcion}
		            onChange={this.handleChange('descripcion')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
                </div>
                <div className={classes.root}>
                    <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="adornment-estado">Estado</InputLabel>
                    <Select
                        value={this.state.estado}
                        onChange={this.handleChange1}
                        inputProps={{
                        name: 'estado',
                        id: 'adornment-estado',
                        }}
                    >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={'Pagado'}>Pagado</MenuItem>
                    <MenuItem value={'No pagado'}>No pagado</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                <Typography variant="h6" color="inherit" noWrap>
                    Datos del permiso de circulacion
                </Typography>
                <div className={classes.root}>
                <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-PerID">Permiso de circulacion ID</InputLabel>
		          <Input
								id="adornment-PerID"
		            value={this.state.PerID}
		            onChange={this.handleChange('PerID')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
                <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-VenPer">Fecha de vencimiento (AÑO-MES-DIA)</InputLabel>
		          <Input
								id="adornment-VenPer"
		            value={this.state.VenPer}
		            onChange={this.handleChange('VenPer')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
                <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-PrecioPer">Precio (ENTERO)</InputLabel>
		          <Input
								id="adornment-PrecioPer"
		            value={this.state.PrecioPer}
		            onChange={this.handleChange('PrecioPer')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
                </div>
                <Typography variant="h6" color="inherit" noWrap>
                    Datos de la revision tecnica
                </Typography>
                <div className={classes.root}>
                <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-RevID">Revision tecnica ID (ENTERO)</InputLabel>
		          <Input
								id="adornment-RevID"
		            value={this.state.RevID}
		            onChange={this.handleChange('RevID')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
                <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-vigenciaRev">Vigencia (AÑO-MES-DIA)</InputLabel>
		          <Input
								id="adornment-vigenciaRev"
		            value={this.state.vigenciaRev}
		            onChange={this.handleChange('vigenciaRev')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
                </div>
                <Typography variant="h6" color="inherit" noWrap>
                    Datos del seguro obligatorio
                </Typography>
                <div className={classes.root}>
                <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-SOID">Seguro Obligatorio ID</InputLabel>
		          <Input
								id="adornment-SOID"
		            value={this.state.SOID}
		            onChange={this.handleChange('SOID')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
                <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-venSO">Fecha de vencimiento (AÑO-MES-DIA)</InputLabel>
		          <Input
								id="adornment-venSO"
		            value={this.state.venSO}
		            onChange={this.handleChange('venSO')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
                </div>

                <div>
		        <Button variant="fab" color="primary" aria-label="Send" onClick={this.sendCI} className={classes.button}>
        			<SendIcon />
      			</Button>
						{(parseInt(this.state.rut, 10)>0) ?
							<Dialog
		          open={this.state.open}
		          onClose={this.handleClose}
		          aria-labelledby="alert-dialog-title"
		          aria-describedby="alert-dialog-description"
		        >
		          <DialogTitle id="alert-dialog-title">{"Datos correctamente ingresados"}</DialogTitle>
		          <DialogContent>
		            <DialogContentText id="alert-dialog-description" style={{fontSize: 40}}>
		              {this.state.resultado}
		            </DialogContentText>
		          </DialogContent>
		          <DialogActions>
		            <Button onClick={this.handleClose} color="primary">
		              OK
		            </Button>
		          </DialogActions>
						</Dialog> : 
						<Dialog
						open={this.state.open}
						onClose={this.handleClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description" style={{fontSize: 40}}>
								Por favor ingrese datos validos
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								OK
							</Button>
						</DialogActions>
					</Dialog>}
      			</div>
    </div>
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);