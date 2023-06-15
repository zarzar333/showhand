import react from 'react';
import styled from '@emotion/styled';

interface InfoWindowProps {
  name: String,
  introduction?: String,
  type: String,
  rating: number,
}

const InfoWindowBox = styled.div`
  position: relative;
  bottom: 150px;
  left: -45px;
  width: 220px;
  box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.3);
  background-color: white;
  padding: 10px;
  font-size: 14px;
  z-index: 1000;
`

export default function InfoWindow(props: InfoWindowProps) {
  const { name, introduction, rating, type } = props;

  return (
    <InfoWindowBox>
      <div style={{ fontSize: 16 }}>{name}</div>
      <div style={{ fontSize: 14 }}>
        <span style={{ color: "grey" }}>{introduction} {rating}</span>
        <span style={{ color: "orange" }}>
          {String.fromCharCode(9733).repeat(Math.floor(rating))}
        </span>
        <span style={{ color: "lightgrey" }}>
          {String.fromCharCode(9733).repeat(5 - Math.floor(rating))}
        </span>
      </div>
      <div style={{ fontSize: 14, color: "grey" }}>{type}</div>
    </InfoWindowBox>
  );
};