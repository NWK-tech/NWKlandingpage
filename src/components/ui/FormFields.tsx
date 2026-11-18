import type {
  InputHTMLAttributes,
  LabelHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ children, required, className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "block text-xs font-medium tracking-[0.06em] uppercase text-[var(--nwk-text-secondary)]",
        className,
      )}
      {...props}
    >
      {children}
      {required ? (
        <span className="ml-1 text-[var(--nwk-text-muted)]" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
}

const baseFieldClass =
  "w-full rounded-xl border bg-[var(--nwk-bg-elevated)] px-4 py-3 text-sm text-[var(--nwk-text-primary)] placeholder:text-[var(--nwk-text-muted)] transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

function getFieldStateClass(hasError?: boolean, isSuccess?: boolean): string {
  if (hasError) {
    return "border-[var(--nwk-error)] focus:border-[var(--nwk-error)] focus:ring-1 focus:ring-[var(--nwk-error)]";
  }
  if (isSuccess) {
    return "border-[var(--nwk-success)] focus:border-[var(--nwk-success)]";
  }
  return "border-[var(--nwk-border-subtle)] hover:border-[var(--nwk-border-strong)] focus:border-[var(--nwk-carbon-black)]";
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  isSuccess?: boolean;
}

export function Input({ hasError, isSuccess, className, ...props }: InputProps) {
  return (
    <input
      aria-invalid={hasError || undefined}
      className={cn(baseFieldClass, "h-12", getFieldStateClass(hasError, isSuccess), className)}
      {...props}
    />
  );
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
  isSuccess?: boolean;
}

export function Textarea({ hasError, isSuccess, className, ...props }: TextareaProps) {
  return (
    <textarea
      aria-invalid={hasError || undefined}
      className={cn(
        baseFieldClass,
        "min-h-[136px] resize-y leading-relaxed",
        getFieldStateClass(hasError, isSuccess),
        className,
      )}
      {...props}
    />
  );
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  isSuccess?: boolean;
}

export function Select({ hasError, isSuccess, className, children, ...props }: SelectProps) {
  return (
    <select
      aria-invalid={hasError || undefined}
      className={cn(
        baseFieldClass,
        "h-12 cursor-pointer",
        getFieldStateClass(hasError, isSuccess),
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs font-medium text-[var(--nwk-error)]">
      {message}
    </p>
  );
}
