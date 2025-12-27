import { useEffect, useRef } from 'react';

export function useKeyboardShortcuts(handlers) {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { ctrlKey, metaKey, shiftKey, key } = event;
      const isModifierPressed = ctrlKey || metaKey;

      const target = event.target;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true' ||
        target.closest?.('[contenteditable="true"]')
      ) {
        return;
      }

      if (isModifierPressed && shiftKey && key === 'A') {
        event.preventDefault();
        handlersRef.current.onAddCodeCell();
        return;
      }

      if (isModifierPressed && shiftKey && key === 'M') {
        event.preventDefault();
        handlersRef.current.onAddTextCell();
        return;
      }

      if (shiftKey && key === 'T') {
        event.preventDefault();
        handlersRef.current.onRunAll();
        return;
      }

      if (isModifierPressed && shiftKey && key === 'S') {
        event.preventDefault();
        handlersRef.current.onStartServer();
        return;
      }

      if (isModifierPressed && shiftKey && key === 'P') {
        event.preventDefault();
        handlersRef.current.onShare();
        return;
      }

      if (shiftKey && key === 'N') {
        event.preventDefault();
        handlersRef.current.onAddNotebook();
        return;
      }

      if (isModifierPressed && key === ',') {
        event.preventDefault();
        handlersRef.current.onOpenSettings();
        return;
      }

      if (shiftKey && key === 'R') {
        event.preventDefault();
        handlersRef.current.onRenameNotebook();
        return;
      }

      if (isModifierPressed && shiftKey && key === 'D') {
        event.preventDefault();
        handlersRef.current.onDeleteNotebook();
        return;
      }

      if (isModifierPressed && shiftKey && key === '?') {
        event.preventDefault();
        handlersRef.current.onShowShortcuts();
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
}

export const KEYBOARD_SHORTCUTS = {
  addCodeCell: 'Ctrl+Shift+A',
  addTextCell: 'Ctrl+Shift+M',
  runAll: 'Shift+T',
  startServer: 'Ctrl+Shift+S',
  share: 'Ctrl+Shift+P',
  addNotebook: 'Shift+N',
  openSettings: 'Ctrl+,',
  renameNotebook: 'Shift+R',
  deleteNotebook: 'Ctrl+Shift+D',
  showShortcuts: 'Ctrl+Shift+?',
};
