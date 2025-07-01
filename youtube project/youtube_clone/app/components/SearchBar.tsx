'use client'
import { useRouter, useSearchParams  } from "next/navigation";
import { useState, useEffect, ChangeEvent, FormEvent, KeyboardEvent, useRef  } from "react";

type SearchHistory = string[];

const SearchBar = () => {
  const searchParams = useSearchParams();
  const search_query = searchParams.get('search_query');
  
  const [query, setQuery] = useState<string>(search_query || ""); // Track the search query
  const [history, setHistory] = useState<SearchHistory>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1); // -1 means no item is highlighted
  const [isHistoryVisible, setIsHistoryVisible] = useState<boolean>(false); // Track visibility of history

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null); // Ref for input field
 


  
  // Load search history from localStorage when the component mounts
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("searchHistory") || "[]");
    if (Array.isArray(savedHistory)) {
      setHistory(savedHistory);
    }
  }, []);

  // Close the search history when the user clicks outside the input field
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setIsHistoryVisible(false); // Hide the history
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchClick = () =>{
    setIsHistoryVisible(true);
  }
  // Handle changes to the search input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setHighlightedIndex(-1); // Reset the highlighted index when the user types
    setIsHistoryVisible(true); // Show the search history when typing
  };

  // Handle search submission (by clicking the button or pressing Enter)
  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query && !history.includes(query)) {
      const updatedHistory = [query, ...history].slice(0, 5); // Limit to 5 recent searches
      setHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
    // console.log("Search Query:", query); // Replace with your actual search functionality
    if(query){
      router.push(`/result?search_query=${query}`);
      // router.refresh();
    }
     // Redirect to the search results page
  };

  // Handle clicking on a history item
  const handleHistoryClick = (term: string) => {
    setQuery(term);
    setHighlightedIndex(-1); // Reset the highlighted index
    setIsHistoryVisible(false); // Hide the history after selecting an item
  };

  // Handle key down events for up/down arrows and Enter
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const filteredHistory = history.filter((term) =>
      term.toLowerCase().includes(query.toLowerCase())
    );

    if (e.key === "ArrowDown") {
      // Move the highlighted index down, looping back to the top
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % filteredHistory.length);
    } else if (e.key === "ArrowUp") {
      // Move the highlighted index up, looping to the bottom
      setHighlightedIndex((prevIndex) => (prevIndex - 1 + filteredHistory.length) % filteredHistory.length);
    } else if (e.key === "Enter" && highlightedIndex !== -1) {
      // Select the highlighted history item when Enter is pressed
      setQuery(filteredHistory[highlightedIndex]);
      setHighlightedIndex(-1); // Reset the highlighted index
      setIsHistoryVisible(false); // Hide the history
      console.log("Search Query:", filteredHistory[highlightedIndex]); // Use the selected history item
    }
  };

  // Filter the history based on the query input
  const filteredHistory = history.filter((term) =>
    term.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="w-full max-w-md  relative">
      <form onSubmit={handleSearchSubmit} className="flex items-center">
      <div className="relative pb-2">
        <input
          onClick={handleSearchClick }
          ref={inputRef} // Attach the ref to the input field
          type="text"
          value={query}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="input shadow-lg border  border-gray-300 px-5 py-3 rounded-xl w-32 md:w-72 transition-all  focus:w-96 outline-none"
        />
        <button type="submit" >
            <svg 
            className="size-6 absolute top-3 right-3 text-gray-500 cursor-pointer"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                strokeLinejoin="round"
                strokeLinecap="round"
                ></path>
            </svg>
        </button> 
        </div>
      </form>

      {/* Display filtered search history */}
      {isHistoryVisible && filteredHistory.length > 0 && (
        <div className="w-full bg-white shadow-md p-3 rounded-md absolute">
          <ul >
            {filteredHistory.map((term, index) => (
              <li
                key={index}
                onClick={() => handleHistoryClick(term)}
                className={`px-4 py-2 cursor-pointer ${
                  highlightedIndex === index ? 'bg-blue-100' : ''
                } hover:bg-blue-50`}
              >
                {term}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

