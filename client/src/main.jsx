import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { SignUpSliceReducer } from "./Redux/signupReducer";
import { LogInSliceReducer } from "./Redux/loginReducer";
import { CartSliceReducer } from "./Redux/cartReducer";
import { ProductDetailSliceReducer } from "./Redux/productDetailReducer";
import { ProductSliceReducer } from "./Redux/productReducer";

const store = configureStore({
  reducer: {
    signUpRed: SignUpSliceReducer.reducer,
    logInRed: LogInSliceReducer.reducer,
    productDetailRed: ProductDetailSliceReducer.reducer,
    productRed:ProductSliceReducer.reducer,
    cartRed: CartSliceReducer.reducer,
  },
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
