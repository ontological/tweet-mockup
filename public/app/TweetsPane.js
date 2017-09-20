/*
 * File: TweetsPane.js
 * Description: React component for Tweet display, future search results?
 */

import React from 'react';
import axios from 'axios';

export class TweetsPane extends React.Component {
    constructor(props) {
        super(props);

        this.state = { data: [] };
    }

    // Get data from our API
    getTweets(screenname) {
        axios.get(`/api/verify?screenname=${screenname}`)
            .then(res => {
                const data = res.data.tweets;
                this.setState({ data: data });
            });
    }

    // Get data on first render.
    componentDidMount() {
        this.getTweets(this.props.screenname);
    }

    // Get data when component is updated.
    componentWillReceiveProps(nextProps) {
        this.getTweets(nextProps.screenname);
    }

    render() {
        return(
            <table>
                <tr>
                    <th>Date</th>
                    <th>Tweet</th>
                </tr>
                {this.state.data.map(tweet => (
                    <tr>
                        <td>{tweet.date}</td>
                        <td>{tweet.text}</td>
                    </tr>
                ))}

            </table>
        );
    }
}