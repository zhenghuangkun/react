package com.nodeserver.util;

import java.awt.Color;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import jxl.CellView;
import jxl.format.Alignment;
import jxl.format.Border;
import jxl.format.BorderLineStyle;
import jxl.format.Colour;
import jxl.format.UnderlineStyle;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

public class ExportChannelExcel {

	/**
	 * 导出EXCEL的一些表头及excel格式的设置
	 * @param lab
	 * @param title 表格字段标题名称
	 * @param workbook
	 * @param sheet
	 * @throws WriteException 
	 * @throws IOException 
	 */
	public static void jxlUtil(Label lab,String[] title,WritableSheet sheet,WritableWorkbook workbook) throws WriteException, IOException{
		
		WritableFont wf2= new WritableFont(WritableFont.ARIAL,14,WritableFont.BOLD,false,UnderlineStyle.NO_UNDERLINE,Colour.BLACK); // 定义格式 字体 下划线 斜体 粗体 颜色
		WritableCellFormat wcfTitle = new WritableCellFormat(wf2);
		wcfTitle.setBackground(Colour.IVORY);  //象牙白
		wcfTitle.setBorder(Border.ALL, BorderLineStyle.THIN,Colour.BLACK); //BorderLineStyle边框
		//wcfTitle.setVerticalAlignment(VerticalAlignment.CENTRE); //设置垂直对齐
		wcfTitle.setAlignment(Alignment.CENTRE); //设置垂直对齐
		
		CellView navCellView = new CellView();  
		navCellView.setAutosize(true); //设置自动大小
		navCellView.setSize(18);
		WritableFont wfcNav =new WritableFont(WritableFont.ARIAL,12, WritableFont.BOLD,false,UnderlineStyle.NO_UNDERLINE,Colour.BLACK);
		WritableCellFormat wcfN=new WritableCellFormat(wfcNav);
		
		Color color = Color.decode("#0099cc"); // 自定义的颜色
		workbook.setColourRGB(Colour.ORANGE, color.getRed(),color.getGreen(), color.getBlue());
		wcfN.setBackground(Colour.ORANGE);
		wcfN.setBorder(Border.ALL, BorderLineStyle.THIN,Colour.BLACK); //BorderLineStyle边框
		wcfN.setAlignment(Alignment.CENTRE); //设置水平对齐
		wcfN.setWrap(false); //设置自动换行
		for(int i=0;i<title.length;i++){
			lab = new Label(i,0,title[i],wcfN); //Label(col,row,str);   
			sheet.addCell(lab);  
			sheet.setColumnView(i, new String(title[i]).length());  
		}
		WritableFont wfcontent =new WritableFont(WritableFont.ARIAL,18, WritableFont.NO_BOLD,false,UnderlineStyle.NO_UNDERLINE,Colour.BLACK);
        WritableCellFormat wcfcontent = new WritableCellFormat(wfcontent);
        wcfcontent.setBorder(Border.ALL,BorderLineStyle.THIN,Colour.BLACK); //BorderLineStyle边框
        wcfcontent.setAlignment(Alignment.CENTRE);
       
	}
	
	/**
	 * 执行全部结束的时候执行数据的写入和关闭流
	 * @param workbook
	 * @throws IOException
	 * @throws WriteException
	 */
	public static void writeOrClose(WritableWorkbook workbook) throws IOException, WriteException{
		workbook.write();// 写入数据
		workbook.close();// 关闭文件     
	}
	
	/***
	* 	下载服务器的文档数据
	* @param response
	* @param request
	* @param fileName
	* @param urlRoot
	*/
	public static void downloadFile(String fileName,String contextPath,String urlRoot,HttpServletResponse response,HttpServletRequest request){
		 //获取文件名
		BufferedInputStream bis = null;BufferedOutputStream bos = null;  
	    try{
	   	 //解决文件中文乱码  
	        if (request.getHeader("User-Agent").toLowerCase().indexOf("firefox") > 0){ //firefox浏览器   
	       	 	response.setHeader("content-disposition", String.format("attachment;filename*=utf-8'zh_cn'%s",URLEncoder.encode(fileName, "utf-8")));
	        } else if (request.getHeader("User-Agent").toUpperCase().indexOf("MSIE") > 0){  //IE浏览器  
		       	fileName = URLEncoder.encode(fileName, "UTF-8");
		       	response.reset();//清空缓存区，防止存在某些字符使得下载的文件格式错误
	        	response.setContentType("application/octet-stream;charset=utf-8");
	        	response.addHeader("Content-Disposition", "attachment;filename=" + new String((fileName).getBytes("GBK"),"ISO8859_1"));
	        }else{
	        	response.reset();//清空缓存区，防止存在某些字符使得下载的文件格式错误
	        	response.setContentType("application/octet-stream;charset=utf-8");
	        	//如果是谷歌浏览器有时候会出现下载文件出现中文名导致下载文件的时候就只有后缀，原因可能是中文乱码（但是在打印出来不是乱码），谷歌自动将乱码的屏蔽了 
	        	response.addHeader("Content-Disposition", "attachment;filename=" + new String((fileName).getBytes("GBK"),"ISO8859_1"));
	        }
	        bis = new BufferedInputStream(new FileInputStream(urlRoot));  
	        bos = new BufferedOutputStream(response.getOutputStream());  
	        byte[] buff = new byte[2048];    
	        int bytesRead;    
	        while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {    
	            bos.write(buff, 0, bytesRead);    
	        }   
	    }catch(Exception e){
	   	 e.printStackTrace();
	    }finally{
	    	if(bis != null || bos != null){
	    		try {
					bis.close();
					bos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}  
	   	 	}
	    }
	}	 
}
