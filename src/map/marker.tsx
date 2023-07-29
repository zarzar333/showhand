
import react, { useState, CSSProperties } from 'react';
import styled from '@emotion/styled';
import InfoWindow from './infoWindow';
import { palette1 } from '../colors';
import PlaceIcon from '@mui/icons-material/Place';
import { NearByData } from '../common/model';

const MarkerPin = styled.div<{isMain: boolean, type: string}>`
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid white;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  height: ${props => props.isMain ? '10px' : '15px'};
  width: ${props => props.isMain ? '10px' : '15px'};
  background-color: black;
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
`;

interface MarkerProps extends NearByData {
  showInfoWindow: boolean
};

const Box =  styled.div`
  width: 300px;
`;

function renderStars(rating: number) {
  let stars = '<div class="stars">';

  const fullStars = Math.floor(rating);
  const halfStar = (rating - fullStars) >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star star"></i>';
  }
  if (halfStar) {
    stars += '<i class="fas fa-star-half-alt star"></i>';
  }
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star star"></i>';
  }
  stars += "</div>"
  console.log(stars);
  return stars;
}

export default function Marker(props: MarkerProps) {
  const isMain = props.type == 'main';
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10'}}>
        <PlaceIcon fontSize='large' sx={{ color: palette1.get(props.type), position: 'relative', bottom: '1em' }} />
      </div>
      { props.showInfoWindow && <InfoWindow {...props} />}
    </>
  );
};
