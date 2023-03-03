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

const useStyles = makeStyles({
    root: {
        marginTop:10,
        minHeight:400,
        width: 400,
    },
    media: {
        height: 300,
    },
    answers:{

        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        minHeight:250,
    },
    limited:{
    },
    question:{
    }
});


let QuestionCard = ({setChecks, checks, loadingP,mainLength, installBranch, quizList, setCur, cur, setQuizList}) => {
    const {loading, error} = dataService();
    const [newBranchLoading, setNewBranchLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [isEnded, setIsEnded] = useState(false);
    // const [selectedId, setSelectedId] = useState(null);
    const nextRef = useRef(null);
    const prevRef = useRef(null);
    const classes = useStyles();
    const nextState = useMemo(() => {
        return  cur === mainLength - 1?'следующий этап':cur === quizList.length - 1?"закончить":"следующий";

    }, [cur, mainLength]);
    useEffect(() =>  {
        if(cur === mainLength - 1){
            installBranch("it");
        }
        // if(cur )
        // (cur >= quizList.length - 1 || loading) || !isReady
        // setIsEnded((cur >= quizList.length - 1);
    }, [cur])

    useEffect(() => {
        if(error) localStorage.clear()
    },[error])
    const nextHandler = () => {
        setCur(prevCur => prevCur + 1);
        setIsReady(false)
    }
    const reset = () => {

        localStorage.setItem("main", JSON.stringify([]));
        setCur(0);
    }

    const prevHandler = () => {
        if (cur > 0)
            setCur(prevCur => prevCur - 1);
    }
//
    const spinner = ((loadingP && !quizList?.length)|| (loading && !error) || (!quizList?.length && !error)) ? <Spinner/> : null;
    const errorMessage = (error)?<ErrorMessage/>:null;
    const content = (!loading && !error && quizList.length) ?
        <View  cur={cur} selectedId={checks[cur]} setIsReady={setIsReady} question={quizList[cur]?.question} answers={quizList[cur]?.answers} classes={classes}/> : null;
    return (
        <Card
             className = {classes.root}>
            {errorMessage}
            {spinner}
            {content}
            <CardActions>
                <Box width={"100%"} display="flex" justifyContent="space-between">
                    <Button
                        ref={prevRef}
                        disabled={cur <= 0  || loading}
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
const View = ({selectedId, question, answers, classes, setIsReady, cur}) => {

    let answersElements =
        <CardContent className = {classes.answers}>

            <FormControl component="fieldset">
                <FormLabel className={classes.question} component="legend">{question}</FormLabel>

                <LimitedFormGroup selectedId={selectedId} cur = {cur} setIsReady = {setIsReady} classes = {classes.limited} labels={answers}/>

            </FormControl>

        </CardContent>
    return (
        <CardActionArea>
            <CardMedia
                style={{"border":"1px cursor black"}}
                className={classes.media}
                image={questionMark}
                title="Contemplative Reptile"
            />
            {answersElements}
        </CardActionArea>
    )
}
export default QuestionCard;