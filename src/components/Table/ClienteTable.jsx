import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import IconButton from "@material-ui/core/IconButton";

import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/DeleteRounded";
import Assignment from "@material-ui/icons/Assignment";

const tableHead = ['Id', 'Nome', 'CPF', 'Telefone', 'Detalhes', 'Editar', 'Excluir'];

function CustomTable({ ...props }) {
    const { classes, tableData, tableHeaderColor, actions } = props;
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
                                <TableCell
                                    className={classes.tableCell + " " + classes.tableHeadCell}
                                    key={key}
                                >
                                    <IconButton onClick={() => actions.onDetails(itemId)}
                                        aria-label="Assignment"
                                        className={classes.tableActionButton}
                                    >
                                        <Assignment
                                            className={
                                                classes.tableActionButtonIcon + " " + classes.assignment
                                            }
                                        />
                                    </IconButton>
                                </TableCell>

                                <TableCell
                                    className={classes.tableCell + " " + classes.tableHeadCell}
                                    key={key}
                                >
                                    <IconButton onClick={() => actions.onEdit(itemId)}
                                        aria-label="Edit"
                                        className={classes.tableActionButton}
                                    >
                                        <Edit
                                            className={
                                                classes.tableActionButtonIcon + " " + classes.edit
                                            }
                                        />
                                    </IconButton>
                                </TableCell>

                                <TableCell
                                    className={classes.tableCell + " " + classes.tableHeadCell}
                                    key={key}
                                >
                                    <IconButton onClick={() => actions.onDelete(itemId)}
                                        aria-label="Delete"
                                        className={classes.tableActionButton}
                                    >
                                        <Delete
                                            className={
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
