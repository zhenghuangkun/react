package com.nodeserver.common;

/**
 * 权限标识符常量
 *
 * @author zhenghk
 * @date 2018/6/28
 */
public class ShiroPermissionConstant {

	public static final String PWDSalt = "reactServer";	


	/*-------------------------------------------
    |   用户管理                                 |
    ============================================*/
	/**
	 * 用户管理
	 */
	public static final String userManagement = "userManagement";

	/*-------------------------------------------
    |   系统管理                                 |
    ============================================*/
	/**
	 * 系统管理
	 */
	public static final String systemManage = "systemManage";
	/**
	 * 角色管理
	 */
	public static final String systemManage_role = "systemManage_role";
	/**
	 * 权限管理
	 */
	public static final String systemManage_permission = "systemManage_permission";
	/**
	 * 菜单管理
	 */
	public static final String systemManage_menu = "systemManage_menu";


	/*-------------------------------------------
    |   系统信息管理                              |
    ============================================*/
	/**
	 * 系统信息管理
	 */
	public static final String sysInfoManage = "sysInfoManage";
	/**
	 * 安全日志
	 */
	public static final String sysInfoManage_log = "sysInfoManage_log";
	/**
	 * 系统公告
	 */
	public static final String sysInfoManage_notice = "sysInfoManage_notice";
	/**
	 * 系统设置
	 */
	public static final String sysInfoManage_sysSet = "sysInfoManage_sysSet";



}
