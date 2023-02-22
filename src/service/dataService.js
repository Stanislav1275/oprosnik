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
    const getQ = async (id) => {
        clearError();
        const res =
            await request(url)
                .then(data => data["quiz"])
                .then(data => {
                    console.log(data)
                    if(id < data[0].length){
                        return data[0][id]
                    }else return data[id]
                })

        return res;
    }
    // const
    return {error, loading, clearError, getQ, _getLabels}
}