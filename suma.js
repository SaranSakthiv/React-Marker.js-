import { MarkerArea, RectangleMarker } from "markerjs2";

const App = () => {
  const markerArea = new MarkerArea();
  const markers = [];

  const addMarker = () => {
    const marker = new RectangleMarker({
      container: markerArea.container,
      overlayContainer: markerArea.overlayContainer,
      settings: {
        fillColor: "red",
        strokeColor: "black",
        strokeWidth: 2,
      },
    });

    markers.push(marker);
  };

  const removeMarker = (marker) => {
    markers = markers.filter((m) => m !== marker);
  };

  const saveState = () => {
    localStorage.setItem("markerAreaState", JSON.stringify(markerArea));
    localStorage.setItem("markersState", JSON.stringify(markers));
  };

  const restoreState = () => {
    const markerAreaState = localStorage.getItem("markerAreaState");
    const markersState = localStorage.getItem("markersState");

    if (markerAreaState) {
      markerArea = JSON.parse(markerAreaState);
    }

    if (markersState) {
      markers = JSON.parse(markersState);
    }
  };

  return (
    <div>
      <button onClick={addMarker}>Add Marker</button>
      <button onClick={removeMarker}>Remove Marker</button>
      <button onClick={saveState}>Save State</button>
      <button onClick={restoreState}>Restore State</button>
      <MarkerArea ref={markerArea}>
        {markers.map((marker) => (
          <RectangleMarker key={marker.id} {...marker} />
        ))}
      </MarkerArea>
    </div>
  );
};

export default App;

