"use client";

import React from "react";

const colorFamilies = {
  gray: {
    50: { light: "#F2F4F5", dark: "#191C1F" },
    100: { light: "#E5E8EB", dark: "#32383E" },
    200: { light: "#CBD1D7", dark: "#4B545D" },
    300: { light: "#B1BAC3", dark: "#64707C" },
    400: { light: "#97A3AF", dark: "#7D8C9B" },
    500: { light: "#7D8C98", dark: "#97A3AF" },
    600: { light: "#64707C", dark: "#B1BAC3" },
    700: { light: "#4B545D", dark: "#cbd1d7" },
    800: { light: "#32383E", dark: "#E5E8EB" },
    900: { light: "#191C1F", dark: "#F2F4F5" },
  },

  primary: {
    50: { light: "#E4EEFA", dark: "#021528" },
    100: { light: "#CCDFF4", dark: "#042A50" },
    200: { light: "#9BC2E9", dark: "#063F79" },
    300: { light: "#6BA4DF", dark: "#0854A1" },
    400: { light: "#3A87D4", dark: "#0A69C9" },
    500: { light: "#0A69C9", dark: "#3A87D4" },
    600: { light: "#0854A1", dark: "#6BA4DF" },
    700: { light: "#063F79", dark: "#9BC2E9" },
    800: { light: "#042A50", dark: "#CCDFF4" },
    900: { light: "#021528", dark: "#E4EEFA" },
  },

  secondary: {
    50: { light: "#E8F4FA", dark: "#041C29" },
    100: { light: "#D0E8F5", dark: "#083952" },
    200: { light: "#A1D2EB", dark: "#0C557B" },
    300: { light: "#72BBE1", dark: "#1072A4" },
    400: { light: "#43A5D7", dark: "#148ECD" },
    500: { light: "#148ECD", dark: "#43A5D7" },
    600: { light: "#1072A4", dark: "#72BBE1" },
    700: { light: "#0C557B", dark: "#A1D2EB" },
    800: { light: "#083952", dark: "#D0E8F5" },
    900: { light: "#041C29", dark: "#E8F4FA" },
  },

  success: {
    50: { light: "#E7F6EE", dark: "#042010" },
    100: { light: "#D0ECDC", dark: "#074020" },
    200: { light: "#A0D9B9", dark: "#0B6130" },
    300: { light: "#71C796", dark: "#0E8140" },
    400: { light: "#41B473", dark: "#12A150" },
    500: { light: "#12A150", dark: "#41B473" },
    600: { light: "#0E8140", dark: "#71C796" },
    700: { light: "#0B6130", dark: "#A0D9B9" },
    800: { light: "#074020", dark: "#D0ECDC" },
    900: { light: "#042010", dark: "#E7F6EE" },
  },

  warning: {
    50: { light: "#FBF3E6", dark: "#2C1B00" },
    100: { light: "#F8E7CC", dark: "#583600" },
    200: { light: "#F1CF99", dark: "#835100" },
    300: { light: "#E9B766", dark: "#AF6C00" },
    400: { light: "#E29F33", dark: "#DB8700" },
    500: { light: "#DB8700", dark: "#E29F33" },
    600: { light: "#AF6C00", dark: "#E9B766" },
    700: { light: "#835100", dark: "#F1CF99" },
    800: { light: "#583600", dark: "#F8E7CC" },
    900: { light: "#2C1B00", dark: "#FBF3E6" },
  },

  danger: {
    50: { light: "#FBE8EB", dark: "#2C040B" },
    100: { light: "#F8D0D7", dark: "#580817" },
    200: { light: "#F1A1B0", dark: "#830C22" },
    300: { light: "#E97288", dark: "#AF102E" },
    400: { light: "#E24361", dark: "#DB1439" },
    500: { light: "#DB1439", dark: "#E24361" },
    600: { light: "#AF102E", dark: "#E97288" },
    700: { light: "#830C22", dark: "#F1A1B0" },
    800: { light: "#580817", dark: "#F8D0D7" },
    900: { light: "#2C040B", dark: "#FBE8EB" },
  },
};

export default function ColorPaletteGrid() {
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
  const families = Object.keys(colorFamilies);

  const Grid = ({ mode }) => (
    <div
      className="overflow-auto rounded-lg p-4"
      style={{
        backgroundColor: "var(--color-primary-900-dark)",
        border: "1px solid var(--color-primary-700-dark)",
        boxShadow: "0 0 0 1px var(--color-primary-800-dark)",
      }}
    >
      <div className="relative">
        {/* dotted background using blue tones */}
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background:
              "radial-gradient(circle at 1px 1px, var(--color-primary-600-dark) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />

        <div className="relative">
          <table
            className="border-collapse min-w-max mx-auto text-xs"
            style={{ color: "var(--color-primary-200-dark)" }}
          >
            <thead>
              <tr>
                <th
                  className="w-10 align-bottom pr-2 text-[11px] font-medium"
                  style={{ color: "var(--color-primary-400-dark)" }}
                >
                  shade
                </th>

                {families.map((family) => (
                  <th
                    key={family}
                    className="px-3 pb-3 pt-6 align-bottom text-[11px] font-semibold"
                    style={{ color: "var(--color-primary-200-dark)" }}
                  >
                    <div className="origin-bottom-left -rotate-45 whitespace-nowrap">
                      {family}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {shades.map((shade) => (
                <tr key={shade}>
                  <td
                    className="pr-2 py-1 text-[11px] font-medium"
                    style={{ color: "var(--color-primary-500-dark)" }}
                  >
                    {shade}
                  </td>

                  {families.map((family) => (
                    <td key={family} className="p-1">
                      <div
                        className="h-8 w-10 rounded-lg  shadow-sm"
                        style={{
                          background: colorFamilies[family][shade][mode],
                          border: "1px solid var(--color-primary-900-dark)",
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="space-y-6 rounded-lg p-6"
      style={{
        backgroundColor: "var(--color-primary-900-dark)",
        border: "1px solid var(--color-primary-700-dark)",
        boxShadow: "0 0 0 1px var(--color-primary-800-dark)",
        color: "var(--color-primary-50-dark)",
      }}
    >
      <div className="mb-2 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold">Color System Grid</h1>
          <p
            className="text-xs"
            style={{ color: "var(--color-primary-300-dark)" }}
          >
            Light and dark palettes visualized by family and shade.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-sm font-medium">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--color-warning-500)" }}
            />
            Light colors
          </h2>
          <Grid mode="light" />
        </section>

        <section className="space-y-3">
          <h2 className="flex items-center gap-2 text-sm font-medium">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--color-primary-500-dark)" }}
            />
            Dark colors
          </h2>
          <Grid mode="dark" />
        </section>
      </div>
    </div>
  );
}
