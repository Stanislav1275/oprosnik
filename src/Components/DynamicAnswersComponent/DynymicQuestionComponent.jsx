import CardContent from "@material-ui/core/CardContent";
import {FormControl, FormLabel} from "@material-ui/core";
import {LimitedFormGroup} from "../LimitedFormGroup/LimitedFormGroup.jsx";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import questionMark from "../../assets/image/question.jpg"

export const DynamicQuestionComponent = ({setSelectedId, selectedId, question, answers, classes, setIsReady, cur}) => {
    let answersElements =
        <CardContent className={classes.answers}>

            <FormControl component="fieldset">
                <FormLabel className={classes.question} component="legend">{question}</FormLabel>

                <LimitedFormGroup
                    setSelectedId={
                        (id, cur) => {
                            setSelectedId(id, cur)
                        }
                    }
                    selectedId={selectedId} cur={cur} setIsReady={setIsReady} classes={classes.limited}
                    labels={answers}
                />

            </FormControl>

        </CardContent>
    return (
        <CardActionArea>

            <CardMedia

                style={{"border": "1px cursor black"}}
                className={classes.media}
                image={questionMark}
                title="Contemplative Reptile"
            />
            {answersElements}

        </CardActionArea>
    )
}