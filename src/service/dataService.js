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
    const getAllQuestions =async  () => {
        // clearError();
        const res = await request(url)
            .then(data => data["quiz"])
            .then(data => {
                return [...data["main"], ...data["b1"], ...data["b2"]]
            })
        return res;
    }
    const getBranch = async(branch = "main") => {
        const res = await request(url)
            .then(data => data["quiz"])
            .then(data => {

                return data[branch]
            })
        return res;
    }

    const getLength =async (branch = "main") => {
        const res = await request(url).then(data => {
            return data["quiz"][branch]["length"]

        });
        return res;
    }
    const calculateQuestion = async (branch) => {
        // clearError();
        let main = "main";
        const res = await request(url)
            .then(data => {
                main.forEach((m, index) => {
                    window[data["quiz"][branch][index]["rate_prof"][m]] += data["quiz"][0][index]["rate"][index]
                })


            })
        return res;

    }
    const calculateBranch = async() => {
        const res = await request(url)
            .then(data => data["branches"])
            .then(labels => {
                let max = labels[0];
                for(let label of labels) {
                    if(window.label > max) max = window.label;

                }
                return max;
            })
        return res;
    }
    const putAnswers = () => {

    }
    const calculateDirection = (answers) => {

    }
    // const
    return {error, loading, clearError, _getLabels, getLength, getBranch}
}