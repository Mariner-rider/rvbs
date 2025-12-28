import { X, CirclePlus, Bot, Send, User, Plus, StickyNote, FileText, MoreVertical, Trash2, Share2, Edit } from "lucide-react"
import { Button } from "../../ui/button";
import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { ScrollArea } from "../../ui/scroll-area";
import { IoIosArrowBack } from "react-icons/io";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Calendar } from "lucide-react";
import { Editor } from 'primereact/editor';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "../../ui/dropdown-menu"
import 'quill/dist/quill.snow.css'
import "@syncfusion/ej2-react-richtexteditor/styles/material.css";
import ChatHeader from "./ChatHeader";
import { PDFViewerPanel } from "./PDFViewerPanel";
import { ChatPanel } from "./ChatPanel";
import { AuthContext } from "@/context/AuthContext";
import ProfileMenu from "./ProfileMenu";
import Settings from "./settings";
import ChatHistorySidebar from './ChatHistorySidebar';

const API_BASE_URL = 'http://127.0.0.1:8000';

const AiChat = ({
  isDark: propIsDark = false,
  currentChatId,
  chatHistory = [],
  handleShareChat,
  handleShareModalOpen,
  handleShareModalClose,
  showShareModal,
  handleArchiveChatFromShare,
}) => {
  const { user } = useContext(AuthContext);
  
  // Local state for profile menu and settings
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState("light");
  
  // Existing states
  const [showHistoryCard, setShowHistoryCard] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [showHistorySidebar, setShowHistorySidebar] = useState(false);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);

  // Calculate isDark based on local theme state
  const isDark = theme === "dark" || 
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    if (user && sessionId) {
      fetchNotes();
    }
  }, [user, sessionId]);

  useEffect(() => {
    const handleCreateNoteFromChat = (event) => {
      setTitle(event.detail.title);
      setText(event.detail.content);
      setIsAddingNote(true);
    };

    window.addEventListener('createNoteFromChat', handleCreateNoteFromChat);
    return () => window.removeEventListener('createNoteFromChat', handleCreateNoteFromChat);
  }, []);

  useEffect(() => {
    const handleClearNotes = () => {
      setNotes([]);           
      setIsAddingNote(false); 
      setTitle('');          
      setText('');           
    };

    window.addEventListener("clearNotes", handleClearNotes);
    return () => window.removeEventListener("clearNotes", handleClearNotes);
  }, []);

  const fetchNotes = async () => {
    if (!user) return;

    setIsLoadingNotes(true);
    try {
      const token = localStorage.getItem("authToken");
      const url = sessionId
        ? `${API_BASE_URL}/notes/?session_id=${sessionId}`
        : `${API_BASE_URL}/notes/`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) throw new Error('Failed to fetch notes');

      const data = await response.json();
      if (data.success) {
        setNotes(data.notes.map(note => ({
          id: note.id,
          title: note.title,
          text: note.content,
          timestamp: new Date(note.created_at),
          sessionId: note.session_id
        })));
      }
    } catch (err) {
      console.error('Failed to fetch notes:', err);
      alert('Failed to load notes. Please try again.');
    } finally {
      setIsLoadingNotes(false);
    }
  };

  const handleFileUpload = (fileData) => {
    if (fileData) {
      setUploadedFile(fileData);
      setSessionId(fileData.sessionId);
    } else {
      setUploadedFile(null);
      setSessionId(null);
    }
  };

  const openNote = () => {
    setIsAddingNote(true);
  };

  const closeNote = () => {
    setIsAddingNote(false);
    setEditingNoteId(null);
    setText('');
    setTitle('');
  };

  const handleAddNote = async (noteTitle, noteText) => {
    if (!noteText || !noteTitle) {
      alert('Please enter both title and content');
      return;
    }

    if (!user) {
      alert('Please sign in to save notes');
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/notes/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: noteTitle.trim(),
          content: noteText.trim(),
          session_id: sessionId || null
        })
      });

      if (!response.ok) throw new Error('Failed to create note');

      const data = await response.json();

      if (data.success) {
        const newNote = {
          id: data.note.id,
          title: data.note.title,
          text: data.note.content,
          timestamp: new Date(data.note.created_at),
          sessionId: data.note.session_id
        };
        setNotes((prev) => [newNote, ...prev]);
        setText('');
        setTitle('');
        setIsAddingNote(false);
        alert('Note saved successfully!');
      }
    } catch (err) {
      console.error('Failed to create note:', err);
      alert('Failed to save note. Please try again.');
    }
  };

  const handleEditNote = (note) => {
    setTitle(note.title);
    setText(note.text);
    setEditingNoteId(note.id);
    setIsAddingNote(true);
  };

  const handleUpdateNote = async (noteId, updatedTitle, updatedText) => {
    if (!updatedTitle.trim() || !updatedText.trim()) {
      alert('Please enter both title and content');
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/notes/${noteId}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: updatedTitle.trim(),
          content: updatedText.trim()
        })
      });

      if (!response.ok) throw new Error('Failed to update note');

      const data = await response.json();

      if (data.success) {
        setNotes((prev) =>
          prev.map((note) =>
            note.id === noteId
              ? { ...note, title: data.note.title, text: data.note.content }
              : note
          )
        );
        alert('Note updated successfully!');
        setEditingNoteId(null);
        setIsAddingNote(false);
        setTitle('');
        setText('');
      }
    } catch (err) {
      console.error('Failed to update note:', err);
      alert('Failed to update note. Please try again.');
    }
  };

  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_BASE_URL}/notes/${id}/delete/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to delete note');

      const data = await response.json();

      if (data.success) {
        setNotes(prev => prev.filter(note => note.id !== id));
        alert('Note deleted successfully!');
      }
    } catch (err) {
      console.error('Failed to delete note:', err);
      alert('Failed to delete note. Please try again.');
    }
  };

  const handleShareNote = (note) => {
    const shareText = `${note.title}\n\n${note.text}`;
    navigator.clipboard.writeText(shareText);
    alert("Note copied to clipboard!");
  };

  const handleNewChat = () => {
    setUploadedFile(null);
    setSessionId(null);
    window.dispatchEvent(new Event("clearChatMessages"));
  };

  const handleSelectChat = (chat) => {
    setSessionId(chat.session_id);
    setUploadedFile({
      sessionId: chat.session_id,
      fileName: chat.file_name || chat.document_name,
      documentId: chat.document_id || chat.id,
    });
  };

  // Common props for child components
  const commonProps = {
    showProfileMenu,
    setShowProfileMenu,
    theme,
    handleThemeChange,
    user,
    isAuthenticated: !!user,
    showSettings,
    setShowSettings,
  };

  return (
  <div className={`flex flex-col h-screen ${isDark ? "bg-black text-white" : "bg-background"}`}>
    <div className={`w-full ${isDark ? "bg-black" : "bg-background"} shadow-sm`}>
      <ChatHeader
        isDark={isDark}
        onHistoryClick={() => setShowHistorySidebar(true)}
        onProfileClick={() => setShowProfileMenu(!showProfileMenu)}
        selectedChatId={currentChatId}
        chatHistory={chatHistory}
        onShareChat={handleShareChat}
        onShareModalOpen={handleShareModalOpen}
        onShareModalClose={handleShareModalClose}
        showShareModal={showShareModal}
        onArchiveChat={handleArchiveChatFromShare}
      />
    </div>
      <ChatHistorySidebar
        isOpen={showHistorySidebar}
        onClose={() => setShowHistorySidebar(false)}
        isDark={isDark}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />


    <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
      <PDFViewerPanel
        uploadedFile={uploadedFile}
        onFileUpload={handleFileUpload}
        sessionId={sessionId}
        isDark={isDark} // Pass isDark to PDFViewerPanel
      />
      <ChatPanel
        uploadedFile={uploadedFile}
        sessionId={sessionId}
        isDark={isDark} // Pass isDark to ChatPanel
      />

      <div className={`border-l ${isDark ? "border-gray-700" : "border-gray-300"} w-full md:w-[22%] flex flex-col h-full`}>
        {!user ? (
          <div className={`flex flex-col items-center justify-center h-full ${isDark ? "text-gray-400" : "text-gray-500"} text-lg font-medium`}>
            Sign in to start taking notes
          </div>
        ) : (
          !isAddingNote ? (
            <>
              <div className={`flex p-[22px] border-b ${isDark ? "border-gray-700" : "border-gray-300"} flex-shrink-0`}>
                <StickyNote className="h-7 mr-3 text-orange-400" />
                <h2 className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"}`}>Your Notes</h2>
              </div>
              <ScrollArea className="flex-1 p-6">
                <div 
                  className={`border rounded-xl p-3 cursor-pointer flex items-center justify-center w-full ${
                    isDark 
                      ? "border-gray-600 hover:bg-gray-800 text-white" 
                      : "border-gray-300 hover:bg-gray-50 text-black"
                  }`} 
                  onClick={openNote}
                >
                  <Plus size={16} className="mr-4" />
                  Add Note
                </div>

                {isLoadingNotes ? (
                  <div className="h-[60vh] flex flex-col gap-1 items-center justify-center">
                    <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? "border-white" : "border-gray-900"}`}></div>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-400"} mt-2`}>Loading notes...</p>
                  </div>
                ) : notes.length === 0 ? (
                  <div className="h-[60vh] flex flex-col gap-1 items-center justify-center">
                    <StickyNote className={`w-16 h-16 font-thin ${isDark ? "text-gray-600" : "text-gray-200"}`} />
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-black"}`}>No notes yet</p>
                    <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>Click "Add Note" to start taking notes</p>
                  </div>
                ) : (
                  <div className="mt-2 space-y-3">
                    {notes.map((note) => (
                      <Card 
                        key={note.id} 
                        className={`relative hover:shadow-md transition-shadow border ${
                          isDark 
                            ? "bg-gray-800 border-gray-600 text-white" 
                            : "bg-gray-100 border-blue-200 text-black"
                        }`}
                      >
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className={`absolute top-2 right-2 p-1 rounded-full ${
                              isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
                            } z-10`}>
                              <MoreVertical className={`w-5 h-5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent 
                            align="end" 
                            className={`w-32 ${isDark ? "bg-gray-800 border-gray-600" : "bg-white"}`}
                          >
                            <DropdownMenuItem 
                              onClick={() => handleEditNote(note)}
                              className={isDark ? "text-white hover:bg-gray-700" : ""}
                            >
                              <Edit className="w-4 h-4 flex mr-3" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteNote(note.id)}
                              className={isDark ? "text-white hover:bg-gray-700" : ""}
                            >
                              <Trash2 className="w-4 h-4 flex mr-3" />
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleShareNote(note)}
                              className={isDark ? "text-white hover:bg-gray-700" : ""}
                            >
                              <Share2 className="w-4 h-4 flex mr-3" />
                              Share
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <CardHeader className="pb-2">
                          <CardTitle className={`text-sm font-medium pr-8 ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}>
                            {note.title}
                          </CardTitle>
                          <div className="flex items-center space-x-1 text-xs">
                            <Calendar className="w-3 h-3" />
                            <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                              {new Date(note.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div
                            className={`text-sm leading-relaxed line-clamp-3 break-words overflow-hidden ${
                              isDark ? "text-gray-300" : "text-gray-600"
                            }`}
                            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                          >
                            {note.text}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </>
          ) : (
            <div className="flex flex-col h-full">
              <div className={`flex p-[22px] border-b ${
                isDark ? "border-gray-700" : "border-gray-300"
              } items-center justify-between flex-shrink-0`}>
                <h2 className={`flex text-lg font-semibold items-center ${
                  isDark ? "text-white" : "text-black"
                }`}>
                  {editingNoteId ? "Edit Note" : "Add Note"}
                </h2>
                <IoIosArrowBack 
                  size={20} 
                  className={`cursor-pointer ${isDark ? "text-white" : "text-black"}`} 
                  onClick={closeNote} 
                />
              </div>

              <ScrollArea className="flex-1">
                <form className="w-full" onSubmit={(e) => {
                  e.preventDefault();
                  if (editingNoteId) {
                    handleUpdateNote(editingNoteId, title.trim(), text.trim());
                  } else {
                    handleAddNote(title.trim(), text.trim());
                  }
                }}>
                  <div className={`border-b ${
                    isDark ? "border-gray-700" : "border-gray-100"
                  } sticky z-10`}>
                    <input
                      placeholder="Title your Note"
                      className={`p-3 bg-transparent border-none w-full focus:outline-none focus:ring-0 ${
                        isDark ? "text-white placeholder-gray-400" : "text-black"
                      }`}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="note-editor-container">
                    <Editor
                      value={text}
                      onTextChange={(e) => setText(e.textValue)}
                      style={{
                        backgroundColor: isDark ? '#1a1a1a' : 'transparent',
                        border: 'none',
                        borderRadius: '0',
                        minHeight: '50px',
                        color: isDark ? 'white' : 'black'
                      }}
                      className={`custom-texteditor ${isDark ? 'dark-editor' : ''}`}
                      headerTemplate={
                        <div className={`flex gap-0 flex-wrap ${
                          isDark ? "bg-gray-800 text-white" : "bg-white"
                        }`}>
                          <span className="ql-formats !mr-[10px]">
                            <select className="ql-header" defaultValue="">
                              <option value="1">Heading 1</option>
                              <option value="2">Heading 2</option>
                              <option value="">Normal</option>
                            </select>
                          </span>
                          <span className="ql-formats !mr-[10px]">
                            <button className="ql-bold" />
                            <button className="ql-italic" />
                            <button className="ql-underline" />
                          </span>
                          <span className="ql-formats !mr-[10px]">
                            <button className="ql-link" />
                            <button className="ql-list" value="ordered" />
                            <button className="ql-list" value="bullet" />
                          </span>
                        </div>
                      }
                    />
                  </div>

                  <div className={`sticky bottom-0 p-4 ${
                    isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
                  }`}>
                    <button
                      type="submit"
                      className="cursor-pointer w-full bg-blue-500 text-white items-center justify-center rounded-lg text-[1rem] p-3 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      disabled={!title.trim() || !text.trim()}
                    >
                      {editingNoteId ? "Update Note" : "Add Note"}
                    </button>
                  </div>
                </form>
              </ScrollArea>
            </div>
          )
        )}
      </div>
    </div>

    {/* Profile Menu */}
    {showProfileMenu && (
      <ProfileMenu
        isDark={isDark}
        theme={theme}
        onThemeChange={handleThemeChange}
        onClose={() => setShowProfileMenu(false)}
        user={user}
        isAuthenticated={!!user}
        archivedChats={[]}
        onRestoreChat={() => {}}
        onDeleteArchivedChat={() => {}}
        onSelectArchivedChat={() => {}}
        onOpenSettings={() => setShowSettings(true)}
      />
    )}

    {/* Settings Modal */}
    {showSettings && (
      <Settings
        isDark={isDark}
        onClose={() => setShowSettings(false)}
        user={user}
        archivedChats={[]}
        onSelectArchivedChat={() => {}}
        onRestoreChat={() => {}}
        onDeleteArchivedChat={() => {}}
      />
    )}

    <style jsx>{`
      .note-editor-container {
        word-break: break-word;
        overflow-wrap: break-word;
      }
      
      .note-editor-container :global(.ql-editor) {
        word-break: break-word !important;
        overflow-wrap: break-word !important;
        white-space: pre-wrap !important;
        min-height: 300px;
        ${isDark ? `
          background-color: #1a1a1a !important;
          color: white !important;
        ` : ''}
      }
      
      .note-editor-container :global(.ql-editor pre),
      .note-editor-container :global(.ql-editor code),
      .note-editor-container :global(.ql-editor p),
      .note-editor-container :global(.ql-editor div),
      .note-editor-container :global(.ql-editor span) {
        word-break: break-word !important;
        overflow-wrap: break-word !important;
        ${isDark ? 'color: white !important;' : ''}
      }
      
      .note-editor-container :global(.ql-container) {
        overflow-x: hidden !important;
        ${isDark ? `
          background-color: #1a1a1a !important;
          color: white !important;
        ` : ''}
      }
      
      .note-editor-container :global(.ql-editor a) {
        word-break: break-all !important;
        overflow-wrap: break-word !important;
      }

      /* Dark mode styles for the editor toolbar */
      .note-editor-container :global(.ql-toolbar) {
        ${isDark ? `
          background-color: #2d2d2d !important;
          border-color: #444 !important;
          color: white !important;
        ` : ''}
      }

      .note-editor-container :global(.ql-toolbar .ql-stroke) {
        ${isDark ? `
          stroke: white !important;
        ` : ''}
      }

      .note-editor-container :global(.ql-toolbar .ql-fill) {
        ${isDark ? `
          fill: white !important;
        ` : ''}
      }

      .note-editor-container :global(.ql-toolbar .ql-picker) {
        ${isDark ? `
          color: white !important;
        ` : ''}
      }

      .note-editor-container :global(.ql-toolbar .ql-picker-options) {
        ${isDark ? `
          background-color: #2d2d2d !important;
          color: white !important;
        ` : ''}
      }
    `}</style>
  </div>
)
}

export default AiChat;