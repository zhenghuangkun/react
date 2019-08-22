package com.nodeserver.realm;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.nodeserver.common.ShiroPermissionConstant;
import com.nodeserver.entity.User;
import com.nodeserver.service.loginManage.LoginService;
import com.nodeserver.util.Md5Util;


public class ShiroDbRealm extends AuthorizingRealm {

	/**
	 * 登录service
	 */
	@Autowired
	private LoginService loginService;

	/**
	 * 日志
	 */
	private static final Logger log = LoggerFactory.getLogger(ShiroDbRealm.class);

	public ShiroDbRealm() {
        super();
    }


	/**
	 * 用户授权
	 *
	 * @param principalCollection
	 * @return
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
		
		// 从 principals获取主身份信息
        // 将getPrimaryPrincipal方法返回值转为真实身份类型（在上边的doGetAuthenticationInfo认证通过填充到SimpleAuthenticationInfo中身份类型）
		User user = (User) principalCollection.getPrimaryPrincipal();

		if(user == null) {
			log.error("用户不存在");
			return null;
		}


		SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
		
		simpleAuthorizationInfo.addRole("admin");

		return simpleAuthorizationInfo;
	}

	/**
	 * 登陆认证
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken authenticationToken) throws AuthenticationException {
		
		User user = null;
		//System.out.println(Md5Util.md5("123456", ShiroPermissionConstant.PWDSalt));
		//System.out.println(Md5Util.md5("c9eb9001a420f6574c27de05b2bcd8b5", ShiroPermissionConstant.PWDSalt));
		UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;
		String username;
		username = token.getUsername();
		
		user = loginService.findUserInfo(username);
		//System.out.println(user);
		if (null == user){
			//user = loginService.findUserInfo(token.getUsername(), token.getPassword().toString());
			throw new UnknownAccountException("用户不存在");
		}
		if (user != null) {
			/*if (Common.STATE_ACTIVE  == user.getUserState().intValue()) {
				return new SimpleAuthenticationInfo(user, user.getUserPwd(), ByteSource.Util.bytes(ShiroPermissionConstant.PWDSalt), getName());
			} else {
				log.error(token.getUsername() + "不可使用");
				throw new LockedAccountException();
			}*/
			
			
			return new SimpleAuthenticationInfo(user, user.getPassWord(), ByteSource.Util.bytes(ShiroPermissionConstant.PWDSalt), getName());
		} else {
			throw new UnknownAccountException("用户不存在");
		}

	}

	@Override
	protected void assertCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) throws AuthenticationException {
		super.assertCredentialsMatch(token, info);
	}

    /**
     * 清除所有用户授权信息缓存.
     */
    public void clearCachedAuthorizationInfo(String principal) {
        SimplePrincipalCollection principals = new SimplePrincipalCollection(principal, getName());
        clearCachedAuthorizationInfo(principals);
    }

    /**
     * 清除所有用户授权信息缓存.
     */
    public void clearAllCachedAuthorizationInfo() {
        Cache<Object, AuthorizationInfo> cache = getAuthorizationCache();
        if (cache != null) {
            for (Object key : cache.keys()) {
                cache.remove(key);
            }
        }
    }
    /**
     *
    * @Title: clearAuthz
    * @Description: TODO 清楚缓存的授权信息
    * @return void    返回类型
     */
    public void clearAuthz(){
        this.clearCachedAuthorizationInfo(SecurityUtils.getSubject().getPrincipals());
    }

}

