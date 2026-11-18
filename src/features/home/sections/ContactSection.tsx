"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowUpRight, Info } from "lucide-react";
import { contactContent } from "@/content/home";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { contactFormSchema, type ContactFormValues } from "@/features/contact/schema";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/FormFields";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";

type FormErrors = Partial<Record<keyof ContactFormValues, string>>;

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
    <Section
      id="contato"
      surface="elevated"
      spacing="lg"
      className="relative overflow-hidden"
      ariaLabelledBy="contact-heading"
    >
      {/* Subtle architectural ambient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 h-[420px] w-[420px] translate-x-1/3 -translate-y-1/3 rounded-full bg-[var(--nwk-neutral-cream)] blur-3xl opacity-80"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Heading id="contact-heading" as="h2" size="h2">
                {contactContent.heading}
              </Heading>
              <p className="mt-4 text-base leading-relaxed text-[var(--nwk-text-secondary)]">
                {contactContent.description}
              </p>

              {/* Quick solution selector synced with form */}
              <div className="mt-8">
                <p className="text-xs font-medium text-[var(--nwk-text-muted)]">
                  Frentes disponíveis
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {contactContent.solutionTypes.map((option) => {
                    const active = values.solutionType === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => updateField("solutionType", option)}
                        className={cn(
                          "cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200",
                          active
                            ? "border-[var(--nwk-carbon-black)] bg-[var(--nwk-carbon-black)] text-[var(--nwk-soft-white)]"
                            : "border-[var(--nwk-border-subtle)] bg-[var(--nwk-bg-primary)] text-[var(--nwk-text-secondary)] hover:border-[var(--nwk-carbon-black)]",
                        )}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-[var(--nwk-border-subtle)] bg-[var(--nwk-bg-alternative)] p-5">
                <div className="flex items-start gap-3">
                  <Info
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--nwk-text-secondary)]"
                    aria-hidden="true"
                  />
                  <p className="text-xs leading-relaxed text-[var(--nwk-text-secondary)]">
                    {contactContent.pendingIntegrationNotice}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-3xl border border-[var(--nwk-border-subtle)] bg-[var(--nwk-bg-primary)] p-6 shadow-[var(--nwk-shadow-lg)] sm:p-10"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor={`${baseId}-name`} required>
                    Nome
                  </Label>
                  <Input
                    id={`${baseId}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Seu nome completo"
                    value={values.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    hasError={Boolean(errors.name)}
                    aria-describedby={errors.name ? `${baseId}-name-error` : undefined}
                    className="mt-2"
                  />
                  <FieldError id={`${baseId}-name-error`} message={errors.name} />
                </div>

                <div>
                  <Label htmlFor={`${baseId}-email`} required>
                    E-mail
                  </Label>
                  <Input
                    id={`${baseId}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="voce@empresa.com"
                    value={values.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    hasError={Boolean(errors.email)}
                    aria-describedby={errors.email ? `${baseId}-email-error` : undefined}
                    className="mt-2"
                  />
                  <FieldError id={`${baseId}-email-error`} message={errors.email} />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor={`${baseId}-company`}>Empresa (opcional)</Label>
                  <Input
                    id={`${baseId}-company`}
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Nome da organização"
                    value={values.company ?? ""}
                    onChange={(e) => updateField("company", e.target.value)}
                    hasError={Boolean(errors.company)}
                    aria-describedby={errors.company ? `${baseId}-company-error` : undefined}
                    className="mt-2"
                  />
                  <FieldError id={`${baseId}-company-error`} message={errors.company} />
                </div>

                <div>
                  <Label htmlFor={`${baseId}-solution`} required>
                    Tipo de solução
                  </Label>
                  <Select
                    id={`${baseId}-solution`}
                    name="solutionType"
                    value={values.solutionType}
                    onChange={(e) =>
                      updateField(
                        "solutionType",
                        e.target.value as ContactFormValues["solutionType"],
                      )
                    }
                    hasError={Boolean(errors.solutionType)}
                    aria-describedby={
                      errors.solutionType ? `${baseId}-solution-error` : undefined
                    }
                    className="mt-2"
                  >
                    {contactContent.solutionTypes.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Select>
                  <FieldError id={`${baseId}-solution-error`} message={errors.solutionType} />
                </div>
              </div>

              <div className="mt-6">
                <Label htmlFor={`${baseId}-description`} required>
                  Descrição do projeto
                </Label>
                <Textarea
                  id={`${baseId}-description`}
                  name="description"
                  placeholder="Descreva o contexto, objetivos e o que você pretende construir."
                  value={values.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  hasError={Boolean(errors.description)}
                  aria-describedby={
                    errors.description ? `${baseId}-description-error` : undefined
                  }
                  className="mt-2"
                />
                <FieldError id={`${baseId}-description-error`} message={errors.description} />
              </div>

              {validatedLocalOnly ? (
                <div
                  role="status"
                  className="mt-6 rounded-xl border border-[var(--nwk-info)]/30 bg-[var(--nwk-info-bg)] p-4 text-xs leading-relaxed text-[var(--nwk-info)] sm:text-sm"
                >
                  Os campos foram validados localmente com sucesso. O envio externo ainda não foi
                  realizado porque o serviço de recebimento permanece pendente de configuração.
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs text-[var(--nwk-text-muted)]">
                  Campos marcados com * são obrigatórios.
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
            </form>
          </div>
        </div>
      </Container>
    </Section>
  );
}
