import "./globals.css";
import UserProvider from "./context/user";
import CartProvider from "./context/cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Flowy",
  description: "Flowy - an online flower shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div>
          <ToastContainer />

          <UserProvider>
            <CartProvider>{children}</CartProvider>
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
