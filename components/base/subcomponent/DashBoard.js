import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";

import { primaryText, secondaryHeading } from "../../dimensions";
import { filterData } from "./helper";


const DashBoard = (props) =>{
    const [period, setPeriod] = useState({
        data:{},
        transaction:[0, 0]
    });

    const themeColor = props.themeColor;


    const getData = async () => {
        let res = props.data;

        let finalData = filterData(res);
        setPeriod({...period, data: finalData})
        let date = new Date();
        let key = ""+(date.getMonth()+1)+""+date.getFullYear();
        let day = date.getDate();

        if(res[key]!==undefined && res[key][day]!==undefined){
            let cashIn = finalData[key][day]["IN"], cashOut = finalData[key][day]["OUT"];
            setPeriod({...period,data:finalData, transaction:[cashIn, cashOut]});
        }
    }
    
    useEffect(()=>{
        getData();
    }, [props.data])

    const getPeriodData = (param) => {
        let data = period.data;
        let date = new Date();
        let key = ""+(date.getMonth()+1)+""+date.getFullYear();
        let day = date.getDate();
    
        //if period is TODAY    
        if(param==="TODAY" ){
            if(data[key]!==undefined && data[key][day]!==undefined){
                let cashIn = data[key][day]["IN"], cashOut = data[key][day]["OUT"];
                setPeriod({...period, transaction:[cashIn, cashOut]});
            }else{
                setPeriod({...period, transaction:[0,0]})
            }
            
        }
        //if period is MONTH set monthly data
        else if(param==="MONTH" && data[key]!==undefined){
            let totalIn = 0, totalOut = 0;
            for(let day in data[key]){
                let transaction = data[key][day];
                totalIn+=parseInt(transaction["IN"]);
                totalOut+=parseInt(transaction["OUT"]);
            }
            setPeriod({...period, transaction:[totalIn, totalOut]})
        }else if(param==="ALL"){
            let totalIn = 0, totalOut = 0;
            for(let key in data){
                for(let day in data[key]){
                let transaction = data[key][day];
                totalIn+=parseInt(transaction["IN"]);
                totalOut+=parseInt(transaction["OUT"]);
                }
            }
            setPeriod({...period, transaction:[totalIn, totalOut]})
        }
    }


    return(
        <View style={[styles.container, {backgroundColor:themeColor}]}>
            <View style = {styles.cashflow}>
                <View style={{paddingHorizontal: 20, textAlign:"center"}}>
                    <Text style={{fontSize: secondaryHeading, color:"#fff"}}>Cash In</Text>
                    <Text style={{fontSize: primaryText, color:"green", textAlign:"center", backgroundColor:"#fff", borderRadius:20}}>{period.transaction[0]}</Text>
                </View>
                <View style={{paddingHorizontal: 20, textAlign:"center"}}>
                    <Text style={{fontSize: secondaryHeading, color:"#fff"}}>Cash Out</Text>
                    <Text style={{fontSize: primaryText, color:"red", textAlign:"center", backgroundColor:"#fff", borderRadius:20}}>{period.transaction[1]}</Text>
                </View>
            </View>
            <View style={styles.period}>
                {/*Today */}
                <View>
                    <TouchableOpacity onPress={()=>{
                        getPeriodData("TODAY")
                    }}>
                        <Text style={{fontSize: primaryText, color:"#fff"}}>Today</Text>
                    </TouchableOpacity>
                </View>

                {/*Monthly Data */}
                <View>
                    <TouchableOpacity onPress={()=>{
                        getPeriodData("MONTH")
                    }}>
                        <Text style={{fontSize: primaryText, color:"#fff"}}>This Month</Text>
                    </TouchableOpacity>
                </View>

                {/*Yearly Data*/}
                <View>
                    <TouchableOpacity onPress={()=>{
                        getPeriodData("ALL")
                    }}>
                        <Text style={{fontSize: primaryText, color:"#fff"}}>All Time</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default DashBoard;

const styles = StyleSheet.create({
    container:{
        width: "90%",
        marginLeft:"auto",
        marginRight:"auto",
        borderRadius:10,
        paddingVertical:3
    },
    cashflow:{
        flexDirection: "row",
        justifyContent: 'center',
        paddingBottom:20
    },
    period:{
        flexDirection:"row",
        justifyContent:"space-around",
    }
})