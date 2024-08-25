import { TEditValue } from "@src/@types/general";

interface ModalProps {
  editValue: TEditValue | null;
  closeModal: () => void;
}

export function Modal({ editValue, closeModal }: ModalProps) {
  if (editValue == null) return null;

  return (
    <div className="modal" onMouseDown={closeModal}>
      <div className="modal-content" onMouseDown={(e) => e.stopPropagation()}>
        <form>
          <h2>{editValue}</h2>
        </form>
      </div>
    </div>
  );
}
