package com.zhilianbao.erp.app.impl.info;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Service;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import com.zhilianbao.erp.app.service.info.IAppBaseInfoService;
import com.zhilianbao.erp.app.vo.user.ReqGetAppVersionVo;
import com.zhilianbao.erp.app.vo.user.ResGetAppVersionVo;
import com.zhilianbao.erp.auth.service.pda.IPdaAppBaseInfoService;
import com.zhilianbao.erp.auth.vo.pda.PdaAppInfoVo;
import com.zhilianbao.erp.common.constant.ResultEnum;
import com.zhilianbao.erp.common.vo.ResponseResult;

@Path("appinfo")
@Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_XML})
@Produces({ContentType.APPLICATION_JSON_UTF_8, ContentType.TEXT_XML_UTF_8})
@Service
public class AppBaseInfoServiceImpl implements IAppBaseInfoService,Serializable{

	private static final long serialVersionUID = -8194939540441140869L;
	
	@Reference
	private IPdaAppBaseInfoService appBaseInfoService;
	
	@POST
    @Path("queryAppVersion")
	@Override
	public ResponseResult<ResGetAppVersionVo> queryAppVersionInfo(ReqGetAppVersionVo vo) {
		ResponseResult<ResGetAppVersionVo> resp = new ResponseResult<ResGetAppVersionVo>();
		Map<String, Object> map = new HashMap<String, Object>();
		PdaAppInfoVo appInfoVo = appBaseInfoService.getAppVersionInfo(map);
		if (null == appInfoVo) {
			return resp.failure(ResultEnum.LAST_VERSION);
		}
		if (appInfoVo.getVersion() > Integer.valueOf(vo.getAppVersionCode())) {
			return resp.success(new ResGetAppVersionVo(appInfoVo));
		}
		return resp.failure(ResultEnum.LAST_VERSION);
	}

}
