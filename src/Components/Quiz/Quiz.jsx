import {Suspense, useEffect, useMemo, useState} from "react";
import QuestionCard from "../QuestionCard/QuestionCard.jsx";
import {dataService} from "../../service/dataService.js";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../errorMessage/ErrorMesage.jsx";
import "../Quiz/quiz.scss"

export const Quiz = () => {
    const {error, _getLabels, getBranch} = dataService();
    const [quizList, setQuizList] = useState([]);
    const [mainBranch, setMainBranch] = useState([]);
    const [branch, setBranch] = useState([]);


    const [cur, setCur] = useState(() => {
        return (localStorage.getItem("cur") == null) ? 0 : +localStorage.getItem("cur")
    });
    useEffect(() => {
        _getLabels()
            .then(labels => {
                for (let label of labels) {
                    window[label] = 0
                }
            })

    }, [])
    useEffect(() => {
        localStorage.setItem("cur", JSON.stringify(cur));
    }, [cur])
    useEffect(() => {
        if (localStorage.getItem("main") == null) {
            localStorage.setItem("main", JSON.stringify([]))
            localStorage.setItem("branch1", JSON.stringify([]))
            localStorage.setItem("branch2", JSON.stringify([]))
        }
    }, [])
    useEffect(() => {//в главную ветку
        getBranch()//branch = main
            .then(setMainBranch)
    }, []);
    const installBranch = (branch) => {
        getBranch(branch).then(setBranch);
    }
    return (
        <div className="quiz">
            <QuestionCard installBranch = {installBranch} setQuizList = {setQuizList} quizList = {quizList} cur={cur} setCur={setCur}/>
        </div>
    );
}
