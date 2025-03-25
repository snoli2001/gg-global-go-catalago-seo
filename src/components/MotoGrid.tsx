import { useState, useEffect } from "react";
import type { Moto } from "../types/moto.interface";

interface MotoGridProps {
  motos: Moto[];
}

export default function MotoGrid({ motos }: MotoGridProps) {
  const [filteredMotos, setFilteredMotos] = useState<Moto[]>(motos);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [visibleCards, setVisibleCards] = useState<string[]>([]);

  useEffect(() => {
    // Calcular total de páginas cuando cambian los motos filtrados
    setTotalPages(Math.ceil(filteredMotos.length / itemsPerPage));
    // Resetear a la primera página cuando cambian los filtros
    setCurrentPage(1);
    // Actualizar las cards visibles
    updateVisibleCards();
  }, [filteredMotos]);

  useEffect(() => {
    updateVisibleCards();
  }, [currentPage]);

  const updateVisibleCards = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentMotos = filteredMotos.slice(startIndex, endIndex);
    setVisibleCards(currentMotos.map(moto => moto.idModelo.toString()));
  };

  // Funciones de navegación
  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Componente de paginación
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Ajustar el rango si estamos cerca del inicio o final
    if (currentPage <= 3) {
      endPage = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
          aria-label="Página anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => goToPage(1)}
              className="px-3 py-1 rounded-lg hover:bg-gray-50 border border-gray-300"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="px-2 py-1 text-gray-500">...</span>
            )}
          </>
        )}

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => goToPage(number)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === number
                ? 'bg-gg-blue-700 text-white'
                : 'hover:bg-gray-50 border border-gray-300'
            }`}
          >
            {number}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 py-1 text-gray-500">...</span>
            )}
            <button
              onClick={() => goToPage(totalPages)}
              className="px-3 py-1 rounded-lg hover:bg-gray-50 border border-gray-300"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          }`}
          aria-label="Siguiente página"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  // Actualizar el DOM para mostrar/ocultar cards
  useEffect(() => {
    document.querySelectorAll('[data-moto-card]').forEach(card => {
      const motoId = card.getAttribute('data-moto-id');
      if (motoId) {
        if (visibleCards.includes(motoId)) {
          (card as HTMLElement).style.display = 'block';
        } else {
          (card as HTMLElement).style.display = 'none';
        }
      }
    });
  }, [visibleCards]);

  return <Pagination />;
} 