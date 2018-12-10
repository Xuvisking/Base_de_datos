import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import Consulta from './consulta.js';
import ConsultaBD from './consultaBD.js';
import ConsultaBD2 from './consultaBD2.js';
import ConsultaBD3 from './consultaBD3.js';
import ConsultaBD4 from './consultaBD4.js';
import ConsultaBD5 from './consultaBD5.js';
import ConsultaBD6 from './consultaBD6.js';
import ConsultaBD7 from './consultaBD7.js';
import ConsultaBD8 from './consultaBD8.js';
import ConsultaBD9 from './consultaBD9.js';
import ConsultaBD10 from './consultaBD10.js';
import ConsultaBD11 from './consultaBD11.js';
import ConsultaBD12 from './consultaBD12.js';
import ConsultaBD13 from './consultaBD13.js';
import ConsultaBD14 from './consultaBD14.js';
import ConsultaBD15 from './consultaBD15.js';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class PersistentDrawerLeft extends React.Component {
  state = {
    open: false,
    value: 0,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChange = (value) => this.setState({value})

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Consulta Multa de Vehiculos
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Consulta de Multa','BD1','BD2','BD3','BD4','BD5','BD6','BD7','BD8','BD9','BD10','BD11','BD12','BD13','BD14','BD15'].map((text, index) => (
              <ListItem button key={text} onClick={() => this.handleChange(index)} >
                <ListItemIcon><SendIcon /></ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        > 
          <div className={classes.drawerHeader} />
          { this.state.value === 0 && <Consulta/> }
          { this.state.value === 1 && <ConsultaBD/> }
          { this.state.value === 2 && <ConsultaBD2/> }
          { this.state.value === 3 && <ConsultaBD3/> }
          { this.state.value === 4 && <ConsultaBD4/> }
          { this.state.value === 5 && <ConsultaBD5/> }
          { this.state.value === 6 && <ConsultaBD6/> }
          { this.state.value === 7 && <ConsultaBD7/> }
          { this.state.value === 8 && <ConsultaBD8/> }
          { this.state.value === 9 && <ConsultaBD9/> }
          { this.state.value === 10 && <ConsultaBD10/> }
          { this.state.value === 11 && <ConsultaBD11/> }
          { this.state.value === 12 && <ConsultaBD12/> }
          { this.state.value === 13 && <ConsultaBD13/> }
          { this.state.value === 14 && <ConsultaBD14/> }
          { this.state.value === 15 && <ConsultaBD15/> }

        </main>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default (withStyles(styles, { withTheme: true })(PersistentDrawerLeft));