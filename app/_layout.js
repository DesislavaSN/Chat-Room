import { Slot, useRouter, useSegments } from "expo-router";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { useEffect } from "react";
import { MenuProvider } from 'react-native-popup-menu';

const MainLayout = () => {
    const {isAuthenticated} = useAuth();
    // useSegments() - Returns a list of segments for the currently selected route.
    const segments = useSegments();
    const router = useRouter();

    // tozi useEffect shte se zadeistva vseki put kogato auth state se promeni 
    useEffect(() => {
        // check if user is authenticated or not
        if (typeof isAuthenticated === 'undefined') {
            return;
        }
        const inApp = segments[0] === '(app)';
        if (isAuthenticated && !inApp) {
            // redirect to 'Home'
            router.replace('home');
        } else if (isAuthenticated == false) {
            // redirect to login
            router.replace('signIn');
        } 
    },[isAuthenticated]);

    return <Slot />
}

export default function RootLayout() {
    return (
        <MenuProvider>
            <AuthContextProvider>
                <MainLayout />
            </AuthContextProvider>
        </MenuProvider>
    )
}