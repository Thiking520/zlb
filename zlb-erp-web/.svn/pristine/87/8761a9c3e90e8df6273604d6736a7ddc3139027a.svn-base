package com.zhilianbao.erp.web.publicdata.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
import com.zhilianbao.erp.platform.service.IServiceProviderService;
import com.zhilianbao.erp.platform.vo.thirdplatform.leyao.ServiceProviderVo;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年4月18日 下午5:10:24
 */
@Controller
@RequestMapping("/servicePlatform/serviceProvider")
public class ServiceProviderController extends BaseController {
	
	@Reference
	private IServiceProviderService iServiceProviderService;

	/**
	 * 获取所有
	 * @param vo
	 * @return ：ResponseResult<ServiceProviderRegisterVo>
	 * @author ：chenll
	 * @date ：2017年4月19日 上午11:11:44
	 */
	@RequestMapping(value = "/queryAll",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<List<ServiceProviderVo>> queryAll() {
		ViewSearchVo sv =  new ViewSearchVo();
		return iServiceProviderService.queryAll(sv);
	}

}
