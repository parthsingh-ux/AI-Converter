"use client";

import { useState, useEffect, useRef } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import {
  Code2,
  FileCode,
  Image as ImageIcon,
  Sparkles,
  FileJson,
  Mail,
  FileText,
  UploadCloud,
  FolderOpen,
  Folder,
  Files,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Download,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Zap,
  Layers,
  Palette,
  Type as FontIcon,
  X,
  File,
  Activity,
  Cpu,
  Globe,
  Plus,
  BarChart3,
  Gauge,
  Eye,
  Star,
  Play,
  HelpCircle,
  Quote,
  CheckSquare,
  Maximize2,
  Minimize2,
  Navigation,
  Monitor,
  ExternalLink,
  Send,
  Key,
  Link2,
} from "lucide-react";

const INPUT_TYPES = [
  { id: "html", label: "HTML", icon: Code2, isFile: false, placeholder: "Paste raw or bundled HTML code (with embedded <style> or <script> tags) or upload an HTML file..." },
  { id: "multi_files", label: "Files Bundle", icon: Files, isFile: true, isMultiFile: true, placeholder: "Select or drop multiple separate files (e.g. index.html, style.css, script.js, images)" },
  { id: "css_js", label: "CSS / JS", icon: FileCode, isFile: false, placeholder: "Paste CSS styles or JS components here..." },
  { id: "image", label: "Image", icon: ImageIcon, isFile: true, accept: "image/*", placeholder: "Upload UI screenshot or wireframe image" },
  { id: "prompt", label: "Prompt", icon: Sparkles, isFile: false, placeholder: "Describe the theme design you want to create (e.g. Modern SaaS Hero with dark navbar, pricing section, and footer)..." },
  { id: "json", label: "JSON", icon: FileJson, isFile: false, placeholder: "Paste JSON layout specs or structural data..." },
  { id: "email_quote", label: "Email Quote", icon: Mail, isFile: false, placeholder: "Paste email thread, client quote, or design brief..." },
  { id: "pdf", label: "PDF", icon: FileText, isFile: true, accept: "application/pdf", placeholder: "Upload design spec PDF or document" },
  { id: "folder", label: "Folder", icon: FolderOpen, isFile: true, isFolder: true, placeholder: "Select an entire project folder from your system" },
];

const STAGES = [
  "Reading & parsing separate files…",
  "Talking to Gemini 3.6 Flash…",
  "Validating Elementor flex structure…",
  "Packaging Elementor JSON & WP theme…",
];

