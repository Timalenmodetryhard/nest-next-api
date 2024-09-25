"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function Animals() {
    const router = useRouter()
    const [animals, setAnimals] = useState([]);
    const [currPage, setCurrPage] = useState(1)

    useEffect(() => {
        axios.get(`http://localhost:5000/animals`)
        .then(response => {
            console.log(response.data)
            setAnimals(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [currPage]);

    const currentAnimals = animals.slice((currPage-1) * 10, ((currPage-1) * 10) + 10);

    return (
        <div style={{padding: "0 24px"}}>
            <h1>List of animals</h1>
            <div className="main-div">
                <div className="item-field">
                    {currentAnimals.map((animal) => (
                    <div className="item-component" key={animal.id}>
                        <p>{animal.name}</p> 
                        <button type="button" onClick={() => router.push(`/animals/informations?id=${animal.id}`)}>View details</button>
                    </div>
                    ))}
                </div>
            </div>
            <div className="pagination-field">
                <button className="pagination-button" onClick={() => setCurrPage(1)} disabled={currPage<=1}>1</button>
                <button className="pagination-button" onClick={() => setCurrPage(currPage-1)} disabled={currPage<=1}>{"< "}1</button>
                <button className="pagination-button" onClick={() => setCurrPage(currPage-10)} disabled={currPage-9<=1}>{"<< "}10</button>
                <p> {currPage} / {animals.length/10+animals.length%10} </p>
                <button className="pagination-button" onClick={() => setCurrPage(currPage+1)} disabled={currPage>=animals.length/10+animals.length%10}>1{" >"}</button>
                <button className="pagination-button" onClick={() => setCurrPage(currPage+10)} disabled={currPage+9>=animals.length/10+animals.length%10}>10{" >>"}</button>
                <button className="pagination-button" onClick={() => setCurrPage(animals.length/10+animals.length%10)} disabled={currPage>=animals.length/10+animals.length%10}>{animals.length/10+animals.length%10}</button>
            </div>
        </div>
    );
}
