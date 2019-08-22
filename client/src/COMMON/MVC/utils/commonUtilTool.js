

const CommonUtilTool = {
    isNullOrEmpty(value){
        if(!value){
            return true;
        }

        if(typeof(value) === 'string'){
            if(value.length == 0){
                return true;
            }else{
                return false;
            }
        }

        if(typeof(value) === 'object'){
            // array
            if(Array.isArray(value)){
                if(value.length == 0){
                    return true;
                }else{
                    return false
                }

            // object
            }else{
                let arr = Object.keys(value);
                if(arr.length == 0){
                    return true;
                }else{
                    return false;
                }
            }
        }

        return false;
    },

    isPhoneNumber(phoneNo){
        let pattern = /^1[134578]\d{9}$/; 
        return pattern.test(phoneNo);
    }
    
}

module.exports = CommonUtilTool;