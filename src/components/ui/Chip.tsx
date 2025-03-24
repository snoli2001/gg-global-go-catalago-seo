interface ChipProps {
  label: string;
  value: string | number;
  image?: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  color?: string;
}

export default function Chip({
  label,
  value,
  image,
  isSelected = false,
  onClick,
  className = '',
  color,
}: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex cursor-pointer items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
        transition-colors duration-200
        ${isSelected 
          ? 'bg-gg-blue-50 text-gray-700 hover:bg-gg-blue-200 border border-gg-blue-300' 
          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
        }
        ${className}
      `}
      style={color && !isSelected ? { color } : undefined}
    >
      {image && (
        <img 
          src={image} 
          alt={label} 
          className="w-5 h-5 object-contain"
        />
      )}
      {label}
    </button>
  );
} 