/*! bootstrap Validation Plugin - v1.0.0 - 3/20/2018
 * https://xxxxxxx/xxx
 * Copyright (c) 2018 WeiXin; Licensed MIT */
(function($) {
    $.fn.bootstrapValidator.validators.minNumber = {
		/**
         * 自定义验证输入的数字小数点位数不能大于两位
         *
         * @param {BootstrapValidator} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            var ArrMen= value.split(".");    //截取字符串
            if(ArrMen.length==2){
                if(ArrMen[1].length>2){    //判断小数点后面的字符串长度
                    return false;
                }
            }
            return true;
        }
    }
    $.fn.bootstrapValidator.validators.selectVerify = {
		/**
         * 自定义验证下拉选择框
         * @author zhenghuangkun
         * @param {BootstrapValidator} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.val();
            if(value == "0"){
            	return false;
            }
            return true;
        }
    }
    $.fn.bootstrapValidator.validators.labelVerify = {
		/**
         * 自定义验证下文本-label
         *
         * @param {BootstrapValidator} validator Validate plugin instance
         * @param {jQuery} $field Field element
         * @param {Object} options
         * @returns {Boolean}
         */
        validate: function(validator, $field, options) {
            var value = $field.text();
            if(value == ""){
            	return false;
            }
            return true;
        }
    }
    $.fn.bootstrapValidator.validators.numeric = {
            html5Attributes: {
                message: 'message',
                separator: 'separator'
            },

            /**
             * 验证小数、数字、非零
             *
             * @param {BootstrapValidator} validator The validator plugin instance
             * @param {jQuery} $field Field element
             * @param {Object} options Consist of key:
             * - message: The invalid message
             * - separator: The decimal separator. Can be "." (default), ","
             * @returns {Boolean}
             */
            validate: function(validator, $field, options) {
                var value = $field.val();
                if (value == '') {
                    return true;
                }
                if (value == 0) {
                	return false;
                }
                var separator = options.separator || '.';
                if (separator != '.') {
                    value = value.replace(separator, '.');
                }

                return !isNaN(parseFloat(value)) && isFinite(value);
            }
        };
}(window.jQuery));