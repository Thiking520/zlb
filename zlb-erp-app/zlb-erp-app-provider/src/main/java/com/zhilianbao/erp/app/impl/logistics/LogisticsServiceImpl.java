package com.zhilianbao.erp.app.impl.logistics;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Service;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import com.zhilianbao.erp.app.service.logistics.ILogisticsService;
import com.zhilianbao.erp.app.vo.logistics.LogisticsInfoVo;
import com.zhilianbao.erp.app.vo.logistics.ReqQueryLogisticInfoVo;
import com.zhilianbao.erp.app.vo.logistics.ResQueryLogisticInfoVo;
import com.zhilianbao.erp.auth.service.parameter.ISystemDictService;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.constant.ResultEnum;
import com.zhilianbao.erp.common.util.CollectionUtils;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.tms.service.ILogisticsLogsService;
import com.zhilianbao.erp.tms.service.IPdaLogisticsInfoService;
import com.zhilianbao.erp.tms.service.IWaybillService;
import com.zhilianbao.erp.tms.service.facade.ILogisticsLogsRestService;
import com.zhilianbao.erp.tms.vo.LogisticsLogsVo;
import com.zhilianbao.erp.tms.vo.OperationLogVo;
import com.zhilianbao.erp.tms.vo.pda.PdaLogisticsInfoVo;
@Service
@Path("logistics")
@Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_XML})
@Produces({ContentType.APPLICATION_JSON_UTF_8, ContentType.TEXT_XML_UTF_8})
public class LogisticsServiceImpl  implements ILogisticsService{
	
	@Reference
	private IPdaLogisticsInfoService  pdaLogisticsInfoService;
	@Reference
	private IWaybillService  waybillService;
	@Reference
	private ISystemDictService systemDictService;//RPC调用获取数据字典
	
	@Reference
	private ILogisticsLogsService logService;
	/**
	 * 
	* @Title: queryLogisticInfo
	* @author chenzhancheng
	* @date 2017年3月29日下午4:58:20
	* @param reqQueryLogisticInfoVo
	* @return ResponseResult<ResQueryLogisticInfoVo>
	* @description:按母运单号查询物流信息
	 */
	@POST
    @Path("queryLogisticInfo")
	@Override
	public ResponseResult<ResQueryLogisticInfoVo> queryLogisticInfo(ReqQueryLogisticInfoVo vo) {
		ResponseResult<ResQueryLogisticInfoVo> resp = new ResponseResult<ResQueryLogisticInfoVo>();
		ResQueryLogisticInfoVo infoVo = new ResQueryLogisticInfoVo();
		
		if("".equals(vo.getDisDriverNo()) || vo.getDisDriverNo() == null) {
			resp.setCode(ResultEnum.WAYBILL_EMPTY_ERROR.getCode());
			resp.setMsg(ResultEnum.WAYBILL_EMPTY_ERROR.getMsg());
			return resp;
		}
		LogisticsLogsVo logVo = new LogisticsLogsVo();
		logVo.setOperatorId(Long.parseLong(vo.getOperatorId()==null?"0":vo.getOperatorId()));
		logVo.setDisDriverNo(vo.getDisDriverNo());
		List<LogisticsLogsVo> list = logService.findByWayBill(logVo);
		if(list == null || list.size() == 0) {
			resp.setCode(ResultEnum.EMPTY.getCode());
			resp.setMsg(ResultEnum.EMPTY.getMsg());
			return resp;
		}
		
		resp.setCode(ResultEnum.SUCCESSE.getCode());
		resp.setMsg(ResultEnum.SUCCESSE.getMsg());
		String str = "";
		switch(list.get(0).getChildWalbillStatus()==null?"10":list.get(0).getChildWalbillStatus()){
			case "10": str="新建"; break;
			case "20": str="已确认"; break;
			case "30": str = "20".equals(list.get(0).getWaybillType())?str="已装车":"已揽收"; break;
			case "50": str="在途中"; break;
			case "98": str="已取消"; break;
			case "99": str="已签收"; break;
		}
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		List<LogisticsInfoVo> infoList  = new ArrayList<LogisticsInfoVo>();
		for (LogisticsLogsVo logisticsLogsVo : list) {
			LogisticsInfoVo logInfoVo = new LogisticsInfoVo();
			logInfoVo.setLogisticsDes(logisticsLogsVo.getLogDescribe());
			logInfoVo.setUpdateTime(sdf.format(logisticsLogsVo.getCreateTime().getTime()));
			infoList.add(logInfoVo);
		}
		infoVo.setLogisticState(str);
		infoVo.setLogisticsInfo(infoList);
		resp.setData(infoVo);
		return resp;
	}

}
