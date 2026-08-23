import { InputText } from "primereact/inputtext";
import type { TranslationSet } from "../i18n";

type props = {
  value: string;
  onChange: (value: string) => void;
  texts: TranslationSet;
};

export default function ScopeInput({ value, onChange, texts }: props) {
  return (
    <div className="flex w-full flex-col justify-content-center gap-2">
      <label
        htmlFor="Scope"
        className="field-label"
      >
        {texts.scope} <span className="text-slate-400">({texts.optional})</span>
      </label>
      <InputText
        id="scope"
        name="scope"
        className="premium-input"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={texts.scopePlaceholder}
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
}
