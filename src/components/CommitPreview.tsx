import { InputTextarea } from "primereact/inputtextarea";

type props = {
  value: string;
};

export default function CommitPreview({ value }: props) {
  return (
    <div className="flex flex-col justify-content-center gap-2">
      <InputTextarea className="bg-[#3A225F] p-4 rounded-2xl" disabled autoResize value={value} />
    </div>
  );
}
