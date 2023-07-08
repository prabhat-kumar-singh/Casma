import { useEffect, useState } from "react"
import { Text, View, Dimensions, TouchableOpacity, StyleSheet } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { getDimensions } from "./helper"

const Chart = ({chartData, themeColor}) => {

    const [data, setData] = useState({});
    const [period, setPeriod] = useState("daily");

    useEffect(()=>{
        let res = getDimensions(chartData);
        setData(res);
    }, [chartData])

    const chartConfig = {
        backgroundGradientFrom: "#d8d8da",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 0.5,


        color: (opacity = 1) => themeColor,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
      };

    const screenWidth = Dimensions.get("window").width-40;

    return(
        <View>

            <View style={{justifyContent:"center", alignItems:"center", marginVertical:5}}>
            <Text style={{textAlign:"center"}}>Income Chart</Text>
            <View>
                {
                    data[period]!==undefined && data[period]["income"]["x"].length<2 && 
                    <View style={{height: 150, paddingHorizontal:15, alignItems:"center", justifyContent:"center"}}>
                        <Text>Atleast 2 days of data for daily Chart and 2 Months of data for monthly Chart is required to show chart</Text>
                    </View> 
                }
            </View>
            {data[period]!==undefined && data[period]["income"]["x"].length>=2 && <LineChart 
            data={{
                labels: data[period]["income"]["x"],
                datasets: [
                    {
                    data: data[period]["income"]["y"]
                    },
                    {
                        data:[0] //minimum
                    },
                    {
                        data:[2*Math.max(...data[period]["income"]["y"])] //maximum
                    }
                ]
            }}
            width={screenWidth}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            />}
        </View>

        {/*Toggle between monthly and daily chart */}
        <View style={styles.mode}>
                <View style={{borderTopLeftRadius:20, borderTopRightRadius:0, borderBottomRightRadius:0, borderBottomLeftRadius:20,  width:"50%", backgroundColor: period==="daily"?themeColor:"#fff", borderColor:themeColor, borderWidth:2}}>
                    <TouchableOpacity onPress={()=> setPeriod("daily")}>
                        <Text style={{fontWeight:"bold", paddingVertical: 10, textAlign:"center", color:period!=="daily"?themeColor:"#fff"}}>Daily Chart</Text>
                    </TouchableOpacity>
                </View>
                <View style={{borderTopLeftRadius:0, borderTopRightRadius:20, borderBottomRightRadius:20, borderBottomLeftRadius:0, width:"50%", backgroundColor: period==="monthly"?themeColor:"#fff", borderColor:themeColor, borderWidth:2}}>
                    <TouchableOpacity onPress={()=> setPeriod("monthly")}>
                        <Text style={{fontWeight:"bold", paddingVertical: 10, textAlign:"center", color:period!=="monthly"?themeColor:"#fff"}}>Monthly Chart</Text>
                    </TouchableOpacity>
                </View>
        </View>

        <View style={{justifyContent:"center", alignItems:"center", marginVertical:5}}>
            <Text style={{textAlign:"center"}}>Expenditure Chart</Text>
            {data[period]!==undefined && data[period]["expenditure"]["x"].length>=2 && <LineChart 
            data={{
                labels: data[period]["expenditure"]["x"],
                datasets: [
                    {
                    data: data[period]["expenditure"]["y"]
                    },
                    {
                        data:[0] //minimum
                    },
                    {
                        data:[2*Math.max(...data[period]["expenditure"]["y"])] //maximum
                    }
                ]
            }}
            width={screenWidth}
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            />}
        </View>
        </View>
    )
}

export default Chart;

const styles = StyleSheet.create({
     mode:{
        width:"85%",
        marginTop:15,
        marginLeft:"auto",
        marginRight:"auto",
        flexDirection:"row",
        justifyContent:"space-around"
    }
})