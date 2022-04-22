import StreetView from '../components/Maps/StreetView';
import Map from '../components/Maps/Map';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useState, useEffect, useContext } from 'react';
import { authContext } from '../providers/AuthProvider'
import Scoreboard from '../components/Maps/Scoreboard';
import { getDailyGame } from '../helpers/maps/map-helpers';
import axios from 'axios';

const Index = () => {
  const { user } = useContext(authContext)

  // Street View State and logic
  const [result, setResult] = useState(false)
  const [coords, setCoords] = useState()

  useEffect(() => {
    const id = user ? user.id : null
    getDailyGame(id)
      .then(res => {
        console.log('before the if: ', res)
        if (res.guess) {
          console.log("res.coords: ", res.coords)
          setResult({
            distance: res.distance,
            answer: res.coords,
            score: res.guess.score,
            guess: res.guess
          })
        }
        if (res.coords) {
          const { latitude, longitude } = res.coords
          setCoords({
            lat: Number(latitude),
            lng: Number(longitude),
          })
        }
      })
  }, []);

  const resetLoc = () => {
    setCoords({...coords})
  } 

  // Bottom Map State and Logic
  const onSubmitGuess = (marker) => {
    axios.post('api/guess', marker)
      .then(res => {
        console.log("success: ", res.data)
        setResult(res.data);
      })
      .catch(err => {
        console.log("unsuccessful: ", err)
        alert("Error, please try again " + err)
      })
  }


  // Other Logic
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY 
  })

  if (!isLoaded) return <div>Loading...</div>
  if (loadError) return `Error loading maps: ${loadError}`;

  return (
    <>
      {result && <Scoreboard 
        distance={result.distance}
        score={result.score}
      />}

      { !result && <GoogleMap
        id="street-view-wrapper"
        mapContainerClassName="map-container"
        >
          <StreetView
            coords={coords}
            resetLoc={resetLoc}
          />
        </GoogleMap>}

      <Map onSubmitGuess={onSubmitGuess} result={result} />
    </>
  );
}

export default Index;


