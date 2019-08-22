package com.nodeserver.dao.LoginManage;

import org.apache.ibatis.annotations.Param;

import com.nodeserver.dao.base.BaseDao;
import com.nodeserver.entity.*;



/**
 * 课程管理dao 接口
 * @author zhenghk
 *
 */
public interface LoginDao extends BaseDao<ResponseEntity, Integer>{

	public int findUserById(@Param("userName") String userName, @Param("passWord")  String passWord);
	
	public User findUserInfo(@Param("userName") String userName, @Param("passWord")  String passWord);
	
	public User findUserInfoByUserId(@Param("userName") String userName);
	
}
