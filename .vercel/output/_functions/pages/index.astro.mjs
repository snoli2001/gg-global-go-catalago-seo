import { c as createComponent, h as renderComponent, e as renderTemplate } from '../chunks/astro/server_CevFNFDB.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { m as motoService, $ as $$Layout } from '../chunks/Layout_Drj1S_Dx.mjs';
export { renderers } from '../renderers.mjs';

function Select({ options, value, onChange, placeholder = "Selecciona una opción", className = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const selectedOption = options.find((option) => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : placeholder;
  return /* @__PURE__ */ jsxs("div", { className: `relative ${className}`, ref: selectRef, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => setIsOpen(!isOpen),
        className: "w-full cursor-pointer px-4 py-2 text-left bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between",
        children: [
          /* @__PURE__ */ jsx("span", { className: `${!selectedOption ? "text-gray-500" : "text-gray-900"}`, children: displayValue }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: `w-5 h-5 text-gray-400 transition-transform ${isOpen ? "transform rotate-180" : ""}`,
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto", children: options.map((option) => /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => {
          onChange(option.value);
          setIsOpen(false);
        },
        className: `w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${value === option.value ? "bg-blue-50 text-blue-600" : "text-gray-900"}`,
        children: option.label
      },
      option.value
    )) })
  ] });
}

function Chip({
  label,
  value,
  image,
  isSelected = false,
  onClick,
  className = "",
  color
}) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick,
      className: `
        inline-flex cursor-pointer items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
        transition-colors duration-200
        ${isSelected ? "bg-gg-blue-50 text-gray-700 hover:bg-gg-blue-200 border border-gg-blue-300" : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"}
        ${className}
      `,
      style: color && !isSelected ? { color } : void 0,
      children: [
        image && /* @__PURE__ */ jsx(
          "img",
          {
            src: image,
            alt: label,
            className: "w-5 h-5 object-contain"
          }
        ),
        label
      ]
    }
  );
}

function Input({
  prefix,
  label,
  error,
  className = "",
  ...props
}) {
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    label && /* @__PURE__ */ jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: label }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      prefix && /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm", children: prefix }),
      /* @__PURE__ */ jsx(
        "input",
        {
          ...props,
          className: `
            w-full px-3 py-3 border rounded-lg text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${prefix ? "pl-8" : ""}
            ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
            ${className}
          `
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-red-500", children: error })
  ] });
}

function MotoImage({ src, alt, width, height, className, style }) {
  return /* @__PURE__ */ jsx(
    "img",
    {
      src,
      alt,
      width,
      height,
      className,
      style,
      loading: "eager",
      decoding: "async"
    }
  );
}

