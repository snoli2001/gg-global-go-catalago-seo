import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'BLOG', href: 'https://globalgo.com.pe/blog/' },
    { label: 'CATÁLOGO DE MOTOS | FINANCIA TU MOTO FÁCILMENTE CON GLOBAL GO', href: 'https://catalogo.globalgo.com.pe/' },
    { label: 'SOLICITAR FINANCIAMIENTO', href: 'https://globalgo.com.pe/solicitar-financiamiento/' },
    { label: 'PREGUNTAS FRECUENTES', href: 'https://globalgo.com.pe/preguntas-frecuentes/' },
    { label: 'TÉRMINOS Y CONDICIONES DE USO', href: 'https://globalgo.com.pe/terminos-y-condiciones/' },
    { label: 'POLÍTICAS DE PRIVACIDAD', href: 'https://globalgo.com.pe/politicas-de-privacidad/' },
    { label: 'LIBRO DE RECLAMACIONES', href: 'https://globalgo.com.pe/libro-de-reclamaciones/' },
  ];

  const desktopMenuItems = [
    { label: 'Inicio', href: 'https://globalgo.com.pe/' },
    { label: 'Solicitar Financiamiento', href: 'https://globalgo.com.pe/solicitar-financiamiento/' },
    { label: 'Catálogo', href: 'https://catalogo.globalgo.com.pe/' },
    { label: 'Acerca de', href: 'https://globalgo.com.pe/sobre-nosotros/' },
    { label: 'Blog', href: 'https://globalgo.com.pe/blog/' },
    { label: 'Global Riders', href: 'https://globalgo.com.pe/global-riders/' },
    { label: 'FAQ', href: 'https://globalgo.com.pe/preguntas-frecuentes/' },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full top-0 left-0 z-50 font-['RoadRadio',Sans-serif] text-base font-normal">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="https://globalgo.com.pe">
              <img
                width="175"
                height="41"
                className="h-8 md:h-12 w-auto"
                src="https://globalgo.com.pe/wp-content/uploads/2023/08/Global-Go_Logo-06-1.png"
                alt="Global Go"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-1 justify-center">
            <ul className="flex space-x-1">
              {desktopMenuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[#116ACC] uppercase hover:text-[#116ACC]-600 px-3 py-2 transition-colors duration-200 relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#116ACC] transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Pay Button */}
          <div className="hidden lg:block">
            <a
              href="https://globalgo-login.sis360.com.pe/pago-cuotas"
              className="bg-white text-[#116ACC] px-3 py-3 rounded text-sm font-semibold hover:bg-[#116ACC] hover:text-white border-2 hover:border-[#116ACC] transition-colors duration-200"
            >
              PAGAR CUOTAS
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <a
              href="https://globalgo-login.sis360.com.pe/pago-cuotas"
              className="bg-white text-[#116ACC] text-xs px-3 py-1 rounded font-semibold hover:bg-[#116ACC] border-2 hover:text-white border-[#116ACC] transition-colors duration-200"
            >
              PAGAR CUOTAS
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#116ACC] p-2"
              aria-label="Alternar menú"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                <path d="M104 333H896C929 333 958 304 958 271S929 208 896 208H104C71 208 42 237 42 271S71 333 104 333ZM104 583H896C929 583 958 554 958 521S929 458 896 458H104C71 458 42 487 42 521S71 583 104 583ZM104 833H896C929 833 958 804 958 771S929 708 896 708H104C71 708 42 737 42 771S71 833 104 833Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Gray Overlay */}
        <div 
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 lg:hidden ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Navigation Menu */}
        <div 
          className={`lg:hidden fixed top-0 right-0 h-full w-[300px] bg-white transition-transform duration-300 ease-in-out z-50 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-end items-center px-6 py-4 mx-1">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-[#374151]"
              aria-label="Cerrar menú"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="pb-4">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block font-medium px-6 py-3 ${
                  item.label === 'CATÁLOGO DE MOTOS | FINANCIA TU MOTO FÁCILMENTE CON GLOBAL GO'
                    ? 'text-[#116ACC] hover:text-[#116ACC]/80'
                    : 'text-[#6B7280] hover:text-[#374151]'
                } text-base`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 