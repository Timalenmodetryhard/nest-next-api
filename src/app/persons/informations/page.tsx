"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function PersonInformations() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [person, setPerson] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/persons/${id}`)
        .then(response => {
            console.log(response.data);
            setPerson(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div className="information-field">
            <h1>Informations</h1>
            <h2>Name </h2><br/><p>{person.lastName} {person.firstName}</p>
            <h2>Email </h2><br/><p>{person.email}</p>
            <h2>Phone number </h2><br/><p>{person.phoneNumber}</p>
            <div><button type="button" onClick={() => router.push(`/persons`)}>Back</button></div>
        </div>
    );
}
