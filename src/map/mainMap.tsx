import react, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';
import data from '../data/data.json';

interface MainMapProps {
  zoom?: number,
  target: string,
};

const defaultProps = {
  zoom: 16
};

interface NearByData {
  id: number,
  lat: number,
  lng: number,
  name: string,
  type: string, 
  address: string,
}

interface Center {
  lat: number,
  lng: number,
}

interface MainMapState {
  loaded: boolean,
  targetInfo?: {
    lat: number
    lng: number,
    name: string
  }
  nearbys: Map<number, NearByData>,
}

export default function MainMap(props: MainMapProps) {
  const { zoom, target } = {...defaultProps, ...props};
  
  const [state, setState] = useState<MainMapState>({ loaded: false, nearbys: new Map()})
  const [center, setCenter] = useState<Center>();
  const { selectedTypes, selectedNearbyId, setSelectedNearbyId } = useContext(AppContext);
  
  useEffect(() => {
    const center = {
      // @ts-ignore
      lat: data.targetInfo[target]['Latitude'],
      // @ts-ignore
      lng: data.targetInfo[target]['Longitude'],
    }
    
    // @ts-ignore
    const nearbyDataRaw = data.nearby[target];
    const nearbyData: Map<number, NearByData> = new Map();
    // @ts-ignore
    nearbyDataRaw.forEach((row) => {
      if (row['直线距离'] < 800) {
        nearbyData.set(row.id, {
          id: row.id,
          lat: row.Latitude,
          lng: row.Longitude,
          name: row['名称'],
          type: row['设施类型'],
          address: row['地址'],
        });
      }
    });

    setState({
      loaded: true,
      // @ts-ignore
      targetInfo: {
        // @ts-ignore
        lat: data.targetInfo[target]['Latitude'],
        // @ts-ignore
        lng: data.targetInfo[target]['Longitude'],
        // @ts-ignore
        name: target,
      },
      nearbys: nearbyData
    })
    setCenter(center);
  }, [target]);

  useEffect(() => {
    if (selectedNearbyId && state.loaded && state.targetInfo) {
      const selectedNearby = state.nearbys.get(selectedNearbyId);
      if (selectedNearby) {
        setCenter({
          lat: selectedNearby.lat,
          lng: selectedNearby.lng
        })
      }
    }
  }, [selectedNearbyId])

  if (state.loaded && state.targetInfo) {
    console.log(center);
    return <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyD6HXYCwwfD8VIPQBN--lZ3VVJKR7JmAKU",
          language: 'ja',
          libraries: 'geometry',
        }}
        center={center}
        defaultZoom={zoom}
        onGoogleApiLoaded={({ map, maps }) =>
          new maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.07,
            map: map,
            center: center,
            radius: 600,
          })
        }

        onChildClick={(key) => {
          setSelectedNearbyId(key);
        }}
      >
        <Marker 
          key={-1}
          introduction={state.targetInfo?.name || ''}
          type={'main'}
          showInfoWindow={-1 == selectedNearbyId}
          rating={4.6}
          {...state.targetInfo}
        />

      {Array.from(state.nearbys.values())
        .filter((nearby) => selectedTypes.includes(nearby.type) || nearby.type == 'main' )
        .map((nearby) => (
        <Marker
          key={nearby.id}
          introduction={nearby.name}
          rating={4.5}
          {...nearby}
          showInfoWindow={nearby.id == selectedNearbyId}
        />
      ))} 

      </GoogleMapReact>
    </div>
  } else {
    return <></>
  }
}
