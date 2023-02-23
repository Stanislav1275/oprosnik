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
                console.log(data)
            })
        return res;
    }
    const getBranch = async(branch = "main") => {

    }
    const getQ = async (id) => {
        // clearError();
        const res =
            await request(url)
                .then(data => data["quiz"])
                .then(data => {
                    if(id < data[0].length){
                        return data[0][id]
                    }else return data[id]
                })

        return res;
    }
    const getLength =async () => {
        const res = await request(url).then(data => {
            return data["quiz"]["length"]

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
    return {error, loading, clearError, getQ, _getLabels, getLength}
}