package com.zhilianbao.erp.web.wms.util;

import java.beans.PropertyDescriptor;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.lang3.RandomUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

import com.zhilianbao.erp.common.util.DateFormatUtils;
import com.zhilianbao.erp.common.util.datehelp.DateUtils;

/**
 * 导出工具类
* @Title: ExportToExcelUtil
* @author liushilei
* @date 2017年5月15日下午3:39:18
* @description:
 */
public class ExportToExcelUtil {
	private static    java.text.DecimalFormat   df   =new   java.text.DecimalFormat("#0.00##");
	private static Workbook workBook;
	private static HSSFWorkbook hssfworkbook; 
	/**
	 * 导出数据到execl中
	 * @param datas 数据源
	 * @param fields 对象属性名称
	 * @param titles 标题栏显示的值
	 * @param exportFilePath 文件名称
	 * @param sheetName sheet名称
	 * @return
	 * @throws Exception
	 */
	public static void writeExecl(List datas,List<String> fields, Object[] titles,String exportFilePath,String sheetName,String type) throws Exception{
		//行总数（不包含title）
		Integer rowCount = datas.size();
		//列数
		Integer cellCount = titles.length;		
		workBook = new HSSFWorkbook();
		//建立一个sheet
		Sheet sheet = workBook.createSheet(sheetName);
		// 设置表格默认列宽度为10个字节
		sheet.setDefaultColumnWidth((short) 12);
		//生成title行样式
		CellStyle titleStyle = workBook.createCellStyle();
		//设置单元格内容居中
		titleStyle.setAlignment(HorizontalAlignment.CENTER);
		//创建title行
		Row titleRow = sheet.createRow(0);
		titleRow.setRowStyle(titleStyle);
		
		for(int i=0;i<cellCount;i++){
			Cell titleCell = titleRow.createCell(i);
			CellStyle style=workBook.createCellStyle();
			style.setBorderBottom(BorderStyle.THIN);
			style.setBorderLeft(BorderStyle.THIN);
			style.setBorderRight(BorderStyle.THIN);
			style.setBorderTop(BorderStyle.THIN);
			if (i==6||i==10||i==11||i==12||i==17){
				style.setWrapText(true);
			}
			if (i<=5||i==10||i==14||i==16||i==17){
				style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
				style.setFillForegroundColor(HSSFColor.YELLOW.index);
			}
			titleCell.setCellStyle(style);
			titleCell.setCellValue(titles[i].toString());
		}
		
		
		
		//循环创建数据行
		for(int rowNum=0; rowNum < rowCount; rowNum++)
		{
			//数据行
			Row dataRow = sheet.createRow(rowNum+1);
			//通过反射调用属性的get方法
			Class oClass = datas.get(rowNum).getClass();
			//循环将数据填充至列中
			for(int cellNum = 0; cellNum < cellCount; cellNum++ ){
				//创建列
				Cell rowCell = dataRow.createCell(cellNum);
				//通过属性名获取该类指定属性的get方法
				PropertyDescriptor property = new PropertyDescriptor(fields.get(cellNum), oClass);
				//获取get方法
				Method method =  property.getReadMethod();
				//获取属性值
				Object object = method.invoke(datas.get(rowNum));
				//填充
				if (object != null) {
					if (object instanceof Date) {
						object = new SimpleDateFormat("yyyyMMdd").format((Date) object);
					}
					
					if (object instanceof Double || object instanceof Float) {												
						rowCell.setCellValue(df.format(object));
						continue;
					}
					
					rowCell.setCellValue(object.toString());
				}
				else
					rowCell.setCellValue("");
			}
		}
		FileOutputStream fileOut = new FileOutputStream(exportFilePath+sheetName+type);
		workBook.write(fileOut);
	}
	
	

