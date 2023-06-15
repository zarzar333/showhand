
import react, { useState, CSSProperties } from 'react';
import styled from '@emotion/styled';
import InfoWindow from './infoWindow';
import { palette1 } from '../colors';


const MarkerPin = styled.div<{isMain: boolean, type: string}>`
  position: absolute;
  top: 50%;
  left: 50%;
  border: 1px solid white;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  height: ${props => props.isMain ? '20px' : '15px'};
  width: ${props => props.isMain ? '20px' : '15px'};
  background-color: ${props => palette1.get(props.type)};
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  color: white;

  &:after {
    content: "";
    position: absolute;
    width: 2px;
    height: 10px;
    background-color: ${props => palette1.get(props.type)};
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
  }
`;

interface MarkerProps {
  lat: number,
  lng: number,
  name: string,
  introduction?: string,
  rating: number,
  type: string,
  showInfoWindow: boolean,
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
  const pinStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    border: "1px solid white",
    transform: 'translate(-50%, -50%)',
    borderRadius: "50%",
    height: isMain ? 20 : 15,
    width: isMain ? 20 : 15,
    backgroundColor:  palette1.get(props.type),
    cursor: "pointer",
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2em', 
    color: 'white',
  
  };
  return (
    <>
      <MarkerPin isMain={isMain} type={props.type}/>
      { props.showInfoWindow && <InfoWindow {...props} />}
    </>
  );
};
