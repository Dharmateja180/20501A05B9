import React, { useState } from 'react';

function NumberFetch() {
  const [inputUrls, setInputUrls] = useState('');
  const [outputResult, setOutputResult] = useState('');

  const fetchUniqueNumbers = async () => {
    const urlsToFetch = inputUrls.split(',').map(url => url.trim());
    let combinedNumbers = [];

    for (const apiUrl of urlsToFetch) {
      try {
        const response = await fetch(apiUrl);
        const responseData = await response.json();
        const fetchedNumbers = responseData.numbers || [];
        combinedNumbers = [...combinedNumbers, ...fetchedNumbers];
      } catch (error) {
        console.error(`Error fetching numbers from ${apiUrl}:`, error);
      }
    }

    const uniqueNumbers = [...new Set(combinedNumbers)];
    const sortedUniqueNumbers = quickSort(uniqueNumbers); // Sort using quicksort
    setOutputResult(JSON.stringify({Numbers: sortedUniqueNumbers }, null, 2));
  };

  // Quicksort implementation
  const quickSort = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
  };

  return (
    <div>
      <h2>Unique Number Fetcher</h2>
      <div>
        <label htmlFor="inputUrls">Enter API URLs:</label>
        <input
          type="text"
          id="inputUrls"
          value={inputUrls}
          onChange={e => setInputUrls(e.target.value)}
        />
        <button onClick={fetchUniqueNumbers}>Sort</button>
      </div>
      <div>
        <h3>Numbers:</h3>
        <pre>{outputResult}</pre>
      </div>
    </div>
  );
}

export default NumberFetch;
