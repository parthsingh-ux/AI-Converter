
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "@/context/UserContext";




export const metadata = {
  title: "Design System",
  description:
    "A unified collection of reusable components, design tokens, and accessibility standards that ensure visual consistency and scalability across all Code Companion interfaces.",
  icons: {
    icon: "/fav-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true} data-lt-installed={true}>
      <body
        
      >
        <UserProvider>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{
              zIndex: 9999,
              marginBottom: "20px",
              top: "20px", // Push from top
              right: "40px", // Push from right
              width: "420px", // Fixed width for uniformity
              fontSize: "14px", // Clean font size
            }}
          />
          {children}
        </UserProvider>{" "}
      </body>
    </html>
  );
}
  