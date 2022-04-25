import CustomGameMap from "../components/Maps/CustomGameMap";
import { useJsApiLoader } from "@react-google-maps/api";
import CreateGamePopup from "../components/Popup/CreateGamePopup";
import { useState } from 'react';

const CreateCustomGame = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY 
  })

  const [popupTrigger, setPopupTrigger] = useState(true);

  const triggerPopup = (gameId) => {
    setPopupTrigger(gameId);
  };

  if (!isLoaded) return <div>Loading...</div>
  if (loadError) return `Error loading maps: ${loadError}`;

  return (
    <div className="custom-game-page">
      <CustomGameMap triggerPopup={triggerPopup}/>
      <CreateGamePopup trigger={popupTrigger}  />
    </div>
  );
};

export default CreateCustomGame;