function RenderNode({ node, depth = 0 }) {
  if (!node || typeof node !== "object") return null;
  const settings = node.settings || {};

  if (node.elType === "container") {
    const isBoxed = settings.content_width === "boxed";
    const boxedWidth = settings.boxed_width?.size || 1200;
    const isRow = settings.flex_direction === "row" || settings.flex_direction === "row-reverse";

    const containerStyle = {
      display: "flex",
      flexDirection: settings.flex_direction || "column",
      justifyContent: settings.flex_justify_content || "flex-start",
      alignItems: settings.flex_align_items || "stretch",
      gap: settings.flex_gap?.size ? `${settings.flex_gap.size}px` : isRow ? "24px" : "16px",
      backgroundColor: settings.background_color || (node.isInner ? "transparent" : "#ffffff"),
      padding: settings.padding
        ? `${settings.padding.top || 0}px ${settings.padding.right || 0}px ${settings.padding.bottom || 0}px ${settings.padding.left || 0}px`
        : depth === 0
          ? "60px 0px"
          : "16px",
      borderRadius: settings.border_radius ? `${settings.border_radius.top || 0}px` : undefined,
      maxWidth: isBoxed ? `${boxedWidth}px` : "100%",
      width: "100%",
      margin: isBoxed ? "0 auto" : undefined,
      boxSizing: "border-box",
      flexWrap: settings.flex_wrap || (isRow ? "wrap" : "nowrap"),
      flex: settings._flex_size ? `1 1 ${settings._flex_size}%` : isRow ? "1 1 0%" : undefined,
      position: "relative",
    };

    return (
      <div style={containerStyle} className={`transition-all ${depth === 0 ? "border-b border-[#CBD1D7]/40" : ""}`}>
        {Array.isArray(node.elements) &&
          node.elements.map((child, i) => <RenderNode key={child.id || i} node={child} depth={depth + 1} />)}
      </div>
    );
  }

  if (node.elType === "widget") {
    const wType = node.widgetType;

    if (wType === "heading") {
      const headingStyle = {
        color: settings.title_color || "#0f172a",
        fontSize: settings.typography_font_size?.size ? `${settings.typography_font_size.size}px` : "28px",
        fontWeight: settings.typography_font_weight || "700",
        fontFamily: settings.typography_font_family || "inherit",
        margin: "8px 0",
        lineHeight: "1.2",
      };
      const Tag = settings.header_size || "h2";
      return <Tag style={headingStyle}>{settings.title || "Headline Title"}</Tag>;
    }

    if (wType === "text-editor") {
      const textStyle = {
        color: settings.text_color || "#475569",
        fontSize: settings.typography_font_size?.size ? `${settings.typography_font_size.size}px` : "16px",
        fontFamily: settings.typography_font_family || "inherit",
        margin: "6px 0",
        lineHeight: "1.6",
      };
      const htmlContent = settings.editor || "<p>Text content</p>";
      return <div style={textStyle} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    }

    if (wType === "button") {
      const btnStyle = {
        backgroundColor: settings.background_color || "#0A69C9",
        color: settings.button_text_color || "#ffffff",
        padding: settings.padding
          ? `${settings.padding.top || 12}px ${settings.padding.right || 24}px ${settings.padding.bottom || 12}px ${settings.padding.left || 24}px`
          : "12px 24px",
        borderRadius: settings.border_radius ? `${settings.border_radius.top || 8}px` : "8px",
        fontWeight: settings.typography_font_weight || "600",
        fontSize: settings.typography_font_size?.size ? `${settings.typography_font_size.size}px` : "15px",
        border: "none",
        cursor: "pointer",
        display: "inline-block",
        textDecoration: "none",
        width: "fit-content",
      };
      return <button style={btnStyle}>{settings.text || "Click Here"}</button>;
    }

    if (wType === "image") {
      const imgUrl = settings.image?.url || "https://via.placeholder.com/600x400?text=Elementor+Image";
      return (
        <img
          src={imgUrl}
          alt="Elementor Widget"
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: settings.border_radius ? `${settings.border_radius.top || 0}px` : "8px",
            objectFit: "cover",
          }}
        />
      );
    }

    if (wType === "icon-box" || wType === "image-box") {
      return (
        <div style={{ padding: "12px 0" }}>
          <h4 style={{ color: settings.title_color || "#0f172a", fontWeight: "700", marginBottom: "4px" }}>
            {settings.title_text || settings.title || "Feature Heading"}
          </h4>
          <p style={{ color: settings.text_color || "#475569", fontSize: "14px", margin: 0 }}>
            {settings.description_text || settings.editor || "Feature detail description."}
          </p>
        </div>
      );
    }

    if (wType === "nav-menu") {
      return (
        <nav className="flex items-center space-x-4 py-2">
          {["Home", "About", "Services", "Pricing", "Contact"].map((item, idx) => (
            <span
              key={idx}
              style={{ color: settings.color_menu_item || "#0f172a", fontWeight: "600", fontSize: "14px" }}
            >
              {item}
            </span>
          ))}
        </nav>
      );
    }

    if (wType === "accordion" || wType === "toggle") {
      const tabs = settings.tabs || [
        { tab_title: "Frequently Asked Question 1", tab_content: "Detailed response and clear explanation provided here." },
        { tab_title: "Frequently Asked Question 2", tab_content: "Additional information for client inquiry." },
      ];

      return (
        <div className="w-full space-y-2 py-2">
          {tabs.map((tab, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
              <div className="flex items-center justify-between font-bold text-sm text-slate-800">
                <span className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-[#0A69C9]" />
                  {tab.tab_title}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
              {idx === 0 && <p className="text-xs text-gray-600 mt-2 pl-6">{tab.tab_content}</p>}
            </div>
          ))}
        </div>
      );
    }

    if (wType === "testimonial") {
      return (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-2 text-slate-800 shadow-sm space-y-2">
          <Quote className="h-5 w-5 text-[#0A69C9]" />
          <p className="text-sm italic font-medium">
            "{settings.testimonial_content || settings.editor || settings.text || "Outstanding service and top quality results!"}"
          </p>
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
            <div>
              <strong className="block text-slate-900">{settings.testimonial_name || "Satisfied Client"}</strong>
              <span className="text-gray-500">{settings.testimonial_job || "Business Executive"}</span>
            </div>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (wType === "counter" || wType === "progress") {
      return (
        <div className="text-center p-3 bg-slate-50 rounded-xl border border-slate-200">
          <span className="text-3xl font-extrabold text-[#0A69C9] block">
            {settings.starting_number || ""}{settings.ending_number || "99"}{settings.suffix || "%"}
          </span>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mt-1 block">
            {settings.title || "Key Performance Metric"}
          </span>
        </div>
      );
    }

    if (wType === "pricing") {
      return (
        <div className="border border-[#0A69C9]/30 rounded-2xl p-5 bg-white shadow-md text-center space-y-3">
          <h3 className="text-lg font-bold text-slate-900">{settings.title || "Pro Plan"}</h3>
          <div className="text-3xl font-extrabold text-[#0A69C9]">
            {settings.currency_symbol || "$"}{settings.price || "49"}<span className="text-xs text-gray-500 font-normal">/month</span>
          </div>
          <button className="w-full py-2 bg-[#0A69C9] text-white rounded-lg text-xs font-bold shadow">
            {settings.button_text || "Get Started"}
          </button>
        </div>
      );
    }

    if (wType === "spacer" || wType === "divider") {
      return <div className="w-full my-3 border-b border-gray-200 opacity-60" />;
    }

    if (wType === "video") {
      return (
        <div className="w-full aspect-video bg-slate-900 rounded-xl flex items-center justify-center text-white my-2 border border-slate-800">
          <Play className="h-10 w-10 text-[#0A69C9] animate-pulse" />
        </div>
      );
    }

    // Generic Fallback Renderer for any custom or unrecognized widget
    const fallbackTitle = settings.title || settings.title_text || settings.text || settings.label || settings.name || node.widgetType;
    const fallbackContent = settings.editor || settings.description || settings.content || settings.editor_text;

    return (
      <div className="p-3 my-1 rounded-lg border border-slate-200/80 bg-slate-50/50 text-slate-800 text-xs">
        {fallbackTitle && <h4 className="font-bold text-slate-900 mb-1">{fallbackTitle}</h4>}
        {fallbackContent && (
          <div className="text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: String(fallbackContent) }} />
        )}
      </div>
    );
  }

  return null;
}

function LiveVisualPreview({ templates, title }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const headerNodes = templates?.header || [];
  const contentNodes = templates?.content || [];
  const footerNodes = templates?.footer || [];

  const totalSections = headerNodes.length + contentNodes.length + footerNodes.length;

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-[#CBD1D7] text-slate-900 font-sans transition-all w-full ${isExpanded ? "fixed inset-4 z-50 flex flex-col max-h-none" : ""}`}>
      {/* Mock Browser Header Bar */}
      <div className="bg-[#021528] px-4 py-3 flex items-center justify-between text-xs font-mono text-[#97A3AF]">
        <div className="flex items-center space-x-2 truncate">
          <div className="flex space-x-1.5 shrink-0">
            <span className="h-3 w-3 rounded-full bg-[#DB1439] inline-block" />
            <span className="h-3 w-3 rounded-full bg-[#DB8700] inline-block" />
            <span className="h-3 w-3 rounded-full bg-[#12A150] inline-block" />
          </div>
          <span className="text-white ml-2 font-bold truncate max-w-sm">{title} — Full Width Live Replica</span>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <span className="px-2.5 py-0.5 rounded-full bg-[#12A150]/20 text-[#12A150] font-bold border border-[#12A150]/40">
            {totalSections} Sections Captured
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded bg-[#010B14] hover:bg-[#191C1F] text-white transition-colors border border-[#4B545D]/40"
            title={isExpanded ? "Exit full screen" : "Expand canvas"}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Interactive Section Navigator Ribbon */}
      <div className="bg-[#010B14] px-4 py-2 flex items-center space-x-2 overflow-x-auto font-mono text-[11px] no-scrollbar">
        <div className="flex items-center space-x-1 text-[#148ECD] font-bold shrink-0">
          <Navigation className="h-3.5 w-3.5" />
          <span>Jump to Section:</span>
        </div>

        {headerNodes.map((node, i) => (
          <button
            key={`hdr-${i}`}
            onClick={() => scrollToSection(`sec-hdr-${i}`)}
            className="px-2.5 py-1 rounded bg-[#021528] hover:bg-[#0A69C9] text-white shrink-0 transition-colors font-semibold"
          >
            Header #{i + 1}
          </button>
        ))}

        {contentNodes.map((node, i) => {
          const headingTitle = node.elements?.[0]?.elements?.find((el) => el.settings?.title)?.settings?.title;
          const label = headingTitle ? headingTitle.slice(0, 18) : `Section ${i + 1}`;

          return (
            <button
              key={`cnt-${i}`}
              onClick={() => scrollToSection(`sec-cnt-${i}`)}
              className="px-2.5 py-1 rounded bg-[#021528] hover:bg-[#0A69C9] text-white shrink-0 transition-colors font-semibold"
            >
              {label}
            </button>
          );
        })}

        {footerNodes.map((node, i) => (
          <button
            key={`ftr-${i}`}
            onClick={() => scrollToSection(`sec-ftr-${i}`)}
            className="px-2.5 py-1 rounded bg-[#021528] hover:bg-[#12A150] text-white shrink-0 transition-colors font-semibold"
          >
            Footer #{i + 1}
          </button>
        ))}
      </div>

      {/* Rendered Live Site Canvas (Full Desktop View) */}
      <div className={`w-full overflow-x-auto bg-slate-100 ${isExpanded ? "flex-1 overflow-y-auto" : "max-h-[750px] overflow-y-auto"}`}>
        {/* Header Section */}
        {headerNodes.length > 0 && (
          <header className="w-full">
            {headerNodes.map((node, i) => (
              <div key={node.id || i} id={`sec-hdr-${i}`} className="relative group">
                <div className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded bg-[#021528]/90 text-[#148ECD] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  Header Section #{i + 1}
                </div>
                <RenderNode node={node} depth={0} />
              </div>
            ))}
          </header>
        )}

        {/* Content Body Sections */}
        <main className="w-full">
          {contentNodes.map((node, i) => (
            <div key={node.id || i} id={`sec-cnt-${i}`} className="relative group">
              <div className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded bg-[#021528]/90 text-[#0A69C9] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                Section #{i + 1} &bull; {node.settings?.css_classes || "Content Block"}
              </div>
              <RenderNode node={node} depth={0} />
            </div>
          ))}
        </main>

        {/* Footer Section */}
        {footerNodes.length > 0 && (
          <footer className="w-full">
            {footerNodes.map((node, i) => (
              <div key={node.id || i} id={`sec-ftr-${i}`} className="relative group">
                <div className="absolute top-2 left-2 z-20 px-2 py-0.5 rounded bg-[#021528]/90 text-[#12A150] text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  Footer Section #{i + 1}
                </div>
                <RenderNode node={node} depth={0} />
              </div>
            ))}
          </footer>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [selectedType, setSelectedType] = useState("html");
  const [textContent, setTextContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  // Folder state
  const [folderFiles, setFolderFiles] = useState([]);
  const [folderName, setFolderName] = useState("");

  // Multi-Files Separate Upload state
  const [separateFiles, setSeparateFiles] = useState([]);

  const [isDragOver, setIsDragOver] = useState(false);

  // Token Quota Left state (250,000 TPM limit)
  const [tokenInfo, setTokenInfo] = useState({
    limit: 250000,
    remaining: 250000,
    usedPrompt: 0,
    usedOutput: 0,
    usedTotal: 0,
    modelName: "gemini-3.6-flash",
  });

  // Status & loading states
  const [isLoading, setIsLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [result, setResult] = useState(null);
  const [errorList, setErrorList] = useState(null);

  // Collapsible JSON previews & copy states
  const [openSections, setOpenSections] = useState({
    header: false,
    footer: false,
    content: false,
  });
  const [copiedKey, setCopiedKey] = useState(null);
  const [copiedColor, setCopiedColor] = useState(null);

  // WordPress Direct Integration state
  const [wpAuthMode, setWpAuthMode] = useState("mcp_oauth"); // "mcp_oauth" or "basic"
  const [wpConfig, setWpConfig] = useState({
    site_url: "https://mcp.adaantest3.com",
    username: "admin",
    application_password: "qwerasdfzxcvqwer",
    page_title: "",
    page_slug: "",
    page_status: "publish",
  });
  const [mcpConfig, setMcpConfig] = useState({
    server_url: "https://mcp.adaantest3.com/wp-json/mcp/novamira-oauth",
    access_token: "",
    connector_name: "novamira-mcp-adaantest3-c",
  });
  const [mcpAuthStatus, setMcpAuthStatus] = useState(null);
  const [wpConnStatus, setWpConnStatus] = useState(null);
  const [wpDeployStatus, setWpDeployStatus] = useState(null);

  // Multi-Site State & Saved Sites Manager
  const [savedSites, setSavedSites] = useState([
    {
      name: "adaantest3 Staging",
      url: "https://mcp.adaantest3.com",
      username: "admin",
      appPassword: "qwerasdfzxcvqwer",
    },
  ]);

  // Load saved sites on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ai_converter_saved_sites");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedSites(parsed);
        }
      }
    } catch (e) {}
  }, []);

  // Helper to handle site URL change and auto-sync MCP endpoints
  const handleSiteUrlChange = (newUrl) => {
    let clean = newUrl.trim();
    if (clean && !/^https?:\/\//i.test(clean)) {
      clean = `https://${clean}`;
    }
    const cleanOrigin = clean.replace(/\/+$/, "");

    let domainName = "custom";
    try {
      const parsed = new URL(cleanOrigin);
      domainName = parsed.hostname.replace(/[^a-z0-9-]+/gi, "-");
    } catch {}

    setWpConfig((prev) => ({ ...prev, site_url: cleanOrigin }));
    setMcpConfig((prev) => ({
      ...prev,
      server_url: cleanOrigin ? `${cleanOrigin}/wp-json/mcp/novamira-oauth` : "",
      connector_name: `novamira-mcp-${domainName}-c`,
    }));
  };

  // Helper to select a saved site
  const handleSelectSavedSite = (site) => {
    setWpConfig((prev) => ({
      ...prev,
      site_url: site.url,
      username: site.username || prev.username,
      application_password: site.appPassword || prev.application_password,
    }));
    handleSiteUrlChange(site.url);
  };

  // Helper to save current site to saved sites list
  const handleSaveCurrentSite = () => {
    if (!wpConfig.site_url) return;
    const exists = savedSites.find((s) => s.url === wpConfig.site_url);
    if (!exists) {
      let siteName = "Custom Site";
      try {
        siteName = new URL(wpConfig.site_url).hostname;
      } catch {}
      const updated = [
        ...savedSites,
        {
          name: siteName,
          url: wpConfig.site_url,
          username: wpConfig.username,
          appPassword: wpConfig.application_password,
        },
      ];
      setSavedSites(updated);
      try {
        localStorage.setItem("ai_converter_saved_sites", JSON.stringify(updated));
      } catch (e) {}
    }
  };

  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);
  const multiFileInputRef = useRef(null);

  const activeInputConfig = INPUT_TYPES.find((t) => t.id === selectedType);

  const handleTypeChange = (typeId) => {
    setSelectedType(typeId);
    setErrorList(null);
  };

  // Handle single file selection
  const handleFileSelect = (file) => {
    if (!file) return;
    setSelectedFile(file);

    if (selectedType === "html" && (file.name.endsWith(".html") || file.name.endsWith(".htm"))) {
      const reader = new FileReader();
      reader.onload = (e) => setTextContent(e.target.result);
      reader.readAsText(file);
    } else if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  // Handle multi-file separate selection
  const handleMultiFileSelect = async (filesList) => {
    if (!filesList || filesList.length === 0) return;
    const filesArray = Array.from(filesList);

    const parsedFiles = [];
    for (const f of filesArray) {
      const isImage = f.type.startsWith("image/") || /\.(png|jpe?g|webp|gif|svg)$/i.test(f.name);
      if (isImage) {
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(f);
        });
        parsedFiles.push({
          name: f.name,
          size: f.size,
          isImage: true,
          mimeType: f.type || "image/png",
          base64,
        });
      } else {
        const text = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsText(f);
        });
        parsedFiles.push({
          name: f.name,
          size: f.size,
          isImage: false,
          content: text,
        });
      }
    }

    setSeparateFiles((prev) => [...prev, ...parsedFiles]);
  };

  const removeSeparateFile = (index) => {
    setSeparateFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle system folder selection
  const handleFolderSelect = async (filesList) => {
    if (!filesList || filesList.length === 0) return;
    const filesArray = Array.from(filesList);

    const firstPath = filesArray[0].webkitRelativePath || filesArray[0].name;
    const rootName = firstPath.includes("/") ? firstPath.split("/")[0] : "Selected Folder";
    setFolderName(rootName);

    const parsedFolderFiles = [];
    for (const f of filesArray) {
      const relativePath = f.webkitRelativePath || f.name;
      const isImage = f.type.startsWith("image/") || /\.(png|jpe?g|webp|gif|svg)$/i.test(f.name);

      if (isImage) {
        const base64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(f);
        });
        parsedFolderFiles.push({
          name: relativePath,
          path: relativePath,
          size: f.size,
          isImage: true,
          mimeType: f.type || "image/png",
          base64,
        });
      } else {
        const text = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsText(f);
        });
        parsedFolderFiles.push({
          name: relativePath,
          path: relativePath,
          size: f.size,
          isImage: false,
          content: text,
        });
      }
    }

    setFolderFiles(parsedFolderFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    if (activeInputConfig.isFolder) {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFolderSelect(e.dataTransfer.files);
      }
    } else if (activeInputConfig.isMultiFile) {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleMultiFileSelect(e.dataTransfer.files);
      }
    } else {
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    }
  };

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = (data, key) => {
    navigator.clipboard.writeText(typeof data === "string" ? data : JSON.stringify(data, null, 2));
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const copyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Listen for OAuth success/error from popups & persist token
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("mcp_access_token");
      const savedUrl = localStorage.getItem("mcp_server_url");
      if (savedToken) {
        setMcpConfig((prev) => ({
          ...prev,
          access_token: savedToken,
          server_url: savedUrl || prev.server_url,
        }));
        setMcpAuthStatus({
          loading: false,
          success: true,
          message: "Connected & Authenticated with Novamira MCP!",
        });
      }
    } catch (e) {}

    const handleMessage = (event) => {
      if (event.data && event.data.type === "MCP_OAUTH_SUCCESS") {
        try {
          if (event.data.accessToken) localStorage.setItem("mcp_access_token", event.data.accessToken);
          if (event.data.serverUrl) localStorage.setItem("mcp_server_url", event.data.serverUrl);
        } catch (e) {}

        setMcpConfig((prev) => ({
          ...prev,
          access_token: event.data.accessToken,
        }));
        setMcpAuthStatus({
          loading: false,
          success: true,
          message: "Connected & Authenticated with Novamira MCP!",
        });
      } else if (event.data && event.data.type === "MCP_OAUTH_ERROR") {
        setMcpAuthStatus({
          loading: false,
          success: false,
          error: event.data.error || "OAuth Authorization Failed.",
        });
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Initiate Novamira MCP OAuth flow
  const handleInitiateMcpAuth = async () => {
    if (!mcpConfig.server_url) {
      setMcpAuthStatus({ loading: false, success: false, error: "Please enter your Novamira MCP Server URL." });
      return;
    }
    setMcpAuthStatus({ loading: true });
    try {
      const res = await fetch("/api/wordpress/mcp-auth/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ server_url: mcpConfig.server_url, connector_name: mcpConfig.connector_name }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.authorizeUrl) {
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        window.open(
          data.authorizeUrl,
          "novamira_mcp_oauth",
          `width=${width},height=${height},top=${top},left=${left},scrollbars=yes`
        );
        setMcpAuthStatus({ loading: false, pending: true, message: "Opening WordPress sign-in window. Please approve authorization..." });
      } else {
        setMcpAuthStatus({ loading: false, success: false, error: data.error || "Failed to initiate OAuth." });
      }
    } catch (err) {
      setMcpAuthStatus({ loading: false, success: false, error: err.message });
    }
  };

  // Deploy page via Novamira MCP (or direct plugin bridge fallback)
  const handleDeployViaMcp = async () => {
    if (!result || !result.templates) {
      setWpDeployStatus({ loading: false, success: false, error: "Please convert your input design first before deploying." });
      return;
    }

    setWpDeployStatus({ loading: true });
    try {
      let res;
      if (mcpConfig.access_token) {
        res = await fetch("/api/wordpress/mcp-deploy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            server_url: mcpConfig.server_url,
            access_token: mcpConfig.access_token,
            page_title: wpConfig.page_title || result.title || "AI Generated Elementor Page",
            page_slug: wpConfig.page_slug || "",
            page_status: wpConfig.page_status || "publish",
            templates: result.templates,
          }),
        });
      } else {
        // Direct plugin deployment fallback
        res = await fetch("/api/wordpress/deploy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            site_url: mcpConfig.server_url || wpConfig.site_url || "https://mcp.adaantest3.com",
            page_title: wpConfig.page_title || result.title || "AI Generated Elementor Page",
            page_slug: wpConfig.page_slug || "",
            page_status: wpConfig.page_status || "publish",
            templates: result.templates,
          }),
        });
      }
      const data = await res.json();
      if (res.ok && data.success) {
        setWpDeployStatus({ loading: false, success: true, data });
      } else {
        setWpDeployStatus({ loading: false, success: false, error: data.error || "Deployment failed." });
      }
    } catch (err) {
      setWpDeployStatus({ loading: false, success: false, error: err.message });
    }
  };

  // Test connection to WordPress REST API
  const handleTestWpConnection = async () => {
    if (!wpConfig.site_url || !wpConfig.username || !wpConfig.application_password) {
      setWpConnStatus({ loading: false, success: false, error: "Please enter your WP Site URL, Username, and Application Password." });
      return;
    }
    setWpConnStatus({ loading: true });
    try {
      const res = await fetch("/api/wordpress/test-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wpConfig),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setWpConnStatus({ loading: false, success: true, message: `Connected as ${data.userName} (${data.siteUrl})` });
      } else {
        setWpConnStatus({ loading: false, success: false, error: data.error || "Connection failed." });
      }
    } catch (err) {
      setWpConnStatus({ loading: false, success: false, error: err.message });
    }
  };

  // Deploy page directly to WordPress
  const handleDeployToWordPress = async () => {
    if (!wpConfig.site_url) {
      setWpDeployStatus({ loading: false, success: false, error: "Please enter your WordPress site URL." });
      return;
    }
    if (!result || !result.templates) {
      setWpDeployStatus({ loading: false, success: false, error: "Please convert your input design first before deploying." });
      return;
    }

    setWpDeployStatus({ loading: true });
    try {
      const res = await fetch("/api/wordpress/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...wpConfig,
          page_title: wpConfig.page_title || result.title || "AI Generated Elementor Page",
          templates: result.templates,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setWpDeployStatus({ loading: false, success: true, data });
      } else {
        setWpDeployStatus({ loading: false, success: false, error: data.error || "Deployment failed." });
      }
    } catch (err) {
      setWpDeployStatus({ loading: false, success: false, error: err.message });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setCurrentStage(0);
    setResult(null);
    setErrorList(null);

    // Staged progress simulation
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => (prev < 3 ? prev + 1 : prev));
    }, 1500);

    try {
      let res;
      if (activeInputConfig.isFolder) {
        if (!folderFiles || folderFiles.length === 0) {
          throw new Error("Please select a project folder from your system.");
        }
        const formData = new FormData();
        formData.append("input_type", "folder");
        formData.append("folder_data", JSON.stringify(folderFiles));

        res = await fetch("/api/convert", {
          method: "POST",
          body: formData,
        });
      } else if (activeInputConfig.isMultiFile) {
        if (!separateFiles || separateFiles.length === 0) {
          throw new Error("Please select one or more separate files (HTML, CSS, JS, Images) to upload.");
        }
        const formData = new FormData();
        formData.append("input_type", "multi_files");
        formData.append("files_data", JSON.stringify(separateFiles));

        res = await fetch("/api/convert", {
          method: "POST",
          body: formData,
        });
      } else if (activeInputConfig.isFile) {
        if (!selectedFile) {
          throw new Error(`Please select a ${activeInputConfig.label} file to upload.`);
        }
        const formData = new FormData();
        formData.append("input_type", selectedType);
        formData.append("file", selectedFile);

        res = await fetch("/api/convert", {
          method: "POST",
          body: formData,
        });
      } else {
        if (!textContent.trim()) {
          throw new Error(`Please enter some ${activeInputConfig.label} content to convert.`);
        }
        res = await fetch("/api/convert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input_type: selectedType,
            content: textContent,
          }),
        });
      }

      clearInterval(stageInterval);
      setCurrentStage(3);

      const data = await res.json();

      // Update token usage metrics
      if (data.tokenUsage) {
        setTokenInfo({
          limit: data.tokenUsage.tokenLimitPerMinute || 250000,
          remaining: data.tokenUsage.tokensRemainingPerMinute,
          usedPrompt: data.tokenUsage.promptTokens || 0,
          usedOutput: data.tokenUsage.outputTokens || 0,
          usedTotal: data.tokenUsage.totalTokens || 0,
          modelName: data.tokenUsage.usedModelName || "gemini-3.6-flash",
        });
      }

      if (!res.ok || !data.success) {
        setErrorList(data.errors || [data.error || "Failed to convert input."]);
      } else {
        setResult(data);
      }
    } catch (err) {
      clearInterval(stageInterval);
      setErrorList([err.message || "An unexpected error occurred."]);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate remaining token percentage
  const remainingPercent = Math.min(100, Math.max(0, Math.round((tokenInfo.remaining / tokenInfo.limit) * 100)));
  const usedPercent = 100 - remainingPercent;

  return (
    <div className="space-y-8 font-sans">
      {/* Top Engine & Token Quota Bar in Clean White Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#CBD1D7] text-[#021528] space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-2xl bg-[#0A69C9] flex items-center justify-center shadow shrink-0">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              {/* <div className="flex items-center space-x-2">
                <h1 className="text-xl font-extrabold text-[#021528] tracking-wide">AI CONVERTER ENGINE</h1>
                <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase bg-[#12A150]/15 text-[#12A150] border border-[#12A150]/30">
                  <Activity className="h-3 w-3 animate-ping" />
                  <span>Online</span>
                </span>
              </div> */}
              <p className="text-xs text-[#64707C] font-mono mt-0.5">
                Convert HTML Bundles, Separate HTML/CSS/JS Files, System Folders, Images & PDFs
              </p>
            </div>
          </div>

          {/* Model & Quota Summary */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="bg-[#F2F4F5] px-3 py-1.5 rounded-xl border border-[#CBD1D7] flex items-center space-x-2">
              <Cpu className="h-3.5 w-3.5 text-[#0A69C9]" />
              <span className="text-[#021528]">Model: {tokenInfo.modelName}</span>
            </div>
            <div className="bg-[#F2F4F5] px-3 py-1.5 rounded-xl border border-[#CBD1D7] flex items-center space-x-2">
              <Globe className="h-3.5 w-3.5 text-[#148ECD]" />
              <span className="text-[#021528]">Standard: Flex Containers v0.4</span>
            </div>
          </div>
        </div>

        {/* Live Token Quota Left Tracker Bar */}
        <div className="bg-[#F2F4F5] rounded-xl p-3.5 border border-[#CBD1D7] space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-1">
            <div className="flex items-center space-x-2">
              <Gauge className="h-4 w-4 text-[#0A69C9]" />
              <span className="text-[#021528] font-bold">API Token Quota Left (1-min Window):</span>
              <span className={`font-bold ${remainingPercent > 50 ? "text-[#12A150]" : remainingPercent > 20 ? "text-[#DB8700]" : "text-[#DB1439]"}`}>
                {tokenInfo.remaining.toLocaleString()} / {tokenInfo.limit.toLocaleString()} TPM ({remainingPercent}% available)
              </span>
            </div>
            <div className="text-[#64707C] text-[11px]">
              {tokenInfo.usedPrompt > 0 ? (
                <span>Last Request: <strong className="text-[#021528]">{tokenInfo.usedPrompt.toLocaleString()}</strong> input tokens | <strong className="text-[#0A69C9]">{tokenInfo.usedOutput.toLocaleString()}</strong> output tokens</span>
              ) : (
                <span>Limit: 250,000 Input Tokens / Minute</span>
              )}
            </div>
          </div>

          {/* Quota Progress Bar */}
          <div className="h-2 w-full bg-[#E5E8EB] rounded-full overflow-hidden border border-[#CBD1D7]">
            <div
              className={`h-full transition-all duration-700 ${usedPercent > 80
                ? "bg-[#DB1439]"
                : usedPercent > 50
                  ? "bg-[#DB8700]"
                  : "bg-[#0A69C9]"
                }`}
              style={{ width: `${Math.max(5, remainingPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Top Grid: Input & Conversion Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT PANEL: INPUT AREA (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#CBD1D7] text-[#021528]">
            {/* Input Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#CBD1D7]/60">
              <div>
                <h2 className="text-lg font-bold text-[#021528] flex items-center gap-2">
                  <Layers className="h-5 w-5 text-[#0A69C9]" />
                  Input Source Selector
                </h2>
                <p className="text-xs text-[#64707C]">Choose input format, multi-files bundle, or system folder</p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#F2F4F5] text-[#0A69C9] border border-[#CBD1D7]">
                {activeInputConfig.label} Mode
              </span>
            </div>

            {/* Tab Selector Bar */}
            <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5 p-1.5 bg-[#F2F4F5] rounded-xl mb-6 border border-[#CBD1D7]">
              {INPUT_TYPES.map((type) => {
                const Icon = type.icon;
                const isActive = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => handleTypeChange(type.id)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg text-xs font-medium transition-all ${isActive
                      ? "bg-[#0A69C9] text-white shadow font-bold scale-[1.02]"
                      : "text-[#64707C] hover:text-[#021528] hover:bg-[#E5E8EB]"
                      }`}
                  >
                    <Icon className={`h-4 w-4 mb-1 ${isActive ? "text-white" : "text-[#64707C]"}`} />
                    <span className="truncate w-full text-center text-[10px]">{type.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Input Panel */}
            <div className="mb-6">
              {activeInputConfig.isMultiFile ? (
                /* Multi-Files Separate Upload & Inspector */
                <div>
                  <input
                    ref={multiFileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleMultiFileSelect(e.target.files)}
                  />

                  {separateFiles.length > 0 ? (
                    <div className="border border-[#CBD1D7] bg-[#F2F4F5] rounded-xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-[#CBD1D7] pb-3">
                        <div className="flex items-center space-x-2">
                          <Files className="h-5 w-5 text-[#0A69C9]" />
                          <span className="text-sm font-bold text-[#021528]">Files Bundle</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#0A69C9]/15 text-[#0A69C9] font-bold">
                            {separateFiles.length} file{separateFiles.length > 1 ? "s" : ""} selected
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => multiFileInputRef.current?.click()}
                            className="text-xs text-[#0A69C9] hover:underline flex items-center space-x-1 font-mono bg-white px-2.5 py-1 rounded-lg border border-[#CBD1D7]"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            <span>Add File</span>
                          </button>
                          <button
                            onClick={() => setSeparateFiles([])}
                            className="text-xs text-[#DB1439] hover:underline flex items-center space-x-1 font-mono"
                          >
                            <X className="h-3.5 w-3.5" />
                            <span>Clear</span>
                          </button>
                        </div>
                      </div>

                      {/* File List Inspector */}
                      <div className="max-h-60 overflow-y-auto space-y-1.5 font-mono text-xs pr-1">
                        {separateFiles.map((fileObj, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#CBD1D7] hover:border-[#0A69C9] transition-colors"
                          >
                            <div className="flex items-center space-x-2 truncate">
                              {fileObj.isImage ? (
                                <ImageIcon className="h-3.5 w-3.5 text-[#148ECD] shrink-0" />
                              ) : fileObj.name.endsWith(".html") || fileObj.name.endsWith(".htm") ? (
                                <Code2 className="h-3.5 w-3.5 text-[#0A69C9] shrink-0" />
                              ) : fileObj.name.endsWith(".css") ? (
                                <FileCode className="h-3.5 w-3.5 text-[#DB8700] shrink-0" />
                              ) : (
                                <File className="h-3.5 w-3.5 text-[#64707C] shrink-0" />
                              )}
                              <span className="text-[#021528] truncate">{fileObj.name}</span>
                            </div>
                            <div className="flex items-center space-x-3 shrink-0 ml-2">
                              <span className="text-[10px] text-[#64707C]">
                                {(fileObj.size / 1024).toFixed(1)} KB
                              </span>
                              <button
                                onClick={() => removeSeparateFile(idx)}
                                className="text-[#64707C] hover:text-[#DB1439] p-0.5"
                                title="Remove file"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Multi-File Dropzone */
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => multiFileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[260px] ${isDragOver
                        ? "border-[#0A69C9] bg-[#0A69C9]/10"
                        : "border-[#CBD1D7] hover:border-[#0A69C9] bg-[#F2F4F5]"
                        }`}
                    >
                      <div className="h-16 w-16 rounded-2xl bg-[#0A69C9]/15 border border-[#0A69C9]/30 flex items-center justify-center text-[#0A69C9] mb-3">
                        <Files className="h-8 w-8" />
                      </div>
                      <p className="text-base font-bold text-[#021528]">Select Separate Files</p>
                      <p className="text-xs text-[#64707C] mt-1 max-w-sm">
                        Select or drag multiple files (index.html, style.css, app.js, images) to convert as a combined bundle
                      </p>
                      <span className="mt-4 px-4 py-1.5 rounded-xl bg-white text-xs font-mono text-[#0A69C9] border border-[#CBD1D7] font-bold shadow-sm">
                        Browse Multiple Files
                      </span>
                    </div>
                  )}
                </div>
              ) : activeInputConfig.isFolder ? (
                /* System Folder Picker & Inspector */
                <div>
                  <input
                    ref={folderInputRef}
                    type="file"
                    webkitdirectory=""
                    directory=""
                    multiple
                    className="hidden"
                    onChange={(e) => handleFolderSelect(e.target.files)}
                  />

                  {folderFiles.length > 0 ? (
                    <div className="border border-[#CBD1D7] bg-[#F2F4F5] rounded-xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-[#CBD1D7] pb-3">
                        <div className="flex items-center space-x-2">
                          <Folder className="h-5 w-5 text-[#0A69C9]" />
                          <span className="text-sm font-bold text-[#021528]">{folderName}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#0A69C9]/15 text-[#0A69C9] font-bold">
                            {folderFiles.length} file{folderFiles.length > 1 ? "s" : ""}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setFolderFiles([]);
                            setFolderName("");
                          }}
                          className="text-xs text-[#DB1439] hover:underline flex items-center space-x-1 font-mono"
                        >
                          <X className="h-3.5 w-3.5" />
                          <span>Clear</span>
                        </button>
                      </div>

                      {/* Folder File Inspector List */}
                      <div className="max-h-60 overflow-y-auto space-y-1.5 font-mono text-xs pr-1">
                        {folderFiles.map((fileObj, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#CBD1D7] hover:border-[#0A69C9] transition-colors"
                          >
                            <div className="flex items-center space-x-2 truncate">
                              {fileObj.isImage ? (
                                <ImageIcon className="h-3.5 w-3.5 text-[#148ECD] shrink-0" />
                              ) : (
                                <File className="h-3.5 w-3.5 text-[#0A69C9] shrink-0" />
                              )}
                              <span className="text-[#021528] truncate">{fileObj.path}</span>
                            </div>
                            <span className="text-[10px] text-[#64707C] shrink-0 ml-2">
                              {(fileObj.size / 1024).toFixed(1)} KB
                            </span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => folderInputRef.current?.click()}
                        className="w-full py-2 rounded-lg border border-dashed border-[#CBD1D7] hover:border-[#0A69C9] text-xs font-mono text-[#64707C] hover:text-[#021528] transition-all text-center bg-white"
                      >
                        Click to select a different system folder
                      </button>
                    </div>
                  ) : (
                    /* Folder Dropzone */
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => folderInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[260px] ${isDragOver
                        ? "border-[#0A69C9] bg-[#0A69C9]/10"
                        : "border-[#CBD1D7] hover:border-[#0A69C9] bg-[#F2F4F5]"
                        }`}
                    >
                      <div className="h-16 w-16 rounded-2xl bg-[#0A69C9]/15 border border-[#0A69C9]/30 flex items-center justify-center text-[#0A69C9] mb-3">
                        <FolderOpen className="h-8 w-8" />
                      </div>
                      <p className="text-base font-bold text-[#021528]">Select System Folder</p>
                      <p className="text-xs text-[#64707C] mt-1 max-w-sm">
                        Click to open system folder picker or drag & drop an entire project directory containing HTML, CSS, images, and JSON
                      </p>
                      <span className="mt-4 px-4 py-1.5 rounded-xl bg-white text-xs font-mono text-[#0A69C9] border border-[#CBD1D7] font-bold shadow-sm">
                        Browse System Directory
                      </span>
                    </div>
                  )}
                </div>
              ) : activeInputConfig.isFile ? (
                /* Drag & Drop Single File Upload Zone */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[260px] ${isDragOver
                    ? "border-[#0A69C9] bg-[#0A69C9]/10"
                    : selectedFile
                      ? "border-[#0A69C9] bg-[#F2F4F5]"
                      : "border-[#CBD1D7] hover:border-[#0A69C9] bg-[#F2F4F5]"
                    }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={activeInputConfig.accept}
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  />

                  {selectedFile ? (
                    <div className="flex flex-col items-center space-y-3">
                      {filePreview ? (
                        <div className="relative group">
                          <img
                            src={filePreview}
                            alt="Preview"
                            className="h-36 object-contain rounded-lg border border-[#CBD1D7] shadow-sm"
                          />
                        </div>
                      ) : (
                        <div className="h-16 w-16 rounded-xl bg-[#0A69C9]/15 border border-[#0A69C9]/30 flex items-center justify-center">
                          <FileText className="h-8 w-8 text-[#0A69C9]" />
                        </div>
                      )}
                      <div className="text-center">
                        <p className="text-sm font-semibold text-[#021528]">{selectedFile.name}</p>
                        <p className="text-xs text-[#64707C] font-mono">
                          {(selectedFile.size / 1024).toFixed(1)} KB &bull; Click or drop to change
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-3">
                      <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center text-[#0A69C9] border border-[#CBD1D7]">
                        <UploadCloud className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#021528]">
                          Drag and drop your <span className="text-[#0A69C9] font-bold">{activeInputConfig.label}</span> here
                        </p>
                        <p className="text-xs text-[#64707C] mt-1 font-mono">or click to browse local files</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Text Input Area (Supports pasting raw or bundle HTML) */
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#64707C] font-mono">
                      {selectedType === "html" ? "Paste HTML code or drag/upload an .html file below:" : "Enter text content:"}
                    </span>
                    {selectedType === "html" && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[11px] font-mono text-[#0A69C9] hover:underline flex items-center space-x-1"
                      >
                        <UploadCloud className="h-3 w-3" />
                        <span>Upload .html file</span>
                      </button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".html,.htm"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                    />
                  </div>

                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder={activeInputConfig.placeholder}
                    rows={10}
                    className="w-full bg-[#F2F4F5] border border-[#CBD1D7] rounded-xl p-4 text-sm font-mono text-[#021528] placeholder-[#64707C]/70 focus:outline-none focus:border-[#0A69C9] focus:ring-1 focus:ring-[#0A69C9] transition-all resize-none shadow-inner"
                  />
                  <div className="absolute bottom-3 right-3 text-[11px] font-mono text-[#64707C] bg-white px-2 py-0.5 rounded border border-[#CBD1D7]">
                    {textContent.length} chars
                  </div>
                </div>
              )}
            </div>

            {/* Convert Action Button using Design System Button */}
            <Button
              onClick={handleSubmit}
              isLoading={isLoading}
              fullWidth
              size="lg"
              color="primary"
              variant="solid"
              className="py-4 font-extrabold text-white bg-[#0A69C9] hover:bg-[#0854A1] shadow-md"
            >
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="h-5 w-5 text-white" />
                <span>Convert to Elementor Theme Package</span>
              </div>
            </Button>
          </div>
        </div>

        {/* RIGHT PANEL: CONVERSION STATUS / SUMMARY / DOWNLOADS / WORDPRESS PUSH (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          {/* Loading Staged State */}
          {isLoading && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#CBD1D7] text-[#021528]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A69C9] mb-4 flex items-center gap-2 font-mono">
                <Loader2 className="h-4 w-4 animate-spin" />
                Conversion Pipeline Execution
              </h3>
              <div className="space-y-4">
                {STAGES.map((stageText, idx) => {
                  const isCurrent = currentStage === idx;
                  const isPassed = currentStage > idx;

                  return (
                    <div key={idx} className="flex items-center space-x-3">
                      <div
                        className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all ${isPassed
                          ? "bg-[#12A150]/15 text-[#12A150] border border-[#12A150]/40"
                          : isCurrent
                            ? "bg-[#0A69C9]/15 text-[#0A69C9] border border-[#0A69C9] animate-pulse"
                            : "bg-[#F2F4F5] text-[#64707C] border border-[#CBD1D7]"
                          }`}
                      >
                        {isPassed ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
                      </div>
                      <span
                        className={`text-xs font-medium font-mono ${isPassed
                          ? "text-[#64707C] line-through opacity-70"
                          : isCurrent
                            ? "text-[#0A69C9] font-bold"
                            : "text-[#64707C]"
                          }`}
                      >
                        {stageText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Validation Errors Box */}
          {errorList && errorList.length > 0 && !isLoading && (
            <div className="bg-[#DB1439]/10 rounded-2xl p-6 border border-[#DB1439]/40 text-[#021528] shadow-sm">
              <div className="flex items-start space-x-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-[#DB1439] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-[#DB1439]">Elementor Structure Validation Errors</h3>
                  <p className="text-xs text-[#64707C] font-mono">
                    Backend validation failed ({errorList.length} violation{errorList.length > 1 ? "s" : ""})
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-[#DB1439]/30 max-h-72 overflow-y-auto space-y-2">
                {errorList.map((errStr, index) => (
                  <div key={index} className="text-xs font-mono text-[#DB1439] flex items-start space-x-2">
                    <span className="text-[#DB1439] font-bold select-none">&gt;</span>
                    <span className="whitespace-pre-wrap leading-relaxed">{errStr}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Success Results Card, Downloads & Direct WP Deployment */}
          {result && !isLoading && (
            <div className="flex flex-col space-y-6">
              {/* Summary Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#CBD1D7] text-[#021528]">
                <div className="flex items-center justify-between border-b border-[#CBD1D7]/60 pb-4 mb-4">
                  <div>
                    <span className="text-xs font-mono text-[#12A150] font-bold uppercase tracking-wider">
                      Conversion Successful
                    </span>
                    <h3 className="text-xl font-extrabold text-[#021528] mt-0.5">{result.title}</h3>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-[#12A150]/15 border border-[#12A150]/30 flex items-center justify-center text-[#12A150] shrink-0">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                </div>

                {/* Summary Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#F2F4F5] rounded-xl p-3 border border-[#CBD1D7]">
                    <div className="flex items-center space-x-2 text-xs text-[#64707C] mb-1">
                      <Layers className="h-3.5 w-3.5 text-[#0A69C9]" />
                      <span>Sections Generated</span>
                    </div>
                    <p className="text-lg font-bold text-[#021528] font-mono">
                      {result.summary?.section_count || 1} Containers
                    </p>
                  </div>

                  <div className="bg-[#F2F4F5] rounded-xl p-3 border border-[#CBD1D7]">
                    <div className="flex items-center space-x-2 text-xs text-[#64707C] mb-1">
                      <FontIcon className="h-3.5 w-3.5 text-[#148ECD]" />
                      <span>Typography</span>
                    </div>
                    <p className="text-xs font-medium text-[#021528] truncate">
                      {result.summary?.fonts?.length > 0 ? result.summary.fonts.join(", ") : "System Standard"}
                    </p>
                  </div>
                </div>

                {/* Detected Colors */}
                {result.summary?.colors?.length > 0 && (
                  <div className="mb-6">
                    <span className="text-xs font-mono text-[#64707C] block mb-2 flex items-center gap-1.5">
                      <Palette className="h-3.5 w-3.5 text-[#148ECD]" /> Extracted Hex Palette (Click to Copy):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {result.summary.colors.map((hex, i) => (
                        <button
                          key={i}
                          onClick={() => copyColor(hex)}
                          className="flex items-center space-x-2 bg-[#F2F4F5] hover:bg-[#E5E8EB] px-2.5 py-1 rounded-lg border border-[#CBD1D7] text-xs font-mono transition-colors"
                          title="Click to copy hex color"
                        >
                          <span
                            className="h-3.5 w-3.5 rounded-full border border-[#CBD1D7] shadow-sm"
                            style={{ backgroundColor: hex }}
                          />
                          <span className="text-[#021528]">{copiedColor === hex ? "Copied!" : hex}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Download Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={result.downloadUrl}
                    className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#12A150] hover:bg-[#0E8140] text-white font-bold text-sm transition-all shadow"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Theme (.zip)</span>
                  </a>

                  <a
                    href={result.jsonDownloadUrl}
                    className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#F2F4F5] hover:bg-[#E5E8EB] text-[#021528] font-semibold text-sm transition-all border border-[#CBD1D7]"
                  >
                    <FileJson className="h-4 w-4 text-[#0A69C9]" />
                    <span>Download Raw JSON</span>
                  </a>
                </div>
              </div>

              {/* DIRECT WORDPRESS INTEGRATION & INSTANT DEPLOYMENT CARD */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#CBD1D7] text-[#021528] space-y-4">
                <div className="flex items-center justify-between border-b border-[#CBD1D7]/60 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-lg bg-[#0A69C9]/15 flex items-center justify-center text-[#0A69C9]">
                      <Send className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#021528]">Push Directly to Any WordPress Site</h4>
                      <p className="text-[11px] text-[#64707C] font-mono">Connect any site via Novamira MCP, AI Converter Plugin, or REST API</p>
                    </div>
                  </div>
                  <a
                    href="/ai-converter-connector.zip"
                    download="ai-converter-connector.zip"
                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-[#12A150]/15 text-[#12A150] hover:bg-[#12A150]/25 font-bold border border-[#12A150]/30 transition-all flex items-center space-x-1"
                    title="Download plugin zip for installation on any WordPress site"
                  >
                    <Download className="h-3 w-3" />
                    <span>Download Plugin (.zip)</span>
                  </a>
                </div>

                {/* TARGET WORDPRESS SITE SELECTOR & INPUT (MULTI-SITE) */}
                <div className="space-y-2 bg-[#F2F4F5] p-3.5 rounded-xl border border-[#CBD1D7] font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <label className="block text-[#021528] font-bold">Target WordPress Site URL:</label>
                    <button
                      type="button"
                      onClick={handleSaveCurrentSite}
                      className="text-[10px] text-[#0A69C9] hover:underline font-bold"
                    >
                      + Save to Site Favorites
                    </button>
                  </div>
                  <input
                    type="url"
                    placeholder="https://your-wordpress-site.com"
                    value={wpConfig.site_url}
                    onChange={(e) => handleSiteUrlChange(e.target.value)}
                    className="w-full bg-white border border-[#CBD1D7] rounded-lg p-2.5 text-[#021528] focus:outline-none focus:border-[#0A69C9] font-mono font-bold"
                  />

                  {/* Saved Sites Switcher Buttons */}
                  {savedSites.length > 0 && (
                    <div className="flex items-center space-x-1.5 pt-1 overflow-x-auto no-scrollbar">
                      <span className="text-[10px] text-[#64707C] font-bold shrink-0">Quick Switch:</span>
                      {savedSites.map((site, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectSavedSite(site)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold truncate max-w-[140px] transition-all ${
                            wpConfig.site_url === site.url
                              ? "bg-[#0A69C9] text-white"
                              : "bg-white text-[#64707C] hover:text-[#021528] border border-[#CBD1D7]"
                          }`}
                        >
                          {site.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Integration Mode Switcher */}
                <div className="grid grid-cols-2 gap-1 p-1 bg-[#F2F4F5] rounded-xl border border-[#CBD1D7] text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setWpAuthMode("mcp_oauth")}
                    className={`py-2 px-3 rounded-lg font-bold transition-all flex items-center justify-center space-x-1.5 ${
                      wpAuthMode === "mcp_oauth"
                        ? "bg-[#0A69C9] text-white shadow"
                        : "text-[#64707C] hover:text-[#021528]"
                    }`}
                  >
                    <Globe className="h-3.5 w-3.5" />
                    <span>Novamira MCP (OAuth)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWpAuthMode("basic")}
                    className={`py-2 px-3 rounded-lg font-bold transition-all flex items-center justify-center space-x-1.5 ${
                      wpAuthMode === "basic"
                        ? "bg-[#0A69C9] text-white shadow"
                        : "text-[#64707C] hover:text-[#021528]"
                    }`}
                  >
                    <Key className="h-3.5 w-3.5" />
                    <span>Basic Auth (App Password)</span>
                  </button>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {wpAuthMode === "mcp_oauth" ? (
                    /* NOVAMIRA REMOTE MCP OAUTH CONNECTOR MODE */
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[#64707C] mb-1 font-bold">Novamira MCP Server Endpoint:</label>
                        <input
                          type="url"
                          placeholder="https://your-wordpress-site.com/wp-json/mcp/novamira-oauth"
                          value={mcpConfig.server_url}
                          onChange={(e) => setMcpConfig((prev) => ({ ...prev, server_url: e.target.value }))}
                          className="w-full bg-[#F2F4F5] border border-[#CBD1D7] rounded-lg p-2.5 text-[#021528] focus:outline-none focus:border-[#0A69C9]"
                        />
                      </div>

                      {/* OAuth Status / Sign-in Action */}
                      <div className="pt-1">
                        {mcpConfig.access_token ? (
                          <div className="p-3 rounded-lg bg-[#12A150]/15 border border-[#12A150]/30 text-[#12A150] font-bold flex items-center justify-between">
                            <span className="flex items-center space-x-2">
                              <CheckCircle2 className="h-4 w-4" />
                              <span>OAuth Authenticated with Target Site</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                try {
                                  localStorage.removeItem("mcp_access_token");
                                } catch (e) {}
                                setMcpConfig((prev) => ({ ...prev, access_token: "" }));
                                setMcpAuthStatus(null);
                              }}
                              className="text-[10px] underline hover:text-[#DB1439]"
                            >
                              Disconnect
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={handleInitiateMcpAuth}
                            disabled={mcpAuthStatus?.loading}
                            className="w-full py-2.5 rounded-lg bg-[#010B14] hover:bg-[#021528] text-white font-bold transition-all border border-[#148ECD]/40 flex items-center justify-center space-x-2 shadow"
                          >
                            {mcpAuthStatus?.loading ? (
                              <Loader2 className="h-4 w-4 animate-spin text-[#148ECD]" />
                            ) : (
                              <Globe className="h-4 w-4 text-[#148ECD]" />
                            )}
                            <span>Sign In with Target WordPress Site (OAuth)</span>
                          </button>
                        )}
                      </div>

                      {mcpAuthStatus && (
                        <div className={`p-2.5 rounded-lg text-xs font-mono border ${
                          mcpAuthStatus.success ? "bg-[#12A150]/15 text-[#12A150] border-[#12A150]/30" : mcpAuthStatus.pending ? "bg-[#0A69C9]/15 text-[#0A69C9] border-[#0A69C9]/30" : "bg-[#DB1439]/15 text-[#DB1439] border-[#DB1439]/30"
                        }`}>
                          {mcpAuthStatus.success ? mcpAuthStatus.message : mcpAuthStatus.pending ? mcpAuthStatus.message : mcpAuthStatus.error}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* STANDARD WP REST API (APPLICATION PASSWORD) MODE */
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[#64707C] mb-1 font-bold">WP Username:</label>
                          <input
                            type="text"
                            placeholder="admin"
                            value={wpConfig.username}
                            onChange={(e) => setWpConfig((prev) => ({ ...prev, username: e.target.value }))}
                            className="w-full bg-[#F2F4F5] border border-[#CBD1D7] rounded-lg p-2.5 text-[#021528] focus:outline-none focus:border-[#0A69C9]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#64707C] mb-1 font-bold flex items-center justify-between">
                            <span>Application Password:</span>
                            <Key className="h-3 w-3 text-[#0A69C9]" />
                          </label>
                          <input
                            type="password"
                            placeholder="abcd efgh ijkl mnop"
                            value={wpConfig.application_password}
                            onChange={(e) => setWpConfig((prev) => ({ ...prev, application_password: e.target.value }))}
                            className="w-full bg-[#F2F4F5] border border-[#CBD1D7] rounded-lg p-2.5 text-[#021528] focus:outline-none focus:border-[#0A69C9]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Target Page Title & Status (Shared) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="block text-[#64707C] mb-1 font-bold">Page Title:</label>
                      <input
                        type="text"
                        placeholder={result.title || "Home Page"}
                        value={wpConfig.page_title}
                        onChange={(e) => setWpConfig((prev) => ({ ...prev, page_title: e.target.value }))}
                        className="w-full bg-[#F2F4F5] border border-[#CBD1D7] rounded-lg p-2.5 text-[#021528] focus:outline-none focus:border-[#0A69C9]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#64707C] mb-1 font-bold">Page Status:</label>
                      <select
                        value={wpConfig.page_status}
                        onChange={(e) => setWpConfig((prev) => ({ ...prev, page_status: e.target.value }))}
                        className="w-full bg-[#F2F4F5] border border-[#CBD1D7] rounded-lg p-2.5 text-[#021528] focus:outline-none focus:border-[#0A69C9]"
                      >
                        <option value="publish">Publish Immediately</option>
                        <option value="draft">Save as Draft</option>
                      </select>
                    </div>
                  </div>

                  {/* Deploy Action Button */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                    {wpAuthMode === "basic" && (
                      <button
                        type="button"
                        onClick={handleTestWpConnection}
                        disabled={wpConnStatus?.loading}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[#F2F4F5] hover:bg-[#E5E8EB] text-[#021528] font-bold border border-[#CBD1D7] transition-all flex items-center justify-center space-x-1.5"
                      >
                        {wpConnStatus?.loading ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-[#0A69C9]" />
                        ) : (
                          <Link2 className="h-3.5 w-3.5 text-[#0A69C9]" />
                        )}
                        <span>Test WP Connection</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={wpAuthMode === "mcp_oauth" ? handleDeployViaMcp : handleDeployToWordPress}
                      disabled={wpDeployStatus?.loading}
                      className="flex-1 w-full py-2.5 rounded-lg bg-[#0A69C9] hover:bg-[#0854A1] text-white font-bold transition-all shadow flex items-center justify-center space-x-2"
                    >
                      {wpDeployStatus?.loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                          <span>Pushing Elementor Page to WordPress...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>{wpAuthMode === "mcp_oauth" ? "Push via Novamira MCP" : "Push Directly to WordPress"}</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Test Connection Banner */}
                  {wpAuthMode === "basic" && wpConnStatus && !wpConnStatus.loading && (
                    <div className={`p-3 rounded-lg text-xs font-mono border ${wpConnStatus.success ? "bg-[#12A150]/15 text-[#12A150] border-[#12A150]/30" : "bg-[#DB1439]/15 text-[#DB1439] border-[#DB1439]/30"}`}>
                      {wpConnStatus.success ? wpConnStatus.message : wpConnStatus.error}
                    </div>
                  )}

                  {/* Deployment Success Banner & Direct Links */}
                  {wpDeployStatus && !wpDeployStatus.loading && (
                    <div className={`p-4 rounded-xl space-y-2 border ${wpDeployStatus.success ? "bg-[#12A150]/15 border-[#12A150]/40 text-[#021528]" : "bg-[#DB1439]/15 border-[#DB1439]/40 text-[#DB1439]"}`}>
                      {wpDeployStatus.success ? (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-[#12A150] font-bold">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Successfully Published to WordPress!</span>
                          </div>
                          <p className="text-xs text-[#64707C]">
                            Page <strong>"{wpDeployStatus.data.pageTitle}"</strong> (ID #{wpDeployStatus.data.pageId}) was created with {wpDeployStatus.data.elementorSectionsCount} Elementor containers attached.
                          </p>

                          <div className="flex flex-wrap items-center gap-2 pt-1">
                            <a
                              href={wpDeployStatus.data.pageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-[#12A150] hover:bg-[#0E8140] text-white font-bold flex items-center space-x-1.5 shadow"
                            >
                              <span>View Live WP Page</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                            <a
                              href={wpDeployStatus.data.editUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-[#0A69C9] hover:bg-[#0854A1] text-white font-bold flex items-center space-x-1.5 shadow"
                            >
                              <span>Open in Elementor Editor</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start space-x-2 text-[#DB1439]">
                          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                          <span>{wpDeployStatus.error}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Elementor JSON Tree Inspector */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#CBD1D7] text-[#021528] space-y-4">
                <div className="flex items-center justify-between border-b border-[#CBD1D7]/60 pb-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#64707C] flex items-center gap-2">
                    <FileCode className="h-4 w-4 text-[#0A69C9]" />
                    Elementor Template JSON Previews
                  </h4>
                  <button
                    onClick={() => copyToClipboard(result.templates, "all_templates")}
                    className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#F2F4F5] hover:bg-[#E5E8EB] text-xs font-mono text-[#0A69C9] border border-[#CBD1D7] transition-all"
                  >
                    {copiedKey === "all_templates" ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#12A150]" />
                        <span className="text-[#12A150] font-bold">Copied Complete JSON!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Complete JSON</span>
                      </>
                    )}
                  </button>
                </div>

                {["header", "content", "footer"].map((sectionKey) => {
                  const sectionData = result.templates?.[sectionKey] || [];
                  const isOpen = openSections[sectionKey];

                  return (
                    <div
                      key={sectionKey}
                      className="border border-[#CBD1D7] rounded-xl overflow-hidden bg-[#F2F4F5]"
                    >
                      {/* Accordion Header */}
                      <div
                        onClick={() => toggleSection(sectionKey)}
                        className="p-3 bg-white flex items-center justify-between cursor-pointer hover:bg-[#F2F4F5] transition-colors border-b border-[#CBD1D7]/40"
                      >
                        <div className="flex items-center space-x-2">
                          <FileCode className="h-4 w-4 text-[#0A69C9]" />
                          <span className="text-sm font-bold capitalize text-[#021528]">
                            {sectionKey} Template ({Array.isArray(sectionData) ? sectionData.length : 1} node)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(sectionData, sectionKey);
                            }}
                            className="p-1 rounded hover:bg-[#E5E8EB] text-[#64707C] hover:text-[#021528]"
                            title="Copy JSON"
                          >
                            {copiedKey === sectionKey ? (
                              <Check className="h-3.5 w-3.5 text-[#12A150]" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4 text-[#64707C]" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-[#64707C]" />
                          )}
                        </div>
                      </div>

                      {/* Accordion Body */}
                      {isOpen && (
                        <div className="p-4 bg-[#010B14] max-h-64 overflow-y-auto font-mono text-xs text-[#148ECD]">
                          <pre className="whitespace-pre-wrap">{JSON.stringify(sectionData, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty State Instructions */}
          {!isLoading && !result && !errorList && (
            <div className="bg-white rounded-2xl p-8 text-center border border-[#CBD1D7] shadow-sm text-[#021528]">
              <div className="h-12 w-12 rounded-2xl bg-[#F2F4F5] border border-[#CBD1D7] flex items-center justify-center mx-auto mb-4 text-[#0A69C9]">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-[#021528] mb-1">Ready for Conversion</h3>
              <p className="text-xs text-[#64707C] leading-relaxed font-mono">
                Choose an input format on the left (Files Bundle, System Folder, Bundle HTML, Image, PDF, or JSON) and click "Convert to Elementor Theme Package".
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FULL-WIDTH LIVE VISUAL SITE REPLICA SECTION (AT THE BOTTOM) */}
      {result && !isLoading && (
        <div className="w-full pt-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#CBD1D7] space-y-6 text-[#021528]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#CBD1D7]/60 pb-4 gap-3">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-[#0A69C9]/15 border border-[#0A69C9]/30 flex items-center justify-center text-[#0A69C9] shrink-0">
                  <Monitor className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-[#021528] tracking-wide flex items-center gap-2">
                    FULL-WIDTH LIVE SITE REPLICA
                  </h2>
                  <p className="text-xs text-[#64707C] font-mono mt-0.5">
                    Real-time visual rendering of all {result.summary?.section_count || 1} generated Elementor containers and widgets
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#12A150]/15 text-[#12A150] border border-[#12A150]/30 font-bold">
                  100% Desktop Viewport
                </span>
              </div>
            </div>

            {/* Full Width Visual Replica Canvas */}
            <LiveVisualPreview templates={result.templates} title={result.title} />
          </div>
        </div>
      )}
    </div>
  );
}
