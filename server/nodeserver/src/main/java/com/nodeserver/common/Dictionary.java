package com.nodeserver.common;


/**
 * 数据字典
 * @author weix
 * @version 2018-3-24
 */
public enum Dictionary {

	DICTIONARY_TMPLTYPE ("TMPLTYPE" , "模板类型"),
	DICTIONARY_COURSETYPE ("COURSETYPE" , "课程类型"),
	DICTIONARY_COURSELEVEL("COURSELEVEL","课程等级"),
	DICTIONARY_ROLETYPE ("ROLETYPE","角色类型"),
	DICTIONARY_IAMTYPE ("IAMTYPE" , "IAM类型");

	private String dicCode;//字典代码
    private String dicName;//字典名称


    private Dictionary(String dicCode,  String dicName) {
        this.dicCode = dicCode;
        this.dicName = dicName;
    }

    /**
     * 获取字典代码
     * @return
     */
    public String getDicCode() {
        return this.dicCode;
    }

    /**
     * 获取字典名称
     * @return
     */
    public String getDicName() {
        return this.dicName;
    }

}