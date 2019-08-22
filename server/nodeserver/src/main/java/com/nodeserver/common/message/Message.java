package com.nodeserver.common.message;
  
/**
 * 消息接口
 * @author weixin
 *@version 2018-3-19
 */
public interface Message {
    /**
     * 获取消息代码
     * @return
     */
    int getCode();
    
	/**
	 * 获取消息内容
	 */
	String getContent();
	
    /**
     * 控制台输出
     */
	void console();
}
