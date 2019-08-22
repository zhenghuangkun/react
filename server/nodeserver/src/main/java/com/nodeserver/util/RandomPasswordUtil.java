package com.nodeserver.util;

import org.apache.shiro.crypto.hash.Md5Hash;

import com.nodeserver.common.ShiroPermissionConstant;

import java.util.Calendar;
import java.util.Random;

public class RandomPasswordUtil {

    public static void main(String[] args) {
        generatePassword();
    }
    public static String generatePassword(){
        Calendar calendar = Calendar.getInstance();
        String year = String.valueOf(calendar.get(Calendar.YEAR)).substring(2, 4);
        String month = String.format("%02d", calendar.get(Calendar.MONTH) + 1);
        //String fourRdnStr = getRandomString(4);
        String password = year +month;//+ fourRdnStr;
        return password;
    }
	public static  String getRandomString(int length) {
        length = length < 0 ? -length : length;
        char[] chs = new char[length];
        Random ran = new Random();
        for (int i = 0; i < chs.length; i++) {
            chs[i] = (char) (ran.nextInt(10) + '0');
        }
        return new String(chs);
    }

    public static String getHash(String str){
		Md5Hash md5Hash = new Md5Hash(str, ShiroPermissionConstant.PWDSalt, 1);
		return md5Hash.toString();
	}

}
