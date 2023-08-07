import react from 'react';
import styled from '@emotion/styled';
import { NearByData } from '../common/model';

interface InfoWindowProps extends NearByData {
}

const InfoWindowBox = styled.div`
  position: relative;
  bottom: 150px;
  left: -45px;
  width: 300px;
  box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.3);
  background-color: white;
  padding: 0px;
  font-size: 14px;
  z-index: 1000;
`

export default function InfoWindow(props: InfoWindowProps) {
  const { id, name, address, type, advanced1, advanced2, advanced3, distance } = props;

  return (
    <InfoWindowBox>
      <img src={`/showhand/photos/${id}.png`} alt="locationPhoto" style={{ width: '300px', height: '200px' }} />
      <div style={{ padding: 10, textAlign: 'left' }}>
        <div style={{ fontSize: 18, fontWeight: 'bold' }}>{name}</div>
        <div style={{ fontSize: 14, color: "black"  }}>
          <div>
            <span>{address}</span>
          </div>
          <div　>
          { distance && <span style={{ fontSize: 12, color: "black"  }}>{`${(Math.floor(distance))}メートル`}</span> }
          </div>
        </div>
        <div style={{ fontSize: 12, color: "grey" }}>
          <div>{type}</div>
          {renderIfNonnullAndNonEmpty(advanced1)}
          {renderIfNonnullAndNonEmpty(advanced2)}
          {renderIfNonnullAndNonEmpty(advanced3)}
        </div>
      </div>
    </InfoWindowBox>
  );
};


function renderIfNonnullAndNonEmpty(str?: string) {
  return (
    <>
        {str && str.trim() !== '' && (
            <div>{str}</div>
        )}
    </>
);
}

/*<span style={{ color: "grey" }}>{rating} </span>
<span style={{ color: "orange" }}>
  {String.fromCharCode(9733).repeat(Math.floor(rating))}
</span>
<span style={{ color: "lightgrey" }}>
  {String.fromCharCode(9733).repeat(5 - Math.floor(rating))}
</span>
*/