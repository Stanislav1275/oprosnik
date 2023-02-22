import QuestionCard from "../QuestionCard/QuestionCard.jsx";
import {useEffect, useState} from "react";
import {Quiz} from "../Quiz.jsx";
import {dataService} from "../../service/dataService.js";

function App(props) {
    const {error, loading, getQ, clearError, _getLabels} = dataService();
    const [cur, setCur] = useState(() => {
        return (localStorage.getItem("cur") == null)?0:+localStorage.getItem("cur")
    });
    useEffect(() => {
            _getLabels()
                .then(labels => {
                    for(let label of labels){
                        window[label] = 0
                    }
                })
    }, [])
    useEffect(() => {
        localStorage.setItem("cur", JSON.stringify(cur));
    }, [cur])
    useEffect(() => {
        if(localStorage.getItem("main") == null){
            localStorage.setItem("main", JSON.stringify([]))
            localStorage.setItem("branch1", JSON.stringify([]))
            localStorage.setItem("branch2", JSON.stringify([]))
        }
    }, [])
    return (
        //quiz:cur,
        <div className="App">
            <div className="quiz">
                <QuestionCard
                    cur = {cur} setCur = {setCur}
                />
            </div>

        </div>
    )
}

export default App
