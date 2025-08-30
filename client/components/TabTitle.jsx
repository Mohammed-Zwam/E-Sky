import { MaterialIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text } from "react-native"
import { View } from "react-native";

export default function TabTitle({ title, iconName, children }) {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                {
                    iconName === 'E-Sky' ?
                        <Image source={require('../assets/images/E-Sky-home.png')} style={{
                            width: "40",
                            aspectRatio: 16 / 9,
                            resizeMode: "cover"
                        }} />
                        :
                        <MaterialIcons name={iconName} size={30} color="black" />
                }
                <Text style={[styles.title, { color: title === "E-Sky" ? "#fff" : "#000"}]}>{title}</Text>
            </View>
            {children}
            <View style={styles.divider} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 0,
        paddingBottom: 0
    },
    divider: {
        height: 1,
        backgroundColor: "#aaa",
        marginHorizontal: 10,
        marginBottom: 0, paddingBottom: 0
    },
    titleContainer:
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        marginLeft: 10,
        gap: 5
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 10,
        paddingLeft: 0,
    },

});