package com.zhilianbao.erp.web.base;

import java.util.Map;

import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;

import org.springframework.web.servlet.view.jasperreports.JasperReportsMultiFormatView;

/**
 * 
 * @company zhilianbao
 * @author kuangzengye
 * @date   2017年4月5日下午3:05:06
 * @description:SpringMVC + IReport整合 视图处理扩展
 */
public class ApplicationIReportView extends JasperReportsMultiFormatView {
	private JasperReport jasperReport;
	
	public ApplicationIReportView() {
		super();
	}

	protected JasperPrint fillReport(Map<String, Object> model) throws Exception {
		if (model.containsKey("url")) {
			setUrl(String.valueOf(model.get("url")));
			this.jasperReport = loadReport();
		}
		
		return super.fillReport(model);
	}
	
	protected JasperReport getReport() {
		return this.jasperReport;
	}
}
