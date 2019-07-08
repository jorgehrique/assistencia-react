import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function SimpleSelect({ ...props }) {
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

    const [values, setValues] = React.useState({
        value: '',
        name: {labelText},
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
                <InputLabel htmlFor={id}>{labelText}</InputLabel>
                <Select
                    value={values.value}
                    onChange={handleChange}
                    inputProps={{
                        name: 'value',
                        id: id,
                    }}
                >
                    {items.map(e => <MenuItem value={e.value}>{e.label}</MenuItem>)}
                </Select>
            </FormControl>
        </form>
    );
}