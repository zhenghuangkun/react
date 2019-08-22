package com.nodeserver.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 时间工具类
 *
 * @version 2017-9-28
 * @author   weix
 */
public class TimeUtils {
	
    private static Logger log = LoggerFactory.getLogger(TimeUtils.class);
    
	//获取系统当前时间
	public static String currentTime() {
		Date dt = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(dt);
	}

	//获取系统当前日期
	public static String currentDate() {
		Date dt = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(dt);
	}

	/**
	 * 取两位小数
	 * @param value
	 * @return
	 */
	public static double convert(double value) {
		long l1 = Math.round(value * 100);
		double ret = l1 / 100.0;
		return ret;
	}
	
	/**
	 * 计算两个时间分钟差
	 * @author weixin
	 * @version 2018年4月7日
	 * @param nowDate
	 * @param endDate
	 * @return
	 */
	public static Long getMinutesDifference(Date nowDate, Date endDate) {
	    long nm = 1000 * 60;
	    return (endDate.getTime() - nowDate.getTime()) / nm;
	}
	
	/**
	 * Date to String
	 * @author weixin
	 * @version 2018年4月7日
	 * @param date
	 * @return yyyy-MM-dd HH:mm:ss
	 */
	  public static String getStringDate(Date date) {
	     SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	     return formatter.format(date);
	  }
	  
	  /**
	   *   String to Date
	   * @param strDate
	   * @return
	   */
		public static Date getDateString(String strDate) {
		   SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		   Date date = null;
		   try {
			   date =  formatter.parse(strDate);
			} catch (ParseException e) {
				log.error(e.getMessage());
			}
		   return date;
		}
		
		/**
		 * 计算未来时间
		 * @author weixin
		 * @version 2018年4月9日
		 * @param currentTime 当前时间
		 * @param length	 时差
		 * @return
		 * @throws ParseException
		 */
	public static String getAfterTime(String currentTime, Long length) {
		   SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		   Long time = null;
		   try {
			   time =  formatter.parse(currentTime).getTime();
			} catch (ParseException e) {
				log.error(e.getMessage());
				return "";
			}
		   time += length;//计算时差之后时间
		  return formatter.format(new Date(time));
	}
}
