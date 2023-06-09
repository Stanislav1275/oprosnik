import React, {useEffect, useMemo, useRef, useState} from "react";
import {
    FormControlLabel,
    Radio,
    RadioGroup
} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export const LimitedFormGroup = ({setIsChanged, setSelectedId, selectedId, cur, setIsReady, labels, classes}) => {


    const saveChecksToLS = (id, cur = cur) => {
        let quizList = JSON.parse(
            localStorage.getItem("main")//...also branches
        )
        quizList[cur] = id;
        localStorage.setItem("main", JSON.stringify(quizList));
        return quizList;


    }

    let elements;
    elements =
        labels?.map((label, index) => {
            setTimeout(() => {
                if(selectedId !== undefined){
                    setIsReady(true);
                }
            }, 0)

            return (
                <FormControlLabel
                    onClick={() => {
                        setIsChanged(true);
                        setSelectedId(index, cur)
                        saveChecksToLS(index, cur);
                    }}
                    checked={index === selectedId}
                    key={index}

                    control={<Radio/>}
                    label={label}
                    value={label}
                />)
        })
    return (

        <RadioGroup className={classes} aria-label="quiz" name="customized-radios">
            {elements}
        </RadioGroup>
    );
}
