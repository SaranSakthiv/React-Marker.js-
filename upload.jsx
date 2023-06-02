
import React, { useRef,useState } from "react";
// import myImage from "./Marksheet.jpg";
import * as markerjs2 from 'markerjs2';
//import * as markerjs2 from 'markerjs2';

const Upload=({ onImageUpload })=>{
    const imgRef = useRef();
    const [markersData, setMarkersData] = useState([]);
    const [markerArea, setMarkerArea] = useState([]);
    let [markers,setMarkers] = useState([]);
    const data = localStorage.getItem('data1')
    const [myData, setMyData] = useState(null);
      let [colorIndex, setColorIndex] = useState(0);
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
	const [selectedImage, setSelectedImage] = useState();
    const handleImageUpload = (e) => {
        console.log(e.target.value);   
    const file = e.target.files[0];    
    const reader = new FileReader();
    reader.onload = () => {
      const imageDataURL = reader.result;
      setSelectedImage(imageDataURL);
     // onImageUpload(imageDataURL); // Callback to send image data to parent component...
    };
    reader.readAsDataURL(file);
}
// function showMarkerArea(target) {
//     const markerArea = new markerjs2.MarkerArea(target);
//     markerArea.addEventListener("render", (event) => (target.src = event.dataUrl));
//     markerArea.show();
//   }
 const handleSubmit=(event)=>{
    event.preventDefault();
    if (selectedImage) {
      onImageUpload(selectedImage);
    }
 }

	return (
		<div className="App">
            <form onSubmit={handleSubmit}>
			<h2>Add Image:</h2>
			<input id="image"type="file"accept="image/png,image/jpeg,image/jpg" onChange={handleImageUpload}/>
            {/* <button onClick={showMarkerArea}>show</button> */}
            <img
        ref={imgRef}
        onClick={showMarkerArea}
        src={selectedImage}
        alt="sample"/>
            <button type="submit">Upload</button>
            {selectedImage && <img src={selectedImage} alt="Marksheet" />}
            </form>
		</div>

	);
    }

export default Upload;