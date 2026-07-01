import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "User Management Dashboard",
  description: "Next.js Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        {children}

        <ToastContainer
          position="top-right"
          autoClose={2500}
        />
      </body>
    </html>
  );
}