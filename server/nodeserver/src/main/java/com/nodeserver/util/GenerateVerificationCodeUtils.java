package com.nodeserver.util;

import com.nodeserver.service.redis.RedisService;
import com.nodeserver.controller.Login.LoginController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GenerateVerificationCodeUtils {
	@Autowired
	private RedisService redisService;

	private static Logger log = LoggerFactory.getLogger(LoginController.class);

	//生成验证码并且保存至redis
	public void saveVerificationCode(String phone, String operationCode){
		//生成动态验的手机验证证码
		int verificationCode = (int)((Math.random()*9+1)*100000);
		try {
			redisService.set(operationCode+":"+phone, String.valueOf(verificationCode), 60*60);
		}catch (Exception e){
			log.error("redis保存验证码异常", e);
		}
	}

	//获取验证码
	public String getVerificationCode(String phone, String operationCode){
		try {
			String verificationCode = redisService.get(operationCode+":"+phone);
			if (null != verificationCode){
				return verificationCode;
			}
		}catch (Exception e){
			log.error("redis连接异常", e);
		}
		return null;
	}

	//验证验证码是否正确
	public Boolean validationCode(String phone, String verCode, String operationCode){
		try {
			if (redisService.get(operationCode+":"+phone).equals(verCode)){
				return true;
			}
		}catch (Exception e){
			log.error("redis连接异常", e);
		}
		return false;
	}

	//登陆成功后删除验证码
	public void deleteVerificationCode(String phone, String operationCode){
		try{
			redisService.del(operationCode+":"+phone);

		}catch (Exception e){
			log.error("redis连接异常，删除验证码失败", e);
		}
	}


	/**
	 *风控
	 */


	public void saveRiskControlVerCode(String sessionId){
		try {
			redisService.set(sessionId, "miaomiaomiao", 60);
		}catch (Exception e){
			log.error("redis保存验证码异常", e);
		}
	}

	public String getRiskControlVerCode(String sessionId){
		try {
			
			return redisService.get(sessionId);
		}catch (Exception e){
			log.error("redis连接异常", e);
		}
		return null;
	}
}
