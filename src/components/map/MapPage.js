import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import ListHomestay from "../ListHomestay";

const MapPage = ({ google }) => {
    const location = useLocation();
    const [initialCenter, setInitialCenter] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const lat = parseFloat(searchParams.get('lat'));
        const lng = parseFloat(searchParams.get('lng'));
        setInitialCenter({ lat, lng });
    }, [location]);

    // Trong MapPage component
    return (
        <div>
            <Map google={google} zoom={14} initialCenter={initialCenter}>
                <Marker position={initialCenter} />
            </Map>
            <ListHomestay google={google} /> {/* Truyền prop google vào ListHomestay */}
        </div>
    );

};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDqg8vdJfrsj_DeNn1TVYHWqNoM77UIUaM',
})(MapPage);
