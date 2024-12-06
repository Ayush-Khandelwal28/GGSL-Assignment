import { useUI } from "../hooks/useUI";
import { Toaster } from "react-hot-toast";

export default function Wrapper() {

    const { modal } = useUI();

    return <>
        {modal}
        <Toaster position="top-right" />
    </>
}