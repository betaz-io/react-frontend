import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "theme";
import { WalletProvider } from "contexts/useWallet";
import { GameProvider } from "contexts/useGame";
import { Provider as ReduxProvider } from "react-redux";
import "@fontsource/space-grotesk"; // Defaults to weight 400
import "@fontsource/space-grotesk/500.css"; // Specify weight
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { Toaster } from "react-hot-toast";
import store from "store/store";
import { ModalProvider } from "contexts/useModal";
import { QueryClient, QueryClientProvider } from "react-query";
import { TicketProvider } from "contexts/useSelectTicket";

const toastStyle = {
  className: "toast-config",
  success: {
    iconTheme: {
      primary: "#1BECA6",
      secondary: "#122126",
    },
  },
  error: {
    iconTheme: {
      primary: "#FB1149",
      secondary: "#122126",
    },
  },
  warning: {
    iconTheme: {
      primary: "#FFD426",
      secondary: "#122126",
    },
  },
  style: {
    padding: "12px 16px",
    fontSize: "16px",
    color: "#fff",
    borderRadius: "8px",
    background: "#122126",
    boxShadow:
      "0px 8px 10px 0px rgba(0, 0, 0, 0.20), 0px 6px 30px 0px rgba(0, 0, 0, 0.12), 0px 16px 24px 0px rgba(0, 0, 0, 0.14)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  },
};
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <ReduxProvider store={store}>
          <WalletProvider>
            <ModalProvider>
              <TicketProvider>
                <GameProvider>
                  <Toaster
                    position="bottom-right"
                    reverseOrder={true}
                    toastOptions={toastStyle}
                  />
                  <App />
                </GameProvider>
              </TicketProvider>
            </ModalProvider>
          </WalletProvider>
        </ReduxProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
