package com.zhilianbao.erp.auth.service.operators.facade;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import com.zhilianbao.erp.auth.vo.operators.OperatorVo;
import com.zhilianbao.erp.auth.vo.operators.facade.ParaOperatorNameRestVo;
import com.zhilianbao.erp.auth.vo.operators.facade.ParaOperatorRestVo;
import com.zhilianbao.erp.common.vo.ResponseValue;

@Path("operator")
@Consumes({MediaType.APPLICATION_JSON})
@Produces({ContentType.APPLICATION_JSON_UTF_8})
public interface IOperatorRestService {
	
	/***
	 * 获取多运营商信息
	 * @param paraOperatorRestVo
	 * @return
	 */
	@POST
	@Path("mulName")
	public ResponseValue<List<OperatorVo>> mulOperatorName(ParaOperatorRestVo paraOperatorRestVo);
	
	/***
	 * 获取运营商信息
	 * @param paraOperatorNameRestVo
	 * @return
	 */
	@POST
	@Path("name")
	public ResponseValue<OperatorVo> operatorName(ParaOperatorNameRestVo paraOperatorNameRestVo);
	
}
