import React from 'react'
//import InputLabel from '@material-ui/core/InputLabel';
//import FormControl from '@material-ui/core/FormControl';
//import Input from '@material-ui/core/Input';
//import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
//import SendIcon from '@material-ui/icons/Send';
//import Dialog from '@material-ui/core/Dialog';
//import DialogActions from '@material-ui/core/DialogActions';
//import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
//import DialogTitle from '@material-ui/core/DialogTitle';

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
	  	comision: '',
			sueldo: '',
			open: false,
			resultado: null,
	  };
	  handleChange = prop => event => {
	    this.setState({ [prop]: event.target.value });
	  };
	  handleClose = () => {
    	this.setState({ open: false });
  	  };
	  sendSueldo = () => {
	  	this.setState({ open: true });
	  	fetch('http://127.0.0.1:8000/bruto_liquido/', {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify({sueldo: this.state.sueldo, afp: parseFloat(this.state.comision)/100})
			})
				.then(res => res.text())
				.then(res => this.setState({
					resultado: (parseInt(this.state.sueldo, 10) > 0 && parseFloat(this.state.comision) >= 0) ? res : 'Por favor ingrese datos válidos'
				}))
		}
		
	  render() {
	  	//const { classes } = this.props

	    return (
	      <div className="TabContainer">
	        <h1>
	          THE GAME
	        </h1>
	      </div>
	    )
	  }
	}
)