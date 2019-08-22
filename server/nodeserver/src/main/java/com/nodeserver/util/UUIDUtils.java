package com.nodeserver.util;

import java.util.UUID;

/**
 *  UUID生成工具
 * @author weixin
 * @version 2018-3-19
 */
public class UUIDUtils {
	
		public static String getUUID(){
			return UUID.randomUUID().toString().replace("-", "");
		}
}
