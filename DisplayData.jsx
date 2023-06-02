// import React, { useState } from 'react';

//  const DisplayData = () => {
//   const [retrievedData, setRetrievedData] = useState(null);

//   const retrieveFromLocalStorage = () => {
//     const storedData = localStorage.getItem('positionData');
//     if (storedData) {
//       setRetrievedData(JSON.parse(storedData));
//     }
//   };

//   return (
//     <div>
//       <button onClick={retrieveFromLocalStorage}>Retrieve</button>
//       {retrievedData && (
//         <div>
//           <h2>Retrieved Data:</h2>
//           <p>Marker Name: {retrievedData.MarkerName}</p>
//           <p>Left: {retrievedData.Left}</p>
//           <p>Top: {retrievedData.Top}</p>
//           <p>Height: {retrievedData.Height}</p>
//           <p>Width: {retrievedData.Width}</p>
//           <p>Color: {retrievedData.color}</p>
//         </div>
//       )}
//     </div>
//   );
// };
// export default DisplayData;
import React, { useState } from 'react';

export const DisplayData = () => {
  const [retrievedData, setRetrievedData] = useState([]);
console.log(retrievedData)
  const retrieveFromLocalStorage = () => {
    const storedData = localStorage.getItem('myarray');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log(parsedData)
      setRetrievedData(parsedData);
      console.log(parsedData)
    }
  };
console.log(Array.isArray(retrievedData))
  return (
    <div>
      <button onClick={retrieveFromLocalStorage}>Retrieve Data</button>
      <h2>Retrieved Data:</h2>
      {retrievedData.length > 0 ? (
        retrievedData.map((data, index) => (
          <div key={index}>
            <p>Marker Name: {data.markerName}</p>
            <p>Left: {data.left}</p>
            <p>Top: {data.top}</p>
            <p>Height: {data.height}</p>
            <p>Width: {data.width}</p>
            <p>Color: {data.color}</p>
          </div>
        ))
      ) : (
        <p> data retrieved.</p>
      )}
    </div>
  );
};

export default DisplayData;