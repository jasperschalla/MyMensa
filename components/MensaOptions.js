import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const styles = StyleSheet.create({
    mensaContainer: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#2E2E31",
        width: "90%",
        height: 75,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "flex-end",
        borderColor: "#fff",
        borderWidth: 0.5
    },
    mensaText: {
        color: "#fff",
        fontSize: 20
    },
    touchContainer:{
        marginTop: 20,
        borderRadius: 15
    },
    touchContainerFirst:{
        marginTop: 40,
        borderRadius: 15
    },
    leftView: {
        marginRight: "25%"
    },
    rightView: {
        marginRight: "15%"
    }
});

export const MensaOptions = ({ mensaOptions, navigation }) => {

    return (
        mensaOptions.map((option,index) => {

            return (
                <TouchableHighlight onPress={(e) => navigation.navigate("Food",{"name":option})} key={option} style={index===0? styles.touchContainerFirst:styles.touchContainer}>
                    <View style={styles.mensaContainer}>
                        <View style={styles.leftView}>
                            <Text style={styles.mensaText}>{option}</Text>
                        </View>
                        <View style={styles.rightView}>
                            <AntDesign name="rightcircle" size={24} color="white" />
                        </View>
                    </View>
                </TouchableHighlight>
                )
        })
    )

}