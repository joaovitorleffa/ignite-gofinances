import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthProviderType = {
  children: ReactNode;
};

interface AuthContextData {
  user: User;
  isLoading: boolean;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const USER_STORAGE_KEY = "@gofinances:user";

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderType) {
  const [user, setUser] = useState({} as User);
  const [isLoading, setIsLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();
        const loggedUser = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        };
        setUser(loggedUser);

        await AsyncStorage.setItem(
          USER_STORAGE_KEY,
          JSON.stringify(loggedUser)
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      if (credentials) {
        const loggedUser = {
          id: String(credentials.user),
          email: credentials.email!,
          name: credentials.fullName!.givenName!,
          photo: `https://ui-avatars.com/api/?name=$${credentials.fullName?.givenName}&length=1`,
        };
        setUser(loggedUser);
        await AsyncStorage.setItem(
          USER_STORAGE_KEY,
          JSON.stringify(loggedUser)
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  }

  useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);

      if (userData) {
        const userLogged = JSON.parse(userData) as User;
        setUser(userLogged);
      }

      setIsLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signOut, isLoading, signInWithGoogle, signInWithApple }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
