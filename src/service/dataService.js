import {useHttp} from "./useHttp.js";

export const dataService = () => {
    let url = "./src/state/data.json";
    let {error, loading, request, clearError} = useHttp();
    const _getLabels = async () => {
        const res = await request(url)
            .then(data => {
                let brs = data["branches"];
                let dirs = data["directions"];

                return [...brs, ...dirs];
            })
        return res;
    }
    const finishQuiz = () => {

    }

    const getBranch = async (branch = "main") => {
        const res = await request(url)
            .then(data => data["quiz"])
            .then(data => {

                return data[branch]
            })
        return res;
    }

    const getLength = async (branch = "main") => {
        const res = await request(url).then(data => {
            return data["quiz"][branch]["length"]

        });
        return res;
    }

    const calculateBranchFromMain = async (answers) => {
        const branches = await request(url)
            .then(data => data["branches"])
        const res = await request(url)
            .then(data => data["quiz"]["main"])
            .then(main => {
                for (let i = 0; i < main.length; i++) {
                    let mainEl = main[i];
                    let ansEl = answers[i];
                    // console.log(mainEl["rate_prof"][ansEl])
                    // console.log(ansEl)
                    let rateArr = [];
                    if (mainEl["rate_prof"].length > 1) {
                        rateArr = mainEl["rate_prof"][ansEl];
                        for (let rate of rateArr) {
                            window[rate] += mainEl["rate"][ansEl];
                        }
                    } else {
                        rateArr = mainEl["rate_prof"][0];

                        window[rateArr[ansEl]] += mainEl["rate"][ansEl];
                    }


                }
                let maxCount = window[branches[0]];
                let maxBranch = branches[0];
                for (let branch of branches) {
                    if (window[branch] > maxCount) {
                        maxCount = window[branch];
                        maxBranch = branch;
                    }
                }
                localStorage.setItem("branch", maxBranch);
                return maxBranch;
            })

        return res;
    }
    const putAnswers = () => {

    }
    const calculateDirection = (answers) => {

    }
    // const
    return {error, loading, clearError, _getLabels, getLength, getBranch, calculateBranchFromMain}
}