import { useId } from "react";

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectDto extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: { message?: string };
  options: SelectOption[];
  placeholder?: string;
}

export function Select({
  label,
  error,
  options,
  placeholder,
  ...props
}: SelectDto) {
  const id = useId();

  return (
    <>
      <div className="flex w-full flex-col gap-1">
        {label && (
          <label
            htmlFor={props?.id ?? id}
            className="text-base-content/70 text-sm font-medium"
          >
            {label}
          </label>
        )}
        <div className="w-full">
          <select
            {...props}
            id={props?.id ?? id}
            className={`select w-full rounded-full ${props.className ?? ""}`}
            defaultValue={props.defaultValue ?? ""}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <span className="text-sm text-red-400">{error?.message}</span>
        )}
      </div>
    </>
  );
}
