package com.nodeserver.service.loginManage;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.nodeserver.entity.*;
import com.nodeserver.service.base.BaseService;



/**
 * 课程管理service
 * @author zhenghk
 *
 */
public interface LoginService extends BaseService<ResponseEntity, Integer> {

	/**
	 * 查询用户
	 * @param request
	 * @return
	 */
	ResponseEntity userLoginManage(HttpServletRequest request);
	
	/**
	 * 发送验证码
	 * @param request
	 * @return
	 */
	ResponseEntity sendPhoneVerCode(HttpServletRequest request);
	
	 
	/**
	 * 查询用户
	 * @param userName
	 * @param passWord
	 * @return
	 */
	User findUserInfo(HttpServletRequest request);
	
	/**
	 * 查询用户
	 * @param userName
	 * @param passWord
	 * @return
	 */
	User findUserInfo(String userName, String passWord);
	
	/**
	 * 查询用户
	 * @param userName
	 * @return
	 */
	User findUserInfo(String userName);
}
