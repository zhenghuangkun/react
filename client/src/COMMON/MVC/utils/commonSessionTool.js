
import commonUtilTool from './commonUtilTool';

const sStorage = window.sessionStorage;
const gTypeArray = [];
const STRINGTYPE = "STRING:";
const NUMBERTYPE = "NUMBER:";
const BOOLEANTYPE = "BOOLEAN:";
const OBJECTTYPE = "OBJECT:";
const ARRAYTYPE = "ARRAY:";


const CommonSessionTool = {
    
    push(name, value){
        if(!name || typeof(name) !== 'string'){
            return false;
        }
        if(!value){
            return false;
        }
        var obj = {};
        obj.id = name;
        obj.value = STRINGTYPE;
        

        if(typeof(value) === 'string'){
            sStorage[name] = STRINGTYPE + value;
            //obj.value = STRINGTYPE;
        }else if(typeof(value) === 'number'){
            sStorage[name] = NUMBERTYPE + value;
            //obj.value = NUMBERTYPE;
        }else if(typeof(value) === 'boolean'){
            sStorage[name] = BOOLEANTYPE + value;
            //obj.value = BOOLEANTYPE;
        }else if(typeof(value) === 'object'){
            // array
            if(Array.isArray(value)){
                //obj.value = ARRAYTYPE;
                var tmpValue = ARRAYTYPE + JSON.stringify(value);
                sStorage[name] = tmpValue;

            // object
            }else{
                sStorage[name] = OBJECTTYPE + JSON.stringify(value);
                //obj.value = OBJECTTYPE;
            }
        }

        
        //gTypeArray.push(obj);
        
        //console.log(gTypeArray);
        return true;
    },

    get(name){
        if(commonUtilTool.isNullOrEmpty(name)){
            return;
        }
        
        var value = sStorage[name];
        
        if(commonUtilTool.isNullOrEmpty(value)){
            return '';
        }

        var type = this.getNameType(name);

        value = value.replace(type, '');
        //console.log('value=', value, 'type=', type);

        // string
        if(type == STRINGTYPE){
            return value;

        // number
        }else if(type == NUMBERTYPE){
            return parseInt(value);

        // boolean
        }else if(type == BOOLEANTYPE){
            return value == 'true' ? true : false;

        // object
        }else if(type == OBJECTTYPE){
            return JSON.parse(value);

        // array
        }else if(type == ARRAYTYPE){
            

            return JSON.parse(value);
        }

    },

    delete(key){
        sStorage.removeItem(key);
        
    },

    clean(){
        sStorage.clear();
    },

    getNameType(name){
        if(!name){
            return '';
        }

        let type = STRINGTYPE;
        // var i = 0;
        // var len = gTypeArray.length;
        // if(len == 0){
        //     return '';
        // }

        // gTypeArray.map((value, item) => {
            
        //     if(value.id == name){
        //         type = value.value;
        //         return true;
        //     }else{
        //         return false;
        //     }
        // });
        let value = sStorage[name];
        if(value.indexOf(STRINGTYPE) != -1){
            type = STRINGTYPE;
        }else if(value.indexOf(NUMBERTYPE) != -1){
            type = NUMBERTYPE;
        }else if(value.indexOf(BOOLEANTYPE) != -1){
            type = BOOLEANTYPE;
        }else if(value.indexOf(OBJECTTYPE) != -1){
            type = OBJECTTYPE;
        }else if(value.indexOf(ARRAYTYPE) != -1){
            type = ARRAYTYPE;
        }

        return type;
    }
}

module.exports = CommonSessionTool;