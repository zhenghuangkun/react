package com.nodeserver.common.message;

public enum ForgetPwdMessage implements Message  {
	VER_USER_SUCCESS(10100,"用户验证成功"),
	VER_USER_ERROR(10101,"用户验证失败"),
	VER_USER_EMAIL_SUCCESS(10102,"用户邮箱验证成功"),
	VER_USER_EMAIL_ERROR(10103,"用户邮箱验证失败"),
	SEND_EMAIL_VER_CODE_SUCCESS(10104,"邮箱验证码发送成功"),
	EDIT_USER_PASSWORD_SUCCESS(10105,"修改密码成功"),
	EDIT_USER_PASSWORD_ERROR(10106,"修改密码失败"),
	IMG_VER_CODE_ERROR(10107,"图片验证码输入错误"),
	SEND_EMAIL_VER_CODE_ERROR(10108, "邮箱验证码发送失败");

	private int code;//消息代码
	private String content;//消息内容


	private ForgetPwdMessage(int code, String content) {
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
