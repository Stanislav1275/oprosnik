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
    const getQ = async (id, branch = "main") => {
        // clearError();
        const res =
            await request(url)
                .then(data => data["quiz"])
                .then(data => {
                    if(id < data["main"].length){
                        return data["main"][id]
                    }else return data[id]
                })

        return res;
    }
    const getLength =async (branch = "main") => {
        const res = await request(url).then(data => {
            return data["quiz"][branch]["length"]

        });
        return res;
    }
    const calculateQuestion = async (main, b1, b2) => {
        // clearError();
        const res = await request(url)
            .then(data => {
                main.forEach((m, index) => {
                    window[data["quiz"][0][index]["rate_prof"][m]] += data["quiz"][0][index]["rate"][index]
                })
                b1.forEach((b, index) => {
                    window[data["quiz"][index]["rate_prof"][b]] += data["quiz"][index]["rate"][index]
                })
                b2.forEach((b, index) => {
                    window[data["quiz"][index]["rate_prof"][b]] += data["quiz"][index]["rate"][index]
                })

            })
        return res;

    }
    // const
    return {error, loading, clearError, _getLabels, getLength, getBranch}
}