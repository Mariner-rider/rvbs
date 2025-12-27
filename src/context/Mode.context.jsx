
import { createContext, useContext, useState, useEffect } from "react";

// Create a context for dark mode
export const ModeContext = createContext(true);

export const ModeProvider = ({ children }) => {
    // Check localStorage for a saved dark mode setting, default to true (dark mode)
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode !== null ? JSON.parse(savedMode) : true; // Default to dark mode
    });

    const [isInitialized, setIsInitialized] = useState(false);

    // Toggle dark mode and persist the setting in localStorage
    const toggleMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', JSON.stringify(newMode));
        document.body.classList.toggle('dark', newMode);
    };

    // Apply the initial dark mode class based on the state
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        setIsInitialized(true); // Mark initialization as complete
    }, [darkMode]);

    // Delay rendering until initialization is complete
    if (!isInitialized) return null;

    return (
        <ModeContext.Provider value={{ darkMode, toggleMode }}>
            {children}
        </ModeContext.Provider>
    );
};

// Custom hook to use the dark mode context
export const useMode = () => useContext(ModeContext);
