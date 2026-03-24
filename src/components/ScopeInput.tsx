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
        className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
      >
        {texts.scope} <span className="text-slate-400">({texts.optional})</span>
      </label>
      <InputText
        id="scope"
        name="scope"
        className="w-full rounded-[1.1rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={texts.scopePlaceholder}
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
}
