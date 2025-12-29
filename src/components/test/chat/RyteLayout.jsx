import { useState, useContext, useCallback,useEffect } from "react";
import { Button } from "../../ui/button";
import { SidebarProvider, SidebarTrigger } from "../../ui/sidebar";
import { AppSidebar } from "./NewRyte/AppSidebar";
import { Editor } from "./NewRyte/Editor";
import { EditorActions } from "./NewRyte/EditorActions";
import { Menu } from "lucide-react";
import ProfileMenu from "./ProfileMenu";
import Settings from "./Settings.jsx";
import { AuthContext } from "../../../context/AuthContext";

const RyteLayout = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState("light");
  const [generatedContent, setGeneratedContent] = useState(null);
  const [activeDocumentId, setActiveDocumentId] = useState(null);
  const [ecognitiveMode, setECognitiveMode] = useState(false);
  const [shouldLoadFirstDoc, setShouldLoadFirstDoc] = useState(false);

  const { user, userToken } = useContext(AuthContext);

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const handleThemeChange = useCallback((newTheme) => {
    setTheme(newTheme);
  }, []);

  const handleToggleECognitive = useCallback((isEnabled) => {
    setECognitiveMode(isEnabled);
    if (!isEnabled) {
      setGeneratedContent(null);
      setActiveDocumentId(null);
    }
  }, []);

  const handleContentGenerated = useCallback((content) => {
    setGeneratedContent(content);
    if (content.mode === 'ecognitive') {
      setECognitiveMode(true);
      setActiveDocumentId(null); 
    } else {
      setActiveDocumentId(content.sessionId);
      setECognitiveMode(false);
    }
  }, []);
  
  const handleDocumentSelect = useCallback((doc) => {
    setGeneratedContent(doc);
    setActiveDocumentId(doc.sessionId);
    setECognitiveMode(false); 
  }, []);

 
  const handleExitECognitive = useCallback(() => {
    console.log("RyteLayout: Starting eCognitive exit process...");
    
    // 1. First exit eCognitive mode immediately (UI update)
    setECognitiveMode(false);
    setGeneratedContent(null);
    setActiveDocumentId(null);
    
    // 2. Trigger first document load
    setShouldLoadFirstDoc(true);
    
    console.log("RyteLayout: eCognitive mode exited, first doc load triggered");
  }, []);

  // First document load function
  const loadFirstDocument = useCallback(async () => {
    if (!shouldLoadFirstDoc || !userToken) return;
    
    console.log("RyteLayout: Loading first document...");
    
    try {
      // Fetch documents
      const response = await fetch('http://127.0.0.1:8000/get-ryte-sessions/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.sessions.length > 0) {
          // Load first document
          const firstDoc = data.sessions[0];
          const docResponse = await fetch(`http://127.0.0.1:8000/content-session/${firstDoc.id}/`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json'
            }
          });

          if (docResponse.ok) {
            const docData = await docResponse.json();
            if (docData.success) {
              handleDocumentSelect({
                sessionId: docData.session.id,
                title: docData.session.name,
                content: docData.session.content,
                contentType: docData.session.content_type
              });
              console.log("RyteLayout: First document loaded successfully");
            }
          }
        } else {
          // No documents - show empty editor
          console.log("RyteLayout: No documents found, showing empty editor");
          setGeneratedContent({
            sessionId: null,
            title: "New Document",
            content: "Start typing here...",
            contentType: null
          });
        }
      }
    } catch (error) {
      console.error("RyteLayout: Error loading first document:", error);
    } finally {
      // Reset the trigger
      setShouldLoadFirstDoc(false);
    }
  }, [shouldLoadFirstDoc, userToken, handleDocumentSelect]);

  // Effect to load first document when triggered
  useEffect(() => {
    if (shouldLoadFirstDoc) {
      loadFirstDocument();
    }
  }, [shouldLoadFirstDoc, loadFirstDocument]);

  
  const handleFetchAndLoadFirstDoc = useCallback(async () => {
    console.log("RyteLayout: Fetching and loading first document...");
    await loadFirstDocument();
  }, [loadFirstDocument]);

  return (
    <div className="flex flex-col h-screen">
      <SidebarProvider>
        <div className={`flex min-h-screen w-full bg-background ${dialogOpen && 'blur-sm'}`}>
          <AppSidebar 
            dialogOpen={dialogOpen} 
            setDialogOpen={setDialogOpen} 
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            onContentGenerated={handleContentGenerated}
            onDocumentSelect={handleDocumentSelect}
            activeDocumentId={activeDocumentId}
            ecognitiveMode={ecognitiveMode}
            onExitECognitive={handleExitECognitive}
            onToggleECognitive={handleToggleECognitive}
            onFetchAndLoadFirstDoc={handleFetchAndLoadFirstDoc}
          />

          <div className="flex-1 flex flex-col">
            <header className="sticky top-0 z-10 h-14 flex shadow-sm px-9 py-6 bg-editor-background">
              <div className="flex items-center justify-between ml-5">
                <SidebarTrigger onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <Menu className="h-5 w-5" />
                </SidebarTrigger>
              </div>

              <EditorActions
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                onProfileClick={() => setShowProfileMenu(!showProfileMenu)}
                ecognitiveMode={ecognitiveMode}
                onExitECognitive={handleExitECognitive}
              />
            </header>

            <main className="flex-1 bg-editor-background">
              <Editor 
                generatedContent={generatedContent} 
                ecognitiveMode={ecognitiveMode}
                onExitECognitive={handleExitECognitive}
              />
            </main>
          </div>
        </div>
      </SidebarProvider>

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
          onRestoreChat={() => { }}
          onDeleteArchivedChat={() => { }}
          onSelectArchivedChat={() => { }}
          onOpenSettings={() => {
            setShowSettings(true);
            setShowProfileMenu(false);
          }}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          isDark={isDark}
          onClose={() => setShowSettings(false)}
          user={user}
          archivedChats={[]}
          onSelectArchivedChat={() => { }}
          onRestoreChat={() => { }}
          onDeleteArchivedChat={() => { }}
        />
      )}
    </div>
  );
};

export default RyteLayout;