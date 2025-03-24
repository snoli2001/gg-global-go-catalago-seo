import { useState, useEffect, useRef } from "react";
import type { Moto } from "../../types/moto.interface";

interface SearchBarProps {
  motos: Moto[];
  placeholder?: string;
}

export default function SearchBar({
  motos,
  placeholder = "Encuentra tu moto favorita",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Moto[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const searchResults = motos
      .filter((moto) => moto.modelo.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5); // Limitamos a 5 resultados

    setResults(searchResults);
  };

  const getBannerImage = (moto: Moto): string => {
    const bannerImages = moto.carrusels.filter(
      (carrusel) => carrusel.type === "B"
    );
    return bannerImages[0]?.imagen || "/imgs/moto.png";
  };

  const handleResultClick = (moto: Moto) => {
    window.location.href = `/motos/${moto.code}`;
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={searchRef} className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={handleSearch}
          onFocus={() => query.trim() !== "" && setIsOpen(true)}
          className="w-full px-4 py-3 pl-12 rounded-full border-2 border-gg-blue-700 focus:outline-none focus:border-gg-blue-800 text-gray-700 placeholder-gray-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>

        {/* Dropdown de resultados */}
        {isOpen && results.length > 0 && (
          <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
            {results.map((moto) => (
              <button
                key={moto.idModelo}
                onClick={() => handleResultClick(moto)}
                className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-16 h-16 flex-shrink-0">
                  <img
                    src={getBannerImage(moto)}
                    alt={moto.modelo}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">
                    {moto.marca} - {moto.modelo}
                  </p>
                  <p className="text-sm text-gray-500">{moto.categoria}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
