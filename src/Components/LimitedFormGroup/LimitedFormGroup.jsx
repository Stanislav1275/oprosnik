import React, {useEffect, useMemo, useRef, useState} from "react";
import {
    FormControlLabel,
    Radio,
    RadioGroup
} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export const LimitedFormGroup = ({selectedId, checks, cur, setIsReady, labels, classes}) => {

    const isChecked = (indexA) => {
        return indexA === JSON.parse(localStorage?.getItem("main"))
    }
    const getChangedQuizListFromLS = async (id) => {
        let quizList = await JSON.parse(
            localStorage.getItem("main")//...also branches
        )
        quizList[cur] = id;
        return quizList;

        // await localStorage.setItem("main", JSON.stringify(quizList) );

    }
    let elements;
    elements =
        // useMemo(() =>
        labels?.map((label, index) => {
            setTimeout(() => {
                setIsReady(true);

            },0)

            return (
                <FormControlLabel
                onClick={(e) => {
                    console.log(selectedId)
                    getChangedQuizListFromLS(index)
                        .then(data => {
                            localStorage.setItem("main", JSON.stringify(data))
                        });
                }}
                // checked={index === JSON.parse(localStorage.getItem("main"))[cur]}
                key={index}

                control={<Radio  onClick={() => {
                    // console.log(2)
                }
                }/>}
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

// LimitedFormGroup.propsType = {
//     labels: PropTypes.objectOf(PropTypes.string)
// }