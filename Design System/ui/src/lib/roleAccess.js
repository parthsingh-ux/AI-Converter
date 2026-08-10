export const routeAccessMap = {
  "^/dashboard$": ["admin", "qa", "designer"],
  "^/components$": ["admin", "qa", "designer"],

  "^/$": ["admin", "qa"],
  
  "^/accordion$": ["admin", "qa"],
  "^/alerts$": ["admin", "qa"],
  "^/avatar$": ["admin", "qa"],
  "^/avatar-group$": ["admin", "qa"],

  "^/badge$": ["admin", "qa"],
  "^/button$": ["admin", "qa"],
  "^/button-group$": ["admin", "qa"],
  "^/breadcrumb$": ["admin", "qa"],

  "^/card$": ["admin", "qa"],
  "^/carousal$": ["admin", "qa"],
  "^/checkbox$": ["admin", "qa"],
  "^/checkbox-group$": ["admin", "qa"],
  "^/chip$": ["admin", "qa"],
  "^/code$": ["admin", "qa"],
  "^/calendar-and-date-picker$": ["admin", "qa"],
  "^/circular-progress$": ["admin", "qa"],

  "^/dev-mode$": ["admin", "qa"],
  "^/divider$": ["admin", "qa"],
  "^/dropdown$": ["admin", "qa"],

  "^/forms$": ["admin", "qa"],

  "^/input-otp$": ["admin", "qa"],
  "^/input-and-text-field$": ["admin", "qa"],

  "^/link$": ["admin", "qa"],

  "^/modals$": ["admin", "qa"],

  "^/navigation-and-header$": ["admin", "qa"],
  "^/number-input$": ["admin", "qa"],

  "^/pagination$": ["admin", "qa"],
  "^/progress$": ["admin", "qa"],

  "^/radio$": ["admin", "qa"],


  "^/select$": ["admin", "qa"],
  "^/skeleton$": ["admin", "qa"],
  "^/sliders$": ["admin", "qa"],
  "^/spinner$": ["admin", "qa"],
  "^/switch$": ["admin", "qa"],

  "^/tag$": ["admin", "qa"],
  "^/tabs$": ["admin", "qa"],
  "^/table$": ["admin", "qa"],
  "^/time-input$": ["admin", "qa"],
  "^/toast$": ["admin", "qa"],
  "^/tool-tip$": ["admin", "qa"],

  "^/users$": ["admin", "qa"],


  "^/all-users$": ["admin", "qa", "designer"],
};

// export const DEFAULT_REDIRECT = "/signin";
export const DEFAULT_REDIRECT = "/";
export const UNAUTHORIZED_REDIRECT = "/unauthorized";