	/**
	 * 
	 * @param datas 数据源
	 * @param titleMap 标题栏显示的值 对象属性名称
	 * @param sheetNamesheet名称
	 * @throws Exception
	 */
	public static void writeExecl(@SuppressWarnings("rawtypes") List datas,Map<String,String> titleMap,String sheetName,OutputStream stream) throws Exception{
		List<String> titles = new ArrayList<String>();
		List<String> fields = new ArrayList<String>();
		for (Entry<String, String> entry : titleMap.entrySet()) {
			String key = entry.getKey();
			String value = entry.getValue().toString();
			titles.add(value);
			fields.add(key);
		}
		//行总数（不包含title）
		Integer rowCount = datas.size();
		//列数
		Integer cellCount = titles.size();		
		workBook = new HSSFWorkbook();
		//建立一个sheet
		Sheet sheet = workBook.createSheet(sheetName);
		// 设置表格默认列宽度为10个字节
		sheet.setDefaultColumnWidth((short) 12);
		//生成title行样式
		CellStyle titleStyle = workBook.createCellStyle();
		//设置单元格内容居中
		titleStyle.setAlignment(HorizontalAlignment.CENTER);
		//创建title行
		Row titleRow = sheet.createRow(0);
		titleRow.setRowStyle(titleStyle);
		for(int i=0;i<cellCount;i++){
			Cell titleCell = titleRow.createCell(i);
			CellStyle style=workBook.createCellStyle();
			style.setBorderBottom(BorderStyle.THIN);
			style.setBorderLeft(BorderStyle.THIN);
			style.setBorderRight(BorderStyle.THIN);
			style.setBorderTop(BorderStyle.THIN);
			if (i==6||i==10||i==11||i==12||i==17){
				style.setWrapText(true);
			}
			if (i<=5||i==10||i==14||i==16||i==17){
				style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
				style.setFillForegroundColor(HSSFColor.YELLOW.index);
			}
			titleCell.setCellStyle(style);
			titleCell.setCellValue(titles.get(i)+"");
		}
		
		//循环创建数据行
		for(int rowNum=0; rowNum < rowCount; rowNum++)
		{
			//数据行
			Row dataRow = sheet.createRow(rowNum+1);
			//通过反射调用属性的get方法
			Class oClass = datas.get(rowNum).getClass(); 
			//循环将数据填充至列中
			for(int cellNum = 0; cellNum < cellCount; cellNum++ ){
				//创建列
				Cell rowCell = dataRow.createCell(cellNum);
				//通过属性名获取该类指定属性的get方法
				PropertyDescriptor property = new PropertyDescriptor(fields.get(cellNum), oClass);
				//获取get方法
				Method method =  property.getReadMethod();
				//获取属性值
				Object object = method.invoke(datas.get(rowNum));
				//填充
				if (object != null) {
					if (object instanceof Date) {
						object = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format((Date) object);
					}
					
					if (object instanceof Double || object instanceof Float) {												
						rowCell.setCellValue(df.format(object));
						continue;
					}
					
					rowCell.setCellValue(object.toString());
				}
				else
					rowCell.setCellValue("");
			}
		}
		workBook.write(stream);
	}
	
