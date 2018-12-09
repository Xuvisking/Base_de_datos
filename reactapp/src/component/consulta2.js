import React from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
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

export default withStyles(styles)(class extends React.Component {
	  state = {
			fecha: '',
			dir: '',
			AM: '',
			AP: '',
	  	nombre: '',
			rut: '',
			open: false,
			resultado: null,
	  };
	  handleChange = prop => event => {
	    this.setState({ [prop]: event.target.value });
	  };
	  handleClose = () => {
    	this.setState({ open: false });
  	  };
	  sendCI = () => {
	  	this.setState({ open: true });
	  	fetch('http://127.0.0.1:8000/Tabla/IngresoTabla/', {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify({Rut: this.state.rut, Nombre: this.state.nombre, Apellido_P: this.state.AP, Apellido_M: this.state.AM, Direccion: this.state.dir, Fecha_nacimiento: this.state.fecha})
			})
				.then(res => res.text())
				.then(res => this.setState({
					resultado: (parseInt(this.state.rut, 10) > 0) ? res : 'Por favor ingrese datos válidos'
				}))
		}
		
	  render() {
	  	const { classes } = this.props

	    return (
	      <div className="TabContainer">
		      	<div className={classes.root}>
		        <FormControl fullWidth className={classes.margin}>
		          <InputLabel htmlFor="adornment-rut">Rut</InputLabel>
		          <Input
								id="adornment-rut"
		            value={this.state.rut}
		            onChange={this.handleChange('rut')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
		        </div>
		        <div className={classes.root}>
		        <FormControl fullWidth className={classes.margin}>
		          <InputLabel htmlFor="adornment-nombre">Nombre</InputLabel>
		          <Input
		            id="adornment-nombre"
		            value={this.state.nombre}
		            onChange={this.handleChange('nombre')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
		        </div>
						<div className={classes.root}>
		        <FormControl fullWidth className={classes.margin}>
		          <InputLabel htmlFor="adornment-AP">Apellido Paterno</InputLabel>
		          <Input
								id="adornment-AP"
		            value={this.state.AP}
		            onChange={this.handleChange('AP')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
		        </div>
						<div className={classes.root}>
		        <FormControl fullWidth className={classes.margin}>
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
		        <FormControl fullWidth className={classes.margin}>
		          <InputLabel htmlFor="adornment-dir">Direccion</InputLabel>
		          <Input
								id="adornment-dir"
		            value={this.state.dir}
		            onChange={this.handleChange('dir')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
		        </div>
						<div className={classes.root}>
		        <FormControl fullWidth className={classes.margin}>
		          <InputLabel htmlFor="adornment-fecha">Fecha de nacimiento</InputLabel>
		          <Input
								id="adornment-fecha"
		            value={this.state.fecha}
		            onChange={this.handleChange('fecha')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
		        </div>
                <img src="http://pm1.narvii.com/6208/41189d3e9af8e16b5f6687297180c2475d8adeba_00.jpg" alt="Smiley face" height="350"></img> 
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
		          <DialogTitle id="alert-dialog-title">{"Los datos ingresados son:"}</DialogTitle>
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
	    )
	  }
	}
)