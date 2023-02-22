import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import questionMark from "../../assets/image/question.jpg"
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Box} from "@material-ui/core";
import {LimitedFormGroup} from "../LimitedFormGroup/LimitedFormGroup.jsx";
import {dataService} from "../../service/dataService.js";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

let QuestionCard = ({cur}) => {
    const {loading, error, getQ} = dataService();
    const [qState, setQState] = useState(() => ({
        question: null,
        answers: null,
        rate: null,
        categories: null,
        rate_branches: null
    }));
    useEffect(() => {
        getQ(cur)
            .then(question => {
                setQState({...question})
            })
    }, [cur])
    const [selectedArray, setSelected] = useState(() => new Array(qState.answers).fill(false), [qState]);
    let changeHandler = (e, id) => {
        setSelected(prevArray => {
            prevArray[id] = e.target.checked;
            return [...prevArray];
        });
    }
    useEffect(() => {

    }, [])
    const nextHandler = () => {

    }
    const prevHandler = () => {

    }

    const classes = useStyles();
    let amountOfSelectedCheckboxLength = selectedArray.filter(v => v).length
    let answersElements =
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {qState.question}
            </Typography>

            <LimitedFormGroup upLimit={2} downLimit={3}
                              amountOfSelectedCheckboxLength={amountOfSelectedCheckboxLength}
                              selectedArray={selectedArray} changeHandler={changeHandler}
                              labels={qState.answers}>

            </LimitedFormGroup>



        </CardContent>

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    style={{'objectFit': 'cover', 'height': 200, 'objectPosition': '50% 50%'}}
                    className={classes.media}
                    image={questionMark}
                    title="Contemplative Reptile"
                />
                {answersElements}
            </CardActionArea>
            <CardActions>
                <Box width={"100%"} display="flex" justifyContent="space-between">
                    <Button
                        onClick={prevHandler}
                        size="small" color="primary">
                        Предыдущий
                    </Button>
                    <Button
                        onClick={nextHandler}
                        size="small" color="primary">
                        Следующий
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
}
export default QuestionCard;