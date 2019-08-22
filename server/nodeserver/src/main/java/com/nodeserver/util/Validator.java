package com.nodeserver.util;

import java.util.Collection;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 验证工具类
 * @author chenrt
 */
public class Validator {

	/**
	 * 判断oject是否为空，为空则抛出异常
	 * @param object 判断对象
	 * @param msg 异常信息
	 */
	public static void notNull(Object object, String msg) {
		if (object == null) {
			throw new NullPointerException(msg);
		}
	}

	/**
	 * 判断object是否为空
	 * @param object 判断对象
	 * @return
	 */
	public static boolean isNull(Object object) {
		return object == null;
	}

	/**
	 * !isNull(obj)
	 * @param object
	 * @return
	 */
	public static boolean isNotNull(Object object) {
		return !isNull(object);
	}

	/**
	 * 判断字符串是否为空
	 * @param str
	 * @return
	 */
	public static boolean isEmpty(String str) {
		return str == null || str.length() == 0;
	}

	/**
	 * !isEmpty(str)
	 * @param str
	 * @return
	 */
	public static boolean isNotEmpty(String str) {
		return !isEmpty(str);
	}

	/**
	 * 判断字符串是否是空字符串或者全由空白字符组成
	 * @param str
	 * @return
	 */
	public static boolean isBlank(String str) {
		if (isEmpty(str)) {
			return true;
		}
		return Pattern.matches("\\s*", str);
	}

	/**
	 * !isBlank(str)
	 * @param str
	 * @return
	 */
	public static boolean isNotBlank(String str) {
		return !isBlank(str);
	}

	/**
	 * 判断集合是否为空
	 * @param c
	 * @return
	 */
	public static boolean isEmpty(Collection<? extends Object> c) {
		return c == null || c.size() == 0;
	}

	/**
	 * !isEmpty(c)
	 * @param c
	 * @return
	 */
	public static boolean isNotEmpty(Collection<? extends Object> c) {
		return !isEmpty(c);
	}

	/**
	 * 判断map是否为空
	 * @param map
	 * @return
	 */
	public static boolean isEmpty(Map<? extends Object, ? extends Object> map) {
		return map == null || map.size() == 0;
	}

	/**
	 * !isEmpty(map)
	 * @param map
	 * @return
	 */
	public static boolean isNotEmpty(Map<? extends Object, ? extends Object> map) {
		return !isEmpty(map);
	}

	/**
	 * 判断字符串是否是数字
	 * @param str
	 * @return
	 */
	public static boolean isNumeric(String str) {
		Pattern pattern = Pattern.compile("[-|+]?[0-9]+\\.?[0-9]*");
		Matcher isNum = pattern.matcher(str);
		if (!isNum.matches()) {
			return false;
		}
		return true;
	}

	public static boolean isEmail(String email){
		Pattern pattern = Pattern.compile("^(\\w-*\\.*)+@(\\w-?)+(\\.\\w{2,})+$");
		Matcher matcher = pattern.matcher(email);
		if (!matcher.matches()) {
			return false;
		}
		return true;
	}
}
