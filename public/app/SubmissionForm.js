/*
 * File: SubmissionForm.js
 * Description: React component for form to submit information for Tweet verification.
 */

import React from 'react';
import {TweetsPane} from "./TweetsPane";

export class SubmissionForm extends React.Component {
    constructor(props) {
        super(props);

        // Store data without changing state.
        let data = {
            screenname: '',
            body: '',
            date: '',
        };

        this.state = data;

        // To update data without changing state.
        this.updateName = (name) => data.screenname = name;
        this.updateBody = (body) => data.body = body;
        this.updateDate = (date) => data.date = date;
        this.getData = () => data;

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.enterToSubmitTextArea = this.enterToSubmitTextArea.bind(this);
    }

    // Function to check required fields and change state.
    updateComponent() {
        let fields = this.getData();

        if(fields.screenname === '' && fields.body === '') {
            alert('Please provide a username and tweet text.');
        } else if(fields.screenname === '') {
            alert('Please provide a username.');
        } else if(fields.body === '') {
            alert('Please provide the tweet text.');
        } else {
            this.setState(fields);
        }
    }

    ////////////////////
    // Event Handlers //
    ////////////////////
    // For username
    handleNameChange(e) {
        this.updateName(e.target.value);
    }

    // For Tweet entry
    handleBodyChange(e) {
        this.updateBody(e.target.value);
    }

    // For date
    handleDateChange(e) {
        this.updateDate(e.target.value);
    }

    // For submit button
    handleSubmit(e) {
        // Prevent default of going to new page.
        e.preventDefault();

        this.updateComponent();
    }

    // To allow for Enter to submit form.
    enterToSubmitTextArea(e) {
        if(e.which === 13 && !e.shiftKey) {
            e.preventDefault();

            this.updateComponent();
        }
    }

    render() {
        console.log(this.state);
        const submissionForm = (
            <form id="submission-form" onSubmit={this.handleSubmit}>
                <label>Twitter Username:</label><br />
                <input id="screen-name" name="screenname" onChange={this.handleNameChange}/><br />
                <label>Tweet:</label><br/>
                <textarea cols="50" rows="5" id="tweet-body" name="body" onChange={this.handleBodyChange}
                          onKeyPress={this.enterToSubmitTextArea}/><br/>
                <label>Date: </label>
                <input id="tweet-date" name="date" type="date" onChange={this.handleDateChange}/>
                <input type="submit" />
            </form>
        );

        // Render only form initially.
        if(this.state.screenname === '')
            return (
                <div>
                    {submissionForm}
                </div>
            );

        // Render with TweetsPane when user submits data.
        return (
            <div>
                {submissionForm}
                <TweetsPane screenname={this.state.screenname} body={this.state.body ? this.state.body : ''}
                            date={this.state.date ? this.state.date : ''}/>
            </div>
        )
    }
}