import React, { useRef, useState } from 'react';
import * as markerjs2 from 'markerjs2';
import {useEffect} from 'react';
import PositionDatas from './PositionData';
import myImage from "./Marksheet.jpg";
import Upload from './upload';
import './Option.css';

export default function Option() {
  const[uploadimage,setUploadImage]=useState();
  const getImage=(event)=>{
setUploadImage(event.preventDefault());
  }
  const imgRef = useRef();
  const [markersData, setMarkersData] = useState([]);
  const [markerArea, setMarkerArea] = useState([]);
  let [markers,setMarkers] = useState([]);
  const data = localStorage.getItem('data1')
  const [myData, setMyData] = useState(null);
  let[colorIndex]=useState(0);
 
  useEffect(() => {
    const data = localStorage.getItem('myData');
    if (data) {
      setMyData(JSON.parse(data));
    }
  }, []);

  function showMarkerArea() {
    if (imgRef.current) {
      const markerArea = new markerjs2.MarkerArea(imgRef.current);
console.log(markerArea)
     markerArea.settings.defaultColor = 'red';
      markerArea.availableMarkerTypes = [markerjs2.RectangleMarker,...markerArea.BASIC_MARKER_TYPES];
      markerArea.addEventListener("markercreate", event => {
        event.markerArea.addNewMarker(markerjs2.FrameMarker);
        markerArea.settings.defaultColorSet = ['red', 'green', 'blue', 'black','violet'];
        markerArea.settings.defaultColor=markerArea.settings.defaultColorSet[++colorIndex];
      });    
      markerArea.addEventListener('render', event => {
        if (imgRef.current) {
          imgRef.current.src = event.dataUrl;       
       setMarkerArea(event.dataUrl);
                 markers = event.state.markers.map(marker => {
            return {
              top:event.state.markers[0].top,
              left: marker.left,
              height: marker.height,
              width: marker.width,
              color:marker.strokeColor
            }
          });
          setMarkers(markers)
          let marketsNames = []

          for (let i = 0; i < markers.length; i++) {
            marketsNames.push(markers[i].name = `shape${i + 1}`)
          }
          setMarkersData(marketsNames);
          console.log(markers);
          localStorage.setItem('data1', JSON.stringify(markers))
        } 
      }); 
      markerArea.renderHeight=500;     
      markerArea.show();    
    }
  }

const [marketState,setMarketState] = useState([]);
  console.log(marketState);
  // const sendMarkerData = () => {
  //   const data = localStorage.getItem('data1')
  //   setMarketState(JSON.parse(data))
  //   console.log(JSON.parse(data))
  // }

  const [state2, setState2] = useState([])

  const showSelectedMarker = (name) => {
    setState2(marketState.find((item) => item.name === name))
    console.log(marketState.find((item) => item.name === name))
  }
  // function restoreMarkers() {
  //   const data = localStorage.getItem('data1');
  //   if (data && markerArea) {
  //     markerArea.restoreState(JSON.parse(data));
  //   }
  // }

  console.log(state2)
  
  return (
 <div className="App">
        <Upload onSubmit={getImage}/>
      {/* <button onClick={sendMarkerData}>get markers</button> */}
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
           <input type='text'id="name-input" placeholder='name'></input>     
                </>
        ))
      }

      <h1>{state2.top}</h1>
      <h1>{state2.left}</h1>
      <h1>{state2.height}</h1>
      <h1>{state2.width}</h1>
      <h1>{state2.color}</h1>
       <PositionDatas markers={markers}/>  
     
      <p>{myData}</p>
      {/* <button onClick={restoreMarkers}> Restore</button>  */}
    </div>
  );
    }
