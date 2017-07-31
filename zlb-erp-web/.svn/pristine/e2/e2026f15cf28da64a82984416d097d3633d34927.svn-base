package com.zhilianbao.erp.web.publicdata.controller;

import java.util.HashMap;
import java.util.List;
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
import com.zhilianbao.erp.auth.service.goods.ICodeRuleService;
import com.zhilianbao.erp.auth.service.parameter.ISystemDictService;
import com.zhilianbao.erp.auth.vo.goods.CodeRuleVo;
import com.zhilianbao.erp.auth.vo.parameter.rpc.DictVo;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 编码规则
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月6日 下午2:42:45
 */
@Controller
@RequestMapping("/publicData/codeRule")
public class CodeRuleController extends BaseController {
	
	@Reference
	private ICodeRuleService codeRuleService;
	@Reference
	private ISystemDictService systemDictService;//RPC调用获取数据字典
	
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
		if(getOperatorId() == 0)
			return setResponseModel("publicData/goods/blank",model,request);
		return setResponseModel("publicData/parameter/codeRule",model,request);
	}
	
	/**
	 * 编码类型下拉列表
	 * @param model
	 * @param request
	 * @return ：ResponseResult<Map<String,Object>>
	 * @author ：chenll
	 * @date ：2017年4月6日 上午11:14:50
	 */
	@ResponseBody
	@RequestMapping(value = "/initDropDown",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseResult<Map<String,Object>> initDropDown(Model model, HttpServletRequest request) {
		ResponseResult<Map<String, Object>> rspResult = new ResponseResult<Map<String, Object>>();
		List<DictVo> codeTypeList = systemDictService.getDictList(getOperatorId(), Constants.CODE_TYPE).getData();
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("codeTypeList", codeTypeList);
		rspResult.setData(result);
		return rspResult;
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
	public ResponseResult<Page<CodeRuleVo>> list(@RequestBody ViewSearchVo vo) {
		ViewSearchVo sv = (vo != null) ? vo : new ViewSearchVo();
		sv.setOperatorId(getOperatorId());
		return codeRuleService.queryListByPage(sv);
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
	public ResponseResult<CodeRuleVo> addData(@RequestBody CodeRuleVo vo) {
		vo.setCreator(getUserId());
		vo.setOperatorId(getOperatorId());
		return codeRuleService.addData(vo);
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
	public ResponseResult<CodeRuleVo> queryDetails(@RequestBody CodeRuleVo vo) {
		vo.setOperatorId(getOperatorId());
		return codeRuleService.queryDetails(vo);
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
	public ResponseResult<CodeRuleVo> deleteData(@RequestBody CodeRuleVo vo) {
		return codeRuleService.deleteData(vo);
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
	public ResponseResult<CodeRuleVo> updateData(@RequestBody List<CodeRuleVo> voList) {
		for(CodeRuleVo vo : voList){
			vo.setCreator(getUserId());
			vo.setModifier(getUserId());
			vo.setOperatorId(getOperatorId());
		}
		return codeRuleService.updateData(voList);
	}
	
	
	/**
	 * 启用
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:50:40
	 */
	@RequestMapping(value = "/enabledData",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<CodeRuleVo> enabledData(@RequestBody CodeRuleVo vo) {
		vo.setOperatorId(getOperatorId());
		return codeRuleService.enabledData(vo);
	}
}
