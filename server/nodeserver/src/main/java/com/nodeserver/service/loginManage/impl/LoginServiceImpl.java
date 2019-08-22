package com.nodeserver.service.loginManage.impl;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONObject;
import com.nodeserver.common.ShiroPermissionConstant;
import com.nodeserver.common.VerCode;
import com.nodeserver.dao.LoginManage.LoginDao;
import com.nodeserver.entity.*;
import com.nodeserver.service.base.impl.BaseServiceImpl;
import com.nodeserver.service.loginManage.LoginService;
import com.nodeserver.util.*;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;


/**
 * 登录管理service 接口实现类
 *
 * @author zhenghk
 */
@Service("LoginService")
public class LoginServiceImpl extends BaseServiceImpl<LoginDao, ResponseEntity, Integer> implements LoginService {

	@Autowired
	private GenerateVerificationCodeUtils generateVerificationCodeUtils;

	
	@Override
	public ResponseEntity userLoginManage(HttpServletRequest request) {
		
		String param = request.getParameter("data");
		System.out.println(param);
		
		
		RequestBody requestBody = new RequestBody();
		JSONObject jsonObj = JSONObject.parseObject(param);
		requestBody = jsonObj.toJavaObject(RequestBody.class);
		if(requestBody == null){
			return null;
		}
		
		System.out.println(requestBody);
		
		ResponseEntity respEntity = new ResponseEntity();
		ResponseHeader respHeader = new ResponseHeader();
		// 先设置登录失败
		respHeader.setStatus(0);
		
		String username = requestBody.getUserName();
		String password = requestBody.getPassWord();
		String verCode = requestBody.getVerificationCode();
		String phoneNumber = requestBody.getPhoneNumber();
		try{
			// 匹配验证码是否正确
			String code = generateVerificationCodeUtils.getVerificationCode(phoneNumber, VerCode.LOGIN_VER);
			if(code != null && !code.isEmpty() && code.equals(verCode)){
				// empty
			}else{
				respEntity.setResponseHeader(respHeader);
				return respEntity;
			}
			
			
			//获取认证主体，如果主体已存在，则将当前的主体退出
			Subject subject = SecurityUtils.getSubject();
			UsernamePasswordToken token = new UsernamePasswordToken(username, password);
			subject.login(token);
			
			//int ret = baseDao.findUserById(requestBody.getUserName(), requestBody.getPassWord());
			
			// 登录成功
			respHeader.setStatus(1);
			//if(ret == 0){
				//respHeader.setStatus(0);
			//}
			
			
			respEntity.setResponseHeader(respHeader);
			
			// 登录成功后, 删除之前保存的验证码
			generateVerificationCodeUtils.deleteVerificationCode(phoneNumber, VerCode.LOGIN_VER);
						
			return respEntity;
		}catch (LockedAccountException ex) {
			
			respEntity.setResponseHeader(respHeader);
			return respEntity;
		} catch (ExcessiveAttemptsException e) {
			respEntity.setResponseHeader(respHeader);
			return respEntity;
		} catch (AuthenticationException ex) {
			respEntity.setResponseHeader(respHeader);
			return respEntity;
		} catch (Exception e) {
			respEntity.setResponseHeader(respHeader);
			return respEntity;
		} finally{
			// 登录成功后, 删除之前保存的验证码
			// generateVerificationCodeUtils.deleteVerificationCode(username, VerCode.LOGIN_VER);
		}
		
		
		
	}
	
	@Override
	public ResponseEntity sendPhoneVerCode(HttpServletRequest request) {
		
		String param = request.getParameter("data");
		
		RequestBody requestBody = new RequestBody();
		JSONObject jsonObj = JSONObject.parseObject(param);
		requestBody = jsonObj.toJavaObject(RequestBody.class);
		if(requestBody == null){
			return null;
		}
		
		ResponseEntity respEntity = new ResponseEntity();
		ResponseHeader respHeader = new ResponseHeader();
		// 先设置登录失败
		respHeader.setStatus(0);
		
		String phoneNumber = requestBody.getPhoneNumber();
		try{
			
			generateVerificationCodeUtils.saveVerificationCode(phoneNumber, VerCode.LOGIN_VER);
			String code = generateVerificationCodeUtils.getVerificationCode(phoneNumber, VerCode.LOGIN_VER);
			System.out.println(code);
			respEntity.setResponseHeader(respHeader);
			
			// 保存成功
			respHeader.setStatus(1);	
			return respEntity;
		} catch (Exception e) {
			respEntity.setResponseHeader(respHeader);
			return respEntity;
		} 
		
		
		
	}
	
	@Override
	public User findUserInfo(HttpServletRequest request){
		String param = request.getParameter("data");
		RequestBody requestBody = new RequestBody();
		JSONObject jsonObj = JSONObject.parseObject(param);
		requestBody = jsonObj.toJavaObject(RequestBody.class);
		if(requestBody == null){
			return null;
		}
		User user = baseDao.findUserInfo(requestBody.getUserName(), requestBody.getPassWord());
		return user;
	}


	@Override
	public User findUserInfo(String userName, String passWord) {
		User user = baseDao.findUserInfo(userName, passWord);
		return user;
	}
	
	@Override
	public User findUserInfo(String userName) {
		User user = baseDao.findUserInfoByUserId(userName);
		return user;
	}
	
}
