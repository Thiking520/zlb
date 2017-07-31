package com.zhilianbao.erp.web.tms.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.tms.service.IDispatchVehicleListService;
import com.zhilianbao.erp.tms.vo.DispatchVehicleListSearchVo;
import com.zhilianbao.erp.tms.vo.DispatchVehicleListVo;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 派车单-运单中间表
 * @author wangshengxia
 *
 */
@Controller
@RequestMapping("tms/dispatchVehicleList")
public class DispatchVehicleListController extends BaseController{

	@Reference
	private IDispatchVehicleListService iDVLService;
	
	
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<DispatchVehicleListVo>> list(@RequestBody DispatchVehicleListSearchVo vo) {
		DispatchVehicleListSearchVo sv = (vo != null) ? vo : new DispatchVehicleListSearchVo();
		sv.setOperatorId(getOperatorId());
		return iDVLService.queryDispatchVehicleListByPage(sv);
	}
	
	@RequestMapping(value = "/queryDispatchVehicleListDetails",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DispatchVehicleListVo> queryDispatchVehicleDetails(@RequestBody DispatchVehicleListVo vo) {
		
		return iDVLService.queryDispatchVehicleListDetails(vo);
	}
	/**
	 * 向指定派车单添加运单
	 * @Title:DispatchVehicleListController
	 * @author wangshengxia 
	 * @date 2017年4月5日下午5:20:19
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/addDispatchVehicleList")
	@ResponseBody
	public ResponseResult<DispatchVehicleListVo> addDispatchVehicleList(@RequestBody DispatchVehicleListVo vo) {
		vo.setModifier(getUserId());
		vo.setOperatorId(getOperatorId());
		return iDVLService.addDispatchVehicleList(vo);
	}
}
