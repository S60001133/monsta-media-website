import React from "react";


interface NavLink {
  name: string;
  path: string;
}

interface CTA {
  text: string;
  href: string;
  size: string;
  variant: string;
}

interface MobileOverlayNavProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
  links: NavLink[];
  cta: CTA;
}


const MobileOverlayNav: React.FC<MobileOverlayNavProps> = ({ isOpen, onClose, onNavigate, links, cta }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex flex-col items-center justify-center">
      <button
        className="absolute top-4 right-4 text-white text-3xl focus:outline-none"
        onClick={onClose}
        aria-label="Close navigation"
      >
        &times;
      </button>
      <nav className="flex flex-col space-y-6 text-white text-2xl items-center">
        {links.map((link) => (
          <button
            key={link.path}
            className="bg-transparent border-none text-white hover:underline focus:outline-none"
            onClick={() => onNavigate(link.path)}
          >
            {link.name}
          </button>
        ))}
        <a
          href={cta.href}
          className={`mt-6 px-6 py-2 rounded ${cta.variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} text-lg font-semibold`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {cta.text}
        </a>
      </nav>
    </div>
  );
};

export default MobileOverlayNav;
