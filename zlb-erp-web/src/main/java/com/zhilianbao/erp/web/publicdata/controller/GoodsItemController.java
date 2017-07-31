package com.zhilianbao.erp.web.publicdata.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.goods.IGoodsItemService;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 单品t_goods_item，不需要单独操作，单品保存库存信息的同时操作这张表
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月22日 上午9:20:47
 */
@Controller
@RequestMapping("/publicData/goodsItem")
public class GoodsItemController extends BaseController {
	
	@Reference
	private IGoodsItemService iGoodsItemService;
}
