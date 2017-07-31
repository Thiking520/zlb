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
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.pms.core.api.service.IReturnGoodsService;
import com.zlb.erp.pms.core.api.service.IReturnService;
import com.zlb.erp.pms.core.api.vo.BatchVo;
import com.zlb.erp.pms.core.api.vo.PmsReturnGoodsSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsReturnGoodsVo;
import com.zlb.erp.pms.core.api.vo.PmsReturnVo;
import com.zlb.erp.pms.core.api.vo.PmsPurchaseGoodsVo;
import com.zlb.erp.pms.core.api.vo.PmsReturnGoodsSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsReturnGoodsVo;
import com.zlb.erp.pms.core.api.vo.PmsReturnSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsReturnVo;
import com.zlb.erp.pms.core.api.vo.ResponseResult;

@Controller
@RequestMapping("/return")
public class ReturnController extends BaseController {
	
	Logger LOGGER = LoggerFactory.getLogger(getClass());
	
	@Reference
	private IReturnService returnService;
	
	@Reference
	private IReturnGoodsService returnGoodsService;
			
	
	/**
	 * 
	* @Title: init
	* @author luliang
	* @date 2017年4月1日
	* @description:初始化换货订单列表页面
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		return setResponseModel("pms/purchase/returnList",model,request);
	}
	
	
	@RequestMapping(value = "/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsReturnVo> list(@RequestBody PmsReturnSearchVo vo) {
		
		PmsReturnSearchVo sv = (vo != null) ? vo : new PmsReturnSearchVo();
		
		return returnService.queryReturnListByPage(sv); 
	}
	
	@RequestMapping(value = "/goods",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsReturnGoodsVo> queryReturnGoodsByPage(@RequestBody PmsReturnGoodsSearchVo vo) {
		
		PmsReturnGoodsSearchVo sv = (vo != null) ? vo : new PmsReturnGoodsSearchVo();
		
		return returnGoodsService.queryReturnGoodsByPage(sv); 
	}
	
	@RequestMapping(value = "/getPurchaseCodeByGoodsCode",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<PmsPurchaseGoodsVo> getPurchaseCodeByGoodsCode(@RequestBody PmsReturnGoodsVo vo) {
		return returnService.getPurchaseCodeByGoodsCode(vo); 
	}

	/**
	 * 
	 * @Title: deleteGoods
	 * @author luliang
	 * @date 2017年5月11日
	 * @description删除采购退货商品
	 */
	@RequestMapping(value = "/goods/delete",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsReturnGoodsVo> deleteGoods(@RequestBody PmsReturnGoodsSearchVo vo) {
		
		PmsReturnGoodsSearchVo sv = (vo != null) ? vo : new PmsReturnGoodsSearchVo();
		
		sv.setModifier(getUserName());
		
		return returnGoodsService.deleteGoods(sv);
	}
	
	/**
	 * 
	 * @Title: batchDeleteGoods
	 * @author luliang
	 * @date 2017年5月11日
	 * @description批量删除采购退货商品
	 */
	@RequestMapping(value = "/goods/batchDelete",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsReturnGoodsVo> batchDeleteGoods(@RequestBody BatchVo vo) {
		
		vo = (vo != null) ? vo : new BatchVo();
		
		vo.setUserName(getUserName());
		
		return returnGoodsService.batchDeleteGoods(vo);
	}
	
	
	@RequestMapping(value = "/audit/init",  method = RequestMethod.GET)
	public String auditInit(Model model, HttpServletRequest request) {

		return setResponseModel("pms/purchase/returnAudit",model,request);
	}
	
	@RequestMapping(value = "/audit/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsReturnVo> audit(@RequestBody PmsReturnSearchVo vo) {
		
		PmsReturnSearchVo sv = (vo != null) ? vo : new PmsReturnSearchVo();
		
		return returnService.queryReturnListByPage(sv); 
	}

	/**
	 * @Title: addGoods
	 * @author luliang
	 * @date 2017年4月28日
	 * @param PmsGoodsVo
	 * @return ResponseResult<PmsReturnGoodsVo>
	 * @description:通过商品编号添加退货商品信息
	 */
	@RequestMapping(value = "/goods/addGoods",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsReturnGoodsVo> addGoods(@RequestBody PmsReturnGoodsVo vo) {
		vo.setCreator(getUserName());
		vo.setModifier(getUserName());
		return returnGoodsService.addGoods(vo);
	}
	
	
	
	/**
	 * 
	 * @Title: save
	 * @author luliang
	 * @date 2017年5月11日
	 * @description保存采购退货
	 */
	@RequestMapping(value = "/save",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsReturnVo> saveReturn(@RequestBody PmsReturnVo vo) {
		
		vo = (vo != null) ? vo : new PmsReturnVo();
		
		vo.setCreator(getUserName());
		vo.setModifier(getUserName());
		vo.setOperatorId(getOperatorId().toString());
		
		return returnService.saveReturn(vo);
	}
	
	/**
	 * 
	 * @Title: submit
	 * @author luliang
	 * @date 2017年5月11日
	 * @description提交采购退货
	 */
	@RequestMapping(value = "/submit",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsReturnVo> submitReturn(@RequestBody PmsReturnVo vo) {
		
		vo = (vo != null) ? vo : new PmsReturnVo();
		
		vo.setCreator(getUserName());
		vo.setModifier(getUserName());
		vo.setOperatorId(getOperatorId().toString());
		
		return returnService.submitReturn(vo);
	}
	
	/**
	 * 
	 * @Title: approve
	 * @author luliang
	 * @date 2017年5月11日
	 * @description审批通过采购退货
	 */
	@RequestMapping(value = "/approve",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsReturnVo> approve(@RequestBody PmsReturnVo vo) {
		
		vo = (vo != null) ? vo : new PmsReturnVo();
		
		vo.setModifier(getUserName());
		vo.setOperatorId(getOperatorId().toString());
		
		return returnService.approveReturn(vo);
	}
	
	/**
	 * 
	 * @Title: reject
	 * @author luliang
	 * @date 2017年5月11日
	 * @description驳回采购退货
	 */
	@RequestMapping(value = "/reject",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsReturnVo> reject(@RequestBody PmsReturnVo vo) {
		
		vo = (vo != null) ? vo : new PmsReturnVo();
		
		vo.setModifier(getUserName());
		
		return returnService.rejectReturn(vo);
	}
	
	/**
	 * 
	 * @Title: cancel
	 * @author luliang
	 * @date 2017年5月11日
	 * @description作废采购退货
	 */
	@RequestMapping(value = "/cancel",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsReturnVo> cancelReturn(@RequestBody PmsReturnVo vo) {
		
		vo = (vo != null) ? vo : new PmsReturnVo();
		
		vo.setModifier(getUserName());
		
		return returnService.cancelReturn(vo);
	}
}