const toTitleCase = (str) => {
  return str.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
};
const getBannerImage = (moto) => {
  const bannerImages = moto.carrusels.filter(
    (carrusel) => carrusel.type === "B"
  );
  for (const color of moto.colores) {
    const bannerImage = bannerImages.find(
      (img) => img.color_id === color.color_id
    );
    if (bannerImage) {
      return bannerImage.imagen;
    }
  }
  return "/imgs/moto.png";
};
const hasColorImage = (moto, colorId) => {
  return moto.carrusels.some(
    (carrusel) => carrusel.type === "B" && carrusel.color_id === colorId
  );
};
const getCategoryClass = (categoria) => {
  const baseClasses = "absolute top-3 -left-3 text-sm text-white rounded-md px-2 py-1";
  const bgColorMap = {
    "Touring - Viajeras": "bg-purple-700",
    "Enduro - Cross": "bg-yellow-600",
    Deportiva: "bg-red-600",
    Pistera: "bg-green-600",
    Scooter: "bg-orange-600",
    "Doble proposito - Todo Terreno": "bg-dark",
    "Café Racer": "bg-yellow-900"
  };
  const bgColor = bgColorMap[categoria] || "bg-gray-600";
  return `${baseClasses} ${bgColor}`;
};
const formatPrice = (price, currency) => {
  if (currency.toLowerCase() === "sol") {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
      minimumFractionDigits: 1,
      maximumFractionDigits: 2
    }).format(price);
  } else {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 1,
      maximumFractionDigits: 2
    }).format(price);
  }
};
const ColorCircle = ({
  color,
  selected = false,
  disabled = false,
  size = 20
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `rounded-full transition-transform border border-stroke ${!disabled ? "cursor-pointer hover:scale-110" : "opacity-30"} ${selected ? "ring-2 ring-gg-blue-700 ring-offset-2" : ""}`,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          backgroundImage: `linear-gradient(to right, ${color.hex1}, ${color.hex2})`
        }
      }
    ),
    disabled && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-5 h-[1px] bg-gray-400 rotate-45 rounded-full" }) })
  ] });
};
function MotoCardReact({ moto }) {
  const handleClick = () => {
    const isInIframe = window !== window.parent;
    if (isInIframe) {
      window.top.location.href = `${"https://globalgo.com.pe/catalogo"}?codigoMoto=${moto.code}`;
      return;
    }
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        window.location.href = `/motos/${moto.code}`;
      });
    } else {
      window.location.href = `/motos/${moto.code}`;
    }
  };
  return /* @__PURE__ */ jsxs(
    "article",
    {
      className: "border cursor-pointer border-stroke rounded-lg bg-white w-full group",
      onClick: handleClick,
      children: [
        /* @__PURE__ */ jsxs("header", { className: "flex relative", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full aspect-[4/3] overflow-hidden px-4 pt-5 pb-3", children: /* @__PURE__ */ jsx(
            MotoImage,
            {
              style: { viewTransitionName: `moto-${moto.idModelo}` },
              className: "object-contain h-auto w-full transition-all duration-300 group-hover:scale-105 group-hover:rotate-3",
              src: getBannerImage(moto),
              alt: moto.modelo,
              width: 400,
              height: 300
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: getCategoryClass(moto.categoria), children: toTitleCase(moto.categoria) }),
          /* @__PURE__ */ jsx("div", { className: "absolute top-3 right-4", children: /* @__PURE__ */ jsx(
            MotoImage,
            {
              style: { viewTransitionName: `moto-marca-${moto.idModelo}` },
              src: moto.logo,
              alt: moto.marca,
              className: "w-12 h-auto",
              width: 48,
              height: 48
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "px-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-0", children: /* @__PURE__ */ jsx("strong", { className: "text-2xl -mt-0.5 text-dark font-medium truncate", children: moto.modelo }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center py-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xl font-medium text-gg-blue-700", children: moto.currency.toLowerCase() === "sol" ? formatPrice(moto.precio, "sol") : formatPrice(moto.price_dollar, "usd") }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5", children: moto.colores.filter((color) => hasColorImage(moto, color.color_id)).map((color) => /* @__PURE__ */ jsx("div", { className: "pointer-events-none", children: /* @__PURE__ */ jsx(ColorCircle, { color }) }, color.color_id)) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("footer", { className: "pt-2 px-4 flex flex-col gap-0.5 pb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-primary-text", children: "Cilindrada (CS):" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-primary-text", children: moto.cilindrada })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-primary-text", children: "Rendimiento:" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-primary-text", children: moto.rendimiento })
          ] })
        ] })
      ]
    }
  );
}

class BannersService {
  apiUrl = "https://globalgo-api.sis360.com.pe/api/Catalog";
  async getBanners() {
    try {
      const response = await fetch(`${this.apiUrl}/getBannerAd`);
      if (!response.ok) {
        throw new Error("Error fetching banners");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching banners:", error);
      return [];
    }
  }
}
const bannersService = new BannersService();

function BannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const fetchBanners = async () => {
      const data = await bannersService.getBanners();
      setBanners(data);
    };
    fetchBanners();
  }, []);
  useEffect(() => {
    if (!isPaused && banners.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 5e3);
      return () => clearInterval(timer);
    }
  }, [isPaused, banners.length]);
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };
  if (banners.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative w-full h-[200px] md:h-[300px] overflow-hidden rounded-lg mb-6",
      onMouseEnter: () => setIsPaused(true),
      onMouseLeave: () => setIsPaused(false),
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: prevSlide,
            className: "absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 2,
                stroke: "currentColor",
                className: "w-6 h-6",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M15.75 19.5L8.25 12l7.5-7.5"
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: nextSlide,
            className: "absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all",
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 2,
                stroke: "currentColor",
                className: "w-6 h-6",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M8.25 4.5l7.5 7.5-7.5 7.5"
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex transition-transform duration-500 ease-out h-full",
            style: { transform: `translateX(-${currentSlide * 100}%)` },
            children: banners.map((banner) => /* @__PURE__ */ jsx(
              "a",
              {
                href: `/motos/${banner.code}`,
                className: "w-full h-full flex-shrink-0",
                children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: banner.url,
                    alt: banner.description,
                    className: "w-full h-full object-cover"
                  }
                )
              },
              banner.code
            ))
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2", children: banners.map((_, index) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => goToSlide(index),
            className: `w-2 h-2 rounded-full transition-all ${index === currentSlide ? "bg-white w-4" : "bg-white/50"}`
          },
          index
        )) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsPaused(!isPaused),
            className: "absolute bottom-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all",
            children: isPaused ? /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 2,
                stroke: "currentColor",
                className: "w-4 h-4",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653z"
                  }
                )
              }
            ) : /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                strokeWidth: 2,
                stroke: "currentColor",
                className: "w-4 h-4",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    d: "M15.75 5.25v13.5m-7.5-13.5v13.5"
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
}