	/**
	 * 
	 * @param datas 数据源
	 * @param titleMap 标题栏显示的值 对象属性名称
	 * @param exportFilePath 文件路径
	 * @param sheetNamesheet名称
	 * @throws Exception
	 */
	public static String writeExecl(@SuppressWarnings("rawtypes") List datas,Map<String,String> titleMap,String exportFilePath,String sheetName) throws Exception{
		List<String> titles = new ArrayList<String>();
		List<String> fields = new ArrayList<String>();
		for (Entry<String, String> entry : titleMap.entrySet()) {
			String key = entry.getKey();
			String value = entry.getValue().toString();
			titles.add(value);
			fields.add(key);
		}
		//行总数（不包含title）
		Integer rowCount = datas.size();
		//列数
		Integer cellCount = titles.size();		
		workBook = new HSSFWorkbook();
		//建立一个sheet
		Sheet sheet = workBook.createSheet(sheetName);
		// 设置表格默认列宽度为10个字节
		sheet.setDefaultColumnWidth((short) 12);
		//生成title行样式
		CellStyle titleStyle = workBook.createCellStyle();
		//设置单元格内容居中
		titleStyle.setAlignment(HorizontalAlignment.CENTER);
		//创建title行
		Row titleRow = sheet.createRow(0);
		titleRow.setRowStyle(titleStyle);
		for(int i=0;i<cellCount;i++){
			Cell titleCell = titleRow.createCell(i);
			CellStyle style=workBook.createCellStyle();
			style.setBorderBottom(BorderStyle.THIN);
			style.setBorderLeft(BorderStyle.THIN);
			style.setBorderRight(BorderStyle.THIN);
			style.setBorderTop(BorderStyle.THIN);
			if (i==6||i==10||i==11||i==12||i==17){
				style.setWrapText(true);
			}
			if (i<=5||i==10||i==14||i==16||i==17){
				style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
				style.setFillForegroundColor(HSSFColor.YELLOW.index);
			}
			titleCell.setCellStyle(style);
			titleCell.setCellValue(titles.get(i)+"");
		}
		
		//循环创建数据行
		for(int rowNum=0; rowNum < rowCount; rowNum++)
		{
			//数据行
			Row dataRow = sheet.createRow(rowNum+1);
			//通过反射调用属性的get方法
			Class oClass = datas.get(rowNum).getClass(); 
			//循环将数据填充至列中
			for(int cellNum = 0; cellNum < cellCount; cellNum++ ){
				//创建列
				Cell rowCell = dataRow.createCell(cellNum);
				//通过属性名获取该类指定属性的get方法
				PropertyDescriptor property = new PropertyDescriptor(fields.get(cellNum), oClass);
				//获取get方法
				Method method =  property.getReadMethod();
				//获取属性值
				Object object = method.invoke(datas.get(rowNum));
				//填充
				if (object != null) {
					if (object instanceof Date) {
						object = new SimpleDateFormat("yyyyMMdd").format((Date) object);
					}
					
					if (object instanceof Double || object instanceof Float) {												
						rowCell.setCellValue(df.format(object));
						continue;
					}
					
					rowCell.setCellValue(object.toString());
				}
				else
					rowCell.setCellValue("");
			}
		}
		
		String identify = DateFormatUtils.format(new Date(), DateUtils.MSEL_STR_FORMAT) + RandomUtils.nextInt(100, 9999);
		String fileName = sheetName+identify+".xlsx";
		FileOutputStream fileOut = new FileOutputStream(exportFilePath+"\\"+fileName);
		workBook.write(fileOut);
		return fileName;
	}
	/**
	 * 
	 * @param dataMap 导出数据
	 * @param ots 输出流
	 * @param flag 文件格式
	 * @param sheetName 文件薄名称
	 * @throws IOException
	 */
	public static void exportReportQuartList(Map<String, List<String[]>> dataMap, ByteArrayOutputStream ots, String flag, String sheetName) throws IOException {
		 hssfworkbook = new HSSFWorkbook();
		 Set<String> keyTitle=dataMap.keySet();
		 int a = 0;
         for(String title : keyTitle){
        	 Sheet hssfsheet = hssfworkbook.createSheet();// 创建sheet页
        	 hssfworkbook.setSheetName(a++, sheetName);// 设置sheet名称
        	 hssfsheet.setDefaultColumnWidth(20);//设置默认列宽度
        	 List<String[]> dataList=dataMap.get(title);
             for(int i=0;null!=dataList&&i<dataList.size();i++){
                 Row row=hssfsheet.createRow(i);// 生成第一行
                 String[] arr=dataList.get(i);
                 for(int j=0;null!=arr&&j<arr.length;j++){
                	 Cell cell=row.createCell(j);
                     cell.setCellValue(arr[j]);
                 }
             }
         }
		hssfworkbook.write(ots);
	}
}
