'use strict';
import commonUtilTool from '../../COMMON/MVC/utils/commonUtilTool.js';

const conf = require('../../CONF/conf');

function getModel(fileName, lang){

    if(commonUtilTool.isNullOrEmpty(fileName)) {
        return null;
    }

    if(commonUtilTool.isNullOrEmpty(lang)) {
        return null;
    }

    let modelPath = fileName + "Model_" + lang + ".jsx";

    let model;
    try {
        model = require('./' + modelPath);
    }
    catch (error) {
        console.log('Loading path failed ...');
        console.log(error);
        return null;
    }

    return model;
}

module.exports = {
    getModel:getModel
}