function SearchBar({
  motos,
  placeholder = "Encuentra tu moto favorita"
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    if (value.trim() === "") {
      setResults([]);
      return;
    }
    const searchResults = motos.filter((moto) => moto.modelo.toLowerCase().includes(value.toLowerCase())).slice(0, 5);
    setResults(searchResults);
  };
  const getBannerImage = (moto) => {
    const bannerImages = moto.carrusels.filter(
      (carrusel) => carrusel.type === "B"
    );
    return bannerImages[0]?.imagen || "/imgs/moto.png";
  };
  const handleResultClick = (moto) => {
    window.location.href = `/motos/${moto.code}`;
    setIsOpen(false);
    setQuery("");
  };
  return /* @__PURE__ */ jsx("div", { ref: searchRef, className: "w-full max-w-3xl mx-auto mb-8", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: query,
        placeholder,
        onChange: handleSearch,
        onFocus: () => query.trim() !== "" && setIsOpen(true),
        className: "w-full px-4 py-3 pl-12 rounded-full border-2 border-gg-blue-700 focus:outline-none focus:border-gg-blue-800 text-gray-700 placeholder-gray-500"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 2,
        stroke: "currentColor",
        className: "w-6 h-6 text-gray-400",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          }
        )
      }
    ) }),
    isOpen && results.length > 0 && /* @__PURE__ */ jsx("div", { className: "absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50", children: results.map((moto) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => handleResultClick(moto),
        className: "w-full flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors text-left",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 flex-shrink-0", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: getBannerImage(moto),
              alt: moto.modelo,
              className: "w-full h-full object-contain rounded-lg"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("p", { className: "text-gray-900 font-medium", children: [
              moto.marca,
              " - ",
              moto.modelo
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: moto.categoria })
          ] })
        ]
      },
      moto.idModelo
    )) })
  ] }) });
}

