// import { createContext, useContext, useEffect, useState } from 'react';

// const defaultSettings = {
//   // Site settings
//   theme: 'system',
//   language: 'english',
//   timezone: 'auto',

//   // Runtime settings
//   hardwareAccelerator: 'gpu-t4',
//   runtimeType: 'python3',
//   autoSave: true,

//   // Editor settings
//   fontSize: 'medium',
//   showLineNumbers: true,
//   wordWrap: true,
//   autoComplete: true,
//   indentSize: 2,
//   keyBindings: 'default',

//   // AI Assistance settings
//   codeCompletion: true,
//   codeExplanations: true,
//   errorSuggestions: true,
//   autoImports: true,

//   // Colab Pro settings
//   priorityAccess: false,
//   longerRuntimes: false,
//   moreMemory: false,
//   backgroundExecution: false,

//   // Notebook settings
//   cellToolbar: true,
//   outputScrolling: true,
//   notifications: true,
//   showHiddenFiles: false,
//   collapsibleHeadings: true,
// };

// const SettingsContext = createContext(undefined);

// export function SettingsProvider({ children }) {
//   const [settings, setSettings] = useState(defaultSettings);

//   // Load settings from localStorage on mount
//   useEffect(() => {
//     const savedSettings = localStorage.getItem('notebookSettings');
//     if (savedSettings) {
//       try {
//         const parsedSettings = JSON.parse(savedSettings);
//         const mergedSettings = { ...defaultSettings, ...parsedSettings };
//         setSettings(mergedSettings);
//       } catch (error) {
//         console.error('Error loading settings:', error);
//       }
//     }
//   }, []);

//   // Apply font size class to document root
//   useEffect(() => {
//     const root = document.documentElement;
//     root.classList.remove('font-small', 'font-medium', 'font-large');
//     root.classList.add(`font-${settings.fontSize}`);
//   }, [settings.fontSize]);

//   const updateSetting = (key, value) => {
//     setSettings((prev) => {
//       const newSettings = { ...prev, [key]: value };

//       // Auto-save critical settings immediately
//       if (['theme', 'fontSize', 'autoSave'].includes(key)) {
//         localStorage.setItem('notebookSettings', JSON.stringify(newSettings));
//       }

//       return newSettings;
//     });
//   };

//   const resetSettings = () => {
//     setSettings(defaultSettings);
//     localStorage.removeItem('notebookSettings');
//   };

//   const saveSettings = () => {
//     localStorage.setItem('notebookSettings', JSON.stringify(settings));
//   };

//   return (
//     <SettingsContext.Provider
//       value={{
//         settings,
//         updateSetting,
//         resetSettings,
//         saveSettings,
//       }}
//     >
//       {children}
//     </SettingsContext.Provider>
//   );
// }

// export function useSettings() {
//   const context = useContext(SettingsContext);
//   if (context === undefined) {
//     throw new Error('useSettings must be used within a SettingsProvider');
//   }
//   return context;
// }

import { createContext, useContext, useEffect, useState } from 'react';

const defaultSettings = {
  // Site settings
  theme: 'system',
  // language: 'english',
  // timezone: 'auto',

  // Runtime settings
  hardwareAccelerator: 'gpu-t4',
  runtimeType: 'python3',
  autoSave: true,

  // Editor settings
  fontSize: 'medium',
  showLineNumbers: true,
  wordWrap: true,
  autoComplete: true,
  indentSize: 2,
  keyBindings: 'default',

  // AI Assistance settings
  codeCompletion: true,
  codeExplanations: true,
  errorSuggestions: true,
  autoImports: true,

  // Editor colorization (only for dark mode)
  editorColorization: 'default-dark',

  // Colab Pro settings
  priorityAccess: false,
  longerRuntimes: false,
  moreMemory: false,
  backgroundExecution: false,

  // Notebook settings
  cellToolbar: true,
  outputScrolling: true,
  notifications: true,
  showHiddenFiles: false,
  collapsibleHeadings: true,
};

const SettingsContext = createContext(undefined);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('notebookSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        const mergedSettings = { ...defaultSettings, ...parsedSettings };
        setSettings(mergedSettings);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const updateSetting = (key, value) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: value };

      // Auto-save certain critical settings
      if (['theme', 'fontSize', 'autoSave'].includes(key)) {
        localStorage.setItem('notebookSettings', JSON.stringify(newSettings));
      }

      return newSettings;
    });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('notebookSettings');
  };

  const saveSettings = () => {
    localStorage.setItem('notebookSettings', JSON.stringify(settings));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
