package com.nodeserver.controller.Login;


import com.alibaba.fastjson.JSONObject;
import com.nodeserver.common.Common;
import com.nodeserver.common.Dictionary;
import com.nodeserver.common.ShiroPermissionConstant;
import com.nodeserver.common.VerCode;
import com.nodeserver.common.message.CourseMessage;
import com.nodeserver.common.message.TmplMessage;
import com.nodeserver.entity.*;
import com.nodeserver.service.loginManage.LoginService;
import com.nodeserver.util.*;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Controller
@RequestMapping("login")
public class LoginController {

	/**
	 * 登录service
	 */
	@Autowired
	private LoginService loginService;
	
	/**
	 * 验证码管理工具
	 */
	@Autowired
	private GenerateVerificationCodeUtils generateVerificationCodeUtils;

	
	/**
	 * 课程管理
	 * @return
	 */
	@RequestMapping(value = "/login",  method = RequestMethod.GET , produces = "text/html; charset=UTF-8")
	public String coursemgtCourseInfo() {
		return "/login";
	}
	
	@RequestMapping("/testJson")
	@ResponseBody
	public RequestBody testJson(HttpServletRequest request){
		List<String> list = new ArrayList<String>();
		
		String param = request.getParameter("data");
		System.out.println(param);
		
		
		RequestBody requestBody = new RequestBody();
		JSONObject jsonObj = JSONObject.parseObject(param);
		requestBody = jsonObj.toJavaObject(RequestBody.class);
		if(requestBody == null){
			return null;
		}
		
		System.out.println(requestBody);
		
		list.add(requestBody.getUserName());
		list.add(requestBody.getPassWord());
		
		User user = ShiroUtil.getCurrentUser();
		
		requestBody.setUserName(user.getUserName());
		requestBody.setPassWord(user.getPassWord());
		
		return requestBody;
	}
	
	@RequestMapping("/login")
	@ResponseBody
	public ResponseEntity login(HttpServletRequest request){
		
		
		return loginService.userLoginManage(request);
	}
	
	@RequestMapping("/sendPhoneVerCode")
	@ResponseBody
	public ResponseEntity sendPhoneVerCode(HttpServletRequest request){
		
		
		return loginService.sendPhoneVerCode(request);
	}
	
}
