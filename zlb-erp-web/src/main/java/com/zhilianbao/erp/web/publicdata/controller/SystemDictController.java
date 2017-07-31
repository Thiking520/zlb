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
import com.zhilianbao.erp.auth.service.parameter.ISystemDictService;
import com.zhilianbao.erp.auth.vo.parameter.SystemDictVo;
import com.zhilianbao.erp.common.annotation.Auth;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
import com.zhilianbao.erp.web.base.BaseController;

/**
 * 
 * @company zhilianbao
 * @author kuangzengye
 * @date   2017年3月7日下午3:06:23
 * @description:(选项值)数据字典管理
 */
@Controller
@RequestMapping("/param/dict")
public class SystemDictController extends BaseController {
	
	@Reference
	private ISystemDictService service;
	
	/**
	 * 进入参数列表
	 * @param model
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		
		Long operatorId = getOperatorId();//运营商ID
		ResponseResult<Map<String, Object>> rspResult = service.initDropDownBox(operatorId);
		//通过运营商ID和字典类型获取字典list
//		List<DictBean> list = DictCacheUtil.get(operatorId,Constants.TYPE_COMMON_ACTIVE);//从缓存获取通用的生效/失效list
//		model.addAttribute("statusList", list);
		return setResponseModel("publicData/parameter/paramDictList",rspResult,model,request);
	}
	
	/**
	 * 资源列表分页查询
	 * @param model
	 * @param request
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<SystemDictVo>> paramList(@RequestBody ViewSearchVo vo) {
		ViewSearchVo sv = (vo != null) ? vo : new ViewSearchVo();
		Long operatorId = getOperatorId();//运营商ID
		Long userType = getUserType();
		
		//鉴定是否是超管-运维人员
		if(userType != null && userType == 0){
			if(vo.getOperatorId() != null && vo.getOperatorId() == 0){//点击了默认模板管理按钮
				operatorId = 0L;//用于查询默认系统模板
			}
		}
		sv.setOperatorId(operatorId);
		return service.getPageByVo(sv);
	}
	
	/**
	 * 进入资源列表
	 * @param model
	 * @param request
	 * @return
	 */
	@Auth
	@RequestMapping(value = "/to",  method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public String toParam(Model model, HttpServletRequest request, Long id) {
		SystemDictVo vo = null;
		Long operatorId = null;
		
		if(id == null){//新增
			vo = new SystemDictVo();
			vo.setModifiable(0);;
			vo.setOperatorId(getOperatorId());
			operatorId = vo.getOperatorId();
		}else{//更新
			vo = service.getSystemDictById(id).getData();
			operatorId = vo.getOperatorId();
		}
		ResponseResult<Map<String, Object>> rspResult = service.getToDropDownBox(operatorId,vo);
		return setResponseModel("publicData/parameter/paramDict",rspResult,model,request);
	}
	
	
	
	/**
	 * 新增字典参数
	 * @param bean
	 * @return
	 */
	@Auth
	@RequestMapping(value = "/add",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<SystemDictVo> saveSystemParam(@RequestBody SystemDictVo vo) {
		vo.setUserId(getUserId());
		setOperatorId(vo);
		return service.addOrModifySystemDict(vo);
	}
	
	/**
	 * 更新字典参数
	 * @param bean
	 * @return
	 */
	@Auth
	@RequestMapping(value = "/update", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<SystemDictVo> updateSystemParam(@RequestBody SystemDictVo vo) {
		vo.setUserId(getUserId());
		setOperatorId(vo);
		return service.addOrModifySystemDict(vo);
	}
	
	/**
	 * 更新字典参数
	 * @param bean
	 * @return
	 */
	@Auth
	@RequestMapping(value = "/effect", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<SystemDictVo> effect(@RequestBody SystemDictVo vo) {
		vo.setUserId(getUserId());
		setOperatorId(vo);
		return service.effectSystemDict(vo);
	}
	
	/**
	 * 更新字典参数
	 * @param bean
	 * @return
	 */
	@Auth
	@RequestMapping(value = "/notEffect", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<SystemDictVo> notEffect(@RequestBody SystemDictVo vo) {
		vo.setUserId(getUserId());
		setOperatorId(vo);
		return service.effectSystemDict(vo);
	}

	/**
	 * 
	* @Title: setOperatorId
	* @author kuangzengye
	* @date 2017年4月21日上午10:46:37
	* @param vo void
	* @description:设置运营商ID
	 */
	private void setOperatorId(SystemDictVo vo) {
		//运营商ID 设置 如果是运维（超管）就是传入的运营商ID，如果是运营商的管理员，operatorId就是当前运营商ID
		Long operatorId = getOperatorId();//运营商ID 当前激活的运营商ID 
		Long userType = getUserType();
		
		//鉴定是否是超管-运维人员
		if(userType != null && userType == 0){//运维人员
			operatorId = vo.getOperatorId();//传入的运营商ID
		}
		vo.setOperatorId(operatorId);
	}
	
}
