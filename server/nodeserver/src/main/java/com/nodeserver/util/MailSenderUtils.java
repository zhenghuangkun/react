package com.nodeserver.util;

import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.apache.poi.ss.formula.functions.Na;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class MailSenderUtils {
	@Autowired
	private JavaMailSender javaMailSender;
	@Autowired
	private SimpleMailMessage simpleMailMessage;
	@Autowired
	private FreeMarkerConfigurer freeMarkerConfigurer;

	public void send(String Name, String content, String email,String freemarker) {
		String to = email;
		String text = "";
		Map<String, String> map = new HashMap<String, String>(1);
		map.put("Name", Name);
		map.put("content", content);
		try {
			// 根据模板内容，动态把map中的数据填充进去，生成HTML
			Template template = freeMarkerConfigurer.getConfiguration().getTemplate(freemarker);
			// map中的key，对应模板中的${key}表达式
			text = FreeMarkerTemplateUtils.processTemplateIntoString(template, map);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
		sendMail(to, null, text);
	}

	public void send(String Name, String teacherName, String courseName, String url, String email, String freemarker) throws IOException, TemplateException {
		String to = email;
		String text = "";
		Map<String, String> map = new HashMap<String, String>(1);
		map.put("Name", Name);
		map.put("teacherName", teacherName);
		map.put("courseName",courseName);
		map.put("url",url);

			// 根据模板内容，动态把map中的数据填充进去，生成HTML
			Template template = freeMarkerConfigurer.getConfiguration().getTemplate(freemarker);
			// map中的key，对应模板中的${key}表达式
			text = FreeMarkerTemplateUtils.processTemplateIntoString(template, map);
		sendMail(to, null, text);
	}

	public void sendMail(String to, String subject, String content) {
		try {
			MimeMessage message = javaMailSender.createMimeMessage();
			MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
			messageHelper.setFrom(simpleMailMessage.getFrom());
			if (subject != null) {
				messageHelper.setSubject(subject);
			} else {
				messageHelper.setSubject(simpleMailMessage.getSubject());
			}
			messageHelper.setTo(to);
			messageHelper.setText(content, true);
			javaMailSender.send(message);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}
}
