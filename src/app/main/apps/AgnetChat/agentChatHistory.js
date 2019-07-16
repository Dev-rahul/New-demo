import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link} from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function createData(name, email, message) {
  return { name, email, message};
}

const rows = [
  createData( 'Rahul', 'rahulm@netstratum.com', 'Agent Dashboard not working.....'),
  createData('Amartnath', 'amarnath@netstratum.com', 'Agent Dashboard not working.....'),
  createData('Jerin', 'jerin@netstratum.com', 'Agent Dashboard not working.....'),
  createData('Vipin', 'vipin@netstratum.com', 'Agent Dashboard not working.....'),
  createData('Shiva', 'shiva@netstratum.com', 'Agent Dashboard not working.....'),

];

export default function AgentChatHistory() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Message</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
              <Link to={{ pathname: '/apps/chatLog', state: { id: row.name} }}> {row.name} </Link>
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.message}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}