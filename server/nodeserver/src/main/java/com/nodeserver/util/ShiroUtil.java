package com.nodeserver.util;


import com.alibaba.fastjson.JSONObject;
import com.nodeserver.entity.User;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

import java.util.List;

public class ShiroUtil {

    /**
     * 判断当前是否登录状态
     * @return
     */
    public static boolean isCurrentUser(){
        return getCurrentUser() != null;
    }


    public static Subject getSubject() {
        return SecurityUtils.getSubject();
    }

    /**
     * 查询当前登录者信息
     * @return ShiroUser
     */
    public static User getCurrentUser() {
        return  (User) getSubject().getPrincipal();
    }


    /**
     * 查询当前登录者 用户名
     * @return
     */
    public static String getCurrentUsername() {
        return getCurrentUser().getUserName();
    }
    /**
     * 查询当前登录者 用户Id
     * @return
     */
    public static String getCurrentUserId() {
        return getCurrentUser().getUserName();
    }

	/**
	 * Returns true if the Subject is assigned any one of the specified roles, false otherwise.
	 * @param roleIdentifiers
	 * @return
	 */
	public static boolean hasOneRoles(List<String> roleIdentifiers){
		boolean[] booleans = getSubject().hasRoles(roleIdentifiers);
		for (boolean item : booleans) {
			if(item){
				return true;
			}
		}
		return false;
	}

	public static JSONObject checkUserParam(String userName, String userRealName, String userPhone, String unitName, Integer roleId, String userEmail, int type) {
		if (Validator.isBlank(userName)) {
			return JsonTool.falseResult("登录名不能为空！！");
		}
		if (Validator.isBlank(userRealName)) {
			return JsonTool.falseResult("用户名不能为空！！");
		}
		if (Validator.isBlank(userPhone)) {
			return JsonTool.falseResult("手机号不能为空！！");
		}
		if (!Validator.isNumeric(userPhone)) {
			return JsonTool.falseResult("请输入正确格式的手机号！！");
		}
		if (roleId == null) {
			return JsonTool.falseResult("请选择管理人员类型！！");
		}
		if (Validator.isNotBlank(userEmail) && !Validator.isEmail(userEmail)) {
			return JsonTool.falseResult("邮箱格式不正确！！");
		}
		return null;
	}
}
