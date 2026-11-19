"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowUpRight, Info } from "lucide-react";
import { contactContent } from "@/content/home";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { contactFormSchema, type ContactFormValues } from "@/features/contact/schema";
import { Button } from "@/components/ui/Button";
import { FieldError } from "@/components/ui/FormFields";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";

type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

const underline =
  "mt-1 w-full border-0 border-b bg-transparent px-0 py-3 text-base text-[#131315] placeholder:text-[#6B7078] transition-colors duration-200 focus:outline-none focus-visible:border-[#131315] focus-visible:shadow-[0_1px_0_0_#131315]";
const underlineState = (error?: string) =>
  error ? "border-[var(--nwk-error)]" : "border-[#131315]/30 hover:border-[#131315]/60";
const labelClass = "block text-xs font-medium tracking-[0.06em] uppercase text-[#4A4E55]";

export function ContactSection() {
  const baseId = useId();
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    company: "",
    solutionType: contactContent.solutionTypes[0] ?? "Software personalizado",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [validatedLocalOnly, setValidatedLocalOnly] = useState(false);

  function updateField<K extends keyof ContactFormValues>(key: K, value: ContactFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
    if (validatedLocalOnly) {
      setValidatedLocalOnly(false);
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = contactFormSchema.safeParse(values);

    if (!result.success) {
      const nextErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof ContactFormValues | undefined;
        if (field && !nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }
      setErrors(nextErrors);
      setValidatedLocalOnly(false);
      return;
    }

    setErrors({});
    if (!siteConfig.contactIntegrationConfigured) {
      setValidatedLocalOnly(true);
    }
  }

  return (
    <section
      id="contato"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-20 overflow-hidden bg-[#F2F0EB] py-24 text-[#131315] sm:py-36"
    >
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <h2
            id="contact-heading"
            className="font-display max-w-5xl text-[clamp(2.75rem,7.4vw,7.5rem)] leading-[0.96] font-medium tracking-[-0.045em]"
          >
            {contactContent.heading}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#4A4E55] sm:text-lg">
            {contactContent.description}
          </p>
        </Reveal>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-16 grid grid-cols-1 gap-14 border-t border-[#131315]/70 pt-12 lg:mt-24 lg:grid-cols-12 lg:gap-20"
        >
          <fieldset className="lg:col-span-5">
            <legend className="text-xs font-medium tracking-[0.06em] text-[#4A4E55] uppercase">
              O que vamos construir?
            </legend>
            <div className="mt-5 flex flex-col">
              {contactContent.solutionTypes.map((option) => {
                const id = `${baseId}-type-${option}`;
                const checked = values.solutionType === option;
                return (
                  <div key={option}>
                    <input
                      id={id}
                      type="radio"
                      name="solutionType"
                      value={option}
                      checked={checked}
                      onChange={() => updateField("solutionType", option)}
                      className="peer sr-only"
                    />
                    <label
                      htmlFor={id}
                      className={cn(
                        "font-display flex cursor-pointer items-center gap-4 py-1.5 text-[clamp(1.6rem,3.1vw,2.9rem)] leading-[1.1] font-medium tracking-[-0.03em] transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-[#131315]",
                        checked ? "translate-x-2 text-[#131315]" : "text-[#4A4E55] hover:text-[#131315]",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-2.5 w-2.5 shrink-0 rounded-full bg-[#131315] transition-transform duration-300",
                          checked ? "scale-100" : "scale-0",
                        )}
                      />
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
          </fieldset>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              <div>
                <label htmlFor={`${baseId}-name`} className={labelClass}>
                  Nome <span aria-hidden="true">*</span>
                </label>
                <input
                  id={`${baseId}-name`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  value={values.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  aria-invalid={Boolean(errors.name) || undefined}
                  aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
                  className={cn(underline, underlineState(errors.name))}
                />
                <FieldError id={`${baseId}-name-error`} message={errors.name} />
              </div>
              <div>
                <label htmlFor={`${baseId}-email`} className={labelClass}>
                  E-mail <span aria-hidden="true">*</span>
                </label>
                <input
                  id={`${baseId}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@empresa.com"
                  value={values.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  aria-invalid={Boolean(errors.email) || undefined}
                  aria-describedby={errors.email ? `${baseId}-email-error` : undefined}
                  className={cn(underline, underlineState(errors.email))}
                />
                <FieldError id={`${baseId}-email-error`} message={errors.email} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${baseId}-company`} className={labelClass}>
                  Empresa (opcional)
                </label>
                <input
                  id={`${baseId}-company`}
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Nome da organização"
                  value={values.company ?? ""}
                  onChange={(e) => updateField("company", e.target.value)}
                  aria-invalid={Boolean(errors.company) || undefined}
                  aria-describedby={errors.company ? `${baseId}-company-error` : undefined}
                  className={cn(underline, underlineState(errors.company))}
                />
                <FieldError id={`${baseId}-company-error`} message={errors.company} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${baseId}-description`} className={labelClass}>
                  Descrição do projeto <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id={`${baseId}-description`}
                  name="description"
                  rows={4}
                  placeholder="Descreva o contexto, objetivos e o que você pretende construir."
                  value={values.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  aria-invalid={Boolean(errors.description) || undefined}
                  aria-describedby={errors.description ? `${baseId}-description-error` : undefined}
                  className={cn(underline, "resize-y leading-relaxed", underlineState(errors.description))}
                />
                <FieldError id={`${baseId}-description-error`} message={errors.description} />
              </div>
            </div>

            {validatedLocalOnly ? (
              <div
                role="status"
                className="mt-8 border-l-2 border-[var(--nwk-info)] bg-[var(--nwk-info-bg)] p-4 text-xs leading-relaxed text-[var(--nwk-info)] sm:text-sm"
              >
                Os campos foram validados localmente com sucesso. O envio externo ainda não foi
                realizado porque o serviço de recebimento permanece pendente de configuração.
              </div>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
              <p className="flex max-w-sm items-start gap-2.5 text-xs leading-relaxed text-[#4A4E55]">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {contactContent.pendingIntegrationNotice}
              </p>
              <Magnetic>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  iconRight={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
                >
                  Validar solicitação
                </Button>
              </Magnetic>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
