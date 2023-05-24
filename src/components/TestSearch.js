import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HomeSearch() {
    const [bedroom, setBedroom] = useState(null);
    const [bathroom, setBathroom] = useState(null);
    const [address, setAddress] = useState('');
    const [checkin, setCheckin] = useState(null);
    const [checkout, setCheckout] = useState(null);
    const [min, setMinPrice] = useState(null);
    const [max, setMaxPrice] = useState(null);
    const [homes, setHomes] = useState([]);
    const [loading, setLoading] = useState(true)

    const searchHomes = () => {
        axios.get('http://localhost:8080/homes/search', {
            params: {
                bedroom,
                bathroom,
                address,
                checkin,
                checkout,
                min,
                max
            }
        })
            .then(response => {
                setHomes(response.data);
                console.log(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(() => {
        searchHomes();
    }, []);

    if (loading){
        return <div>loading...</div>
    }
    return (
        <div>
            <input type="number" placeholder="Bedroom" value={bedroom} onInput={(e) => setBedroom(e.target.value)} />
            <input type="number" placeholder="Bathroom" value={bathroom} onInput={(e) => setBathroom(e.target.value)} />
            <input type="text" placeholder="Address" value={address} onInput={(e) => setAddress(e.target.value)} />
            <input type="date" placeholder="Check-in" value={checkin} onInput={(e) => setCheckin(e.target.value)} />
            <input type="date" placeholder="Checkout" value={checkout} onInput={(e) => setCheckout(e.target.value)} />
            <input type="number" placeholder="Min Price" value={min} onInput={(e) => setMinPrice(e.target.value)} />
            <input type="number" placeholder="Max Price" value={max} onInput={(e) => setMaxPrice(e.target.value)} />

            <button onClick={searchHomes}>Search</button>


            {homes.map(home => (
                <table border={1}>
                    <tbody>
                    <tr>
                        <td>{home[0]}</td>
                        <td>{home[1]}</td>
                        <td>{home[2]}</td>
                        <td>{home[3]}</td>
                        <td>{home[4]}</td>
                        <td>{home[5]}</td>
                        <td>{home[6]}</td>
                    </tr>
                    </tbody>
                </table>
            ))}
        </div>
    );
}

export default HomeSearch;
