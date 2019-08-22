package com.nodeserver.common.message;


/**
 * IAM消息处理
 * @author wy
 * @version 2018-3-28
 */
public enum IamMessage implements Message {
	/**
	 * 系统管理消息
	 */
	ADD_IAM_SUCCES(10100 , "添加AWS IAM信息成功!"),
	ADD_IAM_ERROR(10101 , "添加AWS IAM信息失败!"),
	EXIST_IAM_DATA(10102 , "IAM用户名已经存在,请重新输入！"),
	DELETE_IAM_ERROR(10103 , "删除AWS IAM数据信息失败!"),
	DELETE_IAM_SUCCESS(10104 , "删除AWS IAM数据信息成功!"),
	EDIT_IAM_ERROR(10105, "编辑AWS IAM数据信息失败!"),
	EDIT_IAM_SUCCESS(10106, "编辑AWS IAM数据信息成功!"),
	EDIT_IAMIAMName_ERROR(10107, "IAM用户名已经存在,请重新编辑!");
	
	
	private int code;//消息代码
    private String content;//消息内容
   
    private IamMessage(int code,  String content) {
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
