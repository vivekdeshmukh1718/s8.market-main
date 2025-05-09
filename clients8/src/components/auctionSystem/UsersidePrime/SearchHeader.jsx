import React, { useState, useContext } from 'react';
import { Search } from 'lucide-react';
import { AppContext } from '../../../context/context';
import axios from 'axios';

export default function SearchHeader() {
  const { serverUrl, setProperties } = useContext(AppContext);
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  const handlePriceChange = (e) => {
    setPriceRange([0, parseInt(e.target.value)]);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/v1/user/searchProperties`,
        {
          searchString: location,
          priceRange: priceRange[1]
        },
        { withCredentials: true }
      );
      setProperties(response.data.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="flex flex-col px-16 w-full max-md:px-5 max-md:max-w-full">
      <div className="flex relative flex-col items-start px-20 py-20 w-full min-h-[634px] rounded-[50px] max-md:px-5 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5b3596eea36edcb84a1e41805976e3724c325066aa90d93985003cec585d3439?placeholderIfAbsent=true&apiKey=643dc8ae27ef4b1eb644562c7626beaf"
          alt=""
          className="object-cover absolute inset-0 size-full"
        />
        <div className="relative text-6xl font-semibold text-slate-900 max-md:max-w-full max-md:text-4xl">
          Find the nearest auction
          <br />
          events now!
        </div>
        <div className="relative mt-4 text-2xl leading-9 text-slate-600 max-md:max-w-full">
          We provide a complete service for the sale,
          <br />
          purchase or rental of real estate.
        </div>
        <div className="relative px-7 py-0.5 mt-16 text-sm font-medium leading-9 uppercase whitespace-nowrap bg-white rounded-[16px_16px_0px_0px] text-slate-900 tracking-[2.8px] max-md:px-5 max-md:mt-10">
          Auctions
        </div>
        <div className="relative py-6 pr-20 pl-7 max-w-full rounded-[0px_30px_30px_30px] shadow-2xl bg-sky-900 bg-opacity-80 w-[918px] max-md:px-5">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
              <label htmlFor="location" className="sr-only">Location</label>
              <input 
                type="text"
                id="location"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent rounded-[20px] px-4 py-2.5 text-neutral-200 
                  focus:outline-none hover:border-zinc-100 
                  appearance-none cursor-text transition-all duration-200 ease-in-out
                  focus:bg-zinc-800/10 placeholder-neutral-400"
              />
            </div>

            <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
              <div className="flex relative items-center gap-4 text-base leading-9 text-neutral-200 max-md:mt-10 group">
                <div className="shrink-0 w-0.5 border-2 border-solid border-zinc-200 h-[52px] group-hover:border-zinc-300 transition-colors duration-200 rounded-full" />
                <div className="flex-1 relative">
                  <div className="flex justify-between mb-2">
                    <label htmlFor="priceRange" className="text-sm text-neutral-300">
                      Price Range
                    </label>
                    <span className="text-sm text-neutral-300">
                      {formatPrice(priceRange[1])}
                    </span>+
                  </div>
                  
                  <input
                    type="range"
                    id="priceRange"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col ml-5 w-[12%] max-md:ml-0 max-md:w-full">
              <div className="flex relative items-center gap-4 text-base leading-9 text-neutral-200 max-md:mt-10 group">
                <div className="shrink-0 w-0.5 border-2 border-solid border-zinc-200 h-[52px] group-hover:border-zinc-300 transition-colors duration-200 rounded-full" />
                <button 
                  onClick={handleSearch}
                  className="flex items-center justify-center w-12 h-12 bg-zinc-700 hover:bg-zinc-600 rounded-full transition duration-200"
                  aria-label="Search"
                >
                  <Search className="text-white w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