function MotoListReact({
  initialBrands,
  initialCategories,
  initialMotos
}) {
  const [brands] = useState(initialBrands);
  const [categories] = useState(initialCategories);
  const [motos] = useState(initialMotos);
  const [filteredMotos, setFilteredMotos] = useState(initialMotos);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pendingFilters, setPendingFilters] = useState({
    price: false,
    displacement: false,
    performance: false,
    chips: false
  });
  const [filters, setFilters] = useState({
    sort: "price_asc",
    price: { min: "", max: "" },
    brands: [],
    transmission: [],
    categories: [],
    displacement: { min: "", max: "" },
    performance: { min: "", max: "" }
  });
  useEffect(() => {
    if (window.innerWidth >= 1024 && !pendingFilters.price && !pendingFilters.displacement && !pendingFilters.performance) {
      applyFilters();
    }
  }, [filters.brands, filters.transmission, filters.categories, filters.sort]);
  const applyFilters = () => {
    let filtered = [...motos];
    if (filters.brands.length > 0) {
      filtered = filtered.filter((moto) => filters.brands.includes(moto.marca));
    }
    if (filters.categories.length > 0) {
      filtered = filtered.filter(
        (moto) => filters.categories.includes(moto.categoria)
      );
    }
    if (filters.transmission.length > 0) {
      filtered = filtered.filter(
        (moto) => filters.transmission.includes(moto.transmision)
      );
    }
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
    if (filters.displacement.min) {
      filtered = filtered.filter(
        (moto) => parseFloat(moto.cilindrada) >= parseFloat(filters.displacement.min)
      );
    }
    if (filters.displacement.max) {
      filtered = filtered.filter(
        (moto) => parseFloat(moto.cilindrada) <= parseFloat(filters.displacement.max)
      );
    }
    if (filters.performance.min) {
      filtered = filtered.filter(
        (moto) => parseFloat(moto.rendimiento) >= parseFloat(filters.performance.min)
      );
    }
    if (filters.performance.max) {
      filtered = filtered.filter(
        (moto) => parseFloat(moto.rendimiento) <= parseFloat(filters.performance.max)
      );
    }
    if (filters.sort === "price_asc") {
      filtered.sort((a, b) => a.precio - b.precio);
    } else if (filters.sort === "price_desc") {
      filtered.sort((a, b) => b.precio - a.precio);
    }
    setPendingFilters({
      price: false,
      displacement: false,
      performance: false,
      chips: false
    });
    setFilteredMotos(filtered);
  };
  const handleSortChange = (value) => {
    setFilters((prev) => ({ ...prev, sort: value }));
    if (window.innerWidth < 1024) {
      setPendingFilters((prev) => ({ ...prev, chips: true }));
    }
  };
  const handleBrandToggle = (brandName) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brandName) ? prev.brands.filter((name) => name !== brandName) : [...prev.brands, brandName]
    }));
    if (window.innerWidth < 1024) {
      setPendingFilters((prev) => ({ ...prev, chips: true }));
    }
  };
  const handleCategoryToggle = (categoryName) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryName) ? prev.categories.filter((name) => name !== categoryName) : [...prev.categories, categoryName]
    }));
    if (window.innerWidth < 1024) {
      setPendingFilters((prev) => ({ ...prev, chips: true }));
    }
  };
  const handleTransmissionToggle = (type) => {
    setFilters((prev) => ({
      ...prev,
      transmission: prev.transmission.includes(type) ? prev.transmission.filter((t) => t !== type) : [...prev.transmission, type]
    }));
    if (window.innerWidth < 1024) {
      setPendingFilters((prev) => ({ ...prev, chips: true }));
    }
  };
  const handleNumericFilterChange = (filterType, minMax, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: { ...prev[filterType], [minMax]: value }
    }));
    setPendingFilters((prev) => ({
      ...prev,
      [filterType]: true
    }));
  };
  const applyFilterByType = (filterType) => {
    setPendingFilters((prev) => ({
      ...prev,
      [filterType]: false
    }));
    applyFilters();
  };
  const hasActiveFilters = () => {
    return filters.brands.length > 0 || filters.transmission.length > 0 || filters.categories.length > 0 || filters.price.min !== "" || filters.price.max !== "" || filters.displacement.min !== "" || filters.displacement.max !== "" || filters.performance.min !== "" || filters.performance.max !== "" || filters.sort !== "price_asc";
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
      performance: { min: "", max: "" }
    });
    setPendingFilters({
      price: false,
      displacement: false,
      performance: false,
      chips: false
    });
    setFilteredMotos(motos);
  };
  const sortOptions = [
    { value: "price_desc", label: "Precio: Mayor a Menor" },
    { value: "price_asc", label: "Precio: Menor a Mayor" }
  ];
  const hasPendingFilters = () => {
    return Object.values(pendingFilters).some((value) => value);
  };
  const applyAllFilters = () => {
    setPendingFilters({
      price: false,
      displacement: false,
      performance: false,
      chips: false
    });
    applyFilters();
    if (window.innerWidth < 1024) {
      setIsFilterPanelOpen(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 p-4 lg:p-6 mx-auto max-w-screen-2xl", children: [
    /* @__PURE__ */ jsx(BannerCarousel, {}),
    /* @__PURE__ */ jsx(SearchBar, { motos }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:hidden flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Catálogo de Motos" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setIsFilterPanelOpen(!isFilterPanelOpen),
            className: "flex items-center gap-2 px-4 py-2 bg-gg-blue-700 text-white rounded-lg hover:bg-gg-blue-800 transition-colors",
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: 1.5,
                  stroke: "currentColor",
                  className: "w-5 h-5",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                    }
                  )
                }
              ),
              "Filtros"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "aside",
        {
          className: `
          fixed lg:static inset-y-0 left-0 w-full lg:w-72 bg-white shadow-lg lg:shadow z-50
          transform transition-transform duration-300 ease-in-out
          ${isFilterPanelOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `,
          children: /* @__PURE__ */ jsxs("div", { className: "h-full overflow-y-auto", children: [
            /* @__PURE__ */ jsxs("div", { className: "lg:hidden flex items-center justify-between p-4 border-b", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold", children: "Filtros" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsFilterPanelOpen(false),
                  className: "p-2 hover:bg-gray-100 rounded-full",
                  children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: 1.5,
                      stroke: "currentColor",
                      className: "w-6 h-6",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M6 18 18 6M6 6l12 12"
                        }
                      )
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
                /* @__PURE__ */ jsx("h3", { className: "text-base font-normal mb-2", children: "Ordenar por" }),
                /* @__PURE__ */ jsx(
                  Select,
                  {
                    options: sortOptions,
                    value: filters.sort,
                    onChange: handleSortChange
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-base font-normal", children: "Filtros" }),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: handleClearFilters,
                      className: `text-sm transition-colors flex items-center gap-1 ${hasActiveFilters() ? "text-gg-blue-700 hover:text-gg-blue-800" : "text-gray-400 !cursor-not-allowed"}`,
                      disabled: !hasActiveFilters(),
                      children: [
                        /* @__PURE__ */ jsx(
                          "svg",
                          {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            strokeWidth: 1.5,
                            stroke: "currentColor",
                            className: "w-4 h-4",
                            children: /* @__PURE__ */ jsx(
                              "path",
                              {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                d: "M6 18 18 6M6 6l12 12"
                              }
                            )
                          }
                        ),
                        "Limpiar filtros"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-sm font-normal mb-2", children: "Precio" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-2", children: [
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "number",
                        placeholder: "Desde",
                        value: filters.price.min,
                        onChange: (e) => handleNumericFilterChange(
                          "price",
                          "min",
                          e.target.value
                        ),
                        prefix: "S/"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "number",
                        placeholder: "Hasta",
                        value: filters.price.max,
                        onChange: (e) => handleNumericFilterChange(
                          "price",
                          "max",
                          e.target.value
                        ),
                        prefix: "S/"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => applyFilterByType("price"),
                      className: `hidden lg:block w-full py-2 px-4 rounded-lg transition-colors text-sm ${pendingFilters.price ? "bg-gg-blue-500 text-white hover:bg-gg-blue-600" : "bg-gray-100 text-gray-400 !cursor-not-allowed"}`,
                      disabled: !pendingFilters.price,
                      children: "Aplicar filtro de precio"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-sm font-normal mb-2", children: "Marcas" }),
                  /* @__PURE__ */ jsx("div", { className: "space-y-1 space-x-1", children: brands.map((brand) => /* @__PURE__ */ jsx(
                    Chip,
                    {
                      label: brand.marca.toLocaleUpperCase(),
                      value: brand.marca,
                      image: brand.logo,
                      isSelected: filters.brands.includes(brand.marca),
                      onClick: () => handleBrandToggle(brand.marca)
                    },
                    brand.idMarca
                  )) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-sm font-normal mb-2", children: "Transmisión" }),
                  /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: ["Mecánica", "Automática", "Semiautomática"].map(
                    (type) => /* @__PURE__ */ jsx(
                      Chip,
                      {
                        label: type,
                        value: type,
                        isSelected: filters.transmission.includes(type),
                        onClick: () => handleTransmissionToggle(type)
                      },
                      type
                    )
                  ) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-sm font-normal mb-2", children: "Categoría" }),
                  /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: categories.map((category) => /* @__PURE__ */ jsx(
                    Chip,
                    {
                      label: category.categoria,
                      value: category.categoria,
                      isSelected: filters.categories.includes(
                        category.categoria
                      ),
                      onClick: () => handleCategoryToggle(category.categoria)
                    },
                    category.idCategoria
                  )) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-sm font-normal mb-2", children: "Cilindrada" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-2", children: [
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "number",
                        placeholder: "Desde",
                        value: filters.displacement.min,
                        onChange: (e) => handleNumericFilterChange(
                          "displacement",
                          "min",
                          e.target.value
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "number",
                        placeholder: "Hasta",
                        value: filters.displacement.max,
                        onChange: (e) => handleNumericFilterChange(
                          "displacement",
                          "max",
                          e.target.value
                        )
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => applyFilterByType("displacement"),
                      className: `hidden lg:block w-full py-2 px-4 rounded-lg transition-colors text-sm ${pendingFilters.displacement ? "bg-gg-blue-500 text-white hover:bg-gg-blue-600" : "bg-gray-100 text-gray-400 !cursor-not-allowed"}`,
                      disabled: !pendingFilters.displacement,
                      children: "Aplicar filtro de cilindrada"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-32", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-sm font-normal mb-2", children: "Rendimiento" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-2", children: [
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "number",
                        placeholder: "Desde km/gl",
                        value: filters.performance.min,
                        onChange: (e) => handleNumericFilterChange(
                          "performance",
                          "min",
                          e.target.value
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        type: "number",
                        placeholder: "Hasta km/gl",
                        value: filters.performance.max,
                        onChange: (e) => handleNumericFilterChange(
                          "performance",
                          "max",
                          e.target.value
                        )
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => applyFilterByType("performance"),
                      className: `hidden lg:block w-full py-2 px-4 rounded-lg transition-colors text-sm ${pendingFilters.performance ? "bg-gg-blue-500 text-white hover:bg-gg-blue-600" : "bg-gray-100 text-gray-400 !cursor-not-allowed"}`,
                      disabled: !pendingFilters.performance,
                      children: "Aplicar filtro de rendimiento"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: applyAllFilters,
                    className: `w-full py-3 px-4 rounded-lg transition-colors ${hasPendingFilters() ? "bg-gg-blue-500 text-white hover:bg-gg-blue-600" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`,
                    disabled: !hasPendingFilters(),
                    children: "Aplicar filtros"
                  }
                ) })
              ] })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex-1", children: isLoading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-12", children: [
        /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gg-blue-700 mb-4" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "Cargando motos..." })
      ] }) : filteredMotos.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6", children: filteredMotos.map((moto) => /* @__PURE__ */ jsx(MotoCardReact, { moto }, moto.idModelo)) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: [
        /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            strokeWidth: 1.5,
            stroke: "currentColor",
            className: "w-16 h-16 text-gray-400 mb-4",
            children: /* @__PURE__ */ jsx(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-2", children: "No se encontraron motos" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 max-w-sm", children: "No hay motos que coincidan con los filtros seleccionados. Intenta ajustar los filtros para ver más resultados." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: handleClearFilters,
            className: "mt-4 px-4 py-2 bg-gg-blue-700 text-white rounded-lg hover:bg-gg-blue-800 transition-colors",
            children: "Limpiar filtros"
          }
        )
      ] }) }),
      isFilterPanelOpen && /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden",
          onClick: () => setIsFilterPanelOpen(false)
        }
      )
    ] })
  ] });
}

