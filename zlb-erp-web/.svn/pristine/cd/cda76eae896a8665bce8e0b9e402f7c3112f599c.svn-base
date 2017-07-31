package com.zhilianbao.erp.web.publicdata.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.cars.ICarsService;
import com.zhilianbao.erp.auth.vo.cars.CarsSearchVo;
import com.zhilianbao.erp.auth.vo.cars.CarsVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.web.base.BaseController;

/**
 * 车辆档案管理
 * @author wangshengxia
 *
 */
@Controller
@RequestMapping("publicData/cars")
public class CarsController extends BaseController{

	
	@Reference
	private ICarsService iCarService;
	
	/**
	 * 
	 * @Title:init
	 * @author wangshengxia
	 * @date 2017年3月1日上午9:14:45
	 * @deprecated 初始化进入车辆管理页面publicData/cars/cars
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {

		return setResponseModel("publicData/cars/cars",model,request);
	}
	
	
	/**
	 * 
	 * @Title:list
	 * @author wangshengxia
	 * @date 2017年3月1日上午9:24:14
	 * @param vo
	 * @return
	 * @deprecated 分页查询车辆列表
	 */
	
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<CarsVo>> list(@RequestBody CarsSearchVo vo) {
		CarsSearchVo sv = (vo != null) ? vo : new CarsSearchVo();
		sv.setOperatorId(getOperatorId());
		return iCarService.queryCarByPage(sv);
	}
	
	
	
	
	@RequestMapping(value = "/queryCarsDetails",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<CarsVo> queryCarsDetails(@RequestBody CarsVo cars) {
		
		return iCarService.queryCarDetails(cars);
	}
	
	@RequestMapping(value = "/queryCarDetailsByCarId",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<CarsVo> queryCarDetailsByCarId(@RequestBody CarsVo cars) {
		
		return iCarService.queryCarDetailsByCarId(cars);
	}
	
	
	@RequestMapping(value = "/addCars")
	@ResponseBody
	public ResponseResult<CarsVo> addCars(@RequestBody CarsVo vo) {
		long userId=getUserId();
		vo.setCreator(userId);
		vo.setOperatorId(getOperatorId());
		return iCarService.addCar(vo);
	}
	
	@RequestMapping(value = "/updateCarsStatus",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<CarsVo> updateCarsStatus(@RequestBody CarsVo cars) {
		long userId=getUserId();
		cars.setModifier(userId);
		return iCarService.updateCarState(cars);
	}
	
	@RequestMapping(value = "/updateCars",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<CarsVo> updateCars(@RequestBody CarsVo cars) {
		long userId=getUserId();
		cars.setModifier(userId);
		return iCarService.updateCar(cars);
	}
	
	@RequestMapping(value = "/deleteCars",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<CarsVo> deleteCars(@RequestBody CarsVo cars) {
		long userId=getUserId();
		cars.setModifier(userId);
		return iCarService.deleteCar(cars);
	}
	@RequestMapping(value = "/initDropDownBox",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Map<String, Object>> initDropDownBox() {
		long operatorId=getOperatorId();
		return iCarService.initDropDownBox(operatorId);
	}
	@RequestMapping(value = "/checkPlateNumber",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public boolean checkPlateNumber(@RequestBody CarsVo vo) {
		long operatorId=getOperatorId();
		vo.setOperatorId(operatorId);
		return iCarService.checkPlateNumber(vo);
	}
}
