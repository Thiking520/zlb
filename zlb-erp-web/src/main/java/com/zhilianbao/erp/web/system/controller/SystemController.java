package com.zhilianbao.erp.web.system.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.zhilianbao.erp.web.base.BaseController;

@Controller
@RequestMapping("/system")
public class SystemController extends BaseController {

	private static Logger logger = LogManager.getLogger(SystemController.class);
	
	@RequestMapping(value = "/redirectUrl",  method = RequestMethod.GET)
	public String redirectUrl(Model model,@RequestParam("redirectUrl") String redirectUrl,@RequestParam("opname") String opname,@RequestParam("issuper") boolean issuper) {
		model.addAttribute("redirectUrl", redirectUrl +"&opname="+ opname + "&issuper="+issuper);
		logger.info("访问外部系统地址redirectUrl=>" + redirectUrl +"&opname="+ opname + "&issuper="+issuper);
		return setResponseModel("login/redirect",model,request);
	}
}














