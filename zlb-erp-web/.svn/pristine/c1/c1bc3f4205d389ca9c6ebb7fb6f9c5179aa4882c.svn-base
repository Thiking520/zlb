package com.zhilianbao.erp.web.publicdata.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
import com.zhilianbao.erp.platform.service.IServiceProviderRegisterService;
import com.zhilianbao.erp.platform.vo.thirdplatform.leyao.ServiceProviderRegisterVo;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年4月18日 下午5:10:24
 */
@Controller
@RequestMapping("/servicePlatform/serviceProviderRegister")
public class ServiceProviderRegisterController extends BaseController {
	
	@Reference
	private IServiceProviderRegisterService serviceProviderRegisterService;
	
	/**
	 * 进入列表页
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:48:54
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		return setResponseModel("publicData/servicePlatform/serviceProviderRegister",model,request);
	}
	
	/**
	 * 分页查询列表
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:49:11
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<ServiceProviderRegisterVo>> list(@RequestBody ViewSearchVo vo) {
		ViewSearchVo sv = (vo != null) ? vo : new ViewSearchVo();
		sv.setOperatorId(getOperatorId());
		return serviceProviderRegisterService.queryListByPage(sv);
	}

	/**
	 * 新增
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:49:23
	 */
	@RequestMapping(value = "/addData")
	@ResponseBody
	public ResponseResult<ServiceProviderRegisterVo> addData(@RequestBody ServiceProviderRegisterVo vo) {
		vo.setCreator(getUserId());
		vo.setOperatorId(getOperatorId());
		return serviceProviderRegisterService.addData(vo);
	}

	/**
	 * 查询详情
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:49:49
	 */
	@RequestMapping(value = "/queryDetails",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<ServiceProviderRegisterVo> queryDetails(@RequestBody ServiceProviderRegisterVo vo) {
		return serviceProviderRegisterService.queryDetails(vo);
	}
	
	/**
	 * 删除
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:50:07
	 */
	@RequestMapping(value = "/deleteData",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<ServiceProviderRegisterVo> deleteData(@RequestBody ServiceProviderRegisterVo vo) {
		return serviceProviderRegisterService.deleteData(vo);
	}
	
	/**
	 * 修改
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:50:40
	 */
	@RequestMapping(value = "/updateData",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<ServiceProviderRegisterVo> updateData(@RequestBody ServiceProviderRegisterVo vo) {
		vo.setModifier(getUserId());
		return serviceProviderRegisterService.updateData(vo);
	}
	
}
