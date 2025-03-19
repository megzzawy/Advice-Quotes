import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const FetchData = () => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);

    const [randomNumber, setRandomNumber] = useState(null);
    
    const generateRandomNumber = () => {
        const newRandomNumber = Math.floor(Math.random() * 1000) + 1; // Generates a random number between 0 (inclusive) and 1 (exclusive)
        setRandomNumber(newRandomNumber);
      };


    useEffect(()=> {
        generateRandomNumber();

        fetch('https://catfact.ninja/fact')
       .then(response => response.json())
       .then(data => {setQuote(data);
        setLoading(false);
       })
       .catch(error => {console.error('Error:', error);
        setLoading(false);
       });
    }, [])

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
        <img src="../public/pattern-divider-desktop.svg" className='mt-5 mb-5'/>

        <div className='bg-[#52ffa8] w-14 rounded-full h-14 absolute -bottom-7 grid place-items-center'>
            <img src="../public/icon-dice.svg" alt="" />
        </div>
    </div>
  )
}

export default FetchData
