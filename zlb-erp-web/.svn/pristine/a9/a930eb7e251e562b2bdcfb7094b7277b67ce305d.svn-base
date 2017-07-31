package com.zhilianbao.erp.web.pms.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.pms.core.api.service.IGoodsUpdateLogService;
import com.zlb.erp.pms.core.api.vo.PmsGoodsUpdateLogSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsGoodsUpdateLogVo;
import com.zlb.erp.pms.core.api.vo.ResponseResult;
/**
 * 
* @Title: GoodsUpdateLogController
* @author LiLinDong
* @date 2017年4月22日上午10:03:34 
* @description:
 */
@Controller
@RequestMapping("/goodsUpdateLog")
public class GoodsUpdateLogController extends BaseController {


	@Reference
	private IGoodsUpdateLogService goodsUpdateLogService;
	
	
	/**
	 * 传入供应商品Id，返回相应的商品根据日志log记录，有分页效果
	 * 
	 * @param sv
	 * @return ：ResponseResult<PmsGoodsUpdateLogVo>
	 * @author ：lilindong
	 * @date ：2017年4月22日上午10:03:34 
	 */
	@RequestMapping(value = "/getGoodsUpdateLogByKey", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsGoodsUpdateLogVo> getGoodsUpdateLogByKey(@RequestBody PmsGoodsUpdateLogSearchVo searchVo) {
		PmsGoodsUpdateLogSearchVo sv = (searchVo != null) ? searchVo : new PmsGoodsUpdateLogSearchVo();
		return goodsUpdateLogService.queryGoodsUpdateLogListByKey(sv);
	}

}
