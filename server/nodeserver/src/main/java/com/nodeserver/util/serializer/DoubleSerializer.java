package com.nodeserver.util.serializer;

import com.alibaba.fastjson.serializer.JSONSerializer;
import com.alibaba.fastjson.serializer.ObjectSerializer;

import java.io.IOException;
import java.lang.reflect.Type;
import java.text.DecimalFormat;

public class DoubleSerializer implements ObjectSerializer {

	@Override
	public void write(JSONSerializer serializer, Object object, Object fieldName, Type fieldType, int features) throws IOException {
		Double value = (Double) object;
		DecimalFormat format = new DecimalFormat("#0.00");
		String s = format.format(value);
		serializer.write(s);
	}
}
