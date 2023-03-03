import {Suspense, useEffect, useMemo, useState} from "react";
import QuestionCard from "../QuestionCard/QuestionCard.jsx";
import {dataService} from "../../service/dataService.js";
import Spinner from "../spinner/Spinner.jsx";
import ErrorMessage from "../errorMessage/ErrorMesage.jsx";
import "../Quiz/quiz.scss"

export const Quiz = () => {
    const {loading, error, _getLabels, getBranch, getLength} = dataService();
    let  [quizList, setQuizList] = useState([]);
    const [mainLength, setMainLength] = useState(0);
    const [checks, setChecks] = useState([]);
    useEffect(() => {
        getLength().then(setMainLength)
    }, [])

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
        if (localStorage.getItem("main") == null) {
            localStorage.setItem("main", JSON.stringify([]))
        }else {
            let m = JSON.parse(localStorage.getItem('main'));
            if(m){
                setChecks(m);
            }

        }

    }, [])

    useEffect(() => {
        localStorage.setItem("cur", JSON.stringify(cur));
    }, [cur])

    useEffect(() => {
        installBranch()
    }, [])

    const installBranch =  (branch = "main") => {
        getBranch(branch).then(data =>
            setQuizList(prev => [...prev, ...data])
        );
    }
    // const spinner = (loading)
    return (
        <div className="quiz">
            fssdf
            {/*<QuestionCard setChecks = {setChecks} checks = {checks} loadingP = {loading} installBranch = {installBranch}  mainLength={mainLength} quizList={quizList} cur={cur}*/}
            {/*              setCur={setCur}/>*/}
        </div>
    );
}
