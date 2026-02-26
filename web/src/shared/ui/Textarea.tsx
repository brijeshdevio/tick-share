import { useId } from "react";

export interface TextareaDto extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: { message?: string };
}

export function Textarea({ label, error, ...props }: TextareaDto) {
  const id = useId();

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label
          htmlFor={props?.id ?? id}
          className="text-base-content/70 text-sm font-medium"
        >
          {label}
        </label>
      )}

      <div className="textarea w-full rounded-2xl">
        <textarea
          {...props}
          id={props?.id ?? id}
          className={`w-full resize-none bg-transparent outline-none ${props.className ?? ""}`}
        />
      </div>

      {error && <span className="text-sm text-red-400">{error?.message}</span>}
    </div>
  );
}
