import QuestionCard from "../QuestionCard/QuestionCard.jsx";
import {useEffect, useState} from "react";
import {Quiz} from "../Quiz/Quiz.jsx";
import {dataService} from "../../service/dataService.js";
import {ErrorBoundery} from "../ErrorBoundery/ErrorBoundery.jsx";

function App(props) {

    return (
        <div className="App">
            <div className="quiz">
                <ErrorBoundery>
                    <Quiz/>
                </ErrorBoundery>
            </div>

        </div>
    )
}

export default App
