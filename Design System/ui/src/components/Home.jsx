"use client";
import React, { useState, useMemo } from "react";
import ColorGrid from "./ColorGrid";

function Section({ title, description, right, children }) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2
            className="text-lg sm:text-xl font-semibold tracking-tight"
            style={{ color: "var(--color-layout-foreground)" }}
          >
            {title}
          </h2>

          {description && (
            <p
              className="mt-1 max-w-prose text-xs sm:text-sm"
              style={{ color: "var(--color-content-content3)" }}
            >
              {description}
            </p>
          )}
        </div>

        {right}
      </div>

      {children}
    </section>
  );
}

/* -----------------------------------------
   DATA
--------------------------------------------*/

const componentsList = [
  { name: "Accordion" },
  { name: "Alerts" },
  { name: "Avatar" },
  { name: "Avatar Group" },
  { name: "Badge" },
  { name: "Breadcrumb" },
  { name: "Button" },
  { name: "Button Group" },
  { name: "Calendar and Date Picker" },
  { name: "Card" },
  { name: "Carousal" },
  { name: "Checkbox" },
  { name: "Checkbox Group" },
  { name: "Chip" },
  { name: "Circular Progress" },
  { name: "Code" },
  { name: "Divider" },
  { name: "Dropdown" },
  { name: "Forms" },
  { name: "Input OTP" },
  { name: "Input and Text Field" },
  { name: "Link" },
  { name: "Modals" },
  { name: "Navigation and Header" },
  { name: "Number Input" },
  { name: "Pagination" },
  { name: "Progress" },
  { name: "Radio" },
  { name: "Select" },
  { name: "Skeleton" },
  { name: "Sliders" },
  { name: "Spinner" },
  { name: "Switch" },
  { name: "Table" },
  { name: "Tabs" },
  { name: "Tag" },
  { name: "Time Input" },
  { name: "Toast" },
  { name: "Tool-tip" },
  { name: "Users" },
];

function toSlug(name) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getInitials(name) {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function ComponentCard({ name }) {
  const href = `/${toSlug(name)}`;
  const initials = getInitials(name);
  const slug = toSlug(name);
  const imagePath = `/preview/${slug}.png`;

  return (
    <a
      href={href}
      className="group block rounded-lg transition-all shadow-sm"
      style={{
        border: "1px solid var(--color-gray-default-200)",
        background: "var(--color-primary-900-dark)",
      }}
    >
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3">
          {/* INITIAL BOX */}
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors"
            style={{
              background: "var(--color-primary-200)",
              color: "var(--color-primary-500)",
            }}
          >
            {initials}
          </div>

          {/* TEXT */}
          <div className="min-w-0 flex-1">
            <p
              className="truncate text-sm font-medium"
              style={{ color: "var(--color-layout-foreground)" }}
            >
              {name}
            </p>
            <p
              className="truncate text-[11px]"
              style={{ color: "var(--color-content-content3)" }}
            >
              View component docs
            </p>
          </div>
        </div>

        {/* IMAGE */}
        <div
          className="mt-2 flex h-24 items-center justify-center overflow-hidden rounded-lg"
          style={{
            border: "1px solid var(--color-gray-default-200)",
            background: "var(--color-gray-default-400)",
          }}
        >
          <img
            src={imagePath}
            alt={`Preview of ${name} component`}
            className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
          />
        </div>
      </div>
    </a>
  );
}



function ComponentsGallery() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return componentsList;
    const q = query.toLowerCase();
    return componentsList.filter((item) => item.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components..."
            className="h-10 w-full rounded-lg pl-9 pr-3 text-sm outline-none ring-0"
            style={{
              background: "var(--color-content-content1)",
              color: "var(--color-layout-foreground)",
              border: "1px solid var(--color-gray-default-200)",
            }}
          />
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs"
            style={{ color: "var(--color-content-content4)" }}
          >
            🔍
          </span>
        </div>

        <p className="text-xs" style={{ color: "var(--color-content-content3)" }}>
          {filtered.length} component{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((item) => (
          <ComponentCard key={item.name} name={item.name} />
        ))}
      </div>
    </div>
  );
}



