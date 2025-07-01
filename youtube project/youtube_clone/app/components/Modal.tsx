'use client'
import { FC, useEffect, useRef } from "react";
import { useRouter, useSearchParams , usePathname} from "next/navigation";

interface ModalProps {
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const modalRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Check if "modal" param exists
  const isOpen = searchParams.get("modal") === "true";
  
    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        location.replace(pathname);
        console.log(modalRef.current);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, router]);

    if (!isOpen) return null;

  return (
    <div>
      {isOpen &&
      <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-10
        transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"} `}>
        <div ref={modalRef}  className={`bg-gray-100 p-6 rounded-lg shadow-lg w-auto transform 
          transition-all duration-300 ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}>
          <button
            className="absolute top-2 right-4 text-black hover:text-gray-700"
            onClick={() => router.push(pathname, undefined)}
          >
            ✖ 
          </button>
          
          {children}
        </div>
      </div>}

    </div>
  );
};

export default Modal;
