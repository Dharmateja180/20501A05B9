import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiConfig } from './config';

function AllTrains() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    async function fetchTrains() {
      try {
        const authResponse = await axios.post(
          'http://20.244.56.144/train/auth',
          apiConfig
        );

        const authToken = authResponse.data.access_token;
        
        const trainsResponse = await axios.get(
          'http://20.244.56.144/train/trains',
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

    
        const filteredTrains = filterAndSortTrains(trainsResponse.data);
        setTrains(filteredTrains);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    }

    fetchTrains();
  }, []);

 
  const filterAndSortTrains = (trainsData) => {
    
    const sortedTrains = trainsData.sort((a, b) => a.price.sleeper - b.price.sleeper);

    return sortedTrains;
  };

  return (
    <div>
      <h1>All Trains</h1>
      <ul>
        {trains.map((train) => (
          <li key={train.trainNumber}>
            <a href={`/single-train/${train.trainNumber}`}>
              {train.trainName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTrains;
