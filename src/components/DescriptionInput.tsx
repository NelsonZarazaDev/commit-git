import { InputText } from "primereact/inputtext";

type props = {
  value: string;
  onChange: (value: string) => void;
};

export default function DescriptionInput({ value, onChange }: props) {
  return (
    <div className="card flex flex-col justify-content-center gap-2">
      <label htmlFor="Description" className="font-bold hover:text-indigo-300">
        Description / Descripción
      </label>
      <InputText
        id="description"
        name="description"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tooltip="Concisa (máximo ~72 caracteres), escrita en
        modo imperativo"
        tooltipOptions={{ position: "top" }}
      />
    </div>
  );
}
