import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/DeleteRounded";
import Print from "@material-ui/icons/Print";

// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";

function CustomTable({ ...props }) {
    const { classes, tableHead, tableData, tableHeaderColor, actions } = props;
    return (
        <div className={classes.tableResponsive}>
            <Table className={classes.table}>
                {tableHead !== undefined ? (
                    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                        <TableRow className={classes.tableHeadRow}>
                            {
                                tableHead.map((prop, key) => {
                                    return (
                                        <TableCell
                                            className={classes.tableCell + " " + classes.tableHeadCell}
                                            key={key}
                                        >
                                            {prop}
                                        </TableCell>
                                    );
                                })
                            }
                        </TableRow>
                    </TableHead>
                ) : null}
                <TableBody>
                    {tableData.map((prop, key) => {
                        const itemId = prop[0];
                        return (
                            <TableRow key={key} className={classes.tableBodyRow}>
                                {
                                    prop.map((prop, key) => {
                                        return (
                                            <TableCell className={classes.tableCell} key={key}>
                                                {prop}
                                            </TableCell>
                                        );
                                    })
                                }
                                <TableCell className={classes.tableCell}>
                                    <IconButton onClick={actions.onPrint(itemId)}
                                        aria-label="Print"
                                        className={classes.tableActionButton}
                                    >
                                        <Print className=
                                            {
                                                classes.tableActionButtonIcon + " " + classes.print
                                            }
                                        />
                                    </IconButton>
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    <IconButton onClick={actions.onEdit(itemId)}
                                        aria-label="Edit"
                                        className={classes.tableActionButton}
                                    >
                                        <Edit className=
                                            {
                                                classes.tableActionButtonIcon + " " + classes.edit
                                            }
                                        />
                                    </IconButton>
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    <IconButton onClick={actions.onDelete(itemId)}
                                        aria-label="Delete"
                                        className={classes.tableActionButton}
                                    >
                                        <Delete className=
                                            {
                                                classes.tableActionButtonIcon + " " + classes.delete
                                            }
                                        />
                                    </IconButton>
                                </TableCell>

                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}

CustomTable.defaultProps = {
    tableHeaderColor: "gray",
    tableActions: []
};

CustomTable.propTypes = {
    classes: PropTypes.object.isRequired,
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ]),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(CustomTable);
