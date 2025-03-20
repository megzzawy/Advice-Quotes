import React, { use } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import Divider from './assets/pattern-divider-desktop.svg';
import Dice from './assets/icon-dice.svg';

const FetchData = () => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);

    const [randomNumber, setRandomNumber] = useState(null);
    
    const generateRandomNumber = () => {
        const newRandomNumber = Math.floor(Math.random() * 1000) + 1; // Generates a random number between 0 (inclusive) and 1 (exclusive)
        setRandomNumber(newRandomNumber);
      };

      const fetchQuote = useCallback(async() => {
        try {
          const response = await fetch('https://catfact.ninja/fact');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setQuote(data);
          generateRandomNumber();
        } catch (error) {
          console.error("Error fetching quote:", error);
        } finally {
          setLoading(false);
        }
      }, []);


    useEffect(()=> {
        fetchQuote();
    }, [ fetchQuote]);

    if (loading) {
        return <div>Loading...</div>;
      }

  return (
    <div className='bg-[#323a49] max-w-120 p-10 rounded-xl grid gap-3 place-items-center relative'>
        <p className='text-[#52ffa8] text-sm'>ADVICE #{randomNumber}</p>
        <p className='text-[#cee3e9] text-[28px] font-bold'>"
            
        {quote ? quote.fact : "Loading..."}
            "
        </p>
        <img src={Divider} className='mt-5 mb-5'/>

        <div className='bg-[#52ffa8] w-14 rounded-full h-14 absolute -bottom-7 grid place-items-center cursor-pointer shadow-[0_0_10px_#52ffa8] hover:shadow-[0_0_30px_#52ffa8] transition-shadow duration-200' onClick={fetchQuote}>
            <img src={Dice} alt="" />
        </div>
    </div>
  )
}

export default FetchData
