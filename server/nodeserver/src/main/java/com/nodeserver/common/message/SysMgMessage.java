package com.nodeserver.common.message;


/**
 * 系统管理消息处理
 * @author weix
 * @version 2018-3-19
 */
public enum SysMgMessage implements Message {
	/**
	 * 系统管理消息
	 */
	
	ROLE_EXISTS(10006 , "角色已存在"),
	MENU_EXISTS(10007 , "菜单已存在"),
	PERMISSION_SET_ERROR(10008 , "权限配置失败"),
	
	FILEINFO_INSERT_MESSAGE(10009, "文件入库失败，文件数量为空");
	
	private int code;//消息代码
    private String content;//消息内容
   

    private SysMgMessage(int code,  String content) {
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