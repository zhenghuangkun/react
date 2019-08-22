package com.nodeserver.service.base;

import java.util.List;
import java.util.Map;


/**
 * 通用Service
 *
 * @param <T>  实体
 * @param <PK> 主键
 * @author weix
 */
public interface BaseService<T, PK> {

	/**
	 * 查询（根据主键ID查询）
	 *
	 * @param id
	 * @return
	 */
	T selectByPrimaryKey(PK id);

	/**
	 * 查询（根据主键ID查询集合）
	 *
	 * @param id
	 * @return
	 */
	List<T> listByPrimaryKey(PK id);


	/**
	 * 删除（根据主键ID删除）
	 *
	 * @param id
	 * @return
	 */
	boolean deleteByPrimaryKey(PK id);

	/**
	 * 添加
	 *
	 * @param entity
	 * @return
	 */
	boolean insert(T entity);

	/**
	 * 添加 （匹配有值的字段）
	 *
	 * @param entity
	 * @return
	 */
	boolean insertSelective(T entity);


	/**
	 * 修改
	 *
	 * @param entity
	 * @return
	 */
	boolean updateByPrimaryKey(T entity);

	/**
	 * 修改 （匹配有值的字段）
	 *
	 * @param entity
	 * @return
	 */
	boolean updateByPrimaryKeySelective(T entity);

	/**
	 * 查询（根据任意字段查询）
	 *
	 * @param {field，value}
	 * @return
	 */
	T selectByCondition(Map<String, Object> condition);

	/**
	 * 查询（任意字段返回多个结果）
	 *
	 * @param {field，value}
	 * @return
	 **/
	List<T> listByCondition(Map<String, Object> condition);

}
