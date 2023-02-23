import {Component} from "react";
import ErrorMessage from "../errorMessage/ErrorMesage.jsx";

export class ErrorBoundery extends Component {
    state = {
        error: false
    }

    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return {error: true};
    }

    ComponentDidCatch(error, errorInfo) {
        console.log(errorInfo)
    }

    render() {
        return this.state.error ? <ErrorMessage/> : this.props.children;
    }
}