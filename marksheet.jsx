import React, { useRef, useState } from 'react';
import * as markerjs2 from 'markerjs2';
import { useEffect } from 'react';
import PositionDatas from './PositionData';
import myImage from "./Marksheet.jpg";

export default function Option() {
  const imgRef = useRef("Marksheet.jpg");
  const [markersData, setMarkersData] = useState([]);
  const data = localStorage.getItem('data1')
  useEffect(() => {
    // imgRef.current.focus();
  }, []);

  function showMarkerArea() {
    if (imgRef.current) {
      const markerArea = new markerjs2.MarkerArea(imgRef.current);
      markerArea.settings.defaultColorSet = ['red', 'green', 'blue', 'black'];
      markerArea.settings.defaultColor = 'black';
      markerArea.availableMarkerTypes = [
        markerjs2.CalloutMarker,
        ...markerArea.BASIC_MARKER_TYPES
      ];

      markerArea.addEventListener('render', event => {
        if (imgRef.current) {
          imgRef.current.src = event.dataUrl;
          console.log(event);

          const markers = event.state.markers.map(marker => {
            return {
              top: marker.top,
              left: marker.left,
              height: marker.height,
              width: marker.width
            }
          });
          let marketsNames = []

          for (let i = 0; i < markers.length; i++) {
            marketsNames.push(markers[i].name = `shape${i + 1}`)
          }

          setMarkersData(marketsNames);
          console.log(markers);
          localStorage.setItem('data1', JSON.stringify(markers))
        }

      });

      markerArea.show();
    }
  }

  const [marketState, setMarketState] = useState([])

  const sendMarkerData = () => {
    const data = localStorage.getItem('data1')
    setMarketState(JSON.parse(data))
    console.log(JSON.parse(data))
  }

  const [state2, setState2] = useState([])

  const showSelectedMarker = (name) => {
    setState2(marketState.find((item) => item.name === name))
    console.log(marketState.find((item) => item.name === name))
  }

  console.log(state2)

  return (
    <div className="App">
      <button onClick={sendMarkerData}>get markers</button>
      <h1> Marksheet </h1>
      <img
        ref={imgRef}
        onClick={showMarkerArea}
        src={myImage}
        alt="sample"
      />

      {
        marketState?.map((item, index) => (
          <>
            <button onClick={() => showSelectedMarker(item.name)}>{item.name}</button>
          </>
        ))
      }

      <h1>{state2.top}</h1>
      <h1>{state2.left}</h1>
      <h1>{state2.height}</h1>
      <h1>{state2.width}</h1>
      <PositionDatas markersData={markersData} />
    </div>
  );
    }
