import {Checkbox, FormControlLabel, FormGroup} from "@material-ui/core";
import React, {useEffect, useMemo, useState} from "react";

export const LimitedFormGroup = ({upLimit, downLimit, changeHandler, labels, selectedArray, amountOfSelectedCheckboxLength}) => {
    let [isReady, setIsReady] = useState(false);
    let isUpLimit = amountOfSelectedCheckboxLength >= upLimit;
    let isDownLimit = amountOfSelectedCheckboxLength < downLimit;
    useEffect(() => {
        if(amountOfSelectedCheckboxLength >= upLimit && amountOfSelectedCheckboxLength <= downLimit){
            setIsReady(true);
        }else setIsReady(false);
    }, [selectedArray])
    let elements;
    elements = useMemo(() => labels?.map((label, index) => {
        return <FormControlLabel
            key={index}
            control={
                <Checkbox

                    disableRipple={true}
                    disabled={!isDownLimit && !selectedArray[index]}
                    onChange={
                        (e) => {

                            changeHandler(e, index)
                        }
                    } defaultChecked={false}/>
            } label={label}/>
    }), [amountOfSelectedCheckboxLength]);
    return (

        <FormGroup>
            {elements}
        </FormGroup>
    );
}
const View = ({elements}) => {
    return (
        <FormGroup>
            {elements}
        </FormGroup>
    )
}
// LimitedFormGroup.propsType = {
//     labels: PropTypes.objectOf(PropTypes.string)
// }