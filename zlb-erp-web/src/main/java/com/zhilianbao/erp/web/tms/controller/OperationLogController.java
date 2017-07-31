package com.zhilianbao.erp.web.tms.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.tms.service.IOperationLogService;
import com.zhilianbao.erp.tms.vo.OperationLogVo;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 日志查询（派车单日志，排线单日志，运单日志）
 * @author wangshengxia
 *
 */
@Controller
@RequestMapping("tms/operationLog")
public class OperationLogController extends BaseController{

	@Reference
	private IOperationLogService olService;
	/**
	 * 更具类型查询对应的日志
	 * @Title:OperationLogController
	 * @author wangshengxia
	 * @date 2017年4月5日下午5:22:48
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/list",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<OperationLogVo>> list(@RequestBody OperationLogVo vo) {
		OperationLogVo sv = (vo != null) ? vo : new OperationLogVo();
		vo.setOperatorId(getOperatorId());
		
		return olService.queryOperationLogByPage(sv);
	}
	
	@RequestMapping(value = "/addOperationLog")
	@ResponseBody
	public ResponseResult<OperationLogVo> addOperationLog(@RequestBody OperationLogVo vo) {
		vo.setOperatorId(getOperatorId());
		return olService.addOperationLog(vo);
	}
}
