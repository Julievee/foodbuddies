/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-use-before-define */
// eslint-disable-next-line no-restricted-syntax

/* eslint-disable no-undef */
'use client';

import { Grid } from '@material-ui/core';
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { getPlacesData } from './api';
import List from './components/List/List';

export const metadata = {
  description: 'This is my Home Page',
};


export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}
function Map() {
  const center = useMemo(() => ({ lat: 48.208176, lng: 16.373819 }), []);
  const [selected, setSelected] = useState(null);

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlacesData()
      .then((data) => {
        console.log(data);
        setPlaces(data);
      })
  }, []);


  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      <Grid container spacing={3} style={{width: '100%'}}>
      <Grid item xs={12} md={4}>
      <List
        places={places}
      />

      </Grid>
      <Grid item xs={12} md={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <GoogleMap
        zoom={13}
        center={center}
        mapContainerClassName="map-container"/>
        </Grid>
      </Grid>
        {selected && <Marker position={selected} />}
    </>
  );
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };
  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === 'OK' &&
            data.map(({ place_id, description }) => (
              // eslint-disable-next-line no-restricted-syntax
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
