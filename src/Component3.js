import React, { useState, useEffect } from 'react';
import { addToast } from './ToastNotification';

const Component3 = () => {
  const [seconds, setSeconds] = useState('');
  const [countdown, setCountdown] = useState(null);
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const countriesPerPage = 5;

  const handleSubmit = (e) => {
    e.preventDefault();
    const secondsValue = parseInt(seconds, 10);
    if (isNaN(secondsValue) || secondsValue <= 0) {
      addToast('Please enter a valid number of seconds.');
      return;
    }
    setCountdown(secondsValue);
    setCountries([]); // Clear previous country list
    setCurrentPage(1); // Reset to the first page
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      fetchCountries();
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.knowmee.co/api/v1/master/get-country-list');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCountries(data.data || []); // Ensure countries exist in the response
      addToast('Countries fetched successfully');
    } catch (error) {
      addToast('Failed to fetch countries');
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(countries.length / countriesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h2>Third Component</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          placeholder="Enter seconds"
          min="1"
        />
        <button type="submit">Start Countdown</button>
      </form>
      {countdown !== null && <p>Countdown: {countdown}</p>}
      {loading && <p>Loading...</p>}
      {currentCountries.length > 0 && (
        <div>
          <ul>
            {currentCountries.map((country) => (
              <li key={country.code}>{country.name}</li>
            ))}
          </ul>
          <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= Math.ceil(countries.length / countriesPerPage)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Component3;
