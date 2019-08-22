package com.nodeserver.util;

import org.apache.shiro.crypto.hash.Md5Hash;

public class Md5Util {

	public static String md5(String str,String salt)
	{
		return new Md5Hash(str, salt).toString();
	}

}
