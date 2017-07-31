package com.zhilianbao.erp.web.tms.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.vo.archives.DeliveryRecordVo;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.tms.service.IMyDistributionSiteService;
import com.zhilianbao.erp.tms.vo.ReqMyDistributionSiteVo;
import com.zhilianbao.erp.web.base.BaseController;

/**
* @company zhilianbao
* @author chengjianhui
* @date 2017年4月19日下午4:08:27
* @description:我负责的站点数据
*/
@Controller
@RequestMapping("tms/distributionSite")
public class MyDistributionSiteController extends BaseController{
	@Reference
	private IMyDistributionSiteService iMyDistributionSiteService;
	
	/**
	* @Title: queryWayBillList
	* @author chengjianhui
	* @date 2017年4月22日下午5:24:41
	* @param reqMyDistributionSiteVo
	* @return ResponseResult<List<DeliveryRecordVo>>
	* @description:获取我负责的站点列表
	*/
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<List<DeliveryRecordVo>> queryWayBillList(@RequestBody ReqMyDistributionSiteVo reqMyDistributionSiteVo) {
		reqMyDistributionSiteVo.setUserId(super.getUserId());
		reqMyDistributionSiteVo.setOperatorId(super.getOperatorId());
		return iMyDistributionSiteService.getMyDistributionSiteList(reqMyDistributionSiteVo);
	}
	
	/**
	* @Title: updateCurrSite
	* @author chengjianhui
	* @date 2017年4月22日下午5:25:15
	* @param reqMyDistributionSiteVo
	* @return ResponseResult<String>
	* @description:更新用户当前选中的站点(变更当前激活的站点)
	*/
	@RequestMapping(value = "/updateCurrSite",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<String> updateCurrSite(@RequestBody ReqMyDistributionSiteVo reqMyDistributionSiteVo) {
		reqMyDistributionSiteVo.setUserId(super.getUserId());
		reqMyDistributionSiteVo.setOperatorId(super.getOperatorId());
		return iMyDistributionSiteService.updateCurrSite(reqMyDistributionSiteVo);
	}
	
	/**
	* @Title: getCurrSite
	* @author chengjianhui
	* @date 2017年4月22日下午5:25:19
	* @param reqMyDistributionSiteVo
	* @return ResponseResult<DeliveryRecordVo>
	* @description:获取当前激活的站点对象
	*/
	@RequestMapping(value = "/getCurrSite",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<DeliveryRecordVo> getCurrSite(@RequestBody ReqMyDistributionSiteVo reqMyDistributionSiteVo) {
		reqMyDistributionSiteVo.setUserId(super.getUserId());
		reqMyDistributionSiteVo.setOperatorId(super.getOperatorId());
		return iMyDistributionSiteService.getCurrSite(reqMyDistributionSiteVo);
	}
}
 