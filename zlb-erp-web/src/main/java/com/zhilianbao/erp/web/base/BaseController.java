package com.zhilianbao.erp.web.base;

import com.alibaba.fastjson.JSON;
import com.zhilianbao.erp.auth.vo.user.LoginManagerOperatorVo;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.constant.ResultEnum;
import com.zhilianbao.erp.common.redis.RedisUtils;
import com.zhilianbao.erp.common.util.LoginUtils;
import com.zhilianbao.erp.common.vo.ResponseResult;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


/**
* @company zhilianbaod
* @author chengjianhui
* @date 2016年9月22日下午2:01:29
* @description:抽象Controller处理基类
*/
public abstract class BaseController{
	
	@Autowired
	public HttpServletRequest request;
	@Autowired
	public HttpServletResponse response;

	protected static final String DEFAULT_ENCODING = "UTF-8";
	protected static final String DEFAULT_CONTENT_TYPE_VALUE = "application/json; charset=" + DEFAULT_ENCODING;
		
	/**
	 * @Title: setResponseModel
	 * @author chengjianhui
	 * @date 2016年10月22日上午12:29:38
	 * @param model
	 * @param rspResult
	 * @param request
	 * @return Model
	 * @description:设置响应参数
	 */
	protected String setResponseModel(String forwardUrl,ResponseResult rspResult,Model model,HttpServletRequest request) {
		String contextPath = request.getScheme() +"://" + request.getServerName() + ":" +request.getServerPort() + request.getContextPath();
		model.addAttribute("contextPath", contextPath);
		model.addAttribute("succ", ResultEnum.SUCCESSE.getCode().equals(rspResult.getCode()));
		model.addAttribute("code", rspResult.getCode());
		model.addAttribute("msg", rspResult.getMsg());
		model.addAttribute("data", rspResult.getData());
		return forwardUrl;
	}
	
	/**
	* @Title: setResponseModel
	* @author chengjianhui
	* @date 2016年10月22日上午12:29:39
	* @param model
	* @param request
	* @return Model
	* @description:方法重载
	*/
	protected String setResponseModel(String forwardUrl,Model model,HttpServletRequest request) {
		return setResponseModel(forwardUrl,new ResponseResult(),model,request);
	}
	
	/***
	 * 获取session
	 * @return
	 */
	public HttpSession getSession(){
		return request.getSession();
	}
	
	/***
	 * 获取sso用户id
	 * @return
	 */
	public Long getUserId(){
		return (Long) request.getSession().getAttribute(Constants.CENTER_ID);
	}
	
	/**
	 * 获取sso运营商id
	 * 
	 * @return
	 */
	public Long getOperatorId(){
		return (Long) request.getSession().getAttribute(Constants.COMPANY_KEY);
	}
	
	/***
	 * 获取用户名
	 * @return
	 */
	public String getUserName(){
		return (String) request.getSession().getAttribute(Constants.USER_NAME);
	}
	
	public Long getUserType(){
		return (Long) request.getSession().getAttribute(Constants.USER_TYPE);
	}
	/***
	 * self operatorId
	 * @return
	 */
	public Long getSelfOperatorId(){
		Long operatorId=(Long) request.getSession().getAttribute(Constants.OPERATOR_ID);
		return operatorId;
	}
	/***
	 * self userId
	 * @return
	 */
	public Long getSelfUserId(){
		return (Long) request.getSession().getAttribute(Constants.USER_ID);
	}
	/***
	 * 获取运营商名
	 * @return
	 */
	public String getSelfOperatorName(){
		return (String) request.getSession().getAttribute(Constants.COMPANY_NAME);
	}
	
	/***
	 * 获取redis 运营商信息
	 * @return
	 */
	public List<LoginManagerOperatorVo> qryManagerOperatorList() {
		List<LoginManagerOperatorVo> loginManagerOperatorVoList=null;
		Object manaOperatorIdObj=RedisUtils.rGet(String.valueOf(getSelfUserId())+Constants.MANA_OPERATOR_IDS+LoginUtils.sameUserKeyToken(getUserToken()));
		if(manaOperatorIdObj != null){
    		String jsonMObj=JSON.toJSONString(manaOperatorIdObj);
        	loginManagerOperatorVoList = JSON.parseArray(jsonMObj, LoginManagerOperatorVo.class);
		}
	    return loginManagerOperatorVoList;
	}
	
	/***
	 * 根据operatorIdToken 获取 companyKey
	 * @param operatorIdToken
	 * @return
	 */
	public Long getCenterOperatorId(String operatorIdToken){
		Long centerOperatorId=null;
		List<LoginManagerOperatorVo> loginManagerOperatorVoList=qryManagerOperatorList();
		for(LoginManagerOperatorVo loginManagerOperatorVo:loginManagerOperatorVoList){
    		if(loginManagerOperatorVo.getOperatorIdToken().equals(operatorIdToken)){
    			centerOperatorId=loginManagerOperatorVo.getCompanyKey();
    			break;
    		}
    	}
		return centerOperatorId;
	}
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(Date.class, new CustomDateEditor(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"), true));

	}

	/***
	 * 获取用户token
	 * @return
	 */
	public String getUserToken(){
		return (String) request.getSession().getAttribute(Constants.USER_TOKEN);
	}
	

	/***
	 * 将仓库编码放入到cookie中
	 * @return
	 * @throws Exception 
	 */
	public void putWarehouseCodeToCookie(String warehouseCode,String warehouseName) throws Exception{
			Cookie cookie= new Cookie(getWarehousePre(), URLEncoder.encode((warehouseCode+"_"+warehouseName),Constants.UTF_8));
			response.addCookie(cookie);
	}
		
	/**
	 * 获取仓库编码
	 * @return
	 */
	public  String getCookieWCode(){
		return getCookieValue(0);
	}
	/**
	 * 获取仓库编码
	 * @return
	 */
	public  String getCookieWName(){
		return getCookieValue(1);
	}
	
	/**
	 * 获取cookie中存放的值
	 * @param i
	 * @return
	 */
	public  String getCookieValue(int i){
		try {
			String cookieKey = getWarehousePre();
			Cookie[] cookies = request.getCookies();
			if(cookies != null){
				for (Cookie cookie : cookies) {
					if (StringUtils.equals(cookie.getName(),cookieKey)) {
						return URLDecoder.decode(cookie.getValue().split("_")[i],Constants.UTF_8) ;
					}
				}
			}
		} catch (Exception e) {
			return null;
		}
		return null;
	}
	
	/**
	 * 获取cookie中用户的仓库编码 key
	 */
	private String  getWarehousePre(){
		return  WAREHOUSE_CODE_PRE+"_"+getUserId();
	}
	public static final String WAREHOUSE_CODE_PRE = "CURREN_USER_WAREHOUSE";

}
