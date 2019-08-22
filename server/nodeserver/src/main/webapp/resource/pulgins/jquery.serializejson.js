/*!
  SerializeJSON jQuery plugin.
*/
(function($){
  $.prototype.serializeJSON=function(){  
      var a,o,h,i,e;  
      a=this.serializeArray();  
      o={};  
      h=o.hasOwnProperty;  
      for(i=0;i<a.length;i++){  
          e=a[i];  
          if(!h.call(o,e.name)){  
              o[e.name]=e.value;  
          }  
      }  
      return o;  
  };
})(jQuery);