import {
  FileText,
  Plus,
  Search,
  Loader2,
  Brain,
  LogOut,
} from "lucide-react";
import { useState, useContext, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../ui/sidebar";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import bharatAi from "/src/assets/images/bharatai2.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { AuthContext } from "@/context/AuthContext";
import AdvertisementPopup from "../AdvertisementPopup";
import { useNavigate } from "react-router-dom";

export function AppSidebar({
  dialogOpen,
  setDialogOpen,
  sidebarOpen,
  setSidebarOpen,
  onContentGenerated,
  onDocumentSelect,
  activeDocumentId,
  ecognitiveMode = false,
  onToggleECognitive = () => { },
  onExitECognitive = () => { },
}) {
  const [selectedUseCase, setSelectedUseCase] = useState("");
  const [formData, setFormData] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [isLoadingDocuments, setIsLoadingDocuments] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [temperature, setTemperature] = useState("optimal");
  const [generationMode, setGenerationMode] = useState("normal"); // 'normal' or 'ecognitive'
  const [showAdPopup, setShowAdPopup] = useState(false);

  const { userToken } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch documents on component mount
  useEffect(() => {
    if (!ecognitiveMode) {
      fetchDocuments();
    }
  }, [ecognitiveMode]);

  // Apply fade effect when in eCognitive mode
  useEffect(() => {
    const sidebar = document.querySelector('.sidebar-container');
    if (sidebar) {
      if (ecognitiveMode) {
        sidebar.style.opacity = '0.5';
        sidebar.style.pointerEvents = 'none';
      } else {
        sidebar.style.opacity = '1';
        sidebar.style.pointerEvents = 'auto';
      }
    }
  }, [ecognitiveMode]);

  const fetchDocuments = async () => {
    setIsLoadingDocuments(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/get-ryte-sessions/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setDocuments(data.sessions);
        }
      } else {
        console.error('Failed to fetch documents');
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoadingDocuments(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateDocument = async () => {
    if (!selectedUseCase) {
      alert("Please select a use case");
      return;
    }

    setIsGenerating(true);

    try {
      const params = {};

      // Map form data to API parameters based on use case
      switch (selectedUseCase) {
        case "email":
          params.subject = formData.subject || "";
          break;
        case "email_reply":
          params.previous_email = formData.previous_email || "";
          params.key_points = formData.key_points || "";
          break;
        case "cover_letter":
          params.role = formData.role || "";
          params.skills = formData.skills || "";
          break;
        case "blog":
          params.subject = formData.subject || "";
          params.no_of_headings = parseInt(formData.no_of_headings) || 5;
          break;
        case "video_idea":
          params.keywords = formData.keywords || "";
          break;
        case "video_description":
          params.video_title = formData.video_title || "";
          break;
        case "channel_description":
          params.channel_name = formData.channel_name || "";
          break;
        case "tagline":
          params.description = formData.description || "";
          break;
        case "story":
          params.key_points = formData.key_points || "";
          params.words = parseInt(formData.words) || 500;
          break;
        case "product_description":
          params.product_name = formData.product_name || "";
          params.product_features = formData.product_features || "";
          break;
        case "paraphrase":
          params.text = formData.text || "";
          break;
        case "job_description":
          params.job_role = formData.job_role || "";
          break;
        case "facebook_post":
          params.post_type = formData.post_type || "";
          params.keywords = formData.keywords || "";
          break;
      }

      // Call API with mode parameter
      const response = await fetch('http://127.0.0.1:8000/generate/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content_type: selectedUseCase,
          params: params,
          temperature: temperature,
          mode: generationMode // 'normal' or 'ecognitive'
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Show ad if backend says to show ads
          if (data.show_ads) {
            setShowAdPopup(true);
            setTimeout(() => {
              setShowAdPopup(false);
            }, 5000);
          }

          // If eCognitive mode, activate it
          if (generationMode === 'ecognitive') {
            onToggleECognitive(true);

            // Pass generated content to parent for eCognitive display
            if (onContentGenerated) {
              onContentGenerated({
                title: data.result.content_type,
                content: data.result.content,
                sessionId: null, 
                contentType: data.content_type,
                mode: 'ecognitive',
                showAds: data.show_ads
              });
            }
          } else {
            // Normal mode - normal flow
            if (onContentGenerated) {
              onContentGenerated({
                title: data.result.content_type,
                content: data.result.content,
                sessionId: data.session_id,
                contentType: data.content_type,
                showAds: data.show_ads
              });
            }

            // Refresh documents list for normal mode
            await fetchDocuments();
          }

          // Reset dialog
          setDialogOpen(false);
          setFormData({});
          setSelectedUseCase("");
          setGenerationMode('normal'); // Reset to normal mode
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to generate content");
      }
    } catch (error) {
      console.error('Error generating content:', error);
      alert("An error occurred while generating content");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDocumentClick = async (doc) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/content-session/${doc.id}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && onDocumentSelect) {
          onDocumentSelect({
            sessionId: data.session.id,
            title: data.session.name,
            content: data.session.content,
            contentType: data.session.content_type
          });
        }
      } else {
        console.error('Failed to fetch document content');
        alert('Failed to load document');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
      alert('An error occurred while loading the document');
    }
  };

  // Filter documents based on search query
  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <AdvertisementPopup
        showPopup={showAdPopup}
        onClose={() => setShowAdPopup(false)}
      />

      <div className={`sidebar-container ${ecognitiveMode ? 'opacity-50 pointer-events-none' : ''}`}>
        <Sidebar collapsible="icon" open={sidebarOpen} onOpenChange={setSidebarOpen} className="!bg-white">
          {sidebarOpen && (
            <SidebarHeader className="border-b border-gray-200">
              <div className="flex justify-center mx-auto px-5 py-3">
                <img src={bharatAi} alt="Bharat AI" className="h-10 w-auto" />
              </div>
            </SidebarHeader>
          )}
          <SidebarContent className="p-4">
            {sidebarOpen && (
              <>
                <div className="mb-4">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full !text-white !rounded-[10px] !text-sm !bg-[#3c83f6]" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        New Document
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md !bg-white" aria-describedby="dialog-description">
                      <DialogHeader>
                        <DialogTitle>New Document</DialogTitle>
                        <p id="dialog-description" className="sr-only">Create a new document by selecting a use case and filling in the required information</p>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        {/* Mode Selection */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Generation Mode</label>
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant={generationMode === 'normal' ? "default" : "outline"}
                              className="flex-1  bg-blue-500 hover:bg-blue-700 text-white"
                              onClick={() => setGenerationMode('normal')}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              Generate
                            </Button>
                            <Button
                              type="button"
                              variant={generationMode === 'ecognitive' ? "default" : "outline"}
                              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                              onClick={() => setGenerationMode('ecognitive')}
                            >
                              <Brain className="mr-2 h-4 w-4" />
                              eGenerate
                            </Button>
                          </div>
                          {/* <p className="text-xs text-gray-500">
                            {generationMode === 'ecognitive'
                              ? "eGenerate: Fast generation, no history (4 credits)"
                              : "Generate: Normal generation with history (4 credits)"}
                          </p> */}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Choose use case</label>
                          <Select value={selectedUseCase} onValueChange={setSelectedUseCase}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a use case" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="email_reply">Email Reply</SelectItem>
                              <SelectItem value="cover_letter">Cover Letter</SelectItem>
                              <SelectItem value="blog">Blog</SelectItem>
                              <SelectItem value="video_idea">Video Idea</SelectItem>
                              <SelectItem value="video_description">Video Description</SelectItem>
                              <SelectItem value="channel_description">Channel Description</SelectItem>
                              <SelectItem value="tagline">Tagline</SelectItem>
                              <SelectItem value="story">Story</SelectItem>
                              <SelectItem value="product_description">Product Description</SelectItem>
                              <SelectItem value="paraphrase">Paraphrase</SelectItem>
                              <SelectItem value="job_description">Job Description</SelectItem>
                              <SelectItem value="facebook_post">Facebook Post</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Temperature</label>
                          <Select value={temperature} onValueChange={setTemperature}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select temperature" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low (more factual)</SelectItem>
                              <SelectItem value="optimal">Optimal (balanced)</SelectItem>
                              <SelectItem value="medium">Medium (creative)</SelectItem>
                              <SelectItem value="high">High (very creative)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Dynamic form fields based on use case */}
                        {selectedUseCase === "email" && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Subject</label>
                            <Input
                              placeholder="Enter email subject..."
                              value={formData.subject || ""}
                              onChange={(e) => handleInputChange('subject', e.target.value)}
                            />
                          </div>
                        )}

                        {selectedUseCase === "email_reply" && (
                          <>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Previous Email</label>
                              <Input
                                placeholder="Enter previous email content..."
                                value={formData.previous_email || ""}
                                onChange={(e) => handleInputChange('previous_email', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Key Points</label>
                              <Input
                                placeholder="Enter key points to address..."
                                value={formData.key_points || ""}
                                onChange={(e) => handleInputChange('key_points', e.target.value)}
                              />
                            </div>
                          </>
                        )}

                        {selectedUseCase === "cover_letter" && (
                          <>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Role</label>
                              <Input
                                placeholder="Enter job role..."
                                value={formData.role || ""}
                                onChange={(e) => handleInputChange('role', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Skills</label>
                              <Input
                                placeholder="Enter relevant skills..."
                                value={formData.skills || ""}
                                onChange={(e) => handleInputChange('skills', e.target.value)}
                              />
                            </div>
                          </>
                        )}

                        {selectedUseCase === "blog" && (
                          <>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Subject</label>
                              <Input
                                placeholder="Enter blog subject..."
                                value={formData.subject || ""}
                                onChange={(e) => handleInputChange('subject', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Number of Headings</label>
                              <Input
                                placeholder="Enter number of headings..."
                                type="number"
                                min="1"
                                max="11"
                                value={formData.no_of_headings || ""}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (value <= 11) {
                                    handleInputChange('no_of_headings', value);
                                  }
                                }}
                              />
                            </div>
                          </>
                        )}

                        {selectedUseCase === "video_idea" && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Keywords</label>
                            <Input
                              placeholder="Enter keywords..."
                              value={formData.keywords || ""}
                              onChange={(e) => handleInputChange('keywords', e.target.value)}
                            />
                          </div>
                        )}

                        {selectedUseCase === "video_description" && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Video Title</label>
                            <Input
                              placeholder="Enter video title..."
                              value={formData.video_title || ""}
                              onChange={(e) => handleInputChange('video_title', e.target.value)}
                            />
                          </div>
                        )}

                        {selectedUseCase === "channel_description" && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Channel Name</label>
                            <Input
                              placeholder="Enter channel name..."
                              value={formData.channel_name || ""}
                              onChange={(e) => handleInputChange('channel_name', e.target.value)}
                            />
                          </div>
                        )}

                        {selectedUseCase === "tagline" && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <Input
                              placeholder="Enter description..."
                              value={formData.description || ""}
                              onChange={(e) => handleInputChange('description', e.target.value)}
                            />
                          </div>
                        )}

                        {selectedUseCase === "story" && (
                          <>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Key Points</label>
                              <Input
                                placeholder="Enter key points..."
                                value={formData.key_points || ""}
                                onChange={(e) => handleInputChange('key_points', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Word Count</label>
                              <Input
                                placeholder="Enter target word count..."
                                type="number"
                                value={formData.words || ""}
                                onChange={(e) => handleInputChange('words', e.target.value)}
                              />
                            </div>
                          </>
                        )}

                        {selectedUseCase === "product_description" && (
                          <>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Product Name</label>
                              <Input
                                placeholder="Enter product name..."
                                value={formData.product_name || ""}
                                onChange={(e) => handleInputChange('product_name', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Product Features</label>
                              <Input
                                placeholder="Enter product features..."
                                value={formData.product_features || ""}
                                onChange={(e) => handleInputChange('product_features', e.target.value)}
                              />
                            </div>
                          </>
                        )}

                        {selectedUseCase === "paraphrase" && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Text</label>
                            <Input
                              placeholder="Enter text to paraphrase..."
                              value={formData.text || ""}
                              onChange={(e) => handleInputChange('text', e.target.value)}
                            />
                          </div>
                        )}

                        {selectedUseCase === "job_description" && (
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Job Role</label>
                            <Input
                              placeholder="Enter job role..."
                              value={formData.job_role || ""}
                              onChange={(e) => handleInputChange('job_role', e.target.value)}
                            />
                          </div>
                        )}

                        {selectedUseCase === "facebook_post" && (
                          <>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Post Type</label>
                              <Input
                                placeholder="Enter post type..."
                                value={formData.post_type || ""}
                                onChange={(e) => handleInputChange('post_type', e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Keywords</label>
                              <Input
                                placeholder="Enter keywords..."
                                value={formData.keywords || ""}
                                onChange={(e) => handleInputChange('keywords', e.target.value)}
                              />
                            </div>
                          </>
                        )}

                        <Button
                          className={`w-full ${generationMode === 'ecognitive' ? '!bg-indigo-600 hover:!bg-indigo-700' : '!bg-blue-500 hover:!bg-blue-600'} !text-white`}
                          onClick={handleCreateDocument}
                          disabled={isGenerating}
                        >
                          {isGenerating ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              {generationMode === 'ecognitive' ? 'eGenerating...' : 'Generating...'}
                            </>
                          ) : (
                            generationMode === 'ecognitive' ? 'eGenerate Document' : 'Generate Document'
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="mb-4 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </>
            )}

            <SidebarGroup>
              {sidebarOpen && <SidebarGroupLabel className="!text-[#393e46b3]">Recent Documents</SidebarGroupLabel>}
              <SidebarGroupContent>
                {isLoadingDocuments ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredDocuments.length === 0 ? (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    {searchQuery ? "No documents found" : "No documents yet"}
                  </div>
                ) : (
                  <SidebarMenu>
                    {filteredDocuments.map((doc) => (
                      <SidebarMenuItem key={doc.id}>
                        <SidebarMenuButton
                          className={`hover:!text-[#22252a] mt-3 hover:!bg-[#eaecf0] ${activeDocumentId === doc.id ? '!bg-[#eaecf0] !text-[#22252a]' : ''}`}
                          onClick={() => handleDocumentClick(doc)}
                          asChild
                        >
                          <button className="w-full h-[2.5rem]">
                            <FileText className="h-4 w-4" />
                            {sidebarOpen && (
                              <div className="flex-1 text-left">
                                <div className="font-medium text-sm truncate">{doc.name}</div>
                                <div className="text-xs text-[#676f7e]">{doc.formatted_date}</div>
                              </div>
                            )}
                          </button>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                )}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
    </>
  );
}