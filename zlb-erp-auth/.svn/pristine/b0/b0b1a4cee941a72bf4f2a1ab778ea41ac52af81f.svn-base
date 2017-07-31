package com.zhilianbao.erp.auth.service.systemparameter.facade;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import com.zhilianbao.erp.auth.vo.systemparameter.BaseAreaVo;
import com.zhilianbao.erp.auth.vo.systemparameter.facade.ParaAreaVo;
import com.zhilianbao.erp.common.vo.ResponseValue;

/**
 * @author Tobin
 * @version 创建时间：2017年4月1日 下午2:43:30 类说明
 */
@Path("area")
@Consumes({ MediaType.APPLICATION_JSON })
@Produces({ ContentType.APPLICATION_JSON_UTF_8 })
public interface IBaseAreaRestService {
	/***
	 * 获取多运营商信息
	 * 
	 * @param paraOperatorRestVo
	 * @return
	 */
	@POST
	@Path("info")
	public ResponseValue<List<BaseAreaVo>> mulArea(ParaAreaVo paraAreaVo);
}
