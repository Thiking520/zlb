package com.zhilianbao.erp.web.publicdata.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.archives.IDeliveryScopeService;
import com.zhilianbao.erp.auth.vo.archives.DeliveryScopeSearchVo;
import com.zhilianbao.erp.auth.vo.archives.DeliveryScopeVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.web.base.BaseController;

/**
 * 站点范围操作
 * @author wangshengxia
 *
 */
@Controller
@RequestMapping("/publicData/deliveryScope")
public class DeliveryScopeController extends BaseController {

	@Reference
	private IDeliveryScopeService service;
	
	/**
	 * 根据站点查询站点范围列表
	 * @Title:DeliveryScopeController
	 * @author wangshengxia
	 * @date 2017年3月13日上午11:38:21
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<DeliveryScopeVo>> list(@RequestBody DeliveryScopeSearchVo vo) {
		DeliveryScopeSearchVo sv = (vo != null) ? vo : new DeliveryScopeSearchVo();
		vo.setOperatorId(getOperatorId());
		return service.queryDeliveryScope(vo);
	}
	
	/**
	 * 
	 * @Title:DeliveryScopeController
	 * @author wangshengxia
	 * @date 2017年3月13日上午11:39:29
	 * @param vo
	 * @return
	 */
	
	@RequestMapping(value = "/queryDeliveryScopeDetails",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DeliveryScopeVo> queryDeliveryScopeDetails(@RequestBody DeliveryScopeVo vo) {
		return service.queryDeliveryScopeDetails(vo);
	}
	
	
	@RequestMapping(value = "/updateDeliveryScope",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DeliveryScopeVo> updateDeliveryScope(@RequestBody DeliveryScopeVo vo) {
		long userId=getUserId();
		vo.setModifier(userId);
		vo.setName(vo.getName().trim());
		return service.updateDeliveryScope(vo);
	}
	
	@RequestMapping(value = "/updateDeliveryScopeStatus",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DeliveryScopeVo> updateDeliveryScopeStatus(@RequestBody DeliveryScopeVo vo) {
		long userId=getUserId();
		vo.setModifier(userId);
		return service.updateDeliveryScopeStatus(vo);
	}
	
	
	
	/**
	 * 
	* @Title: add
	* @author Tobin
	* @date 2017年2月27日上午10:17:18
	* @param vo
	* @return ResponseResult<DeliveryRecordVo>
	* @description:新增站点范围
	 */
	@RequestMapping(value = "/add",  method = RequestMethod.POST, consumes= MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DeliveryScopeVo> add(@RequestBody DeliveryScopeVo vo) {
		long userId=getUserId();
		vo.setCreator(userId);
		vo.setOperatorId(getOperatorId());
		vo.setName(vo.getName().trim());
		return service.addDeliveryScope(vo);
	}
	
	/**
	 * 
	* @Title: delete
	* @author Tobin
	* @date 2017年2月27日上午10:17:18
	* @param vo
	* @return ResponseResult<DeliveryRecordVo>
	* @description:删除站点范围
	 */
	@RequestMapping(value = "/delete",  method = RequestMethod.POST, consumes= MediaType.APPLICATION_JSON_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DeliveryScopeVo> delete(@RequestBody DeliveryScopeVo vo) {
		long userId=getUserId();
		vo.setModifier(userId);
		return service.deleteDeliveryScope(vo);
	}
	
	/**
	* @company zhilianbao
	* @author chengjianhui
	* @date 2017年7月16日下午5:33:06
	* @description:获取覆盖物点集合，用于绘制矩形、多边形、线
	*/
	@RequestMapping(value = "/overLayPoints",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<List<DeliveryScopeVo>> getOverLayPoints(@RequestBody DeliveryScopeVo vo) {
		vo.setOperatorId(getOperatorId());
		return service.getOverLayPoints(vo);
	}
}
 