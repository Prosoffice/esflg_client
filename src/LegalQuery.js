// src/components/LegalQuery.js

import React, { useState } from 'react';
import axios from 'axios';
import './LegalQuery.css'
import {EXPERT_SYSTEM_SERVICE_URL} from "./API";

function LegalQuery() {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {


            const requestPayload = {
                query: query
            }
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'};
            const response = await axios.post(
                `${EXPERT_SYSTEM_SERVICE_URL}/generate-guide`,
                requestPayload,
                { headers }
            );
            setResponse(response.data);
        } catch (error) {
            console.error('Error submitting legal query:', error);
        }
    };

    return (
        <div className="container_wrap">
        <div className="container">
            <h2>Legal Query Submission</h2>
            <form onSubmit={handleSubmit}>
                <br />
                <br />
                <br />
        <textarea
            rows="4"
            cols="50"
            placeholder="Enter your legal query here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        ></textarea>
                <br />
                <button type="submit">Submit Query</button>
            </form>
            {response && (
                <div className="response">
                    <h3>Response:</h3>
                    <p className="responseParagraph"> Your query is closely related to {JSON.stringify(response.arti_number)} of GDPR</p>
                    <p className="responseParagraph">{JSON.stringify(response.response)}</p>
                </div>
            )}
        </div>
        </div>
    );
}

export default LegalQuery;
