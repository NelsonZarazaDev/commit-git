import { InputTextarea } from "primereact/inputtextarea";

type props = {
  value: string;
  onChange: (value: string) => void;
};

export default function BodyTextarea({ value, onChange }: props) {
  return (
    <div className="card flex flex-col justify-content-center gap-2">
      <label htmlFor="Body" className="font-bold hover:text-indigo-300">
        Body / Cuerpo - OPCIONAL
      </label>
      <InputTextarea
        id="body"
        name="body"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        cols={30}
        tooltip="Explica qué y por qué y más a detalle si es necesario, no el cómo (eso está en el código)"
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
}
