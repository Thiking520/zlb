package com.zhilianbao.erp.web.pms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.pms.core.api.service.IGoodsService;
/**
 * 
* @Title: GoodsUpdateLogController
* @author LiLinDong
* @date 2017年4月22日上午10:03:34 
* @description:
 */
@Controller
@RequestMapping("/goodsUpdateJob")
public class GoodsUpdateJobController extends BaseController {
	@Reference
	private IGoodsService goodsService;
	
	
}
