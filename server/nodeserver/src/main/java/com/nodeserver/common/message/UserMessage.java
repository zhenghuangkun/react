package com.nodeserver.common.message;


/**
 * 用户管理消息处理
 * @author wy
 * @version 2018-3-28
 */
public enum UserMessage implements Message {
	/**
	 * 系统管理消息
	 */
	ADD_USER_SUCCES(10100 , "添加用户信息成功!"),
	ADD_USER_ERROR(10101 , "添加用户息失败!"),
	EXIST_USER_DATA(10102 , "邮箱或电话号码已经存在,请检查后重新提交！"),
	DELETE_USER_ERROR(10103 , "删除用户数据信息失败!"),
	DELETE_USER_SUCCESS(10104 , "删除用户数据信息成功!"),
	EDIT_USER_ERROR(10105, "编辑用户数据信息失败!"),
	EDIT_USER_SUCCESS(10106, "编辑用户数据信息成功!"),
	EDIT_USERRealName_ERROR(10107, "邮箱或电话号码已经存在,请重新编辑!"),
	EXIST_USERSTUID_DATA(10108 , "学号、邮箱或电话号码已经存在,请检查后重新提交！"),
	DOWNLOAD_EXCEL(10109,"下载导入模板成功"),
	SEND_EDIT_PWD_EMAIL_CODE_SUCCESS(10110,"发送邮件验证码成功"),
	SEND_EDIT_PWD_EMAIL_CODE_ERROR(10111,"发送邮件验证码失败"),
	EDIT_USER_PWD_ERROR(10112,"修改用户密码失败"),
	EDIT_USER_PWD_SUCCESS(10113,"修改用户密码成功"),
	EMAIL_VER_CODE_ERROR(10114,"邮箱验证码错误");


	private int code;//消息代码
    private String content;//消息内容

    private UserMessage(int code,  String content) {
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
