"use client";

interface TimeInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function TimeInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled,
}: TimeInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="text-xs mb-1 block">{label}</label>
      <input
        type="time"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`block w-full px-4 py-2.5 rounded-lg border ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
        } border-gray-300 shadow-sm focus:border-polynesian focus:ring-polynesian/60 focus:ring-opacity-50 transition-all duration-200 ease-in-out`}
      />
    </div>
  );
}
