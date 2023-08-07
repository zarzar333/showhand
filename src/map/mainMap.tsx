import react, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';
import data from '../data/data.json';
import { NearByData } from '../common/model';

interface MainMapProps {
  zoom?: number,
  target: string,
};

const defaultProps = {
  zoom: 16
};

interface Center {
  lat: number,
  lng: number,
}

interface MainMapState {
  loaded: boolean,
  targetInfo?: {
    lat: number
    lng: number,
    name: string,
    address: string,
    id: number,
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
          advanced1: row['高阶数据1'],
          advanced2: row['高阶数据2'],
          advanced3: row['高阶数据3'],
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
        address: data.targetInfo[target]['address'],
        // @ts-ignore
        name: target,
        // @ts-ignore
        id: data.targetInfo[target]['id'],
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
    return <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyD6HXYCwwfD8VIPQBN--lZ3VVJKR7JmAKU",
          language: 'ja',
          libraries: 'geometry',
        }}
        center={center}
        defaultZoom={zoom}
        onGoogleApiLoaded={({ map, maps }) => {

          const circle400 = new maps.Circle({
            strokeColor: "#DC582A",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#DC582A",
            fillOpacity: 0.0,
            map: map,
            center: center,
            radius: 400,
          });

          const circle800 = new maps.Circle({
            strokeColor: "#DC582A",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#DC582A",
            fillOpacity: 0.02,
            map: map,
            center: center,
            radius: 800,
          });

          const createLabel = (circle: any, text: string) => {
            // Create a div to hold the label text
            const div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.color = '#DC582A';
            div.innerHTML = text;
            div.style.fontSize = '16px';

            // Create a custom overlay to contain the text
            const customOverlay = new maps.OverlayView();
            customOverlay.onAdd = () => {
              customOverlay.getPanes().overlayMouseTarget.appendChild(div);
            };
            customOverlay.draw = () => {
              const projection = customOverlay.getProjection();
              const position = projection.fromLatLngToDivPixel(circle.getCenter());
              // Calculate the pixel position for the top of the circle using the radius
              const topPosition = projection.fromLatLngToDivPixel(
                new maps.LatLng(circle.getCenter().lat() + (0.000009 * circle.getRadius()), circle.getCenter().lng())
              );
              div.style.left = `${position.x - 10}px`; // Adjust this value to center the text
              div.style.top = `${topPosition.y + 10}px`; // This will position the label at the top of the circle
            };
            customOverlay.setMap(map);
          };

          // Create labels for both circles
          createLabel(circle400, '400');
          createLabel(circle800, '800');
        }}

        onChildClick={(key) => {
          setSelectedNearbyId(key);
        }}
      >
        <Marker 
          key={state.targetInfo.id}
          type={''}
          showInfoWindow={state.targetInfo.id == selectedNearbyId}
          {...state.targetInfo}
        />

      {Array.from(state.nearbys.values())
        .filter((nearby) => selectedTypes.includes(nearby.type) || nearby.type == 'main' )
        .map((nearby) => (
        <Marker
          key={nearby.id}
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
