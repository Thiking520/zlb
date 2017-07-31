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
import com.zhilianbao.erp.oms.service.IOrderService;
import com.zhilianbao.erp.oms.vo.OrderSearchVo;
import com.zhilianbao.erp.oms.vo.ResponseOrderVo;
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.pms.core.api.service.IOrderGoodsService;
import com.zlb.erp.pms.core.api.service.ISuggestGoodsOrderlineService;
import com.zlb.erp.pms.core.api.service.ISuggestGoodsService;
import com.zlb.erp.pms.core.api.service.ISuggestService;
import com.zlb.erp.pms.core.api.vo.BatchVo;
import com.zlb.erp.pms.core.api.vo.PmsPurchaseVo;
import com.zlb.erp.pms.core.api.vo.PmsSuggestGoodsOrderlineSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsSuggestGoodsOrderlineVo;
import com.zlb.erp.pms.core.api.vo.PmsSuggestGoodsSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsSuggestGoodsVo;
import com.zlb.erp.pms.core.api.vo.PmsSuggestSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsSuggestVo;
import com.zlb.erp.pms.core.api.vo.ResponseResult;

@Controller
@RequestMapping("/suggest")
public class SuggestController extends BaseController {
	
	Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	private ISuggestService suggestService;
	
	@Reference
	private ISuggestGoodsService suggestGoodsService;
	
	@Reference
	private ISuggestGoodsOrderlineService suggestGoodsOrderlineService;
	
	@Reference
	private IOrderGoodsService orderGoodsService;
	
	@Reference
	private IOrderService orderService;
			
	@Reference
	private IHttpOrderService IService;
	
	/**
	 * 
	* @Title: init
	* @author luliang
	* @date 2017年4月1日
	* @description:初始化换货订单列表页面
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		return setResponseModel("pms/plan/suggestList",model,request);
	}
	
	/**
	 * @Title: create Suggest Goods by order data
	 * @author luliang
	 * @date 2017年5月22日
	 * @param PmsSuggestVo
	 * @return ResponseResult<List<PmsSuggestGoodsVo>>
	 * @description:根据从OMS推送过来的订单数据，生成采购建议商品列表。
	 **/
	@RequestMapping(value = "/createSuggestGoods",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<List<PmsSuggestGoodsVo>> createSuggestGoods() {
		
		PmsSuggestVo vo = new PmsSuggestVo();
		vo.setCreator(getUserName());
		vo.setOperatorId(getOperatorId().toString());
		
		return suggestService.createSuggestGoods(vo);
	}
	
	@RequestMapping(value = "/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSuggestVo> list(@RequestBody PmsSuggestSearchVo vo) {
		PmsSuggestSearchVo sv = (vo != null) ? vo : new PmsSuggestSearchVo();
		sv.setOperatorId(getOperatorId().toString());
		return suggestService.querySuggestListByPage(sv); 
	}
	
	@RequestMapping(value = "/goods/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSuggestGoodsVo> goodsList(@RequestBody PmsSuggestGoodsSearchVo vo) {
		PmsSuggestGoodsSearchVo sv = (vo != null) ? vo : new PmsSuggestGoodsSearchVo();
		vo.setOperatorId(getOperatorId().toString());
		return suggestGoodsService.querySuggestGoodsByPage(sv); 
	}
	
	
	@RequestMapping(value = "/order/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<PmsSuggestGoodsOrderlineVo> orderlist(@RequestBody PmsSuggestGoodsOrderlineSearchVo vo) {
		
		PmsSuggestGoodsOrderlineSearchVo sv = (vo != null) ? vo : new PmsSuggestGoodsOrderlineSearchVo();
		
		List<PmsSuggestGoodsOrderlineVo> lines = suggestGoodsOrderlineService.querySuggestGoodsOrderline(sv);
		
		return lines;
	}
	
	@RequestMapping(value = "/detail",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSuggestVo> detail(@RequestBody PmsSuggestVo vo) {
		vo.setOperatorId(getOperatorId().toString());
		return suggestService.getSuggestDetail(vo); 
	}
	
	@RequestMapping(value = "/goods/delete",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSuggestGoodsVo> deleteGoods(@RequestBody PmsSuggestGoodsSearchVo vo) {
		
		PmsSuggestGoodsSearchVo sv = (vo != null) ? vo : new PmsSuggestGoodsSearchVo();
		
		return suggestGoodsService.deleteGoods(sv);
	}
	
	@RequestMapping(value = "/goods/batchDelete",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSuggestGoodsVo> batchDeleteGoods(@RequestBody BatchVo vo) {
		
		vo = (vo != null) ? vo : new BatchVo();
		
		return suggestGoodsService.batchDeleteGoods(vo);
	}
	
	@RequestMapping(value = "/goods/createSuggestAndApply",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSuggestGoodsVo> createSuggestAndApply(@RequestBody BatchVo vo) {
		
		vo = (vo != null) ? vo : new BatchVo();
		
		vo.setUserName(getUserName());
		vo.setOperatorId(getOperatorId().toString());
		
		ResponseResult<PmsSuggestGoodsVo> responseResult = suggestGoodsService.createSuggestAndApply(vo);
		
		return responseResult;
	}
	
	@RequestMapping(value = "/goods/updateGoodsNumber",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSuggestGoodsVo> updateGoodsNumber(@RequestBody PmsSuggestGoodsVo vo) {
		
		ResponseResult<PmsSuggestGoodsVo> responseResult = suggestGoodsService.updateGoodsNumber(vo);
		
		return responseResult;
	}
	
	@RequestMapping(value = "/resetCreatedPmsApplyFlag",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSuggestGoodsVo> resetCreatedPmsApplyFlag(@RequestBody PmsSuggestGoodsVo vo) {
		
		orderGoodsService.resetCreatedPmsApplyFlag();;
		
		ResponseResult<PmsSuggestGoodsVo> responseResult = new ResponseResult<PmsSuggestGoodsVo>();
				
		return responseResult;
	}

}
