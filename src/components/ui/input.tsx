import { forwardRef, type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-olive)] font-sans"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full bg-[var(--color-white)] border border-[var(--color-olive)]/30 rounded-xl px-4 py-2.5 text-[var(--color-black)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)]/30 focus:outline-none transition-all duration-200 font-sans ${error ? "border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-[var(--color-error)]/30" : ""} ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-[var(--color-error)] mt-0.5">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export { Input, type InputProps };