export default function DesignSystemHome() {
  return (
    <div
      className=" rounded-2xl"
      // style={{
      //   background: "var(--color-layout-background)",
      // }}
    >
      <main
        className="px-6 py-6"
        style={{ color: "var(--color-layout-foreground)" }}
      >
        <div className="mx-auto flex flex-col gap-8">
          {/* HEADER */}
          <header
            className="rounded-lg px-6 py-6"
            style={{
              border: "1px solid var(--color-gray-default-200)",
              background: "var(--color-content-content1)",
              boxShadow: "0 0 0 1px var(--color-gray-default-200)",
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  Design System
                </h1>

                <p
                  className="max-w-xl text-xs sm:text-sm"
                  style={{ color: "var(--color-content-content3)" }}
                >
                  A unified collection of reusable tokens and UI components that
                  ensures visual consistency and developer velocity across all
                  interfaces.
                </p>
              </div>

              <div
                className="flex items-center gap-3 text-xs"
                style={{ color: "var(--color-content-content3)" }}
              >
                <span
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1"
                  style={{
                    border: "1px solid var(--gray-300)",
                    background: "var(--color-content-content2)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--color-success)" }}
                  />
                  v1.0 · Internal
                </span>
              </div>
            </div>
          </header>

          {/* COLOR TOKENS */}
          <section
            className="rounded-lg p-6 space-y-5"
            style={{
              border: "1px solid var(--color-gray-default-200)",
              background: "var(--color-content-content1)",
            }}
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
                  Color tokens
                </h2>

                <p
                  className="mt-1 max-w-prose text-xs sm:text-sm"
                  style={{ color: "var(--color-content-content3)" }}
                >
                  Foundation palette for light and dark modes. Aligned by family
                  and shade to keep implementation predictable.
                </p>
              </div>

              <div className="flex gap-2 text-[11px]">
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1"
                  style={{
                    border: "1px solid var(--color-gray-default-200)",
                    background: "var(--color-content-content2)",
                    color: "var(--color-layout-foreground)",
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: "var(--color-warning)" }}
                  />
                  Light
                </span>

                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1"
                  style={{
                    border: "1px solid var(--color-gray-default-200)",
                    background: "var(--color-content-content2)",
                    color: "var(--color-layout-foreground)",
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: "var(--color-primary)" }}
                  />
                  Dark
                </span>
              </div>
            </div>

            <ColorGrid />
          </section>

          {/* COMPONENTS */}
          <section
            className="rounded-lg p-6"
            style={{
              border: "1px solid var(--color-gray-default-200)",
              background: "var( --color-content-content1)",
            }}
          >
            <Section
              title="Components Library"
              description="Browse all available UI components. Click a card to open the component page."
            >
              <ComponentsGallery />
            </Section>
          </section>
        </div>
      </main>
    </div>
  );
}




// <Section
//   title="Color Tokens"
//   description="Base semantic colors used throughout the system."
// >
//   <TokenGrid />
// </Section>

//         function ColorSwatch({ name, color, hex }) {

//   const bgColor = hex || color;

//   return (
//     <div className="space-y-2 group">
//       <div
//         role="img"
//         aria-label={`${name} color swatch ${bgColor}`}
//         className="h-12 w-full sm:h-14 md:h-16 lg:h-14 lg:w-14 rounded-xl border border-gray-200 shadow-sm transition-transform transform group-hover:-translate-y-0.5"
//         style={{ backgroundColor: bgColor }}
//       />
//       <div className="text-xs font-medium text-gray-800 truncate">{name}</div>
//       <div className="text-[10px] text-gray-500 font-mono truncate">

//         <span className="font-semibold text-gray-700">{hex}</span>

//         <div className="text-[10px] text-gray-400 truncate">{color}</div>
//       </div>
//     </div>
//   );
// }

// function TokenGrid() {
//   const tokenGroups = [
//     {
//       title: "Layout",
//       tokens: [
//         { name: "Layout Background", color: "var(--color-layout-background)", hex: "#F2F4F9" },
//         { name: "Layout Foreground", color: "var(--color-layout-foreground)", hex: "#021528" },
//         { name: "Layout Divider", color: "var(--color-layout-divider)", hex: "#111" },
//         { name: "Layout Focus", color: "var(--color-layout-focus)", hex: "#0A69C9" },
//       ],
//       panelBg: "bg-white",
//     },
//     {
//       title: "Content",
//       tokens: [
//         { name: "Content1 (White)", color: "var(--color-content-content1)", hex: "#FFFFFF" },
//         { name: "Content2", color: "var(--color-content-content2)", hex: "#E5E8Eb" },
//         { name: "Content3", color: "var(--color-content-content3)", hex: "#97A3AF" },
//         { name: "Content4", color: "var(--color-content-content4)", hex: "#B1BAC3" },
//       ],
//       panelBg: "bg-gray-50",
//     },
//     {
//       title: "Base",
//       tokens: [
//         { name: "Default", color: "var(--color-default)", hex: "#B1BAC3" },
//         { name: "Primary", color: "var(--color-primary)", hex: "#0A69C9" },
//         { name: "Secondary", color: "var(--color-secondary)", hex: "#148ECD" },
//         { name: "Success", color: "var(--color-success)", hex: "#12A150" },
//         { name: "Warning", color: "var(--color-warning)", hex: "#DB8700" },
//         { name: "Danger", color: "var(--color-danger)", hex: "#DB1439" },
//       ],
//       panelBg: "bg-white",
//     },
//     {
//       title: "Gray Scale",
//       tokens: [
//         { name: "Gray 50", color: "var(--color-gray-default-50)", hex: "#F2F4F5" },
//         { name: "Gray 100", color: "var(--color-gray-default-100)", hex: "#E5E8EB" },
//         { name: "Gray 200", color: "var(--color-gray-default-200)", hex: "#CBD1D7" },
//         { name: "Gray 300", color: "var(--color-gray-default-300)", hex: "#B1BAC3" },
//         { name: "Gray 400", color: "var(--color-gray-default-400)", hex: "#97A3AF" },
//         { name: "Gray 500", color: "var(--color-gray-default-500)", hex: "#7D8C98" },
//         { name: "Gray 600", color: "var(--color-gray-default-600)", hex: "#64707C" },
//         { name: "Gray 700", color: "var(--color-gray-default-700)", hex: "#4B545D" },
//         { name: "Gray 800", color: "var(--color-gray-default-800)", hex: "#32383E" },
//         { name: "Gray 900", color: "var(--color-gray-default-900)", hex: "#191C1F" },
//       ],
//       panelBg: "bg-gray-50",
//     },
//     {
//       title: "Primary Scale",
//       tokens: [
//         { name: "Primary 50", color: "var(--color-primary-50)", hex: "#E4EEFA" },
//         { name: "Primary 100", color: "var(--color-primary-100)", hex: "#CCDFF4" },
//         { name: "Primary 200", color: "var(--color-primary-200)", hex: "#9BC2E9" },
//         { name: "Primary 300", color: "var(--color-primary-300)", hex: "#6BA4DF" },
//         { name: "Primary 400", color: "var(--color-primary-400)", hex: "#3A87D4" },
//         { name: "Primary 500", color: "var(--color-primary-500)", hex: "#0A69C9" },
//         { name: "Primary 600", color: "var(--color-primary-600)", hex: "#0854A1" },
//         { name: "Primary 700", color: "var(--color-primary-700)", hex: "#063F79" },
//         { name: "Primary 800", color: "var(--color-primary-800)", hex: "#042A50" },
//         { name: "Primary 900", color: "var(--color-primary-900)", hex: "#021528" },
//       ],
//       panelBg: "bg-white",
//     },
//     {
//       title: "Secondary Scale",
//       tokens: [
//         { name: "Secondary 50", color: "var(--color-secondary-50)", hex: "#E8F4FA" },
//         { name: "Secondary 100", color: "var(--color-secondary-100)", hex: "#D0E8F5" },
//         { name: "Secondary 200", color: "var(--color-secondary-200)", hex: "#A1D2EB" },
//         { name: "Secondary 300", color: "var(--color-secondary-300)", hex: "#72BBE1" },
//         { name: "Secondary 400", color: "var(--color-secondary-400)", hex: "#43A5D7" },
//         { name: "Secondary 500", color: "var(--color-secondary-500)", hex: "#148ECD" },
//         { name: "Secondary 600", color: "var(--color-secondary-600)", hex: "#1072A4" },
//         { name: "Secondary 700", color: "var(--color-secondary-700)", hex: "#0C557B" },
//         { name: "Secondary 800", color: "var(--color-secondary-800)", hex: "#083952" },
//         { name: "Secondary 900", color: "var(--color-secondary-900)", hex: "#041C29" },
//       ],
//       panelBg: "bg-gray-50",
//     },
//     {
//       title: "Success Scale",
//       tokens: [
//         { name: "Success 50", color: "var(--color-success-50)", hex: "#E7F6EE" },
//         { name: "Success 100", color: "var(--color-success-100)", hex: "#D0ECDC" },
//         { name: "Success 200", color: "var(--color-success-200)", hex: "#A0D9B9" },
//         { name: "Success 300", color: "var(--color-success-300)", hex: "#71C796" },
//         { name: "Success 400", color: "var(--color-success-400)", hex: "#41B473" },
//         { name: "Success 500", color: "var(--color-success-500)", hex: "#12A150" },
//         { name: "Success 600", color: "var(--color-success-600)", hex: "#0E8140" },
//         { name: "Success 700", color: "var(--color-success-700)", hex: "#0B6130" },
//         { name: "Success 800", color: "var(--color-success-800)", hex: "#074020" },
//         { name: "Success 900", color: "var(--color-success-900)", hex: "#042010" },
//       ],
//       panelBg: "bg-white",
//     },
//     {
//       title: "Warning Scale",
//       tokens: [
//         { name: "Warning 50", color: "var(--color-warning-50)", hex: "#FBF3E6" },
//         { name: "Warning 100", color: "var(--color-warning-100)", hex: "#F8E7CC" },
//         { name: "Warning 200", color: "var(--color-warning-200)", hex: "#F1CF99" },
//         { name: "Warning 300", color: "var(--color-warning-300)", hex: "#E9B766" },
//         { name: "Warning 400", color: "var(--color-warning-400)", hex: "#E29F33" },
//         { name: "Warning 500", color: "var(--color-warning-500)", hex: "#DB8700" },
//         { name: "Warning 600", color: "var(--color-warning-600)", hex: "#AF6C00" },
//         { name: "Warning 700", color: "var(--color-warning-700)", hex: "#835100" },
//         { name: "Warning 800", color: "var(--color-warning-800)", hex: "#583600" },
//         { name: "Warning 900", color: "var(--color-warning-900)", hex: "#2C1B00" },
//       ],
//       panelBg: "bg-gray-50",
//     },
//     {
//       title: "Danger Scale",
//       tokens: [
//         { name: "Danger 50", color: "var(--color-danger-50)", hex: "#FBE8EB" },
//         { name: "Danger 100", color: "var(--color-danger-100)", hex: "#F8D0D7" },
//         { name: "Danger 200", color: "var(--color-danger-200)", hex: "#F1A1B0" },
//         { name: "Danger 300", color: "var(--color-danger-300)", hex: "#E97288" },
//         { name: "Danger 400", color: "var(--color-danger-400)", hex: "#E24361" },
//         { name: "Danger 500", color: "var(--color-danger-500)", hex: "#DB1439" },
//         { name: "Danger 600", color: "var(--color-danger-600)", hex: "#AF102E" },
//         { name: "Danger 700", color: "var(--color-danger-700)", hex: "#830C22" },
//         { name: "Danger 800", color: "var(--color-danger-800)", hex: "#580817" },
//         { name: "Danger 900", color: "var(--color-danger-900)", hex: "#2C040B" },
//       ],
//       panelBg: "bg-white",
//     },
//   ];

//   const [showAllGroups, setShowAllGroups] = useState(false);

//   const initiallyVisible = new Set(["Layout", "Base"]);
//   function isGroupVisible(title) {
//     if (showAllGroups) return true;
//     return initiallyVisible.has(title);
//   }

//   function renderGroup(group, isPairedRow = false) {
//     const tokensToShow = group.tokens;

//     const gridColsClass = isPairedRow
//       ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
//       : "grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-10";

//     return (
//       <div key={group.title} className="w-full">
//         <div className="flex items-start justify-between mb-4">
//           <div>
//             <h2 className="text-lg md:text-xl font-semibold text-gray-900">
//               {group.title}
//             </h2>
//             <p className="text-xs text-gray-500 mt-1 hidden sm:block">
//               {group.tokens.length} tokens
//             </p>
//           </div>
//           <div className="sm:hidden text-xs text-gray-500 mt-1">
//             {group.tokens.length} tokens
//           </div>
//         </div>

//         <div
//           className={cn(
//             "p-4 rounded-2xl border transition-shadow hover:shadow-md",
//             group.panelBg || "bg-gray-50",
//             "border-gray-100"
//           )}
//         >
//           <div className={cn("grid gap-3", gridColsClass)}>
//             {tokensToShow.map((t) => (
//               <div key={t.name} className="min-w-0">
//                 {/* Passed the hex value to the ColorSwatch component */}
//                 <ColorSwatch name={t.name} color={t.color} hex={t.hex} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const layoutGroup = tokenGroups.find((g) => g.title === "Layout");
//   const baseGroup = tokenGroups.find((g) => g.title === "Base");
//   const otherGroups = tokenGroups.filter(
//     (g) => g.title !== "Layout" && g.title !== "Base"
//   );

//   return (
//     <div id="token-groups" className="space-y-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {isGroupVisible("Layout") &&
//           layoutGroup &&
//           renderGroup(layoutGroup, true)}
//         {isGroupVisible("Base") && baseGroup && renderGroup(baseGroup, true)}
//       </div>

//       {otherGroups.map((group) => {
//         if (!isGroupVisible(group.title)) return null;
//         return <div key={group.title}>{renderGroup(group)}</div>;
//       })}

//       <div className="flex justify-center mt-2">
//         <Button
//           variant="outline"
//           onClick={() => setShowAllGroups((s) => !s)}
//           aria-expanded={showAllGroups}
//           aria-controls="token-groups"
//         >
//           {showAllGroups ? "Show fewer categories" : "View more colors"}
//         </Button>
//       </div>
//     </div>
//   );
// }

// function Button({
//   variant = "solid",
//   size = "md",
//   className,
//   children,
//   ...props
// }) {
//   const base =
//     "inline-flex items-center justify-center rounded-2xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";
//   const sizes = {
//     sm: "h-8 px-3 text-sm",
//     md: "h-10 px-4 text-sm",
//     lg: "h-11 px-5 text-base",
//   };
//   const variants = {
//     solid:
//       "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600",
//     outline:
//       "border border-gray-200 text-gray-800 bg-white hover:bg-gray-50 focus-visible:ring-blue-600",
//     ghost:
//       "bg-transparent text-gray-700 hover:bg-gray-100 focus-visible:ring-blue-600",
//   };

//   return (
//     <button
//       className={cn(base, sizes[size], variants[variant], className)}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// }
