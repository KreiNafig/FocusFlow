import { useEffect, type RefObject } from "react";

export const useOutsideClick = (
    modalRef: RefObject<HTMLDivElement | null>,
    onClose: () => void,
    openModal: boolean
) => {
    useEffect(() => {
        if(!openModal) return;

        const handleClick = (e: MouseEvent) => {
            if(modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose()
            }
        }
        
        document.addEventListener('mousedown', handleClick)

        return () => {
            document.removeEventListener('mousedown', handleClick)
        }

    }, [modalRef, onClose, openModal])
}
