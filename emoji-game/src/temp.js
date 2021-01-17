
import Vue from "vue";
import createAuth0Client from "@auth0/auth0-spa-js";
/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);
let instance;
/** Returns the current instance of the SDK */
export const getInstance = () => instance;
/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export const useAuth0 = ({
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  redirectUri = window.location.origin,
  ...options
}) => {
  if (instance) return instance;
  // The 'instance' is simply a Vue object
  instance = new Vue({
    data() {
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
        auth0Client: null,
        popupOpen: false,
        error: null
      };
    },
    methods: {
      /** Authenticates the user using a popup window */
      async loginWithPopup(o) {
        this.popupOpen = true;
        try {
          await this.auth0Client.loginWithPopup(o);
        this.user = await this.auth0Client.getUser();
        this.isAuthenticated = true;
      },
      /** Handles the callback when logging in using a redirect */
      async handleRedirectCallback() {
        this.loading = true;
        try {
          await this.auth0Client.handleRedirectCallback();
          this.user = await this.auth0Client.getUser();
          this.isAuthenticated = true;
        }
 
    async created() {
      // Create a new instance of the SDK client using members of the given options object
      this.auth0Client = await createAuth0Client({
        domain: options.domain,
        client_id: options.clientId,
        audience: options.audience,
        redirect_uri: redirectUri
      });
      try {
        // If the user is returning to the app after authentication
        if (
          window.location.search.includes("code=") &&
          window.location.search.includes("state=")
        ) {
          // handle the redirect and retrieve tokens
  
      } catch (e) {
        this.error = e;
 
    }
  });
  return instance;
};
