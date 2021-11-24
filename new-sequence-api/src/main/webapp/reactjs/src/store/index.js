import { createStoreon } from "storeon";
import { storeonDevtools, storeonLogger } from "storeon/devtools";
import { axiosInstance } from "../axios";

const CART_KEY = "cart";

const initialState = {
  books: [],
  cart: {},
  filtered: "",
  authenticated: false,
  header: null,
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
  SetHeader: "SetHeader",
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

    let currentUser = initialState.currentUser;
    const userInLocalStorage = localStorage.getItem("user");
    if (userInLocalStorage) {
      currentUser = JSON.parse(userInLocalStorage);
    }

    const getExistingToken = localStorage.getItem("loginState");
    let authenticated = initialState.authenticated;
    if (getExistingToken) {
      authenticated = true;
    }
    return {
      ...initialState,
      cart,
      authenticated,
      currentUser,
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
    async (state, { username, password, last, first }) => {
      if (state.authenticated) {
        return;
      }

      try {
        const response = await axiosInstance.post(`/users/${endpoint}`, {
          username,
          password,
          last,
          first,
        });
        const jwtToken = response.headers["authorization"];

        console.log(response);

        axiosInstance.defaults.headers["Authorization"] = `Bearer ${jwtToken}`;

        store.dispatch(AppEvents.SetCurrentUser, response.data);
        store.dispatch(AppEvents.SetHeader, `Bearer ${jwtToken}`);
        store.dispatch(AppEvents.SetAuthenticated, true);

        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem(
          "loginState",
          `Bearer ${JSON.stringify(jwtToken)}`
        );
      } catch (e) {
        store.dispatch(AppEvents.SetCurrentUser, null);
        // TODO: use user === null to check it
        store.dispatch(AppEvents.SetAuthenticated, false);
        store.dispatch(AppEvents.SetHeader, null);
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
    store.dispatch(AppEvents.SetHeader, null);
    localStorage.removeItem("loginState");
  });

  store.on(AppEvents.SetCurrentUser, (_, currentUser) => ({
    currentUser,
  }));

  store.on(AppEvents.SetHeader, (_, header) => ({
    header,
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
