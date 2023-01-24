import { StyleSheet, ScrollView } from 'react-native';
import { MensaOptions } from './MensaOptions';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: '#4C4C52',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    background: {
        backgroundColor: '#4C4C52'
    }
  });

const mensaOptions = ["Rempartstraße","Institutsviertel","Littenweiler"];

export const Home = ({ navigation }) => {

    return (
            <ScrollView contentContainerStyle={styles.container} style={styles.background}>
                <MensaOptions navigation={navigation} mensaOptions={mensaOptions}/>
            </ScrollView>
    )

}