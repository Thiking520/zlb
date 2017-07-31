package com.zhilianbao.erp.web.pms.controller;

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
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.pms.core.api.service.IApplyGoodsService;
import com.zlb.erp.pms.core.api.service.IApplyService;
import com.zlb.erp.pms.core.api.vo.BatchVo;
import com.zlb.erp.pms.core.api.vo.PmsApplyGoodsSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsApplyGoodsVo;
import com.zlb.erp.pms.core.api.vo.PmsApplySearchVo;
import com.zlb.erp.pms.core.api.vo.PmsApplyVo;
import com.zlb.erp.pms.core.api.vo.PmsGoodsHomePageVo;
import com.zlb.erp.pms.core.api.vo.PmsGoodsSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsGoodsVo;
import com.zlb.erp.pms.core.api.vo.ResponseResult;

@Controller
@RequestMapping("/apply")
public class ApplyController extends BaseController {
	
	Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	private IApplyService applyService;
	
	@Reference
	private IApplyGoodsService applyGoodsService;
			
	@Reference
	private IHttpOrderService IService;
	
	/**
	 * 
	 * @Title: init
	 * @author luliang
	 * @date 2017年4月1日
	 * @description:初始化采购申请列表页面
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {

		return setResponseModel("pms/plan/applyList",model,request);
	}
	
	/**
	 * 
	 * @Title: list
	 * @author luliang
	 * @date 2017年4月10日
	 * @description分页显示采购申请
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsApplyVo> list(@RequestBody PmsApplySearchVo vo) {
		
		PmsApplySearchVo sv = (vo != null) ? vo : new PmsApplySearchVo();
		sv.setOperatorId(getOperatorId().toString());
		return applyService.queryApplyListByPage(sv,"apply"); 
	}
	
	/**
	 * 
	 * @Title: goodslist
	 * @author luliang
	 * @date 2017年4月11日
	 * @description分页显示采购申请商品列表
	 */
	@RequestMapping(value = "/goods",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsApplyGoodsVo> goods(@RequestBody PmsApplyGoodsSearchVo vo) {
		
		PmsApplyGoodsSearchVo sv = (vo != null) ? vo : new PmsApplyGoodsSearchVo();
		return applyGoodsService.queryApplyGoodsByPage(sv); 
	}
	
	/**
	 * 
	 * @Title: delete
	 * @author luliang
	 * @date 2017年4月15日
	 * @description删除采购申请
	 */
	@RequestMapping(value = "/delete",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsApplyVo> deleteApply(@RequestBody PmsApplySearchVo vo) {
		
		PmsApplySearchVo sv = (vo != null) ? vo : new PmsApplySearchVo();
		
		sv.setModifier(getUserName());
		
		return applyService.deleteApply(sv);
	}

	/**
	 * 
	 * @Title: deleteGoods
	 * @author luliang
	 * @date 2017年4月15日
	 * @description删除采购申请商品
	 */
	@RequestMapping(value = "/goods/delete",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsApplyGoodsVo> deleteGoods(@RequestBody PmsApplyGoodsSearchVo vo) {
		
		PmsApplyGoodsSearchVo sv = (vo != null) ? vo : new PmsApplyGoodsSearchVo();
		
		sv.setModifier(getUserName());
		
		return applyGoodsService.deleteGoods(sv);
	}
	
	/**
	 * 
	 * @Title: batchDeleteGoods
	 * @author luliang
	 * @date 2017年4月15日
	 * @description批量删除采购申请商品
	 */
	@RequestMapping(value = "/goods/batchDelete",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsApplyGoodsVo> batchDeleteGoods(@RequestBody BatchVo vo) {
		
		vo = (vo != null) ? vo : new BatchVo();
		
		vo.setUserName(getUserName());
		
		return applyGoodsService.batchDeleteGoods(vo);
	}
	
	/**
	 * 
	 * @Title: save
	 * @author luliang
	 * @date 2017年4月15日
	 * @description保存采购申请
	 */
	@RequestMapping(value = "/save",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsApplyVo> saveApply(@RequestBody PmsApplyVo vo) {
		
		vo = (vo != null) ? vo : new PmsApplyVo();
		
		vo.setCreator(getUserName());
		vo.setModifier(getUserName());
		vo.setOperatorId(getOperatorId().toString());
		
		return applyService.saveApply(vo);
	}
	
	/**
	 * 
	 * @Title: submit
	 * @author luliang
	 * @date 2017年4月15日
	 * @description提交采购申请
	 */
	@RequestMapping(value = "/submit",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsApplyVo> submitApply(@RequestBody PmsApplyVo vo) {
		
		vo = (vo != null) ? vo : new PmsApplyVo();
		
		vo.setCreator(getUserName());
		vo.setModifier(getUserName());
		vo.setOperatorId(getOperatorId().toString());
		return applyService.submitApply(vo);
	}
	
	/**
	 * 
	 * @Title: approve
	 * @author luliang
	 * @date 2017年4月15日
	 * @description审批通过采购申请
	 */
	@RequestMapping(value = "/approve",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsApplyVo> approve(@RequestBody PmsApplyVo vo) {
		
		vo = (vo != null) ? vo : new PmsApplyVo();
		
		vo.setModifier(getUserName());
		vo.setOperatorId(getOperatorId().toString());
		
		return applyService.approveApply(vo);
	}
	
	/**
	 * 
	 * @Title: reject
	 * @author luliang
	 * @date 2017年4月15日
	 * @description驳回采购申请
	 */
	@RequestMapping(value = "/reject",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsApplyVo> reject(@RequestBody PmsApplyVo vo) {
		
		vo = (vo != null) ? vo : new PmsApplyVo();
		
		vo.setModifier(getUserName());
		
		return applyService.rejectApply(vo);
	}
	
	/**
	 * 
	 * @Title: cancel
	 * @author luliang
	 * @date 2017年4月15日
	 * @description作废采购申请
	 */
	@RequestMapping(value = "/cancel",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsApplyVo> cancelApply(@RequestBody PmsApplyVo vo) {
		
		vo = (vo != null) ? vo : new PmsApplyVo();
		
		vo.setModifier(getUserName());
		
		return applyService.cancelApply(vo);
	}
	
	/**
	 * @Title: addGoodsByCode
	 * @author luliang
	 * @date 2017年4月28日
	 * @param PmsGoodsVo
	 * @return ResponseResult<PmsApplyGoodsVo>
	 * @description:通过商品编号添加商品信息
	 */
	@RequestMapping(value = "/goods/addGoodsByCode",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsApplyGoodsVo> addGoodsByCode(@RequestBody PmsApplyGoodsVo vo) {
		
		vo.setCreator(getUserName());
		vo.setModifier(getUserName());
		String operatorId = getOperatorId().toString();
		return applyGoodsService.addGoodsByCode(vo,operatorId);
	}
	
	/**
	 * @Title: getGoodsByCode
	 * @author luliang
	 * @date 2017年4月28日
	 * @param PmsGoodsVo
	 * @return ResponseResult<PmsGoodsVo>
	 * @description:通过商品编号获取商品信息
	 */
	@RequestMapping(value = "/goods/getGoodsByCode",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsGoodsVo> getGoodsByCode(@RequestBody PmsGoodsVo vo) {
		
		vo = (vo != null) ? vo : new PmsGoodsVo();
		
		return applyGoodsService.getGoodsByCode(vo,getOperatorId().toString());
	}
	
	/**
	 * @Title: getGoodsByCode
	 * @author luliang
	 * @date 2017年4月28日
	 * @param PmsGoodsVo
	 * @return ResponseResult<PmsGoodsVo>
	 * @description:通过商品编号或者商品名称模糊查询商品
	 */
	@RequestMapping(value = "/goods/getGoodsByCodeOrName",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsGoodsVo> getGoodsByCodeOrName(@RequestBody PmsGoodsSearchVo vo) {
		
		vo = (vo != null) ? vo : new PmsGoodsSearchVo();
		vo.setOperatorId(getOperatorId().toString());
		return applyGoodsService.getGoodsByCodeOrName(vo);
	}
	
	@RequestMapping(value = "/audit/init",  method = RequestMethod.GET)
	public String auditInit(Model model, HttpServletRequest request) {

		return setResponseModel("pms/plan/applyAudit",model,request);
	}
	
	@RequestMapping(value = "/audit/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsApplyVo> audit(@RequestBody PmsApplySearchVo vo) {
		
		PmsApplySearchVo sv = (vo != null) ? vo : new PmsApplySearchVo();
		sv.setOperatorId(getOperatorId().toString());
		return applyService.queryApplyListByPage(sv,"approve"); 
	}
	
	/**
	 * function: 
	 * @Title: reportPendingStatistics 
	 * @author: LiLinDong
	 * @param: 
	 * @return: ResponseResult<PmsGoodsHomePageVo>    返回类型 
	 * @Description:首页，采购单待处理信息。
	 */
	@RequestMapping(value = "/reportPendingStatistics",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsGoodsHomePageVo> reportPendingStatistics(@RequestBody PmsApplyVo vo) {
		
		vo = (vo != null) ? vo : new PmsApplyVo();
		vo.setOperatorId(getOperatorId().toString());
		return applyService.reportPendingStatistics(vo);
	}
	
}
