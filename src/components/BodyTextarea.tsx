import { InputTextarea } from "primereact/inputtextarea";
import type { TranslationSet } from "../i18n";

type props = {
  value: string;
  onChange: (value: string) => void;
  texts: TranslationSet;
};

export default function BodyTextarea({ value, onChange, texts }: props) {
  return (
    <div className="card flex flex-col justify-content-center gap-2">
      <label
        htmlFor="Body"
        className="field-label"
      >
        {texts.body} <span className="text-slate-400">({texts.optional})</span>
      </label>
      <InputTextarea
        id="body"
        name="body"
        value={value}
        className="premium-input resize-none"
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        cols={30}
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
}
