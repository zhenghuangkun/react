package com.nodeserver.common.message;


/**
 * 模板消息处理
 * @author weix
 * @version 2018-3-21
 */
public enum TmplMessage implements Message {
	/**
	 * 系统管理消息
	 */
	TMPLATE_ADD_SUCCESS (10100 , "模板添加成功"),
	
	TMPLATE_EXISTS (10101 , "该模板已存在"),
	
	TMPLATE_NO_EXISTS (10102 , "该模板不存在"),
	
	TMPLATE_IMG_UPLOAD_ERROR (10103, "模板缩略图上传错误"),
	
	TMPLATE_IMG_UPLOAD_SUCCESS (10104, "模板缩略图上传成功"),
	
	TMPLATE_SCRIPT_UPLOAD_ERROR (10105, "模板资源脚本上传错误"),
	
	TMPLATE_SCRIPT_UPLOAD_SUCCESS (10106, "模板资源脚本上传成功"),
	
	TMPLATE_FILESERVER_ERROR (10107, "文件服务器返回错误"),
	
	TMPLATE_DELETE_SUCCESS  (10108, "模板删除成功"),
	
	TMPLATE_EDIT_SUCCESS (10109, "模板修改成功"),
	
	TMPLATE_RELEASE_SUCCESS (10110, "模板发布成功"),
	
	TMPLATE_COLLECTION_EXISTS (10111, "模板已被收藏"),
	
	TMPLATE_COLLECTION_SUCCESS (10112, "模板收藏成功"),
	
	TMPLATE_COLLECTION_CANCEL_SUCCESS (10113, "取消收藏成功"),
	
	TMPLATE_COLLECTION_NOEXISTS (10114, "不存在收藏记录"),
	
	TMPLATE_COMMENT_SUCCESS (10115, "评论成功"),
	
	TMPLATE_COMMENT_DELETE_SUCCESS (10116, "删除评论成功"),
	
	TMPLATE_USE_APPLY_SUCCESS (10117, "申请提交成功，可在模板测试中查看申请进度"),
	
	TMPLATE_USE_APPLY_FAILURE (10118, "申请失败，您的申请已在审核中"),
	
	TMPLATE_REVIEW_SUCCESS (10119, "操作成功"),
	
	TMPLATE_REVIEW_FAILURE (10120, "操作失败,该记录已被审核"),
	
	TMPLATE_REVIEW_REFUSE (10121, "启动失败，申请信息不存在或模板未审核通过"),
	
	TMPLATE_START_FAILURE(10122, "启动失败，资源已启动"),
	
	TMPLATE_RESOURCE_CREATE_FAILURE(10123, "启动失败，资源未创建成功"),
	
	TMPLATE_START_SUCCESS(10124, "资源创建成功"),
	
	TMPLATE_START_ERROR(10125, "资源创建过程中出现错误"),
	
	TMPLATE_RESOURCE_DELETE_ERROR (10126, "堆栈信息不存在"),
	
	TMPLATE_RESOURCE_DELETE_ERROR_NO_EXISTS (10127, "资源不存在或已被删除"),
	
	TMPLATE_RESOURCE_DELETE_SUCCESS (10128, "资源释放成功"),
	
	TMPLATE_INSTANCE_AMI_CREATE_ERROR (10129, "镜像创建出错了,可能是该实例已被终止"),
	
	TMPLATE_INSTANCE_AMI_CREATE_SUCCESS (10129, "镜像创建成功"),
	
	TMPLATE_INSTANCE_AMI_DELETE_FAILURE (10130, "镜像删除失败"),
	
	TMPLATE_INSTANCE_AMI_DELETE_SUCCESS (10131, "镜像删除成功"),
	
	TMPLATE_INSTANCE_AMI_UPDATE_SUCCESS (10132, "镜像修改成功"),
	
	TMPLATE_RELEASE_APPLY_SUCCESS (10133, "模板发布申请提交成功"),
	
	TMPLATE_RELEASE_EXISTS (10134, "模板已发布"),
	
	TMPLATE_RELEASE_REVIEW_WAITTING (10135, "发布正在审核中，请勿重复提交"),
	
	TMPLATE_RELEASE_REVIEW_SUCCESS (10136, "审核提交成功"),
	
	TMPLATE_RELEASE_REVIEW_REFUSE (10137, "模板发布审核未通过"),
	
	TMPLATE_RELEASE_CANCEL_REFUSE (10138, "模板取消发布成功");
	
	private int code;//消息代码
    private String content;//消息内容
   

    private TmplMessage(int code,  String content) {
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