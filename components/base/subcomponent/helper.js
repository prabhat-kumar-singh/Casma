const monthName = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
//helper for DashBoard Component
const filterData = (data) => {
    //function to store total cash in/out based on the time period
    let totalIn=0, totalOut=0;
    let res = {};
    let finalData = {};
    for(let key in data){

        let dailyData = {};
        
        for(let day in data[key]){
            let dailyIn=0, dailyOut = 0;
            for(let transaction of data[key][day]){
                if(transaction.mode==="IN") dailyIn+=parseInt(transaction.amount);
                else dailyOut+=parseInt(transaction.amount);
            }
            dailyData[day] = {"IN": dailyIn, "OUT": dailyOut};
        }

        finalData[key] = dailyData;
    }

    return finalData;

}

//helper for Chart Component
const getDimensions = (data) => {
    //console.log("data", data);
    const res = {
        daily:{
            income:{x:[], y:[]},
            expenditure:{x:[], y:[]}
        },
        monthly:{
            income:{x:[], y:[]},
            expenditure:{x:[], y:[]}
        }
    }

    let date = new Date();
    let currMonth = date.getMonth()+1;

    for(let key in data){
        let month = key.slice(0, -4);

        let totalIn = 0, totalOut = 0;
        for(let day in data[key]){
            let dailyIn=0, dailyOut = 0;
            for(let transaction of data[key][day]){
                if(transaction.mode==="IN") dailyIn+=parseInt(transaction.amount);
                else dailyOut+=parseInt(transaction.amount);
            }
            
            if(parseInt(month)=== currMonth){
                res["daily"]["income"]["x"].push(parseInt(day));
                res["daily"]["income"]["y"].push(dailyIn);
            
                res["daily"]["expenditure"]["x"].push(parseInt(day));
                res["daily"]["expenditure"]["y"].push(dailyOut);
            }
            totalIn+=parseInt(dailyIn);
            totalOut+=parseInt(dailyOut);
        }

        //setting for monthly data
        res["monthly"]["income"]["x"].push(monthName[parseInt(month)-1]);
        res["monthly"]["income"]["y"].push(totalIn);
            
        res["monthly"]["expenditure"]["x"].push(monthName[parseInt(month)-1]);
        res["monthly"]["expenditure"]["y"].push(totalOut);


    }

    return res;
}

//valid transaction field
const isValid = (data) => {
    //console.log("validating");
    //check if none of the field is empty
    let notEmpty = true;
    for(let key in data){
        if(data[key] && data[key]!=="") continue;
        notEmpty = false;
    }
    if(!notEmpty) return false;

    //check if amount is greater than 0
    let amountIsValue = parseInt(data.amount)>0?true:false;
    if(!amountIsValue) return false;

    return true;
}

//check for valid profile data
const isValidProfile = (data) => {
    //name must not be empty and contain atleast 5 characters
    console.log(data);
    if(data.name===undefined || data.name==="" || data.name.length<5) return false;
    
    //check for valid email
    if(data.email===undefined || data.email==="") return false;

    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    //console.log(validRegex);
    if (!validRegex) {
        return false;
    }
    
    return true;
}


export {filterData, getDimensions, isValid, isValidProfile}