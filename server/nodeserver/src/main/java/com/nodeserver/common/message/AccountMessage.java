package com.nodeserver.common.message;


/**
 * 系统管理消息处理
 * @author weix
 * @version 2018-3-19
 */
public enum AccountMessage implements Message {
	/**
	 * 系统管理消息
	 */
	
	ADD_ACCOUNT_SUCCES(10100, "添加AWS Account信息成功!"),
	ADD_ACCOUNT_ERROR(10101, "添加AWS Account信息失败!"),
	EXIST_ACCOUNT_DATA(10102, "awsAccountID或awsAccount名称已经存在,请重新输入！"),
	DELETE_ACCOUNT_ERROR(10103, "删除AWS Account数据信息失败!"),
	DELETE_ACCOUNT_SUCCESS(10104, "删除AWS Account数据信息成功!"),
	EDIT_ACCOUNT_ERROR(10105, "编辑AWS Account数据信息失败!"),
	EDIT_ACCOUNT_SUCCESS(10106, "编辑AWS Account数据信息成功!"),
	EDIT_ACCOUNTID_ERROR(10107, "accountId已经存在,请重新编辑!"),
	EDIT_ACCOUNTNAME_ERROR(10108, "awsAccount名称已经存在,请重新编辑!");
	
	private int code;//消息代码
    private String content;//消息内容
   
    private AccountMessage(int code,  String content) {
        this.code = code;
        this.content = content;
    }

    /**
     * 获取消息代码
     * @return
     */
    @Override
    public int getCode() {
        return this.code;
    }
    
    /**
     * 获取消息内容
     * @return
     */
    @Override
    public String getContent() {
        return this.content;
    }

    /**
     *控制台输出消息内容
     */
    @Override
    public void console() {
        System.out.println(this.code + ":" + this.content);
    }
}