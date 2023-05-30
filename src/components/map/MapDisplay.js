import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapDisplay = (props) => {
    const [markerPosition, setMarkerPosition] = useState(null);

    useEffect(() => {
        // Thực hiện tìm kiếm tọa độ từ địa chỉ khi component được render
        const geocoder = new props.google.maps.Geocoder();
        geocoder.geocode({ address: props.address }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const { lat, lng } = results[0].geometry.location;
                setMarkerPosition({ lat: lat(), lng: lng() });
            } else {
                console.log('Không tìm thấy địa chỉ:', props.address);
            }
        });
    }, [props.address, props.google.maps.Geocoder]);

    const mapStyles = {
        width: '100%',
        height: '400px',
    };

    return (
        <Map
            google={props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{ lat: 21.0285, lng: 105.8542 }}
        >
            {markerPosition && <Marker position={markerPosition} />}
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDqg8vdJfrsj_DeNn1TVYHWqNoM77UIUaM',
})(MapDisplay);
