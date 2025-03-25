import { useState, useEffect } from "react";
import type { Brand } from "../types/brand.interface";
import type { Category } from "../types/category.interface";
import { brandsService } from "../services/api/brands.service";
import { categoriesService } from "../services/api/categories.service";
import Select from "./ui/Select";
import Chip from "./ui/Chip";
import Input from "./ui/Input";
import type { Moto } from "../types/moto.interface";
import MotoCardReact from "./moto/MotoCardReact";
import BannerCarousel from "./ui/BannerCarousel";
import SearchBar from "./ui/SearchBar";
import { motoService } from "../services/api/moto.service";

interface FilterState {
  sort: string;
  price: { min: string; max: string };
  brands: string[];
  transmission: string[];
  categories: string[];
  displacement: { min: string; max: string };
  performance: { min: string; max: string };
}

interface MotoListReactProps {
  initialBrands: Brand[];
  initialCategories: Category[];
  initialMotos: Moto[];
}

export default function MotoListReact({ initialBrands, initialCategories, initialMotos }: MotoListReactProps) {
  const [brands] = useState<Brand[]>(initialBrands);
  const [categories] = useState<Category[]>(initialCategories);
  const [motos] = useState<Moto[]>(initialMotos);
  const [filteredMotos, setFilteredMotos] = useState<Moto[]>(initialMotos);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  });

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
  }, [filters.brands, filters.transmission, filters.categories, filters.sort]);

  const applyFilters = () => {
    let filtered = [...motos];

    // Apply brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter((moto) => filters.brands.includes(moto.marca));
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((moto) =>
        filters.categories.includes(moto.categoria)
      );
    }

    // Apply transmission filter
    if (filters.transmission.length > 0) {
      filtered = filtered.filter((moto) =>
        filters.transmission.includes(moto.transmision)
      );
    }

    // Apply price filter
    if (filters.price.min) {
      filtered = filtered.filter(
        (moto) => moto.precio >= parseFloat(filters.price.min)
      );
    }
    if (filters.price.max) {
      filtered = filtered.filter(
        (moto) => moto.precio <= parseFloat(filters.price.max)
      );
    }

    // Apply displacement filter
    if (filters.displacement.min) {
      filtered = filtered.filter(
        (moto) =>
          parseFloat(moto.cilindrada) >= parseFloat(filters.displacement.min)
      );
    }
    if (filters.displacement.max) {
      filtered = filtered.filter(
        (moto) =>
          parseFloat(moto.cilindrada) <= parseFloat(filters.displacement.max)
      );
    }

    // Apply performance filter
    if (filters.performance.min) {
      filtered = filtered.filter(
        (moto) =>
          parseFloat(moto.rendimiento) >= parseFloat(filters.performance.min)
      );
    }
    if (filters.performance.max) {
      filtered = filtered.filter(
        (moto) =>
          parseFloat(moto.rendimiento) <= parseFloat(filters.performance.max)
      );
    }

    // Apply sorting
    if (filters.sort === "price_asc") {
      filtered.sort((a, b) => a.precio - b.precio);
    } else if (filters.sort === "price_desc") {
      filtered.sort((a, b) => b.precio - a.precio);
    }

    setPendingFilters({
      price: false,
      displacement: false,
      performance: false,
      chips: false,
    });
    setFilteredMotos(filtered);
  };

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({ ...prev, sort: value }));
    if (window.innerWidth < 1024) {
      setPendingFilters((prev) => ({ ...prev, chips: true }));
    }
  };

  const handleBrandToggle = (brandName: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brandName)
        ? prev.brands.filter((name) => name !== brandName)
        : [...prev.brands, brandName],
    }));
    if (window.innerWidth < 1024) {
      setPendingFilters((prev) => ({ ...prev, chips: true }));
    }
  };

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
      filters.sort !== "price_asc"
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
    });
    setPendingFilters({
      price: false,
      displacement: false,
      performance: false,
      chips: false,
    });
    // Aplicar los filtros inmediatamente después de limpiarlos
    setFilteredMotos(motos);
  };

  const sortOptions = [
    { value: "price_desc", label: "Precio: Mayor a Menor" },
    { value: "price_asc", label: "Precio: Menor a Mayor" },
  ];

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

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredMotos(motos);
      return;
    }

    const searchResults = motos.filter((moto) =>
      moto.modelo.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredMotos(searchResults);
  };

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6 mx-auto max-w-screen-2xl">
      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Search Bar */}
      <SearchBar motos={motos} />

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Botón de filtros para móvil */}
        <div className="lg:hidden flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Catálogo de Motos</h2>
          <button
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gg-blue-700 text-white rounded-lg hover:bg-gg-blue-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
            Filtros
          </button>
        </div>

        {/* Filtros */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 w-full lg:w-72 bg-white shadow-lg lg:shadow z-50
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
              <h3 className="text-lg font-semibold">Filtros</h3>
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
                  <h4 className="text-sm font-normal mb-2">Precio</h4>
                  <div className="flex gap-2 mb-2">
                    <Input
                      type="number"
                      placeholder="Desde"
                      value={filters.price.min}
                      onChange={(e) =>
                        handleNumericFilterChange(
                          "price",
                          "min",
                          e.target.value
                        )
                      }
                      prefix="S/"
                    />
                    <Input
                      type="number"
                      placeholder="Hasta"
                      value={filters.price.max}
                      onChange={(e) =>
                        handleNumericFilterChange(
                          "price",
                          "max",
                          e.target.value
                        )
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
                  <h4 className="text-sm font-normal mb-2">Marcas</h4>
                  <div className="space-y-1 space-x-1">
                    {brands.map((brand) => (
                      <Chip
                        key={brand.idMarca}
                        label={brand.marca.toLocaleUpperCase()}
                        value={brand.marca}
                        image={brand.logo}
                        isSelected={filters.brands.includes(brand.marca)}
                        onClick={() => handleBrandToggle(brand.marca)}
                      />
                    ))}
                  </div>
                </div>

                {/* Transmisión */}
                <div className="mb-4">
                  <h4 className="text-sm font-normal mb-2">Transmisión</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Mecánica", "Automática", "Semiautomática"].map(
                      (type) => (
                        <Chip
                          key={type}
                          label={type}
                          value={type}
                          isSelected={filters.transmission.includes(type)}
                          onClick={() => handleTransmissionToggle(type)}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Categoría */}
                <div className="mb-4">
                  <h4 className="text-sm font-normal mb-2">Categoría</h4>
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
                  <h4 className="text-sm font-normal mb-2">Cilindrada</h4>
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
                  <h4 className="text-sm font-normal mb-2">Rendimiento</h4>
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

        {/* Grid de motos */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gg-blue-700 mb-4"></div>
              <p className="text-gray-500">Cargando motos...</p>
            </div>
          ) : filteredMotos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filteredMotos.map((moto) => (
                <MotoCardReact key={moto.idModelo} moto={moto} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16 text-gray-400 mb-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No se encontraron motos
              </h3>
              <p className="text-gray-500 max-w-sm">
                No hay motos que coincidan con los filtros seleccionados.
                Intenta ajustar los filtros para ver más resultados.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 px-4 py-2 bg-gg-blue-700 text-white rounded-lg hover:bg-gg-blue-800 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        {/* Overlay para móvil */}
        {isFilterPanelOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsFilterPanelOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
