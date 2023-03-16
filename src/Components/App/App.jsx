import {Quiz} from "../Quiz/Quiz.jsx";
import {ErrorBoundery} from "../ErrorBoundery/ErrorBoundery.jsx";
import "../../index.css"
function App() {

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
