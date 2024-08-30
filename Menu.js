import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Menu = ({ username }) => {
    const navigation = useNavigation();
    const route = useRoute();
    
    const iconMap = {
        Home: {
            default: require('./assets/img/icons/menu-icons/wallet.png'),
            filled: require('./assets/img/icons/menu-icons/wallet-filled.png')
        },
        Analytics: {
            default: require('./assets/img/icons/menu-icons/chart.png'),
            filled: require('./assets/img/icons/menu-icons/chart-filled.png')
        },
        Notifications: {
            default: require('./assets/img/icons/menu-icons/bell.png'),
            filled: require('./assets/img/icons/menu-icons/bell-filled.png')
        },
        Settings: {
            default: require('./assets/img/icons/menu-icons/gears.png'),
            filled: require('./assets/img/icons/menu-icons/gears-filled.png')
        }
    };

    return (
        <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home', { username })}>
                <Image style={styles.iconsMenu} source={route.name === 'Home' ? iconMap.Home.filled : iconMap.Home.default} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Analytics', { username })}>
                <Image style={styles.iconsMenu} source={route.name === 'Analytics' ? iconMap.Analytics.filled : iconMap.Analytics.default} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notifications', { username })}>
                <Image style={styles.iconsMenu} source={route.name === 'Notifications' ? iconMap.Notifications.filled : iconMap.Notifications.default} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings', { username })}>
                <Image style={styles.iconsMenu} source={route.name === 'Settings' ? iconMap.Settings.filled : iconMap.Settings.default} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#5019d4',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    menuItem: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconsMenu: {
        height: 30,
        width: 30,
    },
});

export default Menu;
