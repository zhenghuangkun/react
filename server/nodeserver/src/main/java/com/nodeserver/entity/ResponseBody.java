package com.nodeserver.entity;


import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.annotation.JSONField;
import com.alibaba.fastjson.serializer.JSONSerializer;
import com.alibaba.fastjson.serializer.ObjectSerializer;

import java.io.IOException;
import java.io.Serializable;
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 用户类
 * @author zhenghk
 *
 */
public class ResponseBody implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 380154045822708243L;
	
	private String userName;
	
	private String passWord;

	

	public String getUserName() {
		return userName;
	}



	public void setUserName(String userName) {
		this.userName = userName;
	}



	public String getPassWord() {
		return passWord;
	}



	public void setPassWord(String passWord) {
		this.passWord = passWord;
	}



	@Override
	public String toString() {
		return "RequestBody [userName=" + userName + ", passWord=" + passWord
				+ "]";
	}
	
	
}
