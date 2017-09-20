/*
 * File: App.js
 * Description: Base React component.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {SubmissionForm} from "./SubmissionForm";

class App extends React.Component {
    render() {
        return (
            <div>
                <SubmissionForm/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));