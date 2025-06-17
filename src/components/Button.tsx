import { Button as PrimeButton } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { confirmDialog } from "primereact/confirmdialog";

type props = {
  value: string;
  nameButton: string;
  functionality: string;
  onClear?: () => void;
};

export default function Button({
  value,
  nameButton,
  functionality,
  onClear,
}: props) {
  const toast = useRef<Toast>(null);

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Copy",
      detail: "Message copied with output",
      life: 3000,
    });
  };

  const Copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      showSuccess();
      console.log("Texto copiado al portapapeles");
    } catch (err) {
      console.error("Error al copiar el texto: ", err);
    }
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

  const Clear = async () => {
    confirmDialog({
      message: "Do you want to clean the fields?",
      header: "Clear Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="flex justify-end">
        <PrimeButton
          label={nameButton}
          onClick={functionality === "copy" ? Copy : Clear}
        />
      </div>
    </>
  );
}
