import { useState, useEffect, useCallback, useMemo, memo } from "react";
import type { Brand } from "../types/brand.interface";
import type { Category } from "../types/category.interface";
import type { Moto } from "../types/moto.interface";
import Select from "./ui/Select";
import Chip from "./ui/Chip";
import Input from "./ui/Input";
import MotoCard from "./moto/MotoCard";

interface FilterState {
  sort: string;
  price: { min: string; max: string };
  brands: string[];
  transmission: string[];
  categories: string[];
  displacement: { min: string; max: string };
  performance: { min: string; max: string };
  isPreOwned: boolean | null; // null means "all"
}

interface MotoFiltersBarProps {
  initialBrands: Brand[];
  initialCategories: Category[];
  initialMotos: Moto[];
  itemsPerPage?: number;
  showPreOwnedTabs?: boolean;
}

const MotoFiltersBar = memo(function MotoFiltersBar({
  initialBrands,
  initialCategories,
  initialMotos,
  itemsPerPage = 12,
  showPreOwnedTabs = true,
}: MotoFiltersBarProps) {
  const [brands] = useState<Brand[]>(initialBrands);
  const [categories] = useState<Category[]>(initialCategories);
  const [motos, setMotos] = useState<Moto[]>(initialMotos);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState<"all" | "new" | "used">("all");
  const [pendingFilters, setPendingFilters] = useState<{
    price: boolean;
    displacement: boolean;
    performance: boolean;
    chips: boolean;
  }>({
    price: false,
    displacement: false,
    performance: false,
    chips: false,
  });
  const [filters, setFilters] = useState<FilterState>({
    sort: "price_asc",
    price: { min: "", max: "" },
    brands: [],
    transmission: [],
    categories: [],
    displacement: { min: "", max: "" },
    performance: { min: "", max: "" },
    isPreOwned: null,
  });

  // Update isPreOwned filter when tab changes
  useEffect(() => {
    if (activeTab === "new") {
      setFilters((prev) => ({ ...prev, isPreOwned: false }));
    } else if (activeTab === "used") {
      setFilters((prev) => ({ ...prev, isPreOwned: true }));
    } else {
      setFilters((prev) => ({ ...prev, isPreOwned: null }));
    }
  }, [activeTab]);

  useEffect(() => {
    // Solo aplicar filtros automáticamente para chips y ordenamiento en desktop
    if (
      window.innerWidth >= 1024 &&
      !pendingFilters.price &&
      !pendingFilters.displacement &&
      !pendingFilters.performance
    ) {
      applyFilters();
    }
  }, [
    filters.brands,
    filters.transmission,
    filters.categories,
    filters.sort,
    filters.isPreOwned,
  ]);

  useEffect(() => {
    // Aplicar filtros cuando cambie la página
    applyFilters();
  }, [currentPage]);

  // Listen for tab change events from parent
  useEffect(() => {
    const handleTabChange = (event: CustomEvent<{ tab: string }>) => {
      const tab = event.detail.tab as "all" | "new" | "used";
      setActiveTab(tab);
    };

    window.addEventListener("tabChange", handleTabChange as EventListener);
    return () => {
      window.removeEventListener("tabChange", handleTabChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      applyFilters();
    }
    // eslint-disable-next-line
  }, [filters.isPreOwned]);

  const applyFilters = useCallback(() => {
    let filteredMotos = [...initialMotos];

    // Apply brand filter
    if (filters.brands.length > 0) {
      filteredMotos = filteredMotos.filter((moto) =>
        filters.brands.includes(moto.marca)
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filteredMotos = filteredMotos.filter((moto) =>
        filters.categories.includes(moto.categoria)
      );
    }

    // Apply transmission filter
    if (filters.transmission.length > 0) {
      filteredMotos = filteredMotos.filter((moto) =>
        filters.transmission.includes(moto.transmision)
      );
    }

    // Apply price filter
    if (filters.price.min || filters.price.max) {
      filteredMotos = filteredMotos.filter((moto) => {
        const price =
          moto.currency.toLowerCase() === "sol"
            ? moto.precio
            : moto.price_dollar;
        if (filters.price.min && price < parseFloat(filters.price.min)) {
          return false;
        }
        if (filters.price.max && price > parseFloat(filters.price.max)) {
          return false;
        }
        return true;
      });
    }

    // Apply displacement filter
    if (filters.displacement.min || filters.displacement.max) {
      filteredMotos = filteredMotos.filter((moto) => {
        const displacement = parseFloat(moto.cilindrada);
        if (
          filters.displacement.min &&
          displacement < parseFloat(filters.displacement.min)
        ) {
          return false;
        }
        if (
          filters.displacement.max &&
          displacement > parseFloat(filters.displacement.max)
        ) {
          return false;
        }
        return true;
      });
    }

    // Apply performance filter
    if (filters.performance.min || filters.performance.max) {
      filteredMotos = filteredMotos.filter((moto) => {
        const performance = parseFloat(moto.rendimiento);
        if (
          filters.performance.min &&
          performance < parseFloat(filters.performance.min)
        ) {
          return false;
        }
        if (
          filters.performance.max &&
          performance > parseFloat(filters.performance.max)
        ) {
          return false;
        }
        return true;
      });
    }

    // Apply pre-owned filter
    if (filters.isPreOwned !== null) {
      filteredMotos = filteredMotos.filter(
        (moto) => moto.isPreOwned === filters.isPreOwned
      );
    }

    // Sort filtered motos
    filteredMotos.sort((a, b) => {
      const priceA =
        a.currency.toLowerCase() === "sol" ? a.precio : a.price_dollar;
      const priceB =
        b.currency.toLowerCase() === "sol" ? b.precio : b.price_dollar;
      return filters.sort === "price_asc" ? priceA - priceB : priceB - priceA;
    });

    // Calculate pagination
    const totalItems = filteredMotos.length;
    const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(calculatedTotalPages);

    // Adjust current page if it exceeds the new total pages
    if (currentPage > calculatedTotalPages) {
      setCurrentPage(1);
    }

    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedMotos = filteredMotos.slice(startIndex, endIndex);

    setMotos(paginatedMotos);

    setPendingFilters({
      price: false,
      displacement: false,
      performance: false,
      chips: false,
    });
  }, [filters, initialMotos, currentPage, itemsPerPage]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [totalPages]
  );

  const handleSortChange = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, sort: value }));
    if (window.innerWidth < 1024) {
      setPendingFilters((prev) => ({ ...prev, chips: true }));
    }
  }, []);

  const handleBrandToggle = useCallback((brandName: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brandName)
        ? prev.brands.filter((name) => name !== brandName)
        : [...prev.brands, brandName],
    }));
    if (window.innerWidth < 1024) {
      setPendingFilters((prev) => ({ ...prev, chips: true }));
    }
  }, []);

  const handleCategoryToggle = (categoryName: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryName)
        ? prev.categories.filter((name) => name !== categoryName)
        : [...prev.categories, categoryName],
    }));
    if (window.innerWidth < 1024) {
      setPendingFilters((prev) => ({ ...prev, chips: true }));
    }
  };

  const handleTransmissionToggle = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      transmission: prev.transmission.includes(type)
        ? prev.transmission.filter((t) => t !== type)
        : [...prev.transmission, type],
    }));
    if (window.innerWidth < 1024) {
      setPendingFilters((prev) => ({ ...prev, chips: true }));
    }
  };

  const handleNumericFilterChange = (
    filterType: "price" | "displacement" | "performance",
    minMax: "min" | "max",
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: { ...prev[filterType], [minMax]: value },
    }));
    setPendingFilters((prev) => ({
      ...prev,
      [filterType]: true,
    }));
  };

  const applyFilterByType = (
    filterType: "price" | "displacement" | "performance"
  ) => {
    setPendingFilters((prev) => ({
      ...prev,
      [filterType]: false,
    }));
    applyFilters();
  };

  const hasActiveFilters = () => {
    return (
      filters.brands.length > 0 ||
      filters.transmission.length > 0 ||
      filters.categories.length > 0 ||
      filters.price.min !== "" ||
      filters.price.max !== "" ||
      filters.displacement.min !== "" ||
      filters.displacement.max !== "" ||
      filters.performance.min !== "" ||
      filters.performance.max !== "" ||
      filters.sort !== "price_asc" ||
      filters.isPreOwned !== null
    );
  };

  const handleClearFilters = () => {
    if (!hasActiveFilters()) return;

    setFilters({
      sort: "price_asc",
      price: { min: "", max: "" },
      brands: [],
      transmission: [],
      categories: [],
      displacement: { min: "", max: "" },
      performance: { min: "", max: "" },
      isPreOwned: null,
    });
    setPendingFilters({
      price: false,
      displacement: false,
      performance: false,
      chips: false,
    });
    setActiveTab("all");
    setMotos(initialMotos);
  };

  const sortOptions = useMemo(
    () => [
      { value: "price_desc", label: "Precio: Mayor a Menor" },
      { value: "price_asc", label: "Precio: Menor a Mayor" },
    ],
    []
  );

  const hasPendingFilters = () => {
    return Object.values(pendingFilters).some((value) => value);
  };

  const applyAllFilters = () => {
    setPendingFilters({
      price: false,
      displacement: false,
      performance: false,
      chips: false,
    });
    applyFilters();
    if (window.innerWidth < 1024) {
      setIsFilterPanelOpen(false);
    }
  };

  // Componente de paginación
  const Pagination = memo(() => {
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
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
          aria-label="Página anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
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
            onClick={() => handlePageChange(number)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === number
                ? "bg-gg-blue-700 text-white"
                : "hover:bg-gray-50 border border-gray-300"
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
              onClick={() => handlePageChange(totalPages)}
              className="px-3 py-1 rounded-lg hover:bg-gray-50 border border-gray-300"
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
          }`}
          aria-label="Siguiente página"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    );
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6" data-moto-filters>
      {/* Botón de filtros y tabs para móvil */}
      <div className="lg:hidden justify-end flex">
        <button
          onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
          className="flex items-center gap-2 p-3 bg-gg-blue-700 text-white rounded-lg hover:bg-gg-blue-800 transition-colors "
        >
          <span className="text-base">Filtros</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
        </button>
      </div>
      {showPreOwnedTabs && (
        <div className="lg:hidden flex items-center justify-end gap-4">
          <div className="flex-1 bg-white rounded-lg shadow p-2">
            <div className="flex rounded-md overflow-hidden">
              <button
                onClick={() => setActiveTab("all")}
                className={`flex-1 py-3 px-5 text-base text-center font-medium transition-colors ${
                  activeTab === "all"
                    ? "bg-gg-blue-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:enabled:bg-gray-200"
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setActiveTab("new")}
                className={`flex-1 py-3 px-5 text-base text-center font-medium transition-colors ${
                  activeTab === "new"
                    ? "bg-gg-blue-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:enabled:bg-gray-200"
                }`}
              >
                Nuevas
              </button>
              <button
                onClick={() => setActiveTab("used")}
                className={`flex-1 py-3 px-5 text-base text-center font-medium transition-colors ${
                  activeTab === "used"
                    ? "bg-gg-blue-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:enabled:bg-gray-200"
                }`}
              >
                Seminuevas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 w-full lg:w-72 bg-white shadow-lg lg:shadow z-50 lg:z-0
          transform transition-transform duration-300 ease-in-out
          ${
            isFilterPanelOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="h-full overflow-y-auto">
          {/* Header móvil */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semimedium">Filtros</h3>
            <button
              onClick={() => setIsFilterPanelOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Contenido de filtros */}
          <div className="p-4">
            {/* Ordenar por */}
            <div className="mb-6">
              <h3 className="text-base font-normal mb-2">Ordenar por</h3>
              <Select
                options={sortOptions}
                value={filters.sort}
                onChange={handleSortChange}
              />
            </div>

            {/* Filtros */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-normal">Filtros</h3>
                <button
                  onClick={handleClearFilters}
                  className={`text-sm transition-colors flex items-center gap-1 ${
                    hasActiveFilters()
                      ? "text-gg-blue-700 hover:text-gg-blue-800"
                      : "text-gray-400 !cursor-not-allowed"
                  }`}
                  disabled={!hasActiveFilters()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                  Limpiar filtros
                </button>
              </div>

              {/* Precio */}
              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2">Precio</h4>
                <div className="flex gap-2 mb-2">
                  <Input
                    type="number"
                    placeholder="Desde"
                    value={filters.price.min}
                    onChange={(e) =>
                      handleNumericFilterChange("price", "min", e.target.value)
                    }
                    prefix="S/"
                  />
                  <Input
                    type="number"
                    placeholder="Hasta"
                    value={filters.price.max}
                    onChange={(e) =>
                      handleNumericFilterChange("price", "max", e.target.value)
                    }
                    prefix="S/"
                  />
                </div>
                <button
                  onClick={() => applyFilterByType("price")}
                  className={`hidden lg:block w-full py-2 px-4 rounded-lg transition-colors text-sm ${
                    pendingFilters.price
                      ? "bg-gg-blue-500 text-white hover:bg-gg-blue-600"
                      : "bg-gray-100 text-gray-400 !cursor-not-allowed"
                  }`}
                  disabled={!pendingFilters.price}
                >
                  Aplicar filtro de precio
                </button>
              </div>

              {/* Marcas */}
              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2">Marcas</h4>
                <div className="space-y-1 space-x-1">
                  {brands.map((brand) => (
                    <Chip
                      key={brand.idMarca}
                      label={brand.marca.toLocaleUpperCase()}
                      value={brand.marca}
                      isSelected={filters.brands.includes(brand.marca)}
                      onClick={() => handleBrandToggle(brand.marca)}
                    />
                  ))}
                </div>
              </div>

              {/* Transmisión */}
              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2">Transmisión</h4>
                <div className="flex flex-wrap gap-2">
                  {["Mecánica", "Automática", "Semiautomática"].map((type) => (
                    <Chip
                      key={type}
                      label={type}
                      value={type}
                      isSelected={filters.transmission.includes(type)}
                      onClick={() => handleTransmissionToggle(type)}
                    />
                  ))}
                </div>
              </div>

              {/* Categoría */}
              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2">Categoría</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Chip
                      key={category.idCategoria}
                      label={category.categoria}
                      value={category.categoria}
                      isSelected={filters.categories.includes(
                        category.categoria
                      )}
                      onClick={() => handleCategoryToggle(category.categoria)}
                    />
                  ))}
                </div>
              </div>

              {/* Cilindrada */}
              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2">Cilindrada</h4>
                <div className="flex gap-2 mb-2">
                  <Input
                    type="number"
                    placeholder="Desde"
                    value={filters.displacement.min}
                    onChange={(e) =>
                      handleNumericFilterChange(
                        "displacement",
                        "min",
                        e.target.value
                      )
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Hasta"
                    value={filters.displacement.max}
                    onChange={(e) =>
                      handleNumericFilterChange(
                        "displacement",
                        "max",
                        e.target.value
                      )
                    }
                  />
                </div>
                <button
                  onClick={() => applyFilterByType("displacement")}
                  className={`hidden lg:block w-full py-2 px-4 rounded-lg transition-colors text-sm ${
                    pendingFilters.displacement
                      ? "bg-gg-blue-500 text-white hover:bg-gg-blue-600"
                      : "bg-gray-100 text-gray-400 !cursor-not-allowed"
                  }`}
                  disabled={!pendingFilters.displacement}
                >
                  Aplicar filtro de cilindrada
                </button>
              </div>

              {/* Rendimiento */}
              <div className="mb-32">
                <h4 className="text-lg font-medium mb-2">Rendimiento</h4>
                <div className="flex gap-2 mb-2">
                  <Input
                    type="number"
                    placeholder="Desde km/gl"
                    value={filters.performance.min}
                    onChange={(e) =>
                      handleNumericFilterChange(
                        "performance",
                        "min",
                        e.target.value
                      )
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Hasta km/gl"
                    value={filters.performance.max}
                    onChange={(e) =>
                      handleNumericFilterChange(
                        "performance",
                        "max",
                        e.target.value
                      )
                    }
                  />
                </div>
                <button
                  onClick={() => applyFilterByType("performance")}
                  className={`hidden lg:block w-full py-2 px-4 rounded-lg transition-colors text-sm ${
                    pendingFilters.performance
                      ? "bg-gg-blue-500 text-white hover:bg-gg-blue-600"
                      : "bg-gray-100 text-gray-400 !cursor-not-allowed"
                  }`}
                  disabled={!pendingFilters.performance}
                >
                  Aplicar filtro de rendimiento
                </button>
              </div>

              {/* Botón de aplicar filtros para móvil */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
                <button
                  onClick={applyAllFilters}
                  className={`w-full py-3 px-4 rounded-lg transition-colors ${
                    hasPendingFilters()
                      ? "bg-gg-blue-500 text-white hover:bg-gg-blue-600"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!hasPendingFilters()}
                >
                  Aplicar filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 pb-24">
        {/* Section title */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            {activeTab === "new"
              ? "Motos Nuevas"
              : activeTab === "used"
              ? "Motos Seminuevas"
              : "Catálogo de Motos"}
          </h1>
          <p className="text-gray-600">
            {activeTab === "new"
              ? "Descubre nuestra selección de motos nuevas"
              : activeTab === "used"
              ? "Encuentra motos seminuevas en excelente estado"
              : "Explora nuestro catálogo completo de motos"}
          </p>
        </div>

        {/* Grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {motos.map((moto) => (
            <MotoCard key={moto.idModelo} moto={moto} />
          ))}
        </div>

        {/* Pagination controls */}
        <Pagination />
      </div>

      {/* Overlay para móvil */}
      {isFilterPanelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsFilterPanelOpen(false)}
        />
      )}
    </div>
  );
});

export default MotoFiltersBar;
