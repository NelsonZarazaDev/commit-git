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
        className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
      >
        {texts.description} <span className="text-rose-400">*</span>
      </label>
      <InputText
        id="description"
        name="description"
        autoComplete="off"
        className="w-full rounded-[1.1rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
        placeholder={texts.descriptionPlaceholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
}
