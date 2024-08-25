import "@src/components/Modal/Modal.scss";
import { TEditValue } from "@src/@types/general";
import { UpdateForm } from "@src/components/Forms/UpdateForm";

interface ModalProps {
  editValue: TEditValue | null;
  closeModal: () => void;
}

export function Modal({ editValue, closeModal }: ModalProps) {
  if (editValue == null) return null;

  return (
    <div className="modal" onMouseDown={closeModal}>
      <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
        <UpdateForm callbackFn={closeModal} editValue={editValue} />
      </div>
    </div>
  );
}
