package com.zhilianbao.erp.web.pms.controller;

import java.util.ArrayList;
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
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.pms.core.api.service.ISupplierService;
import com.zlb.erp.pms.core.api.vo.PmsGoodsHomePageVo;
import com.zlb.erp.pms.core.api.vo.PmsSupplierSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsSupplierVerifyNameVo;
import com.zlb.erp.pms.core.api.vo.PmsSupplierVo;
import com.zlb.erp.pms.core.api.vo.ResponseResult;

@Controller
@RequestMapping("/supplier")
public class SupplierController extends BaseController {

	@Reference
	private ISupplierService supplierService;

	/**
	 * 初始化进入供应信息界面（更新商品供应信息的界面）
	 * 
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：LiLinDong
	 */
	@RequestMapping(value = "/supplierJobInit", method = RequestMethod.GET)
	public String jobInit(Model model, HttpServletRequest request) {
		return setResponseModel("pms/supplierList", model, request);
	}

	/**
	 * 供应商审批界面（供应商信息的新增、修改、删除，都需要经过经理审批后，才可以真正对数据进行操作）
	 * 
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：LiLinDong
	 */
	@RequestMapping(value = "/supplierEaaInit", method = RequestMethod.GET)
	public String eaaInit(Model model, HttpServletRequest request) {
		return setResponseModel("pms/supplierExamineAndApprove", model, request);
	}

	/**
	 * 供应商审批界面（供应商信息的新增、修改、删除，都需要经过经理审批后，才可以真正对数据进行操作）
	 * 
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：LiLinDong
	 */
	@RequestMapping(value = "/supplierMeaaInit", method = RequestMethod.GET)
	public String meaaInit(Model model, HttpServletRequest request) {
		return setResponseModel("pms/supplierManagerExamineAndApprove", model, request);
	}

	/**
	 * 供应商审批界面（供应商信息的新增、修改、删除，都需要经过经理审批后，才可以真正对数据进行操作）
	 * 
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：LiLinDong
	 */
	@RequestMapping(value = "/supplierFeaaInit", method = RequestMethod.GET)
	public String feaaInit(Model model, HttpServletRequest request) {
		return setResponseModel("pms/supplierFinanceExamineAndApprove", model, request);
	}

