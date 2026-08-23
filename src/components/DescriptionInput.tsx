import { InputText } from "primereact/inputtext";
import type { TranslationSet } from "../i18n";

type props = {
  value: string;
  onChange: (value: string) => void;
  texts: TranslationSet;
};

export default function DescriptionInput({ value, onChange, texts }: props) {
  return (
    <div className="flex w-full flex-col justify-content-center gap-2">
      <label
        htmlFor="Description"
        className="field-label"
      >
        {texts.description} <span className="text-rose-400">*</span>
      </label>
      <InputText
        id="description"
        name="description"
        autoComplete="off"
        className="premium-input"
        placeholder={texts.descriptionPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
}
