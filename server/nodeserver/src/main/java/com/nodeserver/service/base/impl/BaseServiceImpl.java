package com.nodeserver.service.base.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.nodeserver.dao.base.BaseDao;
import com.nodeserver.service.base.BaseService;


/**
 *
 * @author weix
 *
 * @param <M>   通用Mapper
 * @param <T>   实体
 * @param <PK>  主键
 */
public class BaseServiceImpl<M extends BaseDao<T, PK>, T, PK extends Serializable> implements BaseService<T, PK> {

    @Autowired
    protected M baseDao;


    /**
     * 判断数据库操作是否成功
     *
     * @param result
     *            数据库操作返回影响条数
     * @return boolean
     */
    protected boolean retBool(int result) {
        return result >= 1;
    }

    /**
     * 查询（根据主键ID查询）
     * @param id
     * @return
     */
    @Override
    public T selectByPrimaryKey(PK id) {
        return baseDao.selectByPrimaryKey(id);
    }

    /**
     * 查询（根据主键ID查询集合）
     * @param id
     * @return
     */
	@Override
	public List<T> listByPrimaryKey(PK id) {
		return baseDao.listByPrimaryKey(id);
	}

	/**
     * 删除（根据主键ID删除）
     * @param id
     * @return
     */
    @Override
    public boolean deleteByPrimaryKey(PK id) {
        return retBool(baseDao.deleteByPrimaryKey(id));
    }

    /**
     * 添加
     * @param entity
     * @return
     */
    @Override
    public boolean insert(T entity) {
        return retBool(baseDao.insert(entity));
    }

    /**
     * 添加 （匹配有值的字段）
     * @param entity
     * @return
     */
    @Override
    public boolean insertSelective(T entity) {
        return retBool(baseDao.insertSelective(entity));
    }

    /**
     * 修改
     * @param entity
     * @return
     */
    @Override
    public boolean updateByPrimaryKey(T entity) {
        return retBool(baseDao.updateByPrimaryKey(entity));
    }

    /**
     * 修改 （匹配有值的字段）
     * @param entity
     * @return
     */
    @Override
    public boolean updateByPrimaryKeySelective(T entity) {
        return retBool(baseDao.updateByPrimaryKeySelective(entity));
    }

    /**
     * 查询（根据任意字段查询）
     * @param {field，value}
     * @return
     */
	@Override
	public T selectByCondition(Map<String, Object> condition) {
		return baseDao.selectByCondition(condition);
	}


    /**
     *
     * 查询（任意字段返回多个结果）
     * @param {field，value}
     * @return
     **/
	 @Override
    public List<T> listByCondition(Map<String,Object> condition) {
        return baseDao.listByCondition(condition);
    }
}
