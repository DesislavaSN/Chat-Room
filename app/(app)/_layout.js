import { Stack } from "expo-router";
import HomeHeader from "../../components/HomeHeader";
import ProfileHeader from "../../components/ProfileHeader";

export default function _layout() {
    return (
        <Stack>
            <Stack.Screen
                name='home'
                options={{
                    header: () => <HomeHeader />
                }}
            />
            <Stack.Screen
                name='profileUser'
                options={{
                    // title:'Profile Page',
                    header: () => <ProfileHeader />
                }}
            />
        </Stack>

    )
}