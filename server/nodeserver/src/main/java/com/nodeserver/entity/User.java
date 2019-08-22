package com.nodeserver.entity;


import java.io.Serializable;

/**
 * 用户类
 * @author zhenghk
 *
 */
public class User implements Serializable {

	
	private static final long serialVersionUID = 380154045822708243L;
	
	/**
	 * 用户名
	 */
	private String userName;
	
	/**
	 * 密码
	 */
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
		return "User [userName=" + userName + ", passWord=" + passWord + "]";
	}
	
	
}
