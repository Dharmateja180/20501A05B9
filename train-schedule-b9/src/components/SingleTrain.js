import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiConfig } from './config';

function SingleTrain() {
  const { trainNumber } = useParams();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    async function fetchSingleTrain() {
      try {
        const authResponse = await axios.post(
          'http://20.244.56.144/train/auth',
          apiConfig
        );

        const authToken = authResponse.data.access_token;

        const trainResponse = await axios.get(
          `http://20.244.56.144/train/trains/${trainNumber}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        setTrain(trainResponse.data);
      } catch (error) {
        console.error('Error fetching single train:', error);
      }
    }

    fetchSingleTrain();
  }, [trainNumber]);

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{train.trainName}</h1>
      <p>Train Number: {train.trainNumber}</p>
      <p>Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}</p>
      <p>Seats Available (Sleeper): {train.seatsAvailable.sleeper}</p>
      <p>Seats Available (AC): {train.seatsAvailable.AC}</p>
      <p>Price (Sleeper): {train.price.sleeper}</p>
      <p>Price (AC): {train.price.AC}</p>
      <p>Delayed By: {train.delayedBy} minutes</p>
    </div>
  );
}

export default SingleTrain;
