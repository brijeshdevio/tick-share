import { Button } from "./Button";

export interface ToggleOption {
  label: string;
  value: string;
}

export interface ToggleDto {
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  options: ToggleOption[];
  name?: string;
}

export function Toggle({
  label,
  value,
  onChange = () => {},
  options,
  name,
}: ToggleDto) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span className="text-base-content/70 text-sm font-medium">
          {label}
        </span>
      )}

      <div className="bg-base-200 flex w-fit items-center gap-1 rounded-full p-1">
        {options.map((option) => {
          const isActive = option.value === value;

          return (
            <Button
              key={option.value}
              type="button"
              name={name}
              onClick={() => onChange(option.value)}
              className={`transition-all ${
                isActive
                  ? "bg-primary text-primary-content shadow"
                  : "text-base-content/70 hover:bg-base-300"
              }`}
            >
              {option.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
