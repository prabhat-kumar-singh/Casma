import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useRef, useState } from "react";
import { getAllData } from "../../../models/Transaction";


//component
import Item from "./Item";

const Detail = ({route}) => {

    const {themeColor} = route.params;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const type = useRef("GRID")
    const [data, setData] = useState({});
    const getData = async () => {
        let res = await getAllData();
        //console.log(res);
        setData(res);
    }
    
    useEffect(()=>{
        getData();
    }, [data])

    return(
        <View style={{flex:1}}>
            <View style={[styles.chartBtn, {backgroundColor:themeColor}]}>
                <TouchableOpacity onPress={()=> type.current = "DEFAULT"}>
                    <Text style={{color:"#fff", fontWeight:"bold"}}>Default</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> type.current = "GRID"}>
                    <Text style={{color:"#fff", fontWeight:"bold"}}>Calender</Text>
                </TouchableOpacity>
            </View>
            {/*Default View */}
            <ScrollView contentContainerStyle={{flexGrow:1}}>
            {/*show the data from recent to older order*/}
            {type.current === "DEFAULT" && Object.keys(data).sort((a, b)=>{
                if(a.slice(-4,)===b.slice(-4, )){
                    return parseInt(b.slice(0, -4)) - parseInt(a.slice(0, -4));
                }
                else{
                    return parseInt(b.slice(-4,))-parseInt(a.slice(-4,));
                }
            }).map(key =>{
                let days = Object.keys(data[key]).sort((a,b)=> parseInt(b)-parseInt(a));
                return(
                    <View key = {key}>
                        {
                            days.map(day => {
                                return (
                                    <View key = {day}>
                                        {
                                            data[key][day].map((element, index) => {
                                                return <Item data = {element} itemKey = {key} day = {day} id = {index} themeColor={themeColor}/>
                                            })
                                        }
                                        {/*
                                        <FlatList 
                                            data = {data[key][day]}
                                            renderItem={({item, index}) => <Item data = {item} itemKey = {key} day = {day} id = {index} themeColor={themeColor}/>}
                                            keyExtractor={item => item.time}
                                        />
                                        * */}
                                    </View>
                                )
                            })
                        }
                    </View>
                )

            })}
            </ScrollView>

            {/* Grid View */}
            {type.current==="GRID" &&
            <ScrollView contentContainerStyle={{flexGrow:1}}>
                {
                    Object.keys(data).sort((a, b)=>{
                        if(a.slice(-4,)===b.slice(-4, )){
                            return parseInt(b.slice(0, -4)) - parseInt(a.slice(0, -4));
                        }
                        else{
                            return parseInt(b.slice(-4,))-parseInt(a.slice(-4,));
                        }
                    }).map(month=>{
                        let year = month.slice(-4, );
                        let monthName = parseInt(month.slice(0,-4));
                        let days = Object.keys(data[month]);
                        let numberOfDays = new Date(year, monthName, 0).getDate();

                        return(
                            <View key={month+""+year}>
                                <Text style={{textAlign:"center", color:themeColor, fontSize:16}}>{monthNames[monthName-1]}, {year}</Text>
                                <View style={styles.gridContent}>
                                {
                                    Array.from(Array(numberOfDays), (e, idx)=>{
                                        let profit = 0;
                                        let day = ""+(idx+1);
                                        if(days.includes(day)){
                                            let transactionData = data[month][day];
                                            for(let transaction of transactionData){
                                                profit+= transaction.mode==="IN"?parseInt(transaction.amount):-parseInt(transaction.amount);
                                            }
                                            //console.log(idx+1, profit);
                                        }
                                        return(
                                            <View style={[styles.gridBox, {backgroundColor: profit===0?"#d8d8da":profit<0?"red":"lightgreen"}]}>
                                                <Text style={{color:"#fff", textAlign:"center", alignItems:"center", justifyContent:"center"}}>{day}</Text>
                                            </View>
                                        )
                                    })
                                }
                                </View>
                            </View>
                        );
                    })
                }
                <View style={{height:50}}></View>
            </ScrollView>
            }
        </View>
    )
}

export default Detail;

const styles = StyleSheet.create({
    chartBtn:{
        flexDirection:"row", 
        justifyContent:"space-around", 
        paddingHorizontal:5, 
        width:"70%", 
        height:35,
        marginLeft:"auto", 
        marginRight:"auto",
        borderRadius:35/2,
        alignItems:"center",
        marginVertical:10
     },
     gridContent:{
        flexDirection:"row",
        flexWrap:"wrap",
        width:"90%",
        alignItems:"center",
        marginLeft:"auto",
        marginRight:"auto",
        justifyContent: 'center',
        
    },
    gridBox:{
        width:40,
        height:40,
        margin:3,
        borderRadius:40/2,
        justifyContent:"center"
    }, 
})