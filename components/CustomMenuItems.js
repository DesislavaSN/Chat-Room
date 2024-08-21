import { StyleSheet, Text, View } from 'react-native';
import {
    MenuOption
} from 'react-native-popup-menu';

export const MenuItem = ({text, action, value, icon}) => {

    return (
        <MenuOption onSelect={() => action(value)}>
            <View style={styles.menuView}>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.text}>{icon}</Text>
            </View>
        </MenuOption>
    )
}

const styles = StyleSheet.create({
    menuView:{
        flexDirection: 'row',
        justifyContent: 'space-between', 
        paddingHorizontal: 10,
    },
    text: {
        fontWeight: '500',
        color: '#7D7C7C'
    }
})