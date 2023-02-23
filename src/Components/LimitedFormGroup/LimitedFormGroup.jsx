import React, {useEffect, useMemo, useState} from "react";
import {
    FormControlLabel,
    Radio,
    RadioGroup
} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export const LimitedFormGroup = ({setIsReady, labels, classes}) =>{
    let elements;
    elements =  useMemo(() =>
        labels.map((label, index)  =>
            <FormControlLabel onClick={() => {
                setIsReady(true)
            }} key  = {index} control={<Radio/>} label={label} value={label}/>), [labels])
    return (

        <RadioGroup  className={classes} aria-label="quiz" name="customized-radios">
            {elements}
        </RadioGroup>
    );
}

// LimitedFormGroup.propsType = {
//     labels: PropTypes.objectOf(PropTypes.string)
// }