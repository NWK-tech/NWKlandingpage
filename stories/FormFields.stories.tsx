import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FieldError, Input, Label, Select, Textarea } from "@/components/ui/FormFields";

function FormFieldsShowcase() {
  return (
    <div className="max-w-lg space-y-6 p-6">
      <div>
        <Label htmlFor="story-name" required>
          Nome
        </Label>
        <Input id="story-name" placeholder="Seu nome completo" className="mt-2" />
      </div>

      <div>
        <Label htmlFor="story-email" required>
          E-mail com erro
        </Label>
        <Input
          id="story-email"
          defaultValue="email-invalido"
          hasError
          aria-describedby="story-email-err"
          className="mt-2"
        />
        <FieldError id="story-email-err" message="Informe um endereço de e-mail válido." />
      </div>

      <div>
        <Label htmlFor="story-select">Tipo de solução</Label>
        <Select id="story-select" className="mt-2">
          <option>Software personalizado</option>
          <option>Aplicativo</option>
          <option>Website</option>
        </Select>
      </div>

      <div>
        <Label htmlFor="story-desc">Descrição</Label>
        <Textarea id="story-desc" placeholder="Detalhes do projeto" className="mt-2" />
      </div>
    </div>
  );
}

const meta: Meta<typeof FormFieldsShowcase> = {
  title: "Components/FormFields",
  component: FormFieldsShowcase,
};

export default meta;
type Story = StoryObj<typeof FormFieldsShowcase>;

export const States: Story = {};
