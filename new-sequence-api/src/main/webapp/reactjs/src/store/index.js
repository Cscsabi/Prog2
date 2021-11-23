import { createStoreon } from "storeon";
import { storeonDevtools, storeonLogger } from "storeon/devtools";
import { axiosInstance } from "../axios";

const CART_KEY = "cart";

const initialState = {
  books: [],
  cart: {},
  filtered: "",
  authenticated: false,
  authenticationLoading: false,
  currentUser: null,
  error: "",
};

export const AppEvents = {
  LoadBooks: "LoadBooks",
  LoadBooksEnd: "LoadBooksEnd",
  AddToCart: "AddToCart",
  DecreaseQuantity: "DecreaseQuantity",
  RemoveFromCart: "RemoveFromCart",
  ClearCart: "ClearCart",
  Login: "Login",
  Register: "Register",
  SetAuthenticated: "SetAuthenticated",
  SetAuthenticationLoading: "SetAuthenticationLoading",
  Logout: "Logout",
  FilterData: "FilterData",
  SetCurrentUser: "SetCurrentUser",
};

const appModule = (store) => {
  store.on("@init", () => {
    const cartString = localStorage.getItem(CART_KEY);
    let cart = initialState.cart;
    if (cartString) {
      cart = JSON.parse(cartString);
    }
    //TODO: get token from localStorage, set Auth header on axiosInstance with Bearer set logged in, add user controller mapping to validate token
    const getExistingToken = localStorage.getItem("loginState");
    let authenticated = initialState.authenticated;
    if (
      `Bearer ${getExistingToken}` ===
      axiosInstance.defaults.headers["Authorization"]
    ) {
      console.log("xd");
      authenticated = true;
    }
    return {
      ...initialState,
      cart,
      authenticated,
    };
  });

  store.on(AppEvents.LoadBooks, async (_) => {
    try {
      const response = await axiosInstance({
        url: "/books/all",
      });
      store.dispatch(AppEvents.LoadBooksEnd, response.data);
    } catch (e) {
      console.log(e.message);
    }
  });

  store.on(AppEvents.LoadBooksEnd, (state, book) => ({
    ...state,
    books: [...book],
  }));

  store.on(AppEvents.AddToCart, (state, book) => {
    const cart = {
      ...state.cart,
      [book.id]: {
        ...book,
        quantity: (state.cart[book.id]?.quantity || 0) + 1,
      },
    };

    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    return {
      ...state,
      cart,
    };
  });

  store.on(AppEvents.RemoveFromCart, (state, book) => {
    const newCart = {
      ...state.cart,
    };
    delete newCart[book.id];

    localStorage.setItem(CART_KEY, JSON.stringify(newCart));

    return {
      cart: newCart,
    };
  });

  store.on(AppEvents.ClearCart, () => {
    localStorage.removeItem(CART_KEY);
    return { cart: {} };
  });

  store.on(AppEvents.FilterData, (_, strSearch) => ({
    filtered: strSearch,
  }));

  const handleLoginOrRegisterFactory =
    (endpoint) =>
    async (state, { username, password }) => {
      if (state.authenticated) {
        return;
      }

      store.dispatch(AppEvents.SetAuthenticationLoading, true);

      try {
        const response = await axiosInstance.post(`/users/${endpoint}`, {
          username,
          password,
        });
        const jwtToken = response.headers["authorization"];

        axiosInstance.defaults.headers["Authorization"] = `Bearer ${jwtToken}`;

        store.dispatch(AppEvents.SetCurrentUser, response.data);
        store.dispatch(AppEvents.SetAuthenticationLoading, true);
        store.dispatch(AppEvents.SetAuthenticated, true);

        localStorage.setItem("loginState", JSON.stringify(jwtToken));
      } catch (e) {
        store.dispatch(AppEvents.SetCurrentUser, null);
        // TODO: use user === null to check it
        store.dispatch(AppEvents.SetAuthenticated, false);
        store.dispatch(AppEvents.SetAuthenticationLoading, false);
        // TODO: Add error to state and display it, e.g.: invalid password
        console.error(e);
      }
    };

  store.on(AppEvents.Login, handleLoginOrRegisterFactory("authenticate"));
  store.on(AppEvents.Register, handleLoginOrRegisterFactory("register"));

  store.on(AppEvents.Logout, (_) => {
    delete axiosInstance.defaults.headers["Authorization"];
    store.dispatch(AppEvents.SetCurrentUser, null);
    store.dispatch(AppEvents.SetAuthenticated, false);
    store.dispatch(AppEvents.SetAuthenticationLoading, false);
    localStorage.removeItem("loginState");
  });

  store.on(AppEvents.SetCurrentUser, (_, currentUser) => ({
    currentUser,
  }));

  store.on(AppEvents.SetAuthenticationLoading, (_, authenticationLoading) => ({
    authenticationLoading,
  }));

  store.on(AppEvents.SetAuthenticated, (_, authenticated) => ({
    authenticated,
  }));

  store.on(AppEvents.DecreaseQuantity, (state, book) => {
    if (state.cart[book.id]?.quantity - 1 === 0) {
      store.dispatch(AppEvents.RemoveFromCart, book);
      return;
    }

    const cart = {
      ...state.cart,
      [book.id]: {
        ...book,
        quantity: state.cart[book.id].quantity - 1,
      },
    };

    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    return {
      ...state,
      cart,
    };
  });
};

export const store = createStoreon([storeonDevtools, storeonLogger, appModule]);
