import React from "react";
import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import "typeface-roboto";

class BillEntries extends React.Component {

  render() {
    const { classes, entries } = this.props;
    return (
      <Table padding="dense" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Worker</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Period</TableCell>
            <TableCell>Total hours</TableCell>
            <TableCell>Rate(€)</TableCell>
            <TableCell>Amount(€)</TableCell>
            <TableCell>VAT(%)</TableCell>
            <TableCell>Amount (VAT) (€)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map(entry => {
            return (
              <TableRow key={entry._id} >
                <TableCell component="th" scope="entry">
                  {moment(entry.start).format("DD.MM.YY")}
                </TableCell>
                <TableCell>{entry.worker.name}</TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell>{moment(entry.start).format("HH:mm")} - {moment(entry.end).format("HH:mm")}</TableCell>
                <TableCell>{entry.hoursFormatted}</TableCell>
                <TableCell>{entry.worker.rate}</TableCell>
                <TableCell>{entry.price}</TableCell>
                <TableCell>24%</TableCell>
                <TableCell>{entry.price*1.24}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(theme => ({
  root: {
    paddingTop: "20px"
  }
}))(BillEntries);
