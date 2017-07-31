package com.zhilianbao.erp.web.pms.controller;


import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.pms.core.api.service.IGoodsService;
import com.zlb.erp.pms.core.api.vo.PmsGoodsHomePageVo;
import com.zlb.erp.pms.core.api.vo.PmsGoodsSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsGoodsVo;
import com.zlb.erp.pms.core.api.vo.ResponseResult;

@Controller
@RequestMapping("/goodsSupply")
public class GoodsSupplyController extends BaseController {

	@Reference
	private IGoodsService goodsService;

	/**
	 * 初始化进入商品信息界面
	 * 
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：LiLinDong
	 */
	@RequestMapping(value = "/init", method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		return setResponseModel("pms/goodsList", model, request);
	}
	
	/**
	 * 初始化进入商品信息审批界面
	 * 
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：LiLinDong
	 */
	@RequestMapping(value = "/audit", method = RequestMethod.GET)
	public String audit(Model model, HttpServletRequest request) {
		return setResponseModel("pms/goodsAudit", model, request);
	}

	/**
	 * 初始化进入商品列表界面
	 * 
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：lilindong
	 * @date ：2017年4月12日 下午
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsGoodsVo> list(@RequestBody PmsGoodsSearchVo searchVo) {
		searchVo = (searchVo != null) ? searchVo : new PmsGoodsSearchVo();
		searchVo.setOperatorId(getOperatorId().toString());
		if (searchVo.getSort()==null || searchVo.getSort() == "") {
			searchVo.setSort("modified");
		}
		if (searchVo.getOrder()==null || searchVo.getOrder() == ""){
			searchVo.setOrder("desc");
		}
		return goodsService.queryGoodsSupplyListByPage(searchVo);
	}
	
	@RequestMapping(value = "/auditList", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsGoodsVo> auditList(@RequestBody PmsGoodsSearchVo searchVo) {
		searchVo = (searchVo != null) ? searchVo : new PmsGoodsSearchVo();
		searchVo.setOperatorId(getOperatorId().toString());
		//查询审批列表，不显示计划状态为新增的商品供应信息
		searchVo.setNotEqJobState(1);
		return goodsService.queryGoodsSupplyListByPage(searchVo);
	}
	
	/**
	 * 单个商品详细信息
	 * 
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：lilindong
	 * @date ：2017年4月12日 下午
	 */
	@RequestMapping(value = "/queryGoodsByKey", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsGoodsVo> queryGoodsByKey(@RequestBody PmsGoodsSearchVo searchVo) {
		searchVo = (searchVo != null) ? searchVo : new PmsGoodsSearchVo();
		searchVo.setOperatorId(getOperatorId().toString());
		return goodsService.queryGoodsByKey(searchVo);
	}

	/**
	 * 
	 * @Title: approve
	 * @author luliang
	 * @date 2017年5月15日
	 * @description审批通过
	 */
	@RequestMapping(value = "/approve",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsGoodsVo> approve(@RequestBody PmsGoodsVo vo) {
		
		vo = (vo != null) ? vo : new PmsGoodsVo();
		
		vo.setModifier(getUserName());
		vo.setOperatorId(getOperatorId().toString());
		
		return goodsService.approve(vo);
	}
	
	/**
	 * 
	 * @Title: reject
	 * @author luliang
	 * @date 2017年5月15日
	 * @description驳回
	 */
	@RequestMapping(value = "/reject",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsGoodsVo> reject(@RequestBody PmsGoodsVo vo) {
		
		vo = (vo != null) ? vo : new PmsGoodsVo();
		
		vo.setModifier(getUserName());
		
		return goodsService.reject(vo);
	}
	/**
	 * 
	 * 批量制定更新计划，包含单个
	 * @param vo
	 * @return ：ResponseResult<PmsGoodsVo>
	 * @author ：lilindong
	 * @date ：2017年4月12日 下午
	 */
	@RequestMapping(value = "/goodsJobModify", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsGoodsVo> goodsJobModify(@RequestBody PmsGoodsVo vo) {
		vo = (vo != null) ? vo : new PmsGoodsVo();
		// js中做了至少有一条数据才会提交的处理，  这里处理对于未知情况下出现的没有数据传递过来也访问本路径的情况。
		if (vo.getPmsGoodsVoList()==null || vo.getPmsGoodsVoList().size()==0) {
			ResponseResult<PmsGoodsVo> responseResult = new ResponseResult<PmsGoodsVo>();
			responseResult.setCode("0002");
			responseResult.setMsg("没有至少一个更新商品对象传递过来， 请联系管理员！");
			return responseResult;
		}
		vo.getPmsGoodsVoList().get(0).setConstitutor(getUserName().toString());
		//修改供应商品信息是更久pms_goods表的id“唯一标识”来修改的，不需要传入运营商Id作为判断条件
		return goodsService.goodsSupplyPlanModify(vo.getPmsGoodsVoList());
	}
	
	/**
	 * 执行获得原始商品计划
	 * @param vo
	 * @return ：ResponseResult<PmsGoodsVo>
	 * @author ：lilindong
	 */
	@RequestMapping(value = "/goodsOriginalGetExecute", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsGoodsVo> goodsOriginalGetExecute() {
		return goodsService.goodsOriginalGetExecute();
	}
	
	/**
	 * 执行获得原始商品计划
	 * @param vo
	 * @return ：ResponseResult<PmsGoodsVo>
	 * @author ：lilindong
	 */
	@RequestMapping(value = "/goodsUpdateJobOperateExecute", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsGoodsVo> goodsUpdateJobOperateExecute() {
		return goodsService.goodsUpdateJobOperateExecute();
	}
	
	/**
	 * function: 
	 * @Title: reportPendingStatistics 
	 * @author: LiLinDong
	 * @param: 
	 * @return: ResponseResult<PmsGoodsHomePageVo>    返回类型 
	 * @Description:商品供应信息，返回统计待处理的信息
	 */
	@RequestMapping(value = "/reportPendingStatistics",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsGoodsHomePageVo> reportPendingStatistics(@RequestBody PmsGoodsVo vo) {
		
		vo = (vo != null) ? vo : new PmsGoodsVo();
		vo.setOperatorId(getOperatorId().toString());
		return goodsService.reportPendingStatistics(vo);
	}
}
