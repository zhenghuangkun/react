package com.nodeserver.util;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * 获取配置文件中的账单文件储存桶名称bucket_name，付款主账号accountId
 * @author lijf
 * @date 2018年5月14日 下午4:52:48
 */
public class PropertyUtil {
	private  final Logger logger = LoggerFactory.getLogger(PropertyUtil.class);
    private  Properties props;
    private  String filePath;
    

    private void loadProps(){
    	logger.info("开始加载properties文件内容.......");
        props = new Properties();
        InputStream in = null;
        try {
            in = PropertyUtil.class.getClassLoader().getResourceAsStream(filePath);
            //in = PropertyUtil.class.getResourceAsStream("/jdbc.properties");
            props.load(in);
        } catch (FileNotFoundException e) {
            logger.error(filePath+"文件未找到");
        } catch (IOException e) {
            logger.error("出现IOException");
        } finally {
            try {
                if(null != in) {
                    in.close();
                }
            } catch (IOException e) {
                logger.error("jdbc.properties文件流关闭出现异常");
            }
        }
        logger.info("加载properties文件内容完成...........");
        logger.info("properties文件内容：" + props);
    }
    public PropertyUtil(String filePath){
    	this.filePath=filePath;
    	loadProps();
    }
    public  String getProperty(String key){
        if(null == props) {
            loadProps();
        }
        return props.getProperty(key);
    }

    public  String getProperty(String key, String defaultValue) {
        if(null == props) {
            loadProps();
        }
        return props.getProperty(key, defaultValue);
    }
}
