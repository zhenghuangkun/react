package com.nodeserver.filter;

import java.util.Enumeration;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.servlet.AdviceFilter;

public class ShiroLoginFilter extends AdviceFilter {

	/**
     * 前处理,这里用于判断这此请求是不是ajax请求
     *
     */
	@Override
	protected boolean preHandle(ServletRequest req, ServletResponse resp)
			throws Exception {
		
		HttpServletRequest request = (HttpServletRequest)req;
        HttpServletResponse response = (HttpServletResponse)resp;
        //获取请求头中的信息，ajax请求最大的特点就是请求头中多了 X-Requested-With 参数
        String requestType = request.getHeader("Content-Type");
        Enumeration<String> names =  request.getHeaderNames();
        System.out.println(names);
        String url = request.getRequestURI();
        String data = request.getParameter("data");
        System.out.println(url);
        System.out.println(data);
        if("x-www-form-urlencoded".equals(requestType) || requestType.contains("x-www-form-urlencoded")){
            System.out.println("本次请求是FETCH请求!");
            //现在的用途就是判断当前用户是否被认证
            //先获取到由Web容器管理的subject对象
            Subject subject = SecurityUtils.getSubject();
            //判断是否已经认证
            boolean isAuthc = subject.isAuthenticated();
            if(!isAuthc){
                System.out.println("当前账户使用Shiro认证失败!");
                //如果当前账户没有被认证,本次请求被驳回，ajax进入error的function中进行重定向到登录界面。
                response.setStatus(401);
                //response.setStatus(401, "请先登录后调用");
                return false;
            }
            return true;
        }else{
            //如果请求类型不是ajax，那么此时requestType为null
            System.out.println("非FETCH请求!");
        }
        

        //默认返回的是true，将本次请求继续执行下去
		return super.preHandle(request, response);
	}
	
	/**
     * 后处理，类似于AOP中的后置返回增强
     * 在拦截器链执行完成后执行
     * 一般用于记录时间。
     */
	@Override
	protected void postHandle(ServletRequest request, ServletResponse response)
			throws Exception {
		
		super.postHandle(request, response);
	}
	
	/**
     * 最终处理，一定会执行的，一般用于释放资源。
     * 先留着
     */
	@Override
	public void afterCompletion(ServletRequest request,
			ServletResponse response, Exception exception) throws Exception {
		
		super.afterCompletion(request, response, exception);
	}

}
