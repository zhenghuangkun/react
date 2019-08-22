package com.nodeserver.entity;

public class ResponseHeaderErrMsg {
	/**
	 * 异常码
	 */
	private String errCode;
	
	/**
	 * 异常信息
	 */
	private String errMsg;

	public String getErrCode() {
		return errCode;
	}

	public void setErrCode(String errCode) {
		this.errCode = errCode;
	}

	public String getErrMsg() {
		return errMsg;
	}

	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}

	@Override
	public String toString() {
		return "ResponseHeaderErrMsg [errCode=" + errCode + ", errMsg="
				+ errMsg + "]";
	}
	
	
}
