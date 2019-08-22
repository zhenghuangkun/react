package com.nodeserver.filter;




import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import com.nodeserver.util.XssShieldUtil;

public class XssHttpServletRequestWraper extends HttpServletRequestWrapper{


	public XssHttpServletRequestWraper(HttpServletRequest request) {
		super(request);
	}

	@Override
	public String getHeader(String name) {

		return XssShieldUtil.stripXss(super.getHeader(name));
	}

	@Override
	public String getParameter(String name) {

		return XssShieldUtil.stripXss(super.getParameter(name));
	}

	@Override
	public String[] getParameterValues(String name) {
		String[] values = super.getParameterValues(name);
		if(values == null){
			return values;
		}

		String[] newValues = new String[values.length];
		for(int i=0; i<values.length; i++){
			newValues[i] = XssShieldUtil.stripXss(values[i]);
		}
		return newValues;
	}
}
