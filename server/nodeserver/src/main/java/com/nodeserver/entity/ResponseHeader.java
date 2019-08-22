package com.nodeserver.entity;

import java.util.List;

public class ResponseHeader {
	/**
	 * 响应时间
	 * dateformat: YYYY-MM-DD hh:mm:ss
	 */
	private String responseTime;
	
	/**
	 * 请求正常:1 异常:0
	 */
	private int status;
	
	
	
	private List<ResponseHeaderErrMsg> errList;



	public String getResponseTime() {
		return responseTime;
	}



	public void setResponseTime(String responseTime) {
		this.responseTime = responseTime;
	}



	public int getStatus() {
		return status;
	}



	public void setStatus(int status) {
		this.status = status;
	}



	public List<ResponseHeaderErrMsg> getErrList() {
		return errList;
	}



	public void setErrList(List<ResponseHeaderErrMsg> errList) {
		this.errList = errList;
	}



	@Override
	public String toString() {
		return "ResponseHeader [responseTime=" + responseTime + ", status="
				+ status + ", errList=" + errList + "]";
	}
	
	
	
}
