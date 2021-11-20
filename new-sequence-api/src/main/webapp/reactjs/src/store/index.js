import { createStoreon } from "storeon";
import { storeonDevtools, storeonLogger } from "storeon/devtools";
import { axiosInstance } from "../axios";

const initialState = {
  books: [],
  cart: {},
  filtered: "",
  authenticated: false,
  currentUser: "",
};

export const AppEvents = {
  LoadBooks: "LoadBooks",
  LoadBooksEnd: "LoadBooksEnd",
  LoadCart: "LoadCart",
  AddToCart: "AddToCart",
  DecreaseQuantity: "DecreaseQuantity",
  RemoveFromCart: "RemoveFromCart",
  ClearCart: "ClearCart",
  Login: "Login",
  Logout: "Logout",
  FilterData: "FilterData",
  SetCurrentUser: "SetCurrentUser",
};

const appModule = (store) => {
  store.on("@init", () => initialState);

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

  store.on(AppEvents.LoadCart, (state, book) => ({
    ...state,
    cart: [...book],
  }));

  store.on(AppEvents.AddToCart, (state, book) => ({
    ...state,
    cart: {
      ...state.cart,
      [book.id]: {
        ...book,
        quantity: (state.cart[book.id]?.quantity || 0) + 1,
      },
    },
  }));

  store.on(AppEvents.RemoveFromCart, (state, book) => {
    const newCart = {
      ...state.cart,
    };
    delete newCart[book.id];
    return {
      cart: newCart,
    };
  });

  store.on(AppEvents.ClearCart, () => ({
    cart: {},
  }));

  store.on(AppEvents.FilterData, (state, strSearch) => ({
    filtered: strSearch,
  }));

  store.on(AppEvents.Login, (state) => ({
    authenticated: true,
  }));

  store.on(AppEvents.Logout, (state) => ({
    authenticated: false,
  }));

  store.on(AppEvents.SetCurrentUser, (state, name) => ({
    currentUser: name,
  }));

  store.on(AppEvents.DecreaseQuantity, (state, book) => {
    if (state.cart[book.id]?.quantity - 1 === 0) {
      return store.dispatch(AppEvents.RemoveFromCart, book);
    } else {
      return {
        ...state,
        cart: {
          ...state.cart,
          [book.id]: {
            ...book,
            quantity: state.cart[book.id].quantity - 1,
          },
        },
      };
    }
  });
};

export const store = createStoreon([storeonDevtools, storeonLogger, appModule]);
