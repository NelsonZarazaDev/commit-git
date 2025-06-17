import { InputTextarea } from "primereact/inputtextarea";

type props = {
  value: string;
};

export default function CommitPreview({ value }: props) {
  return (
    <div className="card flex flex-col justify-content-center gap-2">
      <label htmlFor="Commit" className="font-bold hover:text-indigo-300">
        Commit
      </label>
      <InputTextarea disabled autoResize value={value} />
    </div>
  );
}
