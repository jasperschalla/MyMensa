import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { GetData } from './GetData';
import SelectDropdown from 'react-native-select-dropdown';
import { useState, useEffect } from 'react';
import Logos from './Logos';

const styles = StyleSheet.create({
    containerContainer: {
      flexDirection: "column",
      height: "100%"
    },
    containerContent: {
        justifyContent: 'center',
        alignItems: "center"
    },
    containerBackground: {
        backgroundColor: '#4C4C52'
    },
    cardContainer: {
        width: "100%"
    },  
    card: {
        width: "90%",
        backgroundColor: '#2E2E31',
        borderRadius: 15
    },
    cardTitle: {
        color: "#fff"
    },
    selectContainer: {
        textAlign: "center",
        marginTop: 30,
        marginBottom: 20 
    },
    select: {
        borderRadius: 5
    },
    logo: {
       marginBottom: 15,
       marginLeft: 10,
       resizeMode: "contain"
    },
    cardHeader: {
        display: "flex",
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center"
    },
    dropdownRowStyle: {
        backgroundColor: '#4C4C52', 
        borderBottomColor: '#9E9EA0'
    },
    dropdownBtnStyle: {
        width: '80%',
        height: 50,
        backgroundColor: '#2E2E31',
        borderRadius: 8
    },
    dropdownBtnTxtStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    dropdownRowTxtStyle: {
        color: '#FFF',
        textAlign: 'center'
    },
    loadingContainer: {
        display: "flex",
        justifyContent: 'flex-start',
        alignItems: "center",
        backgroundColor: '#4C4C52',
        height: "100%",
        paddingTop: 50
    },
    legendContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems:"flex-start",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 30,
        marginLeft: 100,
        padding: 5
    },
    legendItem: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 5
    },
    legendLogo: {
        resizeMode: "contain"
    },
    listContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        marginBottom: 10
    },
    listItem: {
        marginTop: 5,
        marginBottom: 5
    },
    cardText: {
        fontWeight: "bold",
        color: "#fff"
    },
    price: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center",
        marginTop: 10,
        marginBottom: 5
    },
    noDataContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center"
    },
    noDataTextContainer: {
        backgroundColor: '#2E2E31',
        padding: 15,
        borderRadius: 15,
        marginTop: 30,
        width: "90%",
        borderColor: "#fff",
        borderWidth: 0.5
    }
  });



export const Food = ({ route }) => {

    const data = GetData();

    const dateList = [];

    const today = new Date();
    const firstDay = today.getDate() - today.getDay() + 1;

    const todayComp = new Date();

    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
      

    for (let i = 0;i<7;i++){
        let date = new Date(today.setDate(firstDay+i));
        if (date.getTime()===todayComp.getTime()){
            dateList.push({value:date.toISOString().split('T')[0],label:"Today"});
        } else {
            dateList.push({value:date.toISOString().split('T')[0],label:`${dayNames[date.getDay()]}, ${date.getDate()}.${(date.getMonth()+1)>9?"":0}${date.getMonth()+1}`});
        }
    }

    const [date,setDate]  = useState(todayComp.toISOString().split('T')[0]);

    if (!data){
        return(
            <View style={styles.loadingContainer}>
                <Text style={{ color: "#fff" }}>Loading...</Text>
            </View>
        )
    }

    return (
        <ScrollView containerStyle={styles.containerContainer} contentContainerStyle={styles.containerContent} style={styles.containerBackground}>
            <View style={styles.selectContainer}>
                <SelectDropdown 
                data={dateList}
                buttonTextAfterSelection={selectedItem => selectedItem.label}
                rowTextForSelection={item => item.label}
                defaultButtonText={'Today'}
                defaultValue={todayComp.toISOString().split('T')[0]}
                onSelect={selectedItem => setDate(selectedItem.value)}
                rowStyle={styles.dropdownRowStyle}
                buttonStyle={styles.dropdownBtnStyle}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}
                />
            </View>
            <View style={styles.cardContainer}>
                {JSON.parse(data.contents)[route.params.name.toLowerCase()][date].length!==0? JSON.parse(data.contents)[route.params.name.toLowerCase()][date].map(food => {
                        return (
                            <Card containerStyle={styles.card} key={food.title}>
                                    <View style={styles.cardHeader}>
                                        {food.type!=="meat"? (
                                            <>
                                            <Card.Title style={styles.cardText}>{food.title}</Card.Title>
                                            <Image source={Logos[food.type.replace("-","")]} style={styles.logo}/>
                                            </>
                                        ):
                                        (<Card.Title style={styles.cardText}>{food.title}</Card.Title>)
                                        }
                                    </View>
                                    <Card.Divider/>
                                    <View style={styles.listContainer}>
                                            {food.description.map((desc,index) => {
                                                return (
                                                    <View style={styles.listItem} key={index}>
                                                        <Text style={{ color: "#fff"}}>{desc}</Text>
                                                    </View>
                                                )
                                            })}
                                    </View>
                                    <Card.Divider/>
                                    <View style={styles.price}>
                                        <Text style={{ color: "#fff", fontWeight: "bold" }}>Price: {food.price}</Text>
                                    </View>
                            </Card>
                        )
                }): 
                (<View style={styles.noDataContainer}>
                    <View style={styles.noDataTextContainer}>
                    <Text style={{ color: "#fff", fontWeight: "bold"}}>Unfortunately there is no food {todayComp.toISOString().split('T')[0]===date? " today.":" at " + dateList.filter(item => item.value===date)[0].label + "."}</Text>
                    </View>
                 </View>)

                }
            </View>
            <View style={styles.legendContainer}>
                <View style={styles.legendItem}> 
                    <Image source={Logos["vegetarisch"]} style={styles.legendLogo}/>
                    <Text style={{ color: "#fff", marginLeft: 20}}>veggy</Text>
                </View>
                <View style={styles.legendItem}>
                    <Image source={Logos["vegan"]} style={styles.legendLogo}/>
                    <Text style={{ color: "#fff", marginLeft: 20}}>vegan</Text>
                </View>
                <View style={styles.legendItem}>
                    <Image source={Logos["veganaufwunsch"]} style={styles.legendLogo}/>
                    <Text style={{ color: "#fff", marginLeft: 20}}>vegan-on-demand</Text>
                </View>
            </View>
        </ScrollView>
    )

}