import React from 'react';
import { useDispatch } from 'react-redux';
import { update } from './UpdatePosition';
import { useState } from 'react';

export const PositionData = ({markers}) => {
  console.log(markers);
  const [markerState, setMarketState] = useState([]);
  const dispatch = useDispatch();
  const [positions, setPositions] = useState({
    markerName: '',
    left: 0,
    top: 0,
    height: 0,
    width: 0,
    color: '',
  });

  const inputHandler = (event,index) => {
    const data={
      ...positions
    }
    data[event.target.id]=event.target.value;
     setPositions(data)
    console.log(data)
  };

  const updateStore = (index) => {
    dispatch(update(positions[index]));
 const data1=JSON.parse(localStorage.getItem('myarray')) || []
 const newData1=[...data1,positions]
 localStorage.setItem('myarray',JSON.stringify(newData1))
  };

  const sendMarkerData = () => {
    const data = localStorage.getItem('myarray');
    setMarketState(JSON.parse(data));
    console.log(JSON.parse(data));
  };

  return (
    <>
      <button onClick={sendMarkerData}>Show</button>
      {markers?.map((item, index) => (
        <div key={index}>
          <input
          id='markerName'
            type="text"
            placeholder="Marker Name"
            name="markerName"
            onChange={(event)=>inputHandler(event)}
           
          />
          <input
          id='left'
            type="number"
            placeholder={item.left}
            name="left"
            onChange={(event)=>inputHandler(event)}
           
          />
          <input
          id='top'
           type="number"
            placeholder={item.top}
            name="top"
            onChange={(event)=>inputHandler(event)}
          
          />
          <input
          id='height'
            type="number"
            placeholder={item.height}
            name="height"
            onChange={(event)=>inputHandler(event)}
          
          />
          <input
          id='width'
            type="number"
            placeholder={item.width}
            name="width"
            onChange={(event)=>inputHandler(event)}
           
          />
          <input
          id='color'
            type="text"
            placeholder={item.color}
            name="color"
            onChange={(event)=>inputHandler(event)}
          
          />
          <button onClick={updateStore}>Update Store</button>
        </div>
      ))}
    </>
  );
};

export default PositionData;




