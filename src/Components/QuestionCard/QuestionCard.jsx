import React, {useEffect, useMemo, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import {Box} from "@material-ui/core";
import {dataService} from "../../service/dataService.js";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../errorMessage/ErrorMesage.jsx";
import {DynamicQuestionComponent} from "../DynamicAnswersComponent/DynymicQuestionComponent.jsx";

const useStyles = makeStyles((theme) =>({
    root: {
        marginTop: 10,
        [theme.breakpoints.down(600)]:{
            width: "80%",
            minHeight: 400
        },
        [theme.breakpoints.up(650)]:{
            width: 400,

            minHeight: 400
        },
        [theme.breakpoints.up(1700)]:{
            minWidth: 500,
            minHeight: 500
        }

    },
    media: {
        minHeight: 300,
        width:"auto",
        blockSize:"fit-content",
        [theme.breakpoints.up(1900)]:{
            minHeight: 500
        }

    },
    answers: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // minHeight: 250,
    },
    btns:{
        [theme.breakpoints.down(340)]:{
            flexDirection: "column"
        }
    }
}));


let QuestionCard = ({errorP, setChecks, checks, loadingP, mainLength, installBranch, quizList, setCur, cur, setQuizList}) => {
    const {loading, error, calculateBranchFromMain, _getLabels, calculateDirection} = dataService();
    const [isChanged, setIsChanged] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const nextRef = useRef(null);
    const prevRef = useRef(null);
    const classes = useStyles();
    const isError = errorP || error;
    const isLoading =/* useMemo (() => {
        return*/ ((loadingP || loading || !quizList || !quizList?.length || !quizList[cur]) && !isError);
    /*}, [loading, quizList, cur])*/

    const nextState = /*useMemo(() => {*/
        /*return */cur === mainLength - 1 ? 'следующий этап' : cur === quizList.length - 1 ? "закончить" : "следующий";

    // }, [cur, mainLength]);

    useEffect(() => {
        if (error) localStorage.clear()
    }, [error])
    const nextHandler = () => {
        if (nextState === 'следующий этап' && localStorage.getItem("branch") === "head" || isChanged && nextState === 'следующий этап') {
            // if (quizList.length <= mainLength) {
                calculateBranchFromMain(checks)
                    .then(branch => {//!!тут говна поел ты
                        if(isChanged)
                            setChecks(prev => prev.slice(0, mainLength))

                        setQuizList(prev => {
                            return prev.slice(0, mainLength);
                        })
                        installBranch(branch)
                        localStorage.setItem("branch", branch);

                    })
                setIsEnded(false);
                setIsChanged(false);
            // }

        }
        else if(nextState === "закончить"){
            calculateDirection(checks.slice(mainLength), localStorage.getItem("branch"))
                .then(() => {
                })
            setIsEnded(true);
            setIsReady(false);
            return;
        }
        setCur(prevCur => prevCur + 1);
        setIsReady(false)
    }
    const reset = () => {

        localStorage.setItem("main", JSON.stringify([]));
        localStorage.setItem("cur", '0');
        localStorage.setItem("branch", "head");
        _getLabels()
            .then(branches => {
                branches.forEach(branch => {
                    window[branch] = 0;
                });
            })
        setChecks([]);
        setQuizList(prev => prev.slice(0, mainLength))
        setIsReady(false);
        setCur(0);
        setIsEnded(false);
        setIsChanged(false);
    }
    const prevHandler = () => {
        if (cur > 0)
            setCur(prevCur => prevCur - 1);
        if(isEnded) setIsEnded(false);
    }
//
    let setCurIdInChecks = (id, cur) => {
        setChecks(prev => {
            let copy = [...prev];
            copy[cur] = id;
            return copy;
        })
    }
    const spinner = isLoading ?
        <Spinner/> : null;
    const errorMessage = (isError) ? <ErrorMessage/> : null;
    const content = (!isLoading && !isError && quizList[cur]["answers"] !== undefined) ?
        <DynamicQuestionComponent
            setIsChanged = {setIsChanged}
            isEnded={isEnded}
            cur={cur}
            setIsReady={setIsReady}
            selectedId={checks[cur]}
            setSelectedId={(id, cur) => setCurIdInChecks(id, cur)}
            question={quizList[cur].question}
            answers={quizList[cur].answers}
            classes={classes}

        >

        </DynamicQuestionComponent> : null;
    return (
        <Card
            className={classes.root}>
            {errorMessage}
            {spinner}
            {content}
            <CardActions>
                <Box  width={"100%"} className={classes.btns} display="flex" justifyContent="space-between">
                    <Button

                        ref={prevRef}
                        disabled={cur <= 0 || isLoading}//какая-то беда с useMemo(isLoading)
                        onClick={prevHandler}
                        size="small" color="primary">
                        Предыдущий

                    </Button>
                    <Button
                        onClick={reset}
                        size="small" color="primary">
                        Сбросить/Начать
                    </Button>
                    <Button
                        disabled={((cur >= quizList.length || isLoading || !isReady))}
                        ref={nextRef}
                        onClick={nextHandler}
                        size="small" color="primary">
                        {nextState}
                    </Button>
                </Box>
            </CardActions>
        </Card>
    )

}

export default QuestionCard;