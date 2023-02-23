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


let QuestionCard = ({installBranch, quizList, setQuizList, setCur, cur}) => {
    const {loading, error, getQ, getLength} = dataService();
    const [isReady, setIsReady] = useState(false);
    const nextRef = useRef(null);
    const prevRef = useRef(null);
    const classes = useStyles();

    const nextHandler = () => {
        setCur(prevCur => prevCur + 1);
        setIsReady(false)
    }
    const reset = () => {
        localStorage.clear();
        setCur(0);
    }

    const prevHandler = () => {
        if (cur > 0)
            setCur(prevCur => prevCur - 1);
    }
//
    const spinner = ((loading && !error) || (!quizList.length && !error)) ? <Spinner/> : null;
    const errorMesage = (error)?<ErrorMessage/>:null;
    const content = (!loading && !error && quizList.length) ?
        <View setIsReady={setIsReady} question={quizList[cur]?.question} answers={quizList[cur]?.answers} classes={classes}/> : null;
    return (
        <Card
             className = {classes.root}>
            {errorMesage}
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
                        disabled={(cur >= quizList.length - 1 || loading) || !isReady}
                        ref={nextRef}
                        onClick={nextHandler}
                        size="small" color="primary">
                        Следующий
                    </Button>
                </Box>
            </CardActions>
        </Card>
    )

}
const View = ({question, answers, classes, setIsReady}) => {
    useEffect(() => {
    }, [])
    let answersElements =
        <CardContent className = {classes.answers}>

            <FormControl component="fieldset">
                <FormLabel className={classes.question} component="legend">{question}</FormLabel>

                <LimitedFormGroup  setIsReady = {setIsReady} classes = {classes.limited} labels={answers}/>

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