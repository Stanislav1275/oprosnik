import {List, ListItem} from "@material-ui/core";
export const Finish = () => {
    let style = {
        fontSize:"20"
    }
    let name = localStorage.getItem("info");
    name = !name?null:JSON.parse(name)
    return (
        <div className="conclusion">
            <h1>{name?.name}</h1>
            { name && <ul>
                {name?.description.map((el, index) => <li style={style} key={index}>{el}</li>)}

            </ul>}
        </div>
    );
}