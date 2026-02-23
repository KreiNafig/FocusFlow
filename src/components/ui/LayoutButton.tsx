import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LayoutButton = () => {
    const [isOn, setIsOn] = useState<boolean>(false);

    const toggleSwitch = () => setIsOn(!isOn)

    useEffect((): void => {
        if (isOn) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }, [isOn])

    const container = {
        width: 40,
        height: 20,
        backgroundColor: !isOn ? "#1E1E2E" : "#cdcbcb",
        borderRadius: 50,
        cursor: "pointer",
        display: "flex",
        padding: 5,
    }
    
    const handle = {
        width: 10,
        height: 10,
        backgroundColor: "#9911ff",
        borderRadius: "50%",
    }

    return (
        <button
            className="toggle-container"
            style={{
                ...container,
                justifyContent: "flex-" + (isOn ? "start" : "end"),
            }}
            onClick={toggleSwitch}
        >
            <motion.div
                className="toggle-handle"
                layout
                style={handle}
                transition={{
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.2,
                }}
            />
        </button>
    )
}


