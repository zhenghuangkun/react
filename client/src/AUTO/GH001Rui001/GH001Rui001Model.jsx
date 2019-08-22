export default class GH001Rui001Model{
    /**
     * 用户名
     * {String}
     */
    userName = '';

    /**
     * 密码
     * {String}
     */
    passWord = '';

    /**
     * 手机号
     * {String} 
     */
    phone = '';

    /**
     * 验证码
     * {String} 
     */
    verificationCode = '';

    /**
     * 登录flg
     * {Boolean}
     */
    errFlag = false;

    /**
     * 错误信息
     * {Boolean}
     */
    errMessage = '';

    /**
     * 发送验证码
     * {String}
     */
    sndMsgText = "发送验证码";

    /**
     * 重新发送验证码
     * {String}
     */
    resndMsgText = "重新发送";

    /**
     * 重新发送验证码计数器
     * {Number}
     */
    resndMsgCount = 60;

    /**
     * 发送验证码Btn - text
     * {String}
     */
    sndMsgBtnText = "发送验证码";

    /**
     * 发送验证码Btn - disable属性
     * {Boolean}
     */
    sndMsgBtnDisabledFlg = false;
}