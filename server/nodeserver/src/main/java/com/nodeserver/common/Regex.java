package com.nodeserver.common;

public class Regex {
	public static final String RULE_EMAIL = "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$";
	public static final String RULE_PHONE = "^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$";
}
