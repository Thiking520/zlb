package com.zhilianbao.erp.auth.service.cars.facade;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import com.zhilianbao.erp.auth.vo.cars.CarsVo;
import com.zhilianbao.erp.auth.vo.cars.facade.ParaCarsRestVo;
import com.zhilianbao.erp.common.vo.ResponseValue;
/**
 * 车辆档案外部系统访问接口
 * @author Administrator
 *
 */
@Path("car")
@Consumes({MediaType.APPLICATION_JSON})
@Produces({ContentType.APPLICATION_JSON_UTF_8})
public interface ICarsRestService {
	@POST
	@Path("name")
	public ResponseValue<List<CarsVo>> mulOperatorName(ParaCarsRestVo paraCarsRestVo); 
}
