package com.nodeserver.common.message;


/**
 * 系统管理消息处理
 * @author zhenghk
 * @version 2018-3-21
 */
public enum CourseMessage implements Message {
	/**
	 * 课程管理消息
	 */

	ADD_COURSE_SUCCES(10200 , "课程提交审核成功"),
	ADD_COURSE_ERR(10201 , "课程提交审核失败"),
	SAVE_COURSE_SUCCES(10202 , "课程保存成功"),
	SAVE_COURSE_ERR(10203 , "课程保存失败"),
	COURSEPIC_UPLOAD_OK(10204 , "课程图片上传成功."),
	COURSEPIC_UPLOAD_NG(10205 , "课程图片上传失败."),
	EXPERIMENT_GUILD_UPLOAD_OK(10206 , "实验指南上传成功."),
	EXPERIMENT_GUILD_UPLOAD_NG(10207 , "实验指南上传失败."),
	ADD_COURSE_EXPERIMENT_GROUP_OK(10208 , "添加课程实验组成功."),
	ADD_COURSE_EXPERIMENT_GROUP_NG(10209 , "添加课程实验组失败."),
	ADD_COURSE_EXPERIMENT_OK(10210 , "添加课程实验成功."),
	ADD_COURSE_EXPERIMENT_NG(10211 , "添加课程实验失败."),
	ADD_COURSE_ERR_NOT_EXPERIMENT(10212 , "添加失败.您还没有添加实验,请添加课程实验."),
	MODIFY_COURSE_SUCCES(10213 , "课程提交审核成功"),
	MODIFY_COURSE_ERR(10214 , "课程提交审核失败"),
	COURSE_PIC_FILE_CLONE_ERR(10215,"课程图片上传失败"),
	GUIDE_FILED_CLONE_ERR(10216,"实验指南上传失败"),
	COURSE_CLONE_SUCCESS(10217,"课程克隆成功"),
	COURSE_DELETE_SUCCESS(10218,"课程删除成功"),
	COURSE_THROUGH_AUDIT_SUCCESS(10219,"审核通过"),
	COURSE_THROUGH_AUDIT_FAIL(10220,"审核不通过"),
	COURSE_AUDIT_ERROR(10221,"审核错误！！"),
	ADD_EXPERIMENT_GROUP_SUCCESS(10222,"添加成功"),
	APPRAISE_REPORT_SUCCESS(10223,"实验报告评价成功"),
	CREATE_KEYPAIR_SUCCESS(10224,"密钥创建成功"),
	CREATE_KEYPAIR_ERR(10224,"密钥创建失败."),
	KEYPAIR_EXIST(10225,"密钥已存在"),
	NO_EXIST_SUCCES(10226 , "实验组不存在"),
	DISABLE_EXPERIMENT_GROUP_SUCCESS(10227 , "禁用实验组成功"),
	ENABLE_EXPERIMENT_GROUP_SUCCESS(10228 , "启用实验组成功"),
	COURSE_STARTUP_TIME_ERR(10229 , "请求失败.课程自启动时间不能小于当前的时间！"),
	COURSE_LAUNCH_SUCCESS(10230 , "课程发布成功"),
	COURSE_LAUNCH_ERR(10231 , "课程发布失败"),
	ADD_COURSE_TYPE_SUCCESS(10232 , "课程类型添加成功"),
	ADD_COURSE_TYPE_ERR(10233 , "课程类型添加失败"),
	COURSE_TYPE_EXIST(10234 , "添加失败,课程类型已存在."),
	EXPERIMENT_TIME_EXIST(10235 , "实验时间异常."),
	COURSE_EXPERIMENT_START_SUCCESS(10236 , "课程实验启动成功."),
	COURSE_EXPERIMENT_START_ERR(10237 , "课程实验启动失败."),
	GET_EXPERIMENT_INSTANCE_SUCCESS(10238 , "取得实验实例成功."),
	GET_EXPERIMENT_INSTANCE_ERR(10239 , "取得实验实例成功."),
	COURSE_NAME_EXIST(10239 , "已存在同名的课程,请修改课程名再提交."),
	ADD_EXPERIMENT_GROUP_ERR(10240,"添加实验组失败"),
	MODIFY_EXPERIMENT_GROUP_SUCCESS(10241,"修改成功"),
	MODIFY_EXPERIMENT_GROUP_ERR(10242,"修改失败"),
	GET_EXPERIMENT_GROUP_SUCCESS(10243, "取得实验组成功"),
	GET_EXPERIMENT_GROUP_ERR(10244, "取得实验组失败"),
	GET_ALL_TEMPLATE_SUCCESS(10245, "取得模板成功"),
	GET_ALL_TEMPLATE_ERR(10246, "取得模板失败"),
	COURSE_DELETE_ERR_FOR_PLATFORM_MANAGE_USER(10247,"课程已发布，您没有权限操作.");
	
	private int code;//消息代码
    private String content;//消息内容


    private CourseMessage(int code,  String content) {
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
