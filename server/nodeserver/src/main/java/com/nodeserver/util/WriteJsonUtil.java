package com.nodeserver.util;

import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class WriteJsonUtil {

	private static final Logger log = LoggerFactory.getLogger(WriteJsonUtil.class);

	/**
	 * 将后台list对象数据转成JSONArray 通过HttpServletResponse
	 * 返回到前端
	 * @author weix
	 * @param obj   list 对象
	 * @param response HttpServletResponse
	 */
	public static void writeJsonArray(Object obj, HttpServletResponse response) {
		/**
		 * update by chenrt
		 */
		response.setContentType("text/html;charset=UTF-8");
		try {
			response.getWriter().write(JSON.toJSONStringWithDateFormat(obj, "yyyy-MM-dd HH:mm:ss"));
			response.getWriter().flush();
			response.getWriter().close();
		} catch (IOException e) {
			log.error("error", e);
		}
	}


	/**
	 * 将后台Object数据转成JSONArray 通过HttpServletResponse
	 * 返回到前端
	 * @autho weixin
	 * @param obj   对象
	 * @param response HttpServletResponse
	 */
	public static void writeJsonObject(Object obj, HttpServletResponse response) {
		/**
		 * update by chenrt
		 */
		writeJsonArray(obj, response);
	}
}
