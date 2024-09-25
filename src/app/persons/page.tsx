"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function Persons() {
    const router = useRouter()
    const [persons, setPersons] = useState([]);
    const [currPage, setCurrPage] = useState(1)

    useEffect(() => {
        axios.get('http://localhost:5000/persons')
        .then(response => {
            console.log(response.data);
            setPersons(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const currentPersons = persons.slice((currPage-1) * 10, ((currPage-1) * 10) + 10);

    return (
        <div style={{padding: "0 24px"}}>
            <h1>List of persons</h1>
            <div className="main-div">
                <div className="item-field">
                    {currentPersons.map((person) => (
                        <div className="item-component" key={person.id}>
                            <p>{person.lastName} {person.firstName}</p> 
                            <button type="button" onClick={() => router.push(`/persons/informations?id=${person.id}`)}>View details</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pagination-field">
                <button className="pagination-button" onClick={() => setCurrPage(1)} disabled={currPage<=1}>First</button>
                <button className="pagination-button" onClick={() => setCurrPage(currPage-10)} disabled={currPage-9<=1}>Previous - 10</button>
                <button className="pagination-button" onClick={() => setCurrPage(currPage-1)} disabled={currPage<=1}>Previous</button>
                <p>{currPage}/{persons.length/10+persons.length%10}</p>
                <button className="pagination-button" onClick={() => setCurrPage(currPage+1)} disabled={currPage>=persons.length/10+persons.length%10}>Next</button>
                <button className="pagination-button" onClick={() => setCurrPage(currPage+10)} disabled={currPage+9>=persons.length/10+persons.length%10}>Next + 10</button>
                <button className="pagination-button" onClick={() => setCurrPage(persons.length/10+persons.length%10)} disabled={currPage>=persons.length/10+persons.length%10}>Last</button>
            </div>
        </div>
    );
}
