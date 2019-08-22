/*!
 * jQuery populateForm Plugin v1.0.0
 * Copyright 2017-9-29 weix
 * 
 * explaining: autofill the form by json
 * use: $("#formId").populateForm(json);
 */
(function($){
	$.fn.populateForm = function(data){
	    return this.each(function(){
	        var formElem, name;
	        if(data == null){this.reset(); return; }
	        for(var i = 0; i < this.length; i++){  
	            formElem = this.elements[i];
	            //checkbox的name可能是name[]数组形式
	            name = (formElem.type == "checkbox")? formElem.name.replace(/(.+)\[\]$/, "$1") : formElem.name;
	            if(data[name] == undefined) continue;
	            switch(formElem.type){
	                case "checkbox":
	                    if(data[name] == ""){
	                        formElem.checked = false;
	                    }else{
	                        //数组查找元素
	                        if(data[name].indexOf(formElem.value) > -1){
	                            formElem.checked = true;
	                        }else{
	                            formElem.checked = false;
	                        }
	                    }
	                break;
	                case "radio":
	                    if(data[name] == ""){
	                        formElem.checked = false;
	                    }else if(formElem.value == data[name]){
	                        formElem.checked = true;
	                    }
	                break;
	                case "button": break;
	                
	                case "select-one": {
	                	$("select[name='"+formElem.name+"']").val(data[name]);
	                }
	                break;
	                default: formElem.value = data[name];
	            }
	        }
	    });
	};   
})(jQuery);