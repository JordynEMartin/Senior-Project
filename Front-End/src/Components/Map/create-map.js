import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={16}
    defaultCenter={{ lat: 29.572851, lng: -97.985426 }}
  >
    {props.isMarkerShown && <Marker position={props.coordinates} />}
  	}
  </GoogleMap>
))

export default MyMapComponent;