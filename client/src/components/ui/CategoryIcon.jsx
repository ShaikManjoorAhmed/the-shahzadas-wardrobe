const icons = {
  Kurta: (
    <svg viewBox="0 0 64 64" className="w-10 h-10">
      <path
        d="M20 8 L32 4 L44 8 L44 16 L52 22 L48 30 L44 26 L44 56 L20 56 L20 26 L16 30 L12 22 L20 16 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Sherwani: (
    <svg viewBox="0 0 64 64" className="w-10 h-10">
      <path
        d="M22 6 L32 2 L42 6 L42 14 L54 20 L50 30 L42 24 L42 58 L22 58 L22 24 L14 30 L10 20 L22 14 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <line x1="32" y1="14" x2="32" y2="50" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  "Pathani Suit": (
    <svg viewBox="0 0 64 64" className="w-10 h-10">
      <path
        d="M24 6 L32 3 L40 6 L40 14 L50 20 L46 30 L40 25 L40 60 L24 60 L24 25 L18 30 L14 20 L24 14 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M27 60 L27 40 M37 60 L37 40" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  Waistcoat: (
    <svg viewBox="0 0 64 64" className="w-10 h-10">
      <path
        d="M20 8 L32 12 L44 8 L44 18 L40 56 L24 56 L20 18 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M28 12 L32 30 L36 12" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};

const CategoryIcon = ({ category }) => {
  return <div className="text-gold">{icons[category]}</div>;
};

export default CategoryIcon;