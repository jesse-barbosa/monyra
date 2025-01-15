import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../../styles/global';

const Menu = ({ userData }) => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home', { userData })}>
                <Icon name={route.name === 'Home' ? 'home' : 'home-outline'} color="white" size={32} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Analytics', { userData })}>
                <Icon name={route.name === 'Analytics' ? 'bar-chat' : 'bar-chart-outline'} color="white" size={32} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notifications', { userData })}>
                <Icon name={route.name === 'Notifications' ? 'notifications' : 'notifications-outline'} color="white" size={32} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings', { userData })}>
                <Icon name={route.name === 'Settings' ? 'settings' : 'settings-outline'} color="white" size={32} />
            </TouchableOpacity>
        </View>
    );
};

export default Menu;
