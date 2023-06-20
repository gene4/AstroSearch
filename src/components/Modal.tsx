import styles from "./Modal.module.scss";
import * as Dialog from "@radix-ui/react-dialog";
import { NasaImageT } from "../../types";

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    selectedImage: NasaImageT;
}

function Modal({ isOpen, setIsOpen, selectedImage }: ModalProps) {
    return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Portal>
                <Dialog.Overlay
                    onClick={() => setIsOpen(false)}
                    className={styles.overlay}
                >
                    <Dialog.Title>{selectedImage.data[0].title}</Dialog.Title>
                    <Dialog.Description className={styles.description}>
                        {selectedImage.data[0].description}
                    </Dialog.Description>
                    <img src={selectedImage.links[0].href} />
                    <Dialog.Content />
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

export default Modal;
