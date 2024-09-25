"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function AnimalInformations() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [person, setPerson] = useState([])
    const [animal, setAnimal] = useState([]);
    const [gotPerson, setGotPerson] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:5000/animals/${id}`)
        .then(response => {
            console.log(response.data);
            setAnimal(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    useEffect(() => {
        if (animal && !gotPerson) {
            axios.get(`http://localhost:5000/persons/${animal.ownerId}`)
        .then(response => {
            console.log(response.data);
            setPerson(response.data);
            setGotPerson(true);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
        }
    })

    return (
        <div className='information-field'>
            <h1>Informations</h1>
            <h2>Name </h2><br/><p>{animal.name}</p>
            <h2>Date of birth </h2><br/><p>{animal.dateOfBirth}</p>
            <h2>Specied </h2><br/><p>{animal.specied}</p>
            <h2>Breed </h2><br/><p>{animal.breed}</p>
            <h2>Color </h2><br/><p>{animal.color}</p>
            <h2>Weight </h2><br/><p>{animal.weight}</p>
            <h2>Belongs to </h2><br/><p>{person.lastName} {person.firstName}</p>
            <div><button type="button" onClick={() => router.push(`/animals`)}>Back</button></div>
        </div>
    );
}
