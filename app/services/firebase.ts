import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

type SignUpProps = {
    email: string;
    password: string;
    username: string;
}

type LogInProps = {
    email: string;
    password: string;
    // username: string;
}

//sign up user
export const signUp = async ({ email, password, username }: SignUpProps): Promise<FirebaseAuthTypes.User | null> => {
    try {
        const userCredentials = await auth().createUserWithEmailAndPassword(email, password);
        if (userCredentials.user) {
            await userCredentials.user.updateProfile({ displayName: username });
            console.log('User signed up', userCredentials.user?.email);
        }
        return userCredentials.user;
    } catch (error) {
        console.log('Error signing up user', error);
        throw error;
    }
};


//login user
export const logIn = async ({ email, password }: LogInProps): Promise<FirebaseAuthTypes.User | null> => {
    try {
        const userCredentials = await auth().signInWithEmailAndPassword(email, password);
        console.log('User logged in', userCredentials.user?.email)
        return userCredentials.user;
    } catch (error) {
        console.log('Error logging in user', error);
        throw error;
    }
};

//log out the current user
export const signOut = async (): Promise<void> => {
    try {
        await auth().signOut();
        console.log('User signed out');
    } catch (error) {
        console.error('Error signing out', error);
        throw error;
    }
};

//get info about current user from firebase
export const getCurrentUser = (): { email: string; username: string } | null => {
    const user = auth().currentUser;
    if (user) {
        return {
            email: user.email ?? '',
            username: user.displayName ?? '',
        }
    }
    return null;
};
