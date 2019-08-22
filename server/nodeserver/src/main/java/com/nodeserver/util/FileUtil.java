package com.nodeserver.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 文件操作工具类
 * @author weixin
 * @version 2018年4月9日
 */
public class FileUtil {
	
    private static Logger log = LoggerFactory.getLogger(FileUtil.class);
	
	/**
	 * 
	 * @author weixin
	 * @version 2018年4月9日
	 * @param fileUrl
	 * @return
	 */
	public static String readRemoteFile(String fileUrl){
		/*判断路径是否为空*/
		if ("".endsWith(fileUrl) || fileUrl == null) {
			return "";
		}
		URL url;
		InputStream is;
		URLConnection connection;
		StringBuffer strbf = new StringBuffer();
		try {
			/*远程读取文件*/
			url = new URL(fileUrl);
			connection = url.openConnection();
			is = connection.getInputStream();
			BufferedReader br = new BufferedReader(new InputStreamReader(is,"UTF-8"));
            String str = "";
            /*解析文件内容*/
            while ((str = br.readLine()) != null) {
            	strbf.append(str);
            }
            br.close();
		} catch (MalformedURLException e) {
			log.error(e.getMessage());
			return "";
		} catch (IOException e) {
			log.error(e.getMessage());
			return "";
		}
		
		return strbf.toString();
	}

}
