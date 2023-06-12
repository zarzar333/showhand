
import react, { useState, CSSProperties } from 'react';
import styled from 'styled-components';
import InfoWindow from './infoWindow';

const MarkerPin = styled.div `
  border: 1px solid white;
  borderRadius: 50%;
  height: 10px;
  width: 10px;
  backgroundColor: blue;
  cursor: pointer;
  zIndex: 10;
`

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
  const main = props.type == 'main';
  const pinStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    border: "1px solid white",
    transform: 'translate(-50%, -50%)',
    borderRadius: "50%",
    height: main ? 20 : 15,
    width: main ? 20 : 15,
    backgroundColor:  main ? "red" : "blue",
    cursor: "pointer",
    zIndex: 2
  };
  return (
    <>
      <div style={pinStyle}/>
      { props.showInfoWindow && <InfoWindow {...props} />}
    </>
  );
};
