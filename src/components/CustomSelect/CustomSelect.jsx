import React from 'react';
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";

import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle.jsx";

function CustomSelect({ ...props }) {
    const {
        classes,
        formControlProps,
        labelText,
        id,
        labelProps,
        inputProps,
        error,
        success,
        items
    } = props;

    const labelClasses = classNames({
        [" " + classes.labelRootError]: error,
        [" " + classes.labelRootSuccess]: success && !error
    });

    const underlineClasses = classNames({
        [classes.underlineError]: error,
        [classes.underlineSuccess]: success && !error,
        [classes.underline]: true
    });

    const marginTop = classNames({
        [classes.marginTop]: labelText === undefined
    });

    const [values, setValues] = React.useState({
        value: '',
        name: { labelText },
    });

    function handleChange(event) {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <form autoComplete="off">
            <FormControl  {...formControlProps}
                className={formControlProps.className + " " + classes.formControl}>
                {labelText !== undefined ? (
                    <InputLabel
                        className={classes.labelRoot + labelClasses}
                        htmlFor={id}
                        {...labelProps}
                    >
                        {labelText}
                    </InputLabel>
                ) : null}
                <Select
                    classes={{
                        root: marginTop,
                        disabled: classes.disabled,
                        underline: underlineClasses
                    }}
                    id={id}
                    value={values.value}
                    onChange={handleChange}                    
                    inputProps={{
                        name: 'value',
                        id,
                    }}
                >
                    {items.map(e => <MenuItem value={e.value}>{e.label}</MenuItem>)}
                </Select>
                {error ? (
                    <Clear className={classes.feedback + " " + classes.labelRootError} />
                ) : success ? (
                    <Check className={classes.feedback + " " + classes.labelRootSuccess} />
                ) : null}
            </FormControl>
        </form>
    );
}

export default withStyles(customInputStyle)(CustomSelect);