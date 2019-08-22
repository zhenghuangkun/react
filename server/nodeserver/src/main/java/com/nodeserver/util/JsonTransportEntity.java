package com.nodeserver.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author weix
 * @param <T> List
 * @param <E> entity
 */
public class JsonTransportEntity<T,E,A,B,C> {
	/**
	 * 消息标记
	 * 标记动作是否成功
	 */
	private Boolean flag;

	/**
	 * 总个数
	 */
	private Long totalSize;

	/**
	 * 总页数
	 */
	private Long totalPage;


	/**
	 *
	 */
	private Integer currPage;

	/**
	 * 消息
	 */
	private String message ;

	/**
	 * 消息代码（需要时）
	 */
	private String code;

	/**
	 * 操作URL（需要时）
	 */
	private String url;

	/**
	 * 传输记录(需要时)
	 */
	private List<T> list;

	/**
	 * 单个对象实体
	 */
	private E entity;
	private A entity1;
	private B entity2;
	private C entity3;
	/**
	 * Key - Value
	 */
	private Map<String, Object> kv;

	public Boolean getFlag() {
		return flag;
	}

	public JsonTransportEntity setFlag(Boolean flag) {
		this.flag = flag;
		return this;
	}

	public Long getTotalSize() {
		return totalSize;
	}

	public void setTotalSize(Long totalSize) {
		this.totalSize = totalSize;
	}


	public Long getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(Long totalPage) {
		this.totalPage = totalPage;
	}

	public Integer getCurrPage() {
		return currPage;
	}

	public void setCurrPage(Integer currPage) {
		this.currPage = currPage;
	}

	public String getMessage() {
		return message;
	}

	public JsonTransportEntity setMessage(String message) {
		this.message = message;
		return this;
	}

	public String getCode() {
		return code;
	}

	public JsonTransportEntity setCode(String code) {
		this.code = code;
		return this;
	}

	public String getUrl() {
		return url;
	}

	public JsonTransportEntity setUrl(String url) {
		this.url = url;
		return this;
	}

	public List<T> getList() {
		return list;
	}

	public JsonTransportEntity setList(List<T> list) {
		this.list = list;
		return this;
	}

	public E getEntity() {
		return entity;
	}

	public JsonTransportEntity setEntity(E entity) {
		this.entity = entity;
		return this;
	}

	public Map<String, Object> getKv() {
		return kv;
	}

	public A getEntity1() {
		return entity1;
	}

	public void setEntity1(A entity1) {
		this.entity1 = entity1;
	}

	public B getEntity2() {
		return entity2;
	}

	public void setEntity2(B entity2) {
		this.entity2 = entity2;
	}

	public C getEntity3() {
		return entity3;
	}

	public void setEntity3(C entity3) {
		this.entity3 = entity3;
	}

	public JsonTransportEntity setKv(Map<String, Object> kv) {
		this.kv = kv;
		return this;
	}

	public JsonTransportEntity setKv(String key,Object value) {
		if(this.kv == null){
			this.kv = new HashMap<>();
		}
		this.kv.put(key,value);
		return this;
	}

	@Override
	public String toString() {
		return "JsonTransportEntity{" +
				"flag=" + flag +
				", totalSize=" + totalSize +
				", totalPage=" + totalPage +
				", currPage=" + currPage +
				", message='" + message + '\'' +
				", code='" + code + '\'' +
				", url='" + url + '\'' +
				", list=" + list +
				", entity=" + entity +
				", entity1=" + entity1 +
				", entity2=" + entity2 +
				", entity3=" + entity3 +
				", kv=" + kv +
				'}';
	}
}
