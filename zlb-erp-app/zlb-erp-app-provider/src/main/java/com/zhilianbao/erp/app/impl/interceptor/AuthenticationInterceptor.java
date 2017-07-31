package com.zhilianbao.erp.app.impl.interceptor;

import com.alibaba.dubbo.rpc.*;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.zhilianbao.erp.common.constant.ResultEnum;
import com.zhilianbao.erp.common.constant.SSOFunc;
import com.zhilianbao.erp.common.util.PropUtils;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.SSORequestVo;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
* @company zhilianbao
* @author chengjianhui
* @date 2017年5月9日下午8:13:36
* @description:鉴权校验拦截器(检验userId、token)
*/
@Component
public class AuthenticationInterceptor implements Filter  {
	private static Logger logger = LogManager.getLogger(AuthenticationInterceptor.class);
	//白名单
	public static final String INTERFACE_WHITELIST = PropUtils.getConfigValue("interface.whitelist");

	public static final List<String> WHITE_LIST = new ArrayList<String>();;
	
	@Override
	public Result invoke(Invoker<?> invoker, Invocation invocation) throws RpcException {
		ResponseResult<String> resp = new ResponseResult<String>();
		long start = System.currentTimeMillis();
		
		if (null == invoker.getUrl()) {
			return new RpcResult(resp.failure(ResultEnum.ILLEGAL_ACCESS)); 
		}
		if(!checkAuth(invocation,start)){
			return new RpcResult(resp.failure(ResultEnum.ILLEGAL_ACCESS)); 
		}
		Result result = invoker.invoke(invocation);
		logger.info("Resp<====Method=【{}】,Cost={},Exception={},ResponseResult={}",invocation.getMethodName(),System.currentTimeMillis() - start,result.getException(),JSON.toJSONString(result.getValue()));
		return result;
	}

	/**
	* @company zhilianbao
	* @author chengjianhui
	* @date 2017年5月20日上午9:28:03
	* @description:鉴权校验
	*/
	private boolean checkAuth(Invocation invocation,long start) {
		String reqParamJsonStr = JSON.toJSONString(invocation.getArguments());
		logger.info("Req====>Method=【{}】,param={},whitelist={}",invocation.getMethodName(),reqParamJsonStr,INTERFACE_WHITELIST);
		if(StringUtils.isBlank(reqParamJsonStr)){
			return false; 
		}
		if(StringUtils.isNotBlank(INTERFACE_WHITELIST) && CollectionUtils.isEmpty(WHITE_LIST)){
			WHITE_LIST.addAll(Arrays.asList(INTERFACE_WHITELIST.split(",")));
		}
		if(WHITE_LIST.contains(invocation.getMethodName())){
			return true; 
		}
		
		String jsonStr = reqParamJsonStr.substring(reqParamJsonStr.indexOf("[") + 1,reqParamJsonStr.lastIndexOf("]"));
		JSONObject jsonObj = JSONObject.parseObject(jsonStr);
		String token = jsonObj.getString("token");
		String uCenterId = jsonObj.getString("uCenterId");
		if(StringUtils.isBlank(token) || StringUtils.isBlank(uCenterId)){
			return false; 
		}
		//IUserAccountService accountService = (IUserAccountService) SpringContextHolder.getBean("userAccountServiceImpl");
		if(!SSOFunc.verifyToken(new SSORequestVo(Long.parseLong(uCenterId),token))){
			return false; 
		}
		return true;
	}
}
