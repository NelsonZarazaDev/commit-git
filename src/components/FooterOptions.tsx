import { InputText } from "primereact/inputtext";

type props = {
  value: string;
  onChange: (value: string) => void;
};

export default function FooterOptions({ value, onChange }: props) {
  return (
    <div className="card flex flex-col justify-content-center gap-2">
      <label
        htmlFor="BreakingChanges"
        className="font-bold hover:text-indigo-300"
      >
        Breaking changes / Cambios importantes - OPCIONAL
      </label>
      <InputText
      className="text-blue-700"
        id="footer"
        name="footer"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tooltip="Descripción de porque el cambio rompe compatibilidad (ej. elimina un endpoint, cambia un método), se debe avisar."
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
}
