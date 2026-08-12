"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Printer,
  Layers,
  Zap,
  Code2,
  Globe,
  Cpu,
  CheckCircle2,
  Folder,
  Send,
  BookOpen,
  ArrowLeft,
  Key,
  ShieldCheck,
  Package,
} from "lucide-react";

export default function DocumentationPage() {
  const contentRef = useRef(null);

  const handleDownloadPdf = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="space-y-8 font-sans max-w-6xl mx-auto pb-16 print:p-0 print:m-0 print:max-w-full">
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          aside, header, nav, button, .no-print {
            display: none !important;
          }
          body, main {
            background: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
          .print-full {
            width: 100% !important;
            max-width: 100% !important;
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      {/* Top Header Card */}
      <div className="bg-[#021528] rounded-2xl p-6 sm:p-8 text-white shadow-lg border border-[#148ECD]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 print:bg-white print:text-black print:border-b print:rounded-none">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-[#010B14] hover:bg-[#191C1F] text-[#97A3AF] hover:text-white transition-colors border border-[#4B545D]/40 no-print"
              title="Back to Dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="h-10 w-10 rounded-xl bg-[#0A69C9] flex items-center justify-center shadow">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white print:text-black">
                AI Converter — Architecture & Deployment Documentation
              </h1>
              <p className="text-xs text-[#97A3AF] font-mono print:text-gray-600">
                Complete Roadmap, System Structure, Component Mapping & Operating Manual
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 no-print">
          <button
            onClick={handleDownloadPdf}
            className="px-5 py-2.5 rounded-xl bg-[#0A69C9] hover:bg-[#0854A1] text-white font-bold text-xs font-mono transition-all shadow-lg flex items-center space-x-2"
          >
            <Printer className="h-4 w-4" />
            <span>Download / Print PDF</span>
          </button>
        </div>
      </div>

      {/* Main Documentation Body */}
      <div ref={contentRef} className="space-y-8 print-full">
        {/* SECTION 1: SYSTEM ROADMAP & ARCHITECTURE OVERVIEW */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#CBD1D7] text-[#021528] space-y-6">
          <div className="border-b border-[#CBD1D7]/60 pb-4">
            <h2 className="text-xl font-bold text-[#021528] flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#0A69C9]" />
              1. System Architecture & High-Level Roadmap
            </h2>
            <p className="text-xs text-[#64707C] font-mono mt-1">
              End-to-end data pipeline from raw design inputs to native Elementor flex containers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#F2F4F5] p-4 rounded-xl border border-[#CBD1D7] space-y-2">
              <div className="flex items-center space-x-2 text-[#0A69C9] font-bold text-xs font-mono">
                <span className="h-6 w-6 rounded-full bg-[#0A69C9]/15 flex items-center justify-center text-[#0A69C9]">1</span>
                <span>Input Ingestion</span>
              </div>
              <p className="text-xs text-[#64707C] leading-relaxed">
                Accepts raw HTML code, multi-file web packages (HTML/CSS/JS/images), system folder structures, and design mockups (Images & PDFs).
              </p>
            </div>

            <div className="bg-[#F2F4F5] p-4 rounded-xl border border-[#CBD1D7] space-y-2">
              <div className="flex items-center space-x-2 text-[#0A69C9] font-bold text-xs font-mono">
                <span className="h-6 w-6 rounded-full bg-[#0A69C9]/15 flex items-center justify-center text-[#0A69C9]">2</span>
                <span>AI Layout Engine</span>
              </div>
              <p className="text-xs text-[#64707C] leading-relaxed">
                Google Gemini 3.6 Flash analyzes layout hierarchy, typography, colors, responsiveness, and flex container structures.
              </p>
            </div>

            <div className="bg-[#F2F4F5] p-4 rounded-xl border border-[#CBD1D7] space-y-2">
              <div className="flex items-center space-x-2 text-[#0A69C9] font-bold text-xs font-mono">
                <span className="h-6 w-6 rounded-full bg-[#0A69C9]/15 flex items-center justify-center text-[#0A69C9]">3</span>
                <span>Elementor Schema</span>
              </div>
              <p className="text-xs text-[#64707C] leading-relaxed">
                Constructs Elementor v0.4 Flex Container JSON nodes (<code className="bg-[#E5E8EB] px-1 rounded">elType: container</code>) for header, content, and footer templates.
              </p>
            </div>

            <div className="bg-[#F2F4F5] p-4 rounded-xl border border-[#CBD1D7] space-y-2">
              <div className="flex items-center space-x-2 text-[#12A150] font-bold text-xs font-mono">
                <span className="h-6 w-6 rounded-full bg-[#12A150]/15 flex items-center justify-center text-[#12A150]">4</span>
                <span>WordPress Deploy</span>
              </div>
              <p className="text-xs text-[#64707C] leading-relaxed">
                Pushes page layout & post meta (<code className="bg-[#E5E8EB] px-1 rounded">_elementor_data</code>) to WordPress via Novamira MCP OAuth or AI Converter Plugin.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: FILE STRUCTURE & COMPONENT MAP */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#CBD1D7] text-[#021528] space-y-6">
          <div className="border-b border-[#CBD1D7]/60 pb-4">
            <h2 className="text-xl font-bold text-[#021528] flex items-center gap-2">
              <Folder className="h-5 w-5 text-[#0A69C9]" />
              2. Codebase Directory Structure & File Map
            </h2>
            <p className="text-xs text-[#64707C] font-mono mt-1">
              Detailed list of files, module roles, and architectural responsibilities
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="bg-[#021528] text-white p-4 rounded-xl border border-[#CBD1D7] overflow-x-auto">
              <pre className="text-xs leading-relaxed text-[#97A3AF]">
{`AI Converter Project Root/
├── app/
│   ├── layout.js                 # Global Root App Shell (Sidebar, Header, Nav)
│   ├── page.js                   # Main Converter Dashboard UI & Deployment Controls
│   ├── docs/
│   │   └── page.js               # Interactive & Printable Documentation Page (This View)
│   ├── history/
│   │   └── page.js               # Saved Conversion History Log
│   └── api/
│       ├── convert/
│       │   └── route.js          # Ingestion API (HTML/Files/Folder/Image to Elementor JSON)
│       ├── wordpress/
│       │   ├── deploy/route.js   # Direct REST Plugin Deployment Route
│       │   ├── test-connection/  # Connection Health Check
│       │   ├── mcp-deploy/       # Novamira MCP Bearer Token Deployment Route
│       │   └── mcp-auth/
│       │       ├── initiate/     # OAuth 2.0 PKCE Initiator Endpoint
│       │       └── callback/     # OAuth Authorization Code Exchange Callback
├── lib/
│   ├── geminiClient.js           # Google Gemini API Layout Converter Engine
│   ├── wordpressClient.js        # WordPress REST API Integration Client
│   ├── mcpClient.js              # Novamira Remote MCP OAuth (RFC 7591) & JSON-RPC Client
│   ├── packageTheme.js           # Theme ZIP Archive & Elementor JSON Exporter
│   ├── systemPrompt.js           # Elementor Flex Container Schema System Prompts
│   └── validateElementor.js      # Elementor JSON Node Structure Validator
├── tmp_plugin/
│   └── ai-converter-connector/
│       └── ai-converter-connector.php # Custom WordPress Bridge Plugin
└── ai-converter-connector.zip    # Pre-packaged WordPress Plugin Zip Archive`}
              </pre>
            </div>
          </div>
        </div>

        {/* SECTION 3: HOW EACH MODULE WORKS */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#CBD1D7] text-[#021528] space-y-6">
          <div className="border-b border-[#CBD1D7]/60 pb-4">
            <h2 className="text-xl font-bold text-[#021528] flex items-center gap-2">
              <Cpu className="h-5 w-5 text-[#0A69C9]" />
              3. Deep Dive: How Core Modules Function
            </h2>
            <p className="text-xs text-[#64707C] font-mono mt-1">
              Internal operation details of conversion, schemas, OAuth, and WordPress endpoints
            </p>
          </div>

          <div className="space-y-6">
            {/* Module 1 */}
            <div className="border border-[#CBD1D7] rounded-xl p-5 bg-[#F2F4F5] space-y-3">
              <h3 className="font-bold text-sm text-[#021528] flex items-center gap-2">
                <Code2 className="h-4 w-4 text-[#0A69C9]" />
                A. AI Conversion Engine (<code className="text-[#0A69C9]">lib/geminiClient.js</code> & <code className="text-[#0A69C9]">lib/systemPrompt.js</code>)
              </h3>
              <ul className="list-disc pl-5 text-xs text-[#64707C] space-y-1.5 leading-relaxed">
                <li>Extracts DOM nodes, inline styles, CSS rules, typography, and media assets from raw input.</li>
                <li>Pipes layout representations to <strong>Gemini 3.6 Flash</strong> with precise JSON system prompts.</li>
                <li>Generates native Elementor Flex Container JSON (<code className="bg-white px-1 rounded border">elType: "container"</code>, <code className="bg-white px-1 rounded border">isInner: false</code>) with flexbox rules (<code className="bg-white px-1 rounded border">flex_direction: "row" | "column"</code>, <code className="bg-white px-1 rounded border">justify_content</code>, <code className="bg-white px-1 rounded border">align_items</code>).</li>
                <li>Sanitizes and validates JSON outputs via <code className="bg-white px-1 rounded border">lib/validateElementor.js</code>.</li>
              </ul>
            </div>

            {/* Module 2 */}
            <div className="border border-[#CBD1D7] rounded-xl p-5 bg-[#F2F4F5] space-y-3">
              <h3 className="font-bold text-sm text-[#021528] flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#148ECD]" />
                B. Novamira Remote MCP OAuth Flow (<code className="text-[#148ECD]">lib/mcpClient.js</code>)
              </h3>
              <ul className="list-disc pl-5 text-xs text-[#64707C] space-y-1.5 leading-relaxed">
                <li><strong>Discovery Metadata</strong>: Fetches <code className="bg-white px-1 rounded border">/.well-known/oauth-authorization-server</code> to resolve token and authorization endpoints.</li>
                <li><strong>Dynamic Client Registration (RFC 7591)</strong>: Automatically registers the connector name (<code className="bg-white px-1 rounded border">novamira-mcp-adaantest3-c</code>) at <code className="bg-white px-1 rounded border">/wp-json/novamira/v1/oauth/register</code> to receive a valid dynamic <code className="bg-white px-1 rounded border">client_id</code>.</li>
                <li><strong>PKCE Authorization Code Flow</strong>: Generates SHA256 code challenge (<code className="bg-white px-1 rounded border">S256</code>) and code verifier for secure browser authorization.</li>
                <li><strong>Token Storage & Persistence</strong>: Exchanges authorization code for Bearer access token and persists token in <code className="bg-white px-1 rounded border">localStorage</code>.</li>
              </ul>
            </div>

            {/* Module 3 */}
            <div className="border border-[#CBD1D7] rounded-xl p-5 bg-[#F2F4F5] space-y-3">
              <h3 className="font-bold text-sm text-[#021528] flex items-center gap-2">
                <Package className="h-4 w-4 text-[#12A150]" />
                C. WordPress Bridge Plugin (<code className="text-[#12A150]">tmp_plugin/ai-converter-connector/</code>)
              </h3>
              <ul className="list-disc pl-5 text-xs text-[#64707C] space-y-1.5 leading-relaxed">
                <li>Exposes REST endpoints (<code className="bg-white px-1 rounded border">/wp-json/ai-converter/v1/deploy</code>, <code className="bg-white px-1 rounded border">/status</code>) on WordPress.</li>
                <li>Receives Elementor JSON payloads and creates WordPress pages programmatically via <code className="bg-white px-1 rounded border">wp_insert_post()</code>.</li>
                <li>Stores Elementor post meta: <code className="bg-white px-1 rounded border">_elementor_data</code>, <code className="bg-white px-1 rounded border">_elementor_edit_mode = "builder"</code>, <code className="bg-white px-1 rounded border">_elementor_template_type = "wp-page"</code>, and <code className="bg-white px-1 rounded border">_wp_page_template = "elementor_canvas"</code>.</li>
                <li>Bypasses web server Authorization header stripping issue on cPanel/Apache hosts.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* SECTION 4: INTEGRATION PROTOCOLS COMPARISON */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#CBD1D7] text-[#021528] space-y-6">
          <div className="border-b border-[#CBD1D7]/60 pb-4">
            <h2 className="text-xl font-bold text-[#021528] flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#0A69C9]" />
              4. WordPress Deployment Method Matrix
            </h2>
            <p className="text-xs text-[#64707C] font-mono mt-1">
              Comparison of integration methods supported by AI Converter
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#021528] text-white font-mono">
                  <th className="p-3 rounded-tl-lg">Method</th>
                  <th className="p-3">Endpoint Route</th>
                  <th className="p-3">Authentication</th>
                  <th className="p-3">Primary Use Case</th>
                  <th className="p-3 rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CBD1D7] font-mono text-[11px]">
                <tr className="hover:bg-[#F2F4F5]">
                  <td className="p-3 font-bold text-[#0A69C9]">Novamira Remote MCP</td>
                  <td className="p-3">/wp-json/mcp/novamira-oauth</td>
                  <td className="p-3">OAuth 2.0 PKCE (Bearer Token)</td>
                  <td className="p-3">Claude Desktop & MCP Agents</td>
                  <td className="p-3 text-[#12A150] font-bold">Active</td>
                </tr>
                <tr className="hover:bg-[#F2F4F5]">
                  <td className="p-3 font-bold text-[#0A69C9]">AI Converter Plugin</td>
                  <td className="p-3">/wp-json/ai-converter/v1/deploy</td>
                  <td className="p-3">Plugin Bridge / Direct REST</td>
                  <td className="p-3">One-Click Instant UI Deployment</td>
                  <td className="p-3 text-[#12A150] font-bold">Active</td>
                </tr>
                <tr className="hover:bg-[#F2F4F5]">
                  <td className="p-3 font-bold text-[#0A69C9]">WordPress Basic Auth</td>
                  <td className="p-3">/wp-json/wp/v2/pages</td>
                  <td className="p-3">Username + Application Password</td>
                  <td className="p-3">Standard WP Core REST API</td>
                  <td className="p-3 text-[#12A150] font-bold">Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 5: STEP-BY-STEP OPERATING MANUAL */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#CBD1D7] text-[#021528] space-y-6">
          <div className="border-b border-[#CBD1D7]/60 pb-4">
            <h2 className="text-xl font-bold text-[#021528] flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#12A150]" />
              5. Step-by-Step User Operating Guide
            </h2>
            <p className="text-xs text-[#64707C] font-mono mt-1">
              How to convert designs and publish Elementor pages
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-start space-x-3 p-3.5 bg-[#F2F4F5] rounded-xl border border-[#CBD1D7]">
              <span className="h-6 w-6 rounded-full bg-[#0A69C9] text-white flex items-center justify-center font-bold shrink-0">1</span>
              <div>
                <span className="font-bold text-[#021528]">Select Input Type & Provide Content:</span>
                <p className="text-[#64707C] mt-0.5">Navigate to Dashboard (<code className="bg-white px-1 rounded">/</code>) and choose HTML, Multi-Files, Folder, Image, or PDF input.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 bg-[#F2F4F5] rounded-xl border border-[#CBD1D7]">
              <span className="h-6 w-6 rounded-full bg-[#0A69C9] text-white flex items-center justify-center font-bold shrink-0">2</span>
              <div>
                <span className="font-bold text-[#021528]">Execute Conversion:</span>
                <p className="text-[#64707C] mt-0.5">Click "Convert to Elementor Flex Containers". Gemini AI will format layout nodes into Elementor JSON.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 bg-[#F2F4F5] rounded-xl border border-[#CBD1D7]">
              <span className="h-6 w-6 rounded-full bg-[#0A69C9] text-white flex items-center justify-center font-bold shrink-0">3</span>
              <div>
                <span className="font-bold text-[#021528]">Deploy to WordPress Site:</span>
                <p className="text-[#64707C] mt-0.5">In the "Push Directly to WordPress" panel, verify <code className="bg-white px-1 rounded">https://mcp.adaantest3.com</code> and click "Push Directly to WordPress".</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3.5 bg-[#F2F4F5] rounded-xl border border-[#CBD1D7]">
              <span className="h-6 w-6 rounded-full bg-[#12A150] text-white flex items-center justify-center font-bold shrink-0">4</span>
              <div>
                <span className="font-bold text-[#021528]">Edit Live in Elementor:</span>
                <p className="text-[#64707C] mt-0.5">Click "View Live WP Page" or "Open in Elementor Editor" to view and edit your page on WordPress!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Download Button Bar */}
      <div className="bg-[#021528] rounded-2xl p-6 text-white shadow-lg border border-[#148ECD]/30 flex items-center justify-between no-print">
        <div>
          <h3 className="font-bold text-sm text-white">Need a PDF Copy of this Documentation?</h3>
          <p className="text-xs text-[#97A3AF] font-mono">Download or print the entire technical specification and user manual.</p>
        </div>
        <button
          onClick={handleDownloadPdf}
          className="px-5 py-2.5 rounded-xl bg-[#0A69C9] hover:bg-[#0854A1] text-white font-bold text-xs font-mono transition-all shadow-lg flex items-center space-x-2"
        >
          <Printer className="h-4 w-4" />
          <span>Download / Print PDF</span>
        </button>
      </div>
    </div>
  );
}
