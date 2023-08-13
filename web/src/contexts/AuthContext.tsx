import * as auth from "gqlite-lib/dist/client/auth";
import * as react from "react";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null as any,
};

const { createContext, useEffect, useReducer } = react;
const { createUser, getUser, login: GQLLogin, logout: GQLLogout } = auth;

const handlers = {
  INITIALIZE: function (state: any, action: any) {
    const { isAuthenticated, user } = action.payload;

    return Object.assign({}, state, {
      isAuthenticated,
      isInitialized: true,
      user,
    });
  },
  LOGIN: function (state: any, action: any) {
    const { user } = action.payload;

    return updateState(state, true, user);
  },
  LOGOUT: function (state: any) {
    return updateState(state, false, null);
  },
  REGISTER: function (state: any, action: any) {
    const { user } = action.payload;

    return updateState(state, true, user);
  },
};

function updateState(state: any, isAuthenticated: boolean, user: any) {
  return Object.assign({}, state, {
    isAuthenticated,
    user,
  });
}

const reducer = (state: any, action: any) =>
  // @ts-ignore
  handlers[action.type] ? handlersaction.type : state;

const AuthContext = createContext({
  ...initialState,
  login: null as any,
  logout: null as any,
  register: null as any,
});

export const AuthProvider = function (props: any) {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    const initialize = async function () {
      const user = await getUser();
      const isAuthenticated = !!user;
      const payload = {
        isAuthenticated,
        user,
      };
      dispatch({
        type: "INITIALIZE",
        payload,
      });
    };

    initialize();
  }, []);

  const login = async function (email: string, password: string) {
    const user = await GQLLogin(email, password);
    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const logout = async function () {
    await GQLLogout();
    dispatch({ type: "LOGOUT" });
  };

  const register = async function (email: string, password: string) {
    const user = await createUser(email, password);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  return react.createElement(
    AuthContext.Provider,
    {
      value: Object.assign({}, state, {
        login,
        logout,
        register,
      }),
    },
    children
  );
};

export default AuthContext;