class BrandsService {
  apiUrl = "https://globalgo-api.sis360.com.pe/api/Catalog";
  async getBrands() {
    try {
      if (!this.apiUrl) {
        console.error("PUBLIC_API_URL is not defined");
        throw new Error("API URL is not configured");
      }
      console.log("Fetching brands from:", `${this.apiUrl}/getBrands`);
      const response = await fetch(`${this.apiUrl}/getBrands`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch brands:", {
          status: response.status,
          statusText: response.statusText,
          errorText
        });
        throw new Error(`Failed to fetch brands: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Brands fetched successfully:", data.length);
      return data;
    } catch (error) {
      console.error("Error in getBrands:", error);
      throw error;
    }
  }
}
const brandsService = new BrandsService();

class CategoriesService {
  apiUrl = "https://globalgo-api.sis360.com.pe/api/Catalog";
  async getCategories() {
    try {
      const response = await fetch(`${this.apiUrl}/GetCategories`);
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }
}
const categoriesService = new CategoriesService();

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  console.log("API URL:", "https://globalgo-api.sis360.com.pe/api/Catalog");
  let brands = [];
  let categories = [];
  let motos = [];
  try {
    [brands, categories, motos] = await Promise.all([
      brandsService.getBrands(),
      categoriesService.getCategories(),
      motoService.getMotos()
    ]);
  } catch (error) {
    console.error("Error fetching data:", error);
    brands = [];
    categories = [];
    motos = [];
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Catalogo de motos | Global Go" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "MotoListReact", MotoListReact, { "client:load": true, "initialBrands": brands, "initialCategories": categories, "initialMotos": motos, "client:component-hydration": "load", "client:component-path": "C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/src/components/MotoListReact", "client:component-export": "default" })} ` })}`;
}, "C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/src/pages/index.astro", void 0);
const $$file = "C:/PERSONAL/work/Freelance/GLOBAL_GO/Dev/gg-catalogo-motos-astro/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
