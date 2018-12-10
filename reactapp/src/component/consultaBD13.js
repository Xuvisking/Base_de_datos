import React from 'react';
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
	formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

export default withStyles(styles)(class extends React.Component {
	  state = {
			rut: 1000,
			muni: '',
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
	  	fetch('http://127.0.0.1:8080/Tabla/BD13/', {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify({
					muni: this.state.muni,Marca: this.state.Marca
			})
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
                <Typography variant="h6" color="inherit" noWrap>
                Numero de vehıculos de una misma marca que sacaron su permiso de circulacion en
determinada municipalidad
                </Typography>
								<form className={classes.root} autoComplete="off">
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
										<div className={classes.root}>
		        <FormControl className={classes.margin}>
		          <InputLabel htmlFor="adornment-Marca">Marca</InputLabel>
		          <Input
								id="adornment-Marca"
		            value={this.state.Marca}
		            onChange={this.handleChange('Marca')}
		            startAdornment={<InputAdornment position="start">></InputAdornment>}
		          />
		        </FormControl>
		        </div>
                </form>
		        <div className={classes.root}>
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
	    )
	  }
	}
)