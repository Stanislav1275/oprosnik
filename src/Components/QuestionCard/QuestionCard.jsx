import React, {useEffect, useMemo, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import questionMark from "../../assets/image/question.jpg"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import {Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, setRef} from "@material-ui/core";
import {LimitedFormGroup} from "../LimitedFormGroup/LimitedFormGroup.jsx";
import {dataService} from "../../service/dataService.js";
import Spinner from "../spinner/Spinner.jsx";
import Skeleton from "../skeleton/Skeleton.jsx";
import ErrorMessage from "../errorMessage/ErrorMesage.jsx";
import skeleton from "../skeleton/Skeleton.jsx";
import {ErrorBoundery} from "../ErrorBoundery/ErrorBoundery.jsx";
import {DynamicQuestionComponent} from "../DynamicAnswersComponent/DynymicQuestionComponent.jsx";

const useStyles = makeStyles({
    root: {
        marginTop: 10,
        minHeight: 400,
        width: 400,
    },
    media: {
        height: 300,
    },
    answers: {

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: 250,
    },
    limited: {},
    question: {}
});


let QuestionCard = ({setChecks, checks, loadingP, mainLength, installBranch, quizList, setCur, cur, setQuizList}) => {
    const {loading, error, calculateBranchFromMain, _getLabels} = dataService();
    const [newBranchLoading, setNewBranchLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    const nextRef = useRef(null);
    const prevRef = useRef(null);
    const classes = useStyles();
    const nextState = useMemo(() => {
        return cur === mainLength - 1 ? 'следующий этап' : cur === quizList.length - 1 ? "закончить" : "следующий";

    }, [cur, mainLength]);

    useEffect(() => {
        if (error) localStorage.clear()
    }, [error])
    const nextHandler = () => {
        if (nextState === 'следующий этап' && localStorage.getItem("branch") === "head") {
            if (quizList.length <= mainLength)
                calculateBranchFromMain(checks)
                    .then(branch => {
                        installBranch(branch)
                        localStorage.setItem("branch", branch);

                    })
        }
        // console.log(nextState)
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
        setIsEnded(prev => !prev)
    }
    const prevHandler = () => {
        if (cur > 0)
            setCur(prevCur => prevCur - 1);
    }
//
    let setCurIdInChecks = (id, cur) => {
        setChecks(prev => {
            let copy = [...prev];
            copy[cur] = id;
            return copy;
        })
    }
    const spinner = (((loadingP && !quizList?.length) || (loading) || (!quizList?.length) || !quizList[cur]) && !error) ?
        <Spinner/> : null;
    const errorMessage = (error) ? <ErrorMessage/> : null;
    const content = (!loading && !error && quizList.length !== 0 && quizList[cur]) ?
        <DynamicQuestionComponent
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
                <Box width={"100%"} display="flex" justifyContent="space-between">
                    <Button
                        ref={prevRef}
                        disabled={cur <= 0 || loading}
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
                        disabled={((cur >= quizList.length || loading || !isReady))}
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