import { Button as PrimeButton } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import type { TranslationSet } from "../i18n";

type props = {
  value: string;
  nameButton: string;
  functionality: string;
  onClear?: () => void;
  texts: TranslationSet;
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
  texts,
}: props) {
  const [visible, setVisible] = useState(false);
  const toast = useRef<Toast>(null);

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: texts.copyToastSummary,
      detail: texts.copyToastDetail,
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
      summary: texts.clearToastSummary,
      detail: texts.clearToastDetail,
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
        message={texts.confirmClear}
        accept={accept}
        reject={reject}
      />
      <div className="flex w-full">
        <PrimeButton
          className={`w-full ${
            functionality === "copy"
              ? "primary-action"
              : "secondary-action"
          } cursor-pointer px-4 py-3 font-semibold transition-all`}
          label={nameButton}
          onClick={functionality === "copy" ? Copy : () => setVisible(true)}
        />
      </div>
    </>
  );
}
