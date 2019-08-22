package com.nodeserver.util;

import eu.bitwalker.useragentutils.Browser;
import eu.bitwalker.useragentutils.UserAgent;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

/**
 * 用于处理下载文件时，火狐浏览器文件名乱码问题
 */
public class DownloadUtil {

	public static void parseHeader (String fileName, HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
		String USER_AGENT = request.getHeader("USER-AGENT");
		UserAgent userAgent = UserAgent.parseUserAgentString(USER_AGENT);
		Browser browser = userAgent.getBrowser();
		String name;
		if (browser == Browser.FIREFOX) {
			name =  new String(fileName.getBytes("UTF-8"), "iso-8859-1");
		} else {
			name = URLEncoder.encode(fileName, "UTF-8");
		}

		response.setContentType("application/octet-stream");
		response.setHeader("Content-Disposition", "attachment;filename=" + name);
	}
}