	/**
	 * 供应商列表
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：LiLinDong
	 * @date ：2017年4月13日 下午14:44
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSupplierVo> list(@RequestBody PmsSupplierSearchVo searchVo) {
		searchVo = (searchVo != null) ? searchVo : new PmsSupplierSearchVo();
		searchVo.setOperatorId(getOperatorId().toString());
		return supplierService.querySupplierListByPage(searchVo);
	}

	/**
	 * 供应商经理审批列表列表
	 * 
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：LiLinDong
	 * @date ：2017年4月13日 下午14:44
	 */
	@RequestMapping(value = "/managerList", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSupplierVo> managerList(@RequestBody PmsSupplierSearchVo searchVo) {
		searchVo = (searchVo != null) ? searchVo : new PmsSupplierSearchVo();
		// 经理审批只查看供应商状态为待经理审批
		List<String> list = new ArrayList<String>();
		list.add("WPA");
		searchVo.setEqSupplierState(list);
		searchVo.setOperatorId(getOperatorId().toString());
		return supplierService.querySupplierListByPage(searchVo);
	}

	/**
	 * 供应商财务审批列表
	 * 
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：LiLinDong
	 * @date ：2017年4月13日 下午14:44
	 */
	@RequestMapping(value = "/financeList", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSupplierVo> financeList(@RequestBody PmsSupplierSearchVo searchVo) {
		searchVo = (searchVo != null) ? searchVo : new PmsSupplierSearchVo();
		// 财务审批只查看供应商状态为待财务审批
		List<String> list = new ArrayList<String>();
		list.add("WFA");
		searchVo.setEqSupplierState(list);
		searchVo.setOperatorId(getOperatorId().toString());
		return supplierService.querySupplierListByPage(searchVo);
	}

	/**
	 * 根据商品类型获取能提供该类型的供应商列表
	 * 
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：LiLinDong
	 * @date ：2017年4月13日 下午14:44
	 */
	@RequestMapping(value = "/getSupplierListByGoodsType", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSupplierVo> getSupplierListByGoodsType(@RequestBody PmsSupplierSearchVo searchVo) {
		searchVo = (searchVo != null) ? searchVo : new PmsSupplierSearchVo();

		searchVo.setOperatorId(getOperatorId().toString());
		return supplierService.querySupplierListByGoodsType(searchVo);
	}

	/**
	 * 
	 * @Title: save
	 * @author luliang
	 * @date 2017年5月10日
	 * @description
	 */
	@RequestMapping(value = "/save", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSupplierVo> saveSupplier(@RequestBody PmsSupplierVo vo) {

		vo = (vo != null) ? vo : new PmsSupplierVo();
		vo.setOperatorId(getOperatorId().toString());
		vo.setCreator(getUserName());
		vo.setModifier(getUserName());

		return supplierService.saveOrUpdateSupplier(vo);
	}

	/**
	 * 
	 * @Title: submit
	 * @author luliang
	 * @date 2017年5月10日
	 * @description
	 */
	@RequestMapping(value = "/submit", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSupplierVo> submitSupplier(@RequestBody PmsSupplierVo vo) {

		vo = (vo != null) ? vo : new PmsSupplierVo();
		vo.setOperatorId(getOperatorId().toString());
		vo.setCreator(getUserName());
		vo.setModifier(getUserName());

		return supplierService.submitSupplier(vo);
	}

	/**
	 * 
	 * @Title: delete
	 * @author luliang
	 * @date 2017年5月10日
	 * @description
	 */
	@RequestMapping(value = "/delete", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSupplierVo> deleteSupplier(@RequestBody PmsSupplierVo vo) {

		vo = (vo != null) ? vo : new PmsSupplierVo();

		vo.setCreator(getUserName());
		vo.setModifier(getUserName());

		return supplierService.deleteSupplier(vo);
	}

	/**
	 * 
	 * @Title: edit
	 * @author luliang
	 * @date 2017年5月10日
	 * @description
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSupplierVo> editSupplier(@RequestBody PmsSupplierVo vo) {

		vo = (vo != null) ? vo : new PmsSupplierVo();

		vo.setCreator(getUserName());
		vo.setModifier(getUserName());

		return supplierService.editSupplier(vo);
	}

	/**
	 * @Title: firstApprove
	 * @author luliang
	 * @date 2017年5月10日
	 * @description：经理审批通过
	 */
	@RequestMapping(value = "/firstApprove", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSupplierVo> firstApproveSupplier(@RequestBody PmsSupplierVo vo) {

		vo = (vo != null) ? vo : new PmsSupplierVo();

		vo.setCreator(getUserName());
		vo.setModifier(getUserName());

		return supplierService.firstApproveSupplier(vo);
	}

	/**
	 * @Title: secondApprove
	 * @author luliang
	 * @date 2017年5月10日
	 * @description：财务审批通过
	 */
	@RequestMapping(value = "/secondApprove", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSupplierVo> secondApproveSupplier(@RequestBody PmsSupplierVo vo) {
		vo = (vo != null) ? vo : new PmsSupplierVo();
		vo.setCreator(getUserName());
		vo.setModifier(getUserName());
		return supplierService.secondApproveSupplier(vo);
	}

	/**
	 * @Title: rejectSupplier
	 * @author luliang
	 * @date 2017年5月10日
	 * @description：经理驳回
	 */
	@RequestMapping(value = "/firstRejectSupplier", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSupplierVo> firstRejectSupplier(@RequestBody PmsSupplierVo vo) {

		vo = (vo != null) ? vo : new PmsSupplierVo();

		vo.setCreator(getUserName());
		vo.setModifier(getUserName());

		return supplierService.firstRejectSupplier(vo);
	}
	
	/**
	 * @Title: rejectSupplier
	 * @author luliang
	 * @date 2017年5月10日
	 * @description：财务驳回
	 */
	@RequestMapping(value = "/secondRejectSupplier", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsSupplierVo> secondRejectSupplier(@RequestBody PmsSupplierVo vo) {

		vo = (vo != null) ? vo : new PmsSupplierVo();

		vo.setCreator(getUserName());
		vo.setModifier(getUserName());

		return supplierService.secondRejectSupplier(vo);
	}

	/**
	 * @Title: reportPendingStatistics
	 * @author: LiLinDong
	 * @param:
	 * @return: ResponseResult<PmsGoodsHomePageVo> 返回类型
	 * @Description:pms首页返回值，商品供应商待处理统计
	 */
	@RequestMapping(value = "/reportPendingStatistics", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<PmsGoodsHomePageVo> reportPendingStatistics(@RequestBody PmsSupplierVo vo) {

		vo = (vo != null) ? vo : new PmsSupplierVo();
		vo.setOperatorId(getOperatorId().toString());
		return supplierService.reportPendingStatistics(vo);
	}
	
	/**
	 * @Title: supplierNameIsExists
	 * @author: LiLinDong
	 * @param:
	 * @return: ResponseResult<PmsGoodsHomePageVo> 返回类型
	 * @Description:查询供应商名称是否存在，返回1表示存在，否则返回NULL，表示不存在
	 */
	@RequestMapping(value = "/supplierNameIsExists", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody PmsSupplierVerifyNameVo supplierNameIsExists(String supplier,String supplierId) {
		PmsSupplierVo vo = new PmsSupplierVo();
		vo.setId(supplierId);
		vo.setSupplier(supplier);
		vo.setOperatorId(getOperatorId().toString());
		// 如果存在返回false，否则返回true
		boolean result = supplierService.supplierNameIsExists(vo).getCode().equals("0")?true:false;
	    return new PmsSupplierVerifyNameVo(result);
	}
	
}
