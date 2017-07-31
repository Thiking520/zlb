package com.zhilianbao.erp.auth.service.archives.facade;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import com.zhilianbao.erp.auth.vo.archives.DeliveryRecordSearchVo;
import com.zhilianbao.erp.auth.vo.archives.DeliveryRecordVo;
import com.zhilianbao.erp.auth.vo.archives.DeliveryShortRecordVo;
import com.zhilianbao.erp.auth.vo.archives.facade.ParaDeliveryRecordRestSearchVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ResponseValue;
/**
 * 站点外部接口调佣接口
 * @author wangshengxia
 *
 */
@Path("deliveryRecord")
@Consumes({MediaType.APPLICATION_JSON})
@Produces({ContentType.APPLICATION_JSON_UTF_8})
public interface IDeliveryRecordRestService {

	@POST
	@Path("name")
	public ResponseValue<List<DeliveryRecordVo>> mulDRName(ParaDeliveryRecordRestSearchVo paraDeliveryRecordRestSearchVo);
	
	@POST
	@Path("simpleName")
	public ResponseValue<DeliveryRecordVo> mulDRSimpleName(ParaDeliveryRecordRestSearchVo paraDeliveryRecordRestSearchVo);
	
	@POST
	@Path("queryDRByOperatorId")
	public ResponseValue<List<DeliveryRecordVo>> queryDRByOperatorId(ParaDeliveryRecordRestSearchVo paraDeliveryRecordRestSearchVo);
	
	@POST
	@Path("queryDRByUserID")
	public ResponseValue<DeliveryRecordVo> queryDRByUserID(ParaDeliveryRecordRestSearchVo paraDeliveryRecordRestSearchVo);
	
	/**
	 * 用户通过userId获取所拥有的站点
	 * @param paraDeliveryRecordRestSearchVo
	 * @return
	 */
	@POST
	@Path("getOwnPointList")
	public ResponseValue<List<DeliveryShortRecordVo>> getOwnPointList(DeliveryRecordSearchVo vo);
	
	/**
	 * 用户通过userId获取所拥有的站点
	 * @param paraDeliveryRecordRestSearchVo
	 * @return
	 */
	@POST
	@Path("getWarehouseList")
	public ResponseResult<Page<DeliveryShortRecordVo>> getWarehouseList(DeliveryRecordSearchVo vo);
}
