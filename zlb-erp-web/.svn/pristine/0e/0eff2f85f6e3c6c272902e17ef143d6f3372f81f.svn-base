package com.zhilianbao.erp.web.tms.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.tms.service.IPackingService;
import com.zhilianbao.erp.tms.vo.PackingWebVo;
import com.zhilianbao.erp.web.base.BaseController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/tms/packing")
public class PackingController extends BaseController{
	
	@Reference 
	private IPackingService packingService;

	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request){
		return setResponseModel("tms/pack",model,request);
	}
	
	/**
	 * 添加装箱单
	 * @param packingWebVo
	 * @return
	 */
	@RequestMapping(value = "/add",  method = RequestMethod.POST)
	@ResponseBody
	public ResponseResult<PackingWebVo> addPack(@RequestBody PackingWebVo packingWebVo){
		packingWebVo.setCreator(getUserId());
		packingWebVo.setOperatorId(getOperatorId());
		return packingService.addPacking(packingWebVo);
	}
	
	/**
	 * 分页查找所有装箱单列表
	 * @param packingWebVo
	 * @return
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST)
	@ResponseBody
	public ResponseResult<Page<PackingWebVo>> packlingList(@RequestBody PackingWebVo packingWebVo){
		packingWebVo.setOperatorId(getOperatorId());
		packingWebVo.setUserId(getUserId());
		return packingService.packlingList(packingWebVo);
	}
	
	/**
	 * 添加运单
	 * @param packingWebVo
	 * @return
	 */
	@RequestMapping(value = "/addWaybill",  method = RequestMethod.POST)
	@ResponseBody
	public ResponseResult<PackingWebVo> addWaybill(@RequestBody PackingWebVo packingWebVo){
		packingWebVo.setCreator(getUserId());
		packingWebVo.setOperatorId(getOperatorId());
		return packingService.addWaybill(packingWebVo);
	}
}
