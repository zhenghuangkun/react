package com.nodeserver.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.poifs.filesystem.DirectoryEntry;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

public class DocumentHandlerUtil {
	private Configuration configuration = null;
	private Map<String,Template> templateMap = null;
	
	public DocumentHandlerUtil() {
		templateMap =new HashMap<String, Template>();
		configuration = new Configuration();
		configuration.setDefaultEncoding("utf-8");
	}

	public  void createDoc(HttpServletResponse response,HttpServletRequest request,Map<String, Object> dataMap
			,String template
			,String saveUrl) {
		Template templateObj = null;
		try {
			synchronized ("") {
				if(templateMap.get(template) == null){
					//获取类路径
					ServletContext servletContext = request.getServletContext();
					//将word 模板放入WEB-INF 
					configuration.setServletContextForTemplateLoading(servletContext, "WEB-INF/classes");
					templateObj = configuration.getTemplate(template);
					templateObj.setEncoding("utf-8");
					templateMap.put(template, templateObj);
				}else{
					templateObj = templateMap.get(template);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		// 获取报告标题
		File outFile = new File(saveUrl);
		Writer out = null;
		try {
			out = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(outFile), "utf-8"));
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		try {
			//加载数据到模板文件
			templateObj.process(dataMap, out);
			out.close();
		} catch (TemplateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			if(out != null){
			   try {
				out.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
			}
		}
 
	}

	/**
	 * 下载服务器上的文件
	 * @param fileName  文件名
	 * @param filePathUrl   文件全路径
	 * @param response  
	 * @param request
	 */
		
	public static void download(HttpServletResponse response,HttpServletRequest request,String fileName,String filePathUrl) throws UnsupportedEncodingException{
		 downloadFile(response, request, fileName, filePathUrl);
	     deleteFile(filePathUrl);
	}
	
	/**
	 * 下载服务器上的文件
	 * @param response
	 * @param request
	 * @param fileName
	 * @param filePathUrl
	 */
	public static void downloadFile(HttpServletResponse response,HttpServletRequest request,String fileName,String filePathUrl){
		fileName = fileName.substring(fileName.lastIndexOf("_") + 1);
	    //获取文件名
		 BufferedInputStream bis = null;    
	     BufferedOutputStream bos = null;  
	     try{
	    	 //解决文件中文乱码  
	         if (request.getHeader("User-Agent").toLowerCase().indexOf("firefox") > 0){  
	        	 fileName = new String(fileName.getBytes("UTF-8"), "ISO8859-1");}//firefox浏览器  
	         else if (request.getHeader("User-Agent").toUpperCase().indexOf("MSIE") > 0){  
	        	 fileName = URLEncoder.encode(fileName, "UTF-8");}//IE浏览器  
	         response.reset();//清空缓存区，防止存在某些字符使得下载的文件格式错误
	         response.setContentType("application/vnd.ms-word");
            //如果是谷歌浏览器有时候会出现下载文件出现中文名导致下载文件的时候就只有后缀，原因可能是中文乱码（但是在打印出来不是乱码），谷歌自动将乱码的屏蔽了 
	         response.addHeader("Content-Disposition", "attachment;filename=" + new String((fileName).getBytes("GBK"),"ISO8859_1"));
	         bis = new BufferedInputStream(new FileInputStream(filePathUrl));  
	         bos = new BufferedOutputStream(response.getOutputStream());  
	         byte[] buff = new byte[2048];    
	         int bytesRead;    
	         while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {    
	             bos.write(buff, 0, bytesRead);    
	         }   
	   
	     }catch(Exception e){
	    	 e.printStackTrace();
	     }finally{
	    	 if(bis != null){
	    		 try {
	 				bis.close();
	 			} catch (IOException e) {
	 				e.printStackTrace();
	 			}finally{
	 				if(bos != null){
	 					try {
							bos.close();
						} catch (IOException e) {
							e.printStackTrace();
						}  
	 				}
	 			}   
	    	 }
	     }
	}
	
	
	/**
	 * 将带html标签的内容导出word
	 */
	public static void exportWordByPoi(String context
			,HttpServletResponse response
			,String urlRoot
			,String fileName
			){
        String htmlStr ="<html "+ insertStringInHtml() +"><head id='header1'>"+ insertStringInHead() + insertStringStyle() + "</head>";//拼接注意加上<html>  
        htmlStr +="<div style=\"line-height:8.11mm;\"><span >"+context+"</span></span></div>";  
        htmlStr += "</html>";  
        POIFSFileSystem poifs = null;
        ByteArrayInputStream bais = null;
        DirectoryEntry directory = null;
        FileOutputStream ostream = null;
        try {
        	byte b[] = htmlStr.getBytes("UTF-8");    
            bais = new ByteArrayInputStream(b);    
            poifs = new POIFSFileSystem();    
            directory = poifs.getRoot(); 
			directory.createDocument("WordDocument", bais);
			//输出文件  
			ostream = new FileOutputStream(urlRoot + "/" + fileName);    
			poifs.writeFilesystem(ostream);    
		} catch (IOException e1) {
			e1.printStackTrace();
		}finally{
	    	 if(bais != null){
	    		 try {
	    			 bais.close();
	 			} catch (IOException e) {
	 				e.printStackTrace();
	 			}finally{
	 				if(ostream != null){
	 					try {
	 						ostream.close();   
						} catch (IOException e) {
							e.printStackTrace();
						}  
	 				}
	 			}   
	    	 }
	     }    
	}
	
	//设置导出word 打开方式默认为页面形式
	public static String insertStringInHead(){
        String str = "<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:TrackMoves>false</w:TrackMoves><w:TrackFormatting/><w:ValidateAgainstSchemas/><w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid><w:IgnoreMixedContent>false</w:IgnoreMixedContent><w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText><w:DoNotPromoteQF/><w:LidThemeOther>EN-US</w:LidThemeOther><w:LidThemeAsian>ZH-CN</w:LidThemeAsian><w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript><w:Compatibility><w:BreakWrappedTables/><w:SnapToGridInCell/><w:WrapTextWithPunct/><w:UseAsianBreakRules/><w:DontGrowAutofit/><w:SplitPgBreakAndParaMark/><w:DontVertAlignCellWithSp/><w:DontBreakConstrainedForcedTables/><w:DontVertAlignInTxbx/><w:Word11KerningPairs/><w:CachedColBalance/><w:UseFELayout/></w:Compatibility><w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel><m:mathPr><m:mathFont m:val='Cambria Math'/><m:brkBin m:val='before'/><m:brkBinSub m:val='--'/><m:smallFrac m:val='off'/><m:dispDef/><m:lMargin m:val='0'/> <m:rMargin m:val='0'/><m:defJc m:val='centerGroup'/><m:wrapIndent m:val='1440'/><m:intLim m:val='subSup'/><m:naryLim m:val='undOvr'/></m:mathPr></w:WordDocument></xml><![endif]-->";
        return str;
    }
	public static String insertStringInHtml(){
        String str = " xmlns:v='urn:schemas-microsoft-com:vml'xmlns:o='urn:schemas-microsoft-com:office:office'xmlns:w='urn:schemas-microsoft-com:office:word'xmlns:m='http://schemas.microsoft.com/office/2004/12/omml'xmlns='http://www.w3.org/TR/REC-html40' ";
        return str;
    }
	
	//设置html 表格的样式
	public static String insertStringStyle(){
		String str = "<br/><style>"
				+ "table{border-collapse:collapse}"
				+ "</style>";
		return str;
	}
	 
	/**
	 * 删除文件
	 */
	public static void deleteFile(String filePathUrl){
		//下载后将服务器上的文件删除
		File file = new File(filePathUrl);
		file.delete();
	}
	
	/**
	 * 创建文件夹并返回url
	 */
	public static String createFolder(String realPath){
		 String folderUrl = realPath + "/" + dateToStr(new Date(), "yyyy-MM-dd");//文件夹名称
		 File fileAbosulteUrl = new File(folderUrl);
	 	    if(fileAbosulteUrl.exists() && fileAbosulteUrl.isDirectory()){
	 	    	try {
	 	    		fileAbosulteUrl.mkdir();
				} catch (Exception e) {
					e.printStackTrace();
				}
	 	    }
	 	 return folderUrl;
	}
	
	/**
	 * 返回上传文件全路径
	 * @param urlRoot    根路径
	 * @param dateStr    创建时间
	 * @param saveFile   文件保存名
	 */
	public static String getFullPath(String urlRoot,String dateStr,String saveFile){
		return urlRoot + "/" + dateStr.substring(0, 10) + "/" + saveFile;
	}
	
	/**
	 * 字符串转日期
	 * @param format  yyyy-MM-dd HH:mm:ss
	 */
	public static String dateToStr(Date date,String format){
		SimpleDateFormat sdf =   new SimpleDateFormat(format);
		return sdf.format(date);
	}
	/**
	 * 字符串转日期
	 * @param format  yyyy-MM-dd HH:mm:ss
	 * @throws ParseException 
	 */
	public static Date strTodate(String str,String format){
		SimpleDateFormat sdf =   new SimpleDateFormat(format);
		Date date = null;
		try {
			date = sdf.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}
	
	/**
	 * 配置导出word的路径
	 * @author huanggp
	 * @param request
	 * @return
	 */
	public static String fileRootUrl(HttpServletRequest request){
		String contextPath = request.getServletContext().getRealPath("/");;
		String urlRoot = contextPath + "static/exportDoc";
        return urlRoot;
	}
	
}

