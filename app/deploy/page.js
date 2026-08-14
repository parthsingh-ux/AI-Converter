"use client";

import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Badge from "@/components/Badge";
import {
  Rocket,
  Globe,
  Send,
  Key,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Download,
  ExternalLink,
  ChevronDown,
  Layers,
  Palette,
  FileCode,
  Lock,
  Database,
  Trash2,
  Plus,
  RefreshCw,
  Server,
  ShieldCheck,
  Check,
  Copy,
} from "lucide-react";

export default function PageDeployment() {
  // Converted Themes Dropdown & Selection State
  const [historyThemes, setHistoryThemes] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [selectedThemeId, setSelectedThemeId] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(null);

  // Saved MongoDB Connections State
  const [savedConnections, setSavedConnections] = useState([]);
  const [loadingConnections, setLoadingConnections] = useState(true);
  const [selectedConnectionId, setSelectedConnectionId] = useState("");

  // Connection Form State (Zero hardcoded credentials)
  const [wpAuthMode, setWpAuthMode] = useState("mcp_oauth"); // "mcp_oauth" or "basic"
  const [connForm, setConnForm] = useState({
    name: "",
    site_url: "",
    username: "",
    application_password: "",
    mcp_server_url: "",
    save_to_mongodb: true,
    save_password: false,
  });

  // MCP OAuth Specific State
  const [mcpConfig, setMcpConfig] = useState({
    access_token: "",
    connector_name: "novamira-mcp-connector",
  });
  const [mcpAuthStatus, setMcpAuthStatus] = useState(null);

  // Deploy Target Settings
  const [deployConfig, setDeployConfig] = useState({
    page_title: "",
    page_slug: "",
    page_status: "publish",
  });

  // Action Statuses
  const [connTestStatus, setConnTestStatus] = useState(null);
  const [deployStatus, setDeployStatus] = useState(null);
  const [saveConnStatus, setSaveConnStatus] = useState(null);

  // Load Converted Themes from MongoDB / History API
  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const res = await fetch("/api/history");
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.conversions)) {
        setHistoryThemes(data.conversions);
        if (data.conversions.length > 0 && !selectedThemeId) {
          setSelectedThemeId(data.conversions[0].id);
          setSelectedTheme(data.conversions[0]);
        }
      }
    } catch (e) {
      console.warn("Failed to fetch history:", e);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Load Saved Site Connections from MongoDB
  const fetchConnections = async () => {
    setLoadingConnections(true);
    try {
      const res = await fetch("/api/wordpress/credentials");
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.connections)) {
        setSavedConnections(data.connections);
        if (data.connections.length > 0 && !selectedConnectionId) {
          handleSelectConnection(data.connections[0]);
        }
      }
    } catch (e) {
      console.warn("Failed to fetch connections:", e);
    } finally {
      setLoadingConnections(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    fetchConnections();
  }, []);

  // When dropdown selection changes, update selectedTheme
  const handleThemeChange = (id) => {
    setSelectedThemeId(id);
    const theme = historyThemes.find((t) => t.id === id);
    if (theme) {
      setSelectedTheme(theme);
      setDeployConfig((prev) => ({
        ...prev,
        page_title: theme.title || "",
      }));
    }
  };

  // When saved site profile selected, populate form
  const handleSelectConnection = (conn) => {
    if (!conn) return;
    setSelectedConnectionId(conn.id);
    setWpAuthMode(conn.auth_mode || "mcp_oauth");
    setConnForm({
      name: conn.name || "",
      site_url: conn.site_url || "",
      username: conn.username || "",
      application_password: conn.application_password || "",
      mcp_server_url: conn.mcp_server_url || `${conn.site_url}/wp-json/mcp/novamira-oauth`,
      save_to_mongodb: true,
      save_password: Boolean(conn.application_password),
    });
  };

  // Clear connection form for new site entry
  const handleNewConnection = () => {
    setSelectedConnectionId("");
    setConnForm({
      name: "",
      site_url: "",
      username: "",
      application_password: "",
      mcp_server_url: "",
      save_to_mongodb: true,
      save_password: false,
    });
    setConnTestStatus(null);
    setSaveConnStatus(null);
  };

  // Auto-sync MCP server endpoint when site URL changes
  const handleSiteUrlChange = (url) => {
    setConnForm((prev) => ({
      ...prev,
      site_url: url,
      mcp_server_url: url ? `${url.replace(/\/$/, "")}/wp-json/mcp/novamira-oauth` : "",
    }));
  };

  // Save current connection profile to MongoDB
  const handleSaveConnectionToDb = async () => {
    if (!connForm.site_url) {
      setSaveConnStatus({ loading: false, success: false, error: "Please enter your WordPress Site URL." });
      return;
    }

    setSaveConnStatus({ loading: true });
    try {
      const res = await fetch("/api/wordpress/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedConnectionId || undefined,
          name: connForm.name || connForm.site_url,
          site_url: connForm.site_url,
          auth_mode: wpAuthMode,
          username: connForm.username,
          application_password: connForm.save_password ? connForm.application_password : "",
          mcp_server_url: connForm.mcp_server_url,
          save_password: connForm.save_password,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSaveConnStatus({ loading: false, success: true, message: "Site connection saved to MongoDB database!" });
        fetchConnections();
      } else {
        setSaveConnStatus({ loading: false, success: false, error: data.error || "Failed to save connection." });
      }
    } catch (err) {
      setSaveConnStatus({ loading: false, success: false, error: err.message });
    }
  };

  // Delete saved connection profile from MongoDB
  const handleDeleteConnection = async (id, e) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this saved site connection from MongoDB?")) return;

    try {
      const res = await fetch(`/api/wordpress/credentials?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchConnections();
        if (selectedConnectionId === id) {
          handleNewConnection();
        }
      }
    } catch (err) {
      console.warn("Delete connection failed:", err);
    }
  };

  // Test WP Basic Auth Connection
  const handleTestConnection = async () => {
    if (!connForm.site_url) {
      setConnTestStatus({ loading: false, success: false, error: "Please enter your WordPress Site URL." });
      return;
    }
    setConnTestStatus({ loading: true });
    try {
      const res = await fetch("/api/wordpress/test-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site_url: connForm.site_url,
          username: connForm.username,
          application_password: connForm.application_password,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setConnTestStatus({ loading: false, success: true, message: `Connected as ${data.userName || connForm.username} (${data.siteUrl || connForm.site_url})` });
      } else {
        setConnTestStatus({ loading: false, success: false, error: data.error || "Connection failed." });
      }
    } catch (err) {
      setConnTestStatus({ loading: false, success: false, error: err.message });
    }
  };

  // Initiate Novamira MCP OAuth flow
  const handleInitiateMcpAuth = async () => {
    if (!connForm.mcp_server_url) {
      setMcpAuthStatus({ loading: false, success: false, error: "Please enter your Novamira MCP Server URL." });
      return;
    }
    setMcpAuthStatus({ loading: true });
    try {
      const res = await fetch("/api/wordpress/mcp-auth/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ server_url: connForm.mcp_server_url, connector_name: mcpConfig.connector_name }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.authorizeUrl) {
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        window.open(data.authorizeUrl, "novamira_mcp_oauth", `width=${width},height=${height},top=${top},left=${left},scrollbars=yes`);
        setMcpAuthStatus({ loading: false, pending: true, message: "Opening WordPress sign-in window. Please approve authorization..." });
      } else {
        setMcpAuthStatus({ loading: false, success: false, error: data.error || "Failed to initiate OAuth." });
      }
    } catch (err) {
      setMcpAuthStatus({ loading: false, success: false, error: err.message });
    }
  };

  // Deploy Selected Converted Theme to WordPress
  const handleDeployToWordPress = async () => {
    if (!selectedTheme || (!selectedTheme.templates && !selectedTheme.rawExportJson)) {
      setDeployStatus({ loading: false, success: false, error: "Please select a converted theme from the dropdown selector above." });
      return;
    }
    if (!connForm.site_url) {
      setDeployStatus({ loading: false, success: false, error: "Please enter your target WordPress Site URL." });
      return;
    }

    setDeployStatus({ loading: true });
    try {
      const templatesPayload = selectedTheme.templates || {
        content: selectedTheme.rawExportJson?.content || [],
      };

      let res;
      if (wpAuthMode === "mcp_oauth" && mcpConfig.access_token) {
        res = await fetch("/api/wordpress/mcp-deploy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            server_url: connForm.mcp_server_url,
            access_token: mcpConfig.access_token,
            page_title: deployConfig.page_title || selectedTheme.title || "AI Converted Page",
            page_slug: deployConfig.page_slug || "",
            page_status: deployConfig.page_status || "publish",
            templates: templatesPayload,
          }),
        });
      } else {
        res = await fetch("/api/wordpress/deploy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            site_url: connForm.site_url,
            username: connForm.username,
            application_password: connForm.application_password,
            page_title: deployConfig.page_title || selectedTheme.title || "AI Converted Page",
            page_slug: deployConfig.page_slug || "",
            page_status: deployConfig.page_status || "publish",
            templates: templatesPayload,
          }),
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        setDeployStatus({ loading: false, success: true, data });
        // Optionally save connection profile if save_to_mongodb is checked
        if (connForm.save_to_mongodb) {
          handleSaveConnectionToDb();
        }
      } else {
        setDeployStatus({ loading: false, success: false, error: data.error || "Page deployment failed." });
      }
    } catch (err) {
      setDeployStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#010B14] p-4 sm:p-8 space-y-8 max-w-6xl mx-auto font-sans">
      {/* HEADER TITLE BANNER */}
      <div className="bg-[#021528] rounded-2xl p-6 border border-[#148ECD]/30 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-2xl bg-[#0A69C9] flex items-center justify-center text-white font-bold shrink-0 shadow">
            <Rocket className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Page Deployment Manager
            </h1>
            <p className="text-xs text-[#97A3AF] font-mono mt-0.5">
              Select converted themes from history & deploy directly to any WordPress site
            </p>
          </div>
        </div>

        <a
          href="/ai-converter-connector.zip"
          download="ai-converter-connector.zip"
          className="px-3.5 py-2 rounded-xl text-xs font-mono bg-[#12A150]/15 text-[#12A150] hover:bg-[#12A150]/25 font-bold border border-[#12A150]/30 transition-all flex items-center space-x-1.5 shrink-0"
          title="Download plugin zip for installation on any WordPress site"
        >
          <Download className="h-4 w-4" />
          <span>Download Connector Plugin (.zip)</span>
        </a>
      </div>

      {/* SECTION 1: CONVERTED THEME DROPDOWN SELECTOR */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#CBD1D7] text-[#021528] space-y-6">
        <div className="flex items-center justify-between border-b border-[#CBD1D7]/60 pb-3">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-[#0A69C9]/15 flex items-center justify-center text-[#0A69C9]">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#021528]">1. Select Converted Theme from History</h2>
              <p className="text-xs text-[#64707C] font-mono">Pick any converted layout stored in MongoDB or History</p>
            </div>
          </div>

          <button
            onClick={fetchHistory}
            disabled={loadingHistory}
            className="p-2 rounded-lg bg-[#F2F4F5] hover:bg-[#E5E8EB] text-[#64707C] hover:text-[#021528] transition-colors border border-[#CBD1D7]"
            title="Refresh Converted Themes List"
          >
            <RefreshCw className={`h-4 w-4 ${loadingHistory ? "animate-spin text-[#0A69C9]" : ""}`} />
          </button>
        </div>

        {loadingHistory ? (
          <div className="p-8 text-center font-mono text-xs text-[#64707C] flex items-center justify-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin text-[#0A69C9]" />
            <span>Loading converted themes from database...</span>
          </div>
        ) : historyThemes.length === 0 ? (
          <div className="p-6 bg-[#F2F4F5] rounded-xl border border-[#CBD1D7] text-center font-mono text-xs text-[#64707C]">
            No converted themes found in history yet. Convert a design on the Dashboard first!
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold text-[#021528] mb-1.5">
                Choose Converted Theme / Page:
              </label>
              <select
                value={selectedThemeId}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="w-full bg-[#F2F4F5] border border-[#CBD1D7] rounded-xl p-3 text-sm font-mono font-bold text-[#021528] focus:outline-none focus:border-[#0A69C9]"
              >
                {historyThemes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.title} &bull; {theme.summary?.section_count || 1} Containers &bull; ({new Date(theme.createdAt || theme.timestamp).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </div>

            {/* SELECTED THEME SUMMARY CARD */}
            {selectedTheme && (
              <div className="bg-[#F2F4F5] rounded-xl p-4 border border-[#CBD1D7] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#0A69C9]">
                    Selected Theme Details:
                  </span>
                  <span className="text-[11px] font-mono text-[#64707C]">
                    ID: {selectedTheme.id}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-[#CBD1D7]">
                    <span className="text-[#64707C] block text-[10px]">Title:</span>
                    <strong className="text-[#021528] truncate block">{selectedTheme.title}</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-[#CBD1D7]">
                    <span className="text-[#64707C] block text-[10px]">Sections Count:</span>
                    <strong className="text-[#12A150]">{selectedTheme.summary?.section_count || 1} Flex Containers</strong>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-[#CBD1D7]">
                    <span className="text-[#64707C] block text-[10px]">Typography:</span>
                    <strong className="text-[#021528] truncate block">
                      {selectedTheme.summary?.fonts?.length > 0 ? selectedTheme.summary.fonts.join(", ") : "System Standard"}
                    </strong>
                  </div>
                </div>

                {/* Hex Palette Preview */}
                {selectedTheme.summary?.colors?.length > 0 && (
                  <div className="flex items-center space-x-2 pt-1 font-mono text-xs">
                    <span className="text-[#64707C] text-[11px]">Hex Palette:</span>
                    <div className="flex items-center space-x-1.5">
                      {selectedTheme.summary.colors.map((hex, i) => (
                        <span
                          key={i}
                          className="h-4 w-4 rounded-full border border-[#CBD1D7] shadow-sm"
                          style={{ backgroundColor: hex }}
                          title={hex}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* SECTION 2: TARGET WORDPRESS CONNECTION MANAGER */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#CBD1D7] text-[#021528] space-y-6">
        <div className="flex items-center justify-between border-b border-[#CBD1D7]/60 pb-3">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-[#0A69C9]/15 flex items-center justify-center text-[#0A69C9]">
              <Server className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#021528]">2. Target WordPress Site Connection</h2>
              <p className="text-xs text-[#64707C] font-mono">Connect target site via Novamira MCP or Basic Auth</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNewConnection}
            className="px-3 py-1.5 rounded-lg bg-[#0A69C9] text-white hover:bg-[#0854A1] text-xs font-mono font-bold transition-all shadow flex items-center space-x-1"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Site Profile</span>
          </button>
        </div>

        {/* SAVED MONGODB SITE PROFILES PICKER */}
        {savedConnections.length > 0 && (
          <div className="bg-[#F2F4F5] p-3.5 rounded-xl border border-[#CBD1D7] font-mono text-xs space-y-2">
            <span className="text-[#021528] font-bold block">Saved Site Profiles in MongoDB:</span>
            <div className="flex flex-wrap gap-2">
              {savedConnections.map((conn) => (
                <div
                  key={conn.id}
                  onClick={() => handleSelectConnection(conn)}
                  className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer flex items-center space-x-2 transition-all ${
                    selectedConnectionId === conn.id
                      ? "bg-[#0A69C9] text-white border-[#0A69C9] font-bold shadow"
                      : "bg-white text-[#021528] border-[#CBD1D7] hover:border-[#0A69C9]"
                  }`}
                >
                  <Globe className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate max-w-[160px]">{conn.name || conn.site_url}</span>
                  <button
                    type="button"
                    onClick={(e) => handleDeleteConnection(conn.id, e)}
                    className="p-0.5 rounded hover:bg-black/10 text-current opacity-70 hover:opacity-100 ml-1"
                    title="Delete connection from MongoDB"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONNECTION FORM */}
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#021528] font-bold mb-1">Site Profile Name:</label>
              <input
                type="text"
                placeholder="e.g. Staging Server"
                value={connForm.name}
                onChange={(e) => setConnForm((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full bg-[#F2F4F5] border border-[#CBD1D7] rounded-lg p-2.5 text-[#021528] focus:outline-none focus:border-[#0A69C9] font-bold"
              />
            </div>

            <div>
              <label className="block text-[#021528] font-bold mb-1">WordPress Site URL:</label>
              <input
                type="url"
                placeholder="https://your-wordpress-site.com"
                value={connForm.site_url}
                onChange={(e) => handleSiteUrlChange(e.target.value)}
                className="w-full bg-[#F2F4F5] border border-[#CBD1D7] rounded-lg p-2.5 text-[#021528] focus:outline-none focus:border-[#0A69C9] font-bold"
              />
            </div>
          </div>

          {/* INTEGRATION MODE SWITCHER */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-[#F2F4F5] rounded-xl border border-[#CBD1D7]">
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

          {/* AUTH SPECIFIC INPUTS */}
          {wpAuthMode === "mcp_oauth" ? (
            <div className="space-y-3 bg-[#F2F4F5] p-4 rounded-xl border border-[#CBD1D7]">
              <div>
                <label className="block text-[#64707C] mb-1 font-bold">Novamira MCP Server Endpoint:</label>
                <input
                  type="url"
                  placeholder="https://your-wordpress-site.com/wp-json/mcp/novamira-oauth"
                  value={connForm.mcp_server_url}
                  onChange={(e) => setConnForm((prev) => ({ ...prev, mcp_server_url: e.target.value }))}
                  className="w-full bg-white border border-[#CBD1D7] rounded-lg p-2.5 text-[#021528] focus:outline-none focus:border-[#0A69C9] font-bold"
                />
              </div>

              {mcpConfig.access_token ? (
                <div className="p-3 rounded-lg bg-[#12A150]/15 border border-[#12A150]/30 text-[#12A150] font-bold flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>OAuth Authenticated with Target Site</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setMcpConfig((prev) => ({ ...prev, access_token: "" }))}
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

              {mcpAuthStatus && (
                <div className={`p-2.5 rounded-lg text-xs border ${
                  mcpAuthStatus.success ? "bg-[#12A150]/15 text-[#12A150] border-[#12A150]/30" : "bg-[#DB1439]/15 text-[#DB1439] border-[#DB1439]/30"
                }`}>
                  {mcpAuthStatus.message || mcpAuthStatus.error}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3 bg-[#F2F4F5] p-4 rounded-xl border border-[#CBD1D7]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#64707C] mb-1 font-bold">WP Username:</label>
                  <input
                    type="text"
                    placeholder="e.g. admin"
                    value={connForm.username}
                    onChange={(e) => setConnForm((prev) => ({ ...prev, username: e.target.value }))}
                    className="w-full bg-white border border-[#CBD1D7] rounded-lg p-2.5 text-[#021528] focus:outline-none focus:border-[#0A69C9] font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[#64707C] mb-1 font-bold flex items-center justify-between">
                    <span>Application Password:</span>
                    <Lock className="h-3 w-3 text-[#0A69C9]" />
                  </label>
                  <input
                    type="password"
                    placeholder="abcd efgh ijkl mnop"
                    value={connForm.application_password}
                    onChange={(e) => setConnForm((prev) => ({ ...prev, application_password: e.target.value }))}
                    className="w-full bg-white border border-[#CBD1D7] rounded-lg p-2.5 text-[#021528] focus:outline-none focus:border-[#0A69C9] font-bold"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={connTestStatus?.loading}
                  className="px-4 py-2 rounded-lg bg-white hover:bg-[#E5E8EB] text-[#021528] font-bold border border-[#CBD1D7] transition-all flex items-center space-x-1.5"
                >
                  {connTestStatus?.loading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-[#0A69C9]" />
                  ) : (
                    <ShieldCheck className="h-3.5 w-3.5 text-[#0A69C9]" />
                  )}
                  <span>Test WP Connection</span>
                </button>
              </div>

              {connTestStatus && (
                <div className={`p-2.5 rounded-lg text-xs border ${
                  connTestStatus.success ? "bg-[#12A150]/15 text-[#12A150] border-[#12A150]/30" : "bg-[#DB1439]/15 text-[#DB1439] border-[#DB1439]/30"
                }`}>
                  {connTestStatus.message || connTestStatus.error}
                </div>
              )}
            </div>
          )}

          {/* SECURITY & MONGODB STORAGE OPTIONS */}
          <div className="bg-[#010B14] p-4 rounded-xl text-white space-y-2 border border-[#4B545D]/40">
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-[#148ECD]" />
              <span className="font-bold text-white">MongoDB Security Options:</span>
            </div>

            <div className="space-y-2 pt-1">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={connForm.save_to_mongodb}
                  onChange={(e) => setConnForm((prev) => ({ ...prev, save_to_mongodb: e.target.checked }))}
                  className="h-4 w-4 rounded accent-[#0A69C9] cursor-pointer"
                />
                <span className="text-[#97A3AF]">Save site connection profile to MongoDB database</span>
              </label>

              {wpAuthMode === "basic" && (
                <label className="flex items-center space-x-2.5 cursor-pointer pl-6">
                  <input
                    type="checkbox"
                    checked={connForm.save_password}
                    onChange={(e) => setConnForm((prev) => ({ ...prev, save_password: e.target.checked }))}
                    className="h-4 w-4 rounded accent-[#0A69C9] cursor-pointer"
                  />
                  <span className="text-[#97A3AF]">
                    Save application password in MongoDB database <em className="text-[#64707C]">(Optional)</em>
                  </span>
                </label>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleSaveConnectionToDb}
                disabled={saveConnStatus?.loading}
                className="px-4 py-2 rounded-lg bg-[#0A69C9] hover:bg-[#0854A1] text-white font-bold transition-all shadow flex items-center space-x-1.5"
              >
                {saveConnStatus?.loading ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Database className="h-3.5 w-3.5" />
                )}
                <span>Save Site Profile to MongoDB</span>
              </button>
            </div>

            {saveConnStatus && (
              <div className={`p-2.5 rounded-lg text-xs border ${
                saveConnStatus.success ? "bg-[#12A150]/20 text-[#12A150] border-[#12A150]/30" : "bg-[#DB1439]/20 text-[#DB1439] border-[#DB1439]/30"
              }`}>
                {saveConnStatus.message || saveConnStatus.error}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 3: PAGE DEPLOYMENT TARGET SETTINGS & LAUNCH ACTION */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#CBD1D7] text-[#021528] space-y-6">
        <div className="flex items-center justify-between border-b border-[#CBD1D7]/60 pb-3">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-[#12A150]/15 flex items-center justify-center text-[#12A150]">
              <Send className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#021528]">3. Deploy Page to WordPress</h2>
              <p className="text-xs text-[#64707C] font-mono">Set target page title, slug, and launch deployment</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-[#021528] font-bold mb-1">Target Page Title:</label>
              <input
                type="text"
                placeholder={selectedTheme?.title || "AI Generated Page"}
                value={deployConfig.page_title}
                onChange={(e) => setDeployConfig((prev) => ({ ...prev, page_title: e.target.value }))}
                className="w-full bg-[#F2F4F5] border border-[#CBD1D7] rounded-lg p-2.5 text-[#021528] focus:outline-none focus:border-[#0A69C9] font-bold"
              />
            </div>

            <div>
              <label className="block text-[#021528] font-bold mb-1">Page Status:</label>
              <select
                value={deployConfig.page_status}
                onChange={(e) => setDeployConfig((prev) => ({ ...prev, page_status: e.target.value }))}
                className="w-full bg-[#F2F4F5] border border-[#CBD1D7] rounded-lg p-2.5 text-[#021528] focus:outline-none focus:border-[#0A69C9] font-bold"
              >
                <option value="publish">Publish Immediately</option>
                <option value="draft">Save as Draft</option>
              </select>
            </div>
          </div>

          {/* DEPLOY ACTION BUTTON */}
          <Button
            onClick={handleDeployToWordPress}
            isLoading={deployStatus?.loading}
            fullWidth
            size="lg"
            color="primary"
            variant="solid"
            className="py-4 font-extrabold text-white bg-gradient-to-r from-[#0A69C9] via-[#148ECD] to-[#0A69C9] hover:opacity-95 shadow-xl transition-all scale-[1.01] hover:scale-[1.02] border border-white/20 rounded-xl"
          >
            <div className="flex items-center justify-center space-x-2 font-mono">
              <Send className="h-5 w-5 text-white" />
              <span className="text-base font-extrabold tracking-wide">
                {deployStatus?.loading ? "DEPLOYING PAGE TO WORDPRESS..." : "DEPLOY CONVERTED THEME TO WORDPRESS"}
              </span>
            </div>
          </Button>

          {/* DEPLOYMENT SUCCESS / ERROR BANNER */}
          {deployStatus && !deployStatus.loading && (
            <div className={`p-5 rounded-xl space-y-3 border ${
              deployStatus.success
                ? "bg-[#12A150]/15 border-[#12A150]/40 text-[#021528]"
                : "bg-[#DB1439]/15 border-[#DB1439]/40 text-[#DB1439]"
            }`}>
              {deployStatus.success ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-[#12A150] font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Successfully Deployed to WordPress!</span>
                  </div>
                  <p className="text-xs text-[#64707C] leading-relaxed">
                    Page <strong>"{deployStatus.data.pageTitle || deployConfig.page_title}"</strong> (ID #{deployStatus.data.pageId || deployStatus.data.id}) was successfully published with native Elementor Flex Containers.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {deployStatus.data.pageUrl && (
                      <a
                        href={deployStatus.data.pageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#12A150] hover:bg-[#0E8140] text-white font-bold flex items-center space-x-2 shadow transition-all"
                      >
                        <span>View Live WP Page</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}

                    {deployStatus.data.editUrl && (
                      <a
                        href={deployStatus.data.editUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-[#0A69C9] hover:bg-[#0854A1] text-white font-bold flex items-center space-x-2 shadow transition-all"
                      >
                        <span>Open in Elementor Editor</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-start space-x-2 text-[#DB1439]">
                  <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                  <span className="font-bold">{deployStatus.error}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
