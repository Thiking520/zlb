package com.zhilianbao.erp.web.pms.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.oms.service.IHttpOrderService;
import com.zhilianbao.erp.oms.vo.OrderSearchVo;
import com.zhilianbao.erp.oms.vo.ResponseOrderVo;
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.pms.core.api.service.IApplyGoodsService;
import com.zlb.erp.pms.core.api.service.IApplyService;
import com.zlb.erp.pms.core.api.vo.PmsGoodsSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsGoodsVo;
import com.zlb.erp.pms.core.api.vo.PmsApplyGoodsSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsApplyGoodsVo;
import com.zlb.erp.pms.core.api.vo.BatchVo;
import com.zlb.erp.pms.core.api.vo.PmsApplySearchVo;
import com.zlb.erp.pms.core.api.vo.PmsApplyVo;
import com.zlb.erp.pms.core.api.vo.ResponseResult;

@Controller
@RequestMapping("/report")
public class ReportController extends BaseController {
	
	Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	
	/**
	 * 
	 * @Title: index
	 * @author luliang
	 * @date 2017年5月23日
	 * @description:PMS首页报表
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {

		return setResponseModel("pms/report/report",model,request);
	}
}
