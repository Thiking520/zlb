package com.zhilianbao.erp.auth.service.goods.facade;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import com.zhilianbao.erp.auth.vo.goods.facade.ReqGoodsRestVo;
import com.zhilianbao.erp.auth.vo.goods.facade.RspGoodsRestVo;
import com.zhilianbao.erp.common.vo.ResponseValue;

@Path("goods")
@Consumes({MediaType.APPLICATION_JSON})
@Produces({ContentType.APPLICATION_JSON_UTF_8})
public interface IGoodsRestService {
	
	/***
	 * 获取商品信息
	 * @param goodsRestVo
	 * @return
	 */
	@POST
	@Path("goodsInfo")
	public ResponseValue<List<RspGoodsRestVo>> mulGoodsInfo(ReqGoodsRestVo reqGoodVo);
	
}
