import { Button as PrimeButton } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";

type props = {
  value: string;
  nameButton: string;
  functionality: string;
  onClear?: () => void;
};

export type CommitHistoryItem = {
  id: string;
  message: string;
  createdAt: number;
};

export default function Button({
  value,
  nameButton,
  functionality,
  onClear,
}: props) {
  const [visible, setVisible] = useState(false);
  const toast = useRef<Toast>(null);

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Copy",
      detail: "Message copied successfully",
      position: "bottom-right",
      life: 3000,
    });
  };

  const Copy = async () => {
    await navigator.clipboard.writeText(value);

    const raw = localStorage.getItem("historial");
    const history: CommitHistoryItem[] = raw ? JSON.parse(raw) : [];

    const newCommit: CommitHistoryItem = {
      id: crypto.randomUUID(),
      message: value,
      createdAt: Date.now(),
    };

    history.unshift(newCommit);

    localStorage.setItem("historial", JSON.stringify(history));

    window.dispatchEvent(new Event("storage"));

    showSuccess();
  };

  const accept = () => {
    toast.current?.show({
      severity: "success",
      summary: "Confirmed",
      detail: "The fields were successfully cleared",
      life: 3000,
    });
    onClear?.();
  };

  const reject = () => {};

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog
        visible={visible}
        message="¿Estás seguro que deseas continuar?"
        accept={accept}
        reject={reject}
      />
      <div className="flex w-full">
        <PrimeButton
          className={`w-full ${
            functionality === "copy"
              ? "bg-[#ac67cc]"
              : "backdrop-blur-md bg-white/10"
          } p-2 rounded-xl border border-gray-600 cursor-pointer font-bold`}
          label={nameButton}
          onClick={functionality === "copy" ? Copy : () => setVisible(true)}
        />
      </div>
    </>
  );
}
