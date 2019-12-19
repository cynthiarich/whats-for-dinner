//initialize the firebaseUI widget
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
            return true;
        }
    },
    signInFlow: 'popup',
    signInSuccessUrl: 'signedIn',
    signInOptions: [
        //we are providing the option to sign in with email or google
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
};
ui.start('#firebaseui-auth-container', uiConfig);