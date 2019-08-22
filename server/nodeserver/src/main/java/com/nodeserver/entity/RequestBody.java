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
public class RequestBody implements Serializable {

	/**
	 *
	 */
	private static final long serialVersionUID = 380154045822708243L;
	
	/**
	 * 用户名
	 */
	private String userName;
	
	/**
	 * 密码
	 */
	private String passWord;

	/**
	 * 手机号
	 */
	private String phoneNumber;

	/**
	 * 验证码
	 */
	private String verificationCode;

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

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getVerificationCode() {
		return verificationCode;
	}

	public void setVerificationCode(String verificationCode) {
		this.verificationCode = verificationCode;
	}

	@Override
	public String toString() {
		return "RequestBody [userName=" + userName + ", passWord=" + passWord
				+ ", phoneNumber=" + phoneNumber + ", verificationCode="
				+ verificationCode + "]";
	}
	
	
}
