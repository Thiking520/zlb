package com.zhilianbao.erp.web.publicdata.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.systemparameter.IBaseAreaService;
import com.zhilianbao.erp.auth.vo.systemparameter.BaseAreaVo;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.web.base.BaseController;

/** 
* @author Tobin  
* @version 创建时间：2017年3月2日 上午10:46:06 
* 类说明 
*/
@Controller
@RequestMapping("/publicData/baseArea")
public class BaseAreaController extends BaseController {
	@Reference
	private IBaseAreaService iBaseAreaService;
	
	/**
	 * 
	 * @param vo  id 值：如果查询省级行政区 传0  其他的传上级区域的id
	 * @return
	 */
	@RequestMapping(value = "/quereArea" ,method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<List<BaseAreaVo>> quereArea(@RequestBody BaseAreaVo vo) {
		System.out.println("进入查询区域.....");
		return iBaseAreaService.queryArea(vo);
	}
	
	/**
	 * 
	 * @param vo  id
	 * @return
	 */
	@RequestMapping(value = "/quereAreaId" ,method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<List<BaseAreaVo>> quereAreaId(@RequestBody BaseAreaVo vo) {
		System.out.println("进入查询区域.....");
		return iBaseAreaService.queryAreaId(vo);
	}
}
 