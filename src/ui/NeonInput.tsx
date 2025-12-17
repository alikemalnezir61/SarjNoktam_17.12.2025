type NeonInputProps = {
  label?: string;
  type: string;
  placeholder?: string;
  icon?: any;
  value?: string;
  onChange?: (e: any) => void;
  maxLength?: number;
};

export default function NeonInput({
  label,
  type,
  placeholder,
  icon: Icon,
  value,
  onChange,
  maxLength,
}: NeonInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wider">
          {label}
        </label>
      )}

      <div className="relative group">
        <div className="absolute inset-0 bg-[#07B1FF] blur opacity-0 group-hover:opacity-10 transition duration-500 rounded-xl"></div>

        {Icon && (
          <div className="absolute left-4 top-4 text-gray-500 group-focus-within:text-[#07B1FF] transition">
            <div className="w-5 h-5">
              <Icon />
            </div>
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          className={`w-full bg-[#121826]/80 backdrop-blur-md border border-white/10 rounded-xl ${
            Icon ? "pl-12" : "px-4"
          } pr-4 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#07B1FF]/50 focus:ring-1 focus:ring-[#07B1FF]/50 transition-all relative z-10`}
        />
      </div>
    </div>
  );
}
