import CardContent from "@material-ui/core/CardContent";
import {FormControl} from "@material-ui/core";
import {LimitedFormGroup} from "../LimitedFormGroup/LimitedFormGroup.jsx";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

export const DynamicQuestionComponent = ({checks, question, answers, classes, setIsReady, cur}) => {

    let answersElements =
        <CardContent className = {classes.answers}>

            <FormControl component="fieldset">
                <FormLabel className={classes.question} component="legend">{question}</FormLabel>

                <LimitedFormGroup checks = {checks} cur = {cur} setIsReady = {setIsReady} classes = {classes.limited} labels={answers}/>

            </FormControl>

        </CardContent>
    return (
        <CardActionArea>
            <CardMedia
                style={{"border":"1px cursor black"}}
                className={classes.media}
                image={questionMark}
                alt = "image"
                title="Contemplative Reptile"
            />
            {answersElements}
        </CardActionArea>
    )
}