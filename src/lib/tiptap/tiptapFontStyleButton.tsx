
interface EditorToggleButtonProps {
  active: boolean;
  onClick: () => void;
  label: React.ReactNode;
  customStyle?: string;
}

export default function ToggleButton({
  active,
  onClick,
  label,
  customStyle = '',
}: EditorToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-2 py-1 rounded-lg border border-gray-300 transition-colors  cursor-pointer ${
        active ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      } ${customStyle}`}
    >
      {label}
    </button>
  );
}