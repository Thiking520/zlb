package com.zhilianbao.erp.app.impl.wms;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import com.alibaba.fastjson.JSONObject;
import com.zhilianbao.erp.app.impl.cache.UserCacheUtil;
import com.zhilianbao.erp.app.service.wms.ITakeOpreateService;
import com.zhilianbao.erp.app.vo.ReqBaseVo;
import com.zhilianbao.erp.app.vo.user.AppUserVo;
import com.zhilianbao.erp.app.vo.wms.QueryDetailSearchVo;
import com.zhilianbao.erp.app.vo.wms.SubmitReceiptDeal;
import com.zhilianbao.erp.common.constant.ResultEnum;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zlb.erp.wms.core.api.service.IWmsStorageInService;
import com.zlb.erp.wms.core.api.vo.ReceiptDeal;
import com.zlb.erp.wms.core.api.vo.TakeGoodsVo;
import com.zlb.erp.wms.core.api.vo.WmsPdaDetailSearchVo;
import com.zlb.erp.wms.core.api.vo.WmsStorageInSearchVo;
import com.zlb.erp.wms.core.api.vo.pda.ReceiptDealVo;
import com.zlb.erp.wms.core.api.vo.pda.ReceiptInfo;
import com.zlb.erp.wms.core.api.vo.pda.ReceiptInfoDetail;
import com.zlb.erp.wms.core.api.vo.pda.ReceiptUnFinishDetail;
import com.zlb.erp.wms.core.api.vo.pda.ToDoList;

import tk.mybatis.mapper.util.StringUtil;

/**
 * 
* @Title: TakeOpreateServiceImpl
* @author liushilei
* @date 2017年7月19日下午6:01:55
* @description:
 */
@Service
@Path("operate")
@Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_XML})
@Produces({ContentType.APPLICATION_JSON_UTF_8, ContentType.TEXT_XML_UTF_8})
public class TakeOpreateServiceImpl implements ITakeOpreateService {
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	@Reference
	private IWmsStorageInService storageInService;
    /**
     * 查询已经完成的入库单
     * @param reqQueryPickListVo
     * @return
     */
    @POST
    @Path("queryFinshList")
    @Override
    public ResponseResult<Map<String,List<ReceiptInfo>>> queryFinshList(QueryDetailSearchVo searchVo) {
    	ResponseResult<Map<String,List<ReceiptInfo>>> rs =new ResponseResult<Map<String,List<ReceiptInfo>>>();
    	LOGGER.info("PDA入库单查询数据,请求参数json：{}", searchVo);
    	WmsStorageInSearchVo wmsStorageInSearchVo = getWmsStorageInSearchVoByReq(searchVo);
    	wmsStorageInSearchVo.setStatus("99");
    	wmsStorageInSearchVo.setStorageInNo(searchVo.getInStoreNo());
        List<ReceiptInfo> finshList =  storageInService.queryPdaStorageInList(wmsStorageInSearchVo);
        Map<String,List<ReceiptInfo>> result = new HashMap<String,List<ReceiptInfo>>();
        result.put("receiptInfos", finshList);
        LOGGER.info("PDA入库单查询数据,返回参数json：{}", result);
        return rs.success(result);
    }
    
    /**
     * 查询未完成入库订单
     * @param reqQueryPickListVo
     * @return
     */
    @POST
    @Path("queryUnfinished")
    @Override
    public ResponseResult<Map<String, List<ReceiptInfo>>> queryUnfinished(QueryDetailSearchVo searchVo) {
    	ResponseResult<Map<String,List<ReceiptInfo>>> rs =new ResponseResult<Map<String,List<ReceiptInfo>>>();
    	LOGGER.info("PDA入库单查询数据,请求参数json：{}", searchVo);
    	WmsStorageInSearchVo wmsStorageInSearchVo = getWmsStorageInSearchVoByReq(searchVo);
    	wmsStorageInSearchVo.setStorageInNo(searchVo.getInStoreNo());
        List<ReceiptInfo> unfinshList =  storageInService.queryPdaStorageInList(wmsStorageInSearchVo);
        Map<String,List<ReceiptInfo>> result = new HashMap<String,List<ReceiptInfo>>();
        result.put("receiptInfos", unfinshList);
        LOGGER.info("PDA入库单查询数据,返回参数json：{}", result);
        return rs.success(result);
    }

    /**
     * 查询完成入库订单
     * @param reqQueryPickListVo
     * @return
     */
    @POST
    @Path("queryList")
    @Override
    public ResponseResult<Map<String, List<ReceiptInfo>>> queryList(QueryDetailSearchVo searchVo) {
    	ResponseResult<Map<String,List<ReceiptInfo>>> rs =new ResponseResult<Map<String,List<ReceiptInfo>>>();
    	LOGGER.info("PDA入库单查询数据,请求参数json：{}", searchVo);
    	WmsStorageInSearchVo wmsStorageInSearchVo = getWmsStorageInSearchVoByReq(searchVo);
    	wmsStorageInSearchVo.setStatus("99");
    	wmsStorageInSearchVo.setStorageInNo(searchVo.getInStoreNo());
        List<ReceiptInfo> operateList =  storageInService.queryPdaStorageInList(wmsStorageInSearchVo);
        Map<String,List<ReceiptInfo>> result = new HashMap<String,List<ReceiptInfo>>();
        result.put("receiptInfos", operateList);
        LOGGER.info("PDA入库单查询数据,返回参数json：{}", result);
        return rs.success(result);
    }
    
    /**
     * 查询完成入库订单详情列表
     * @param reqQueryPickListVo
     * @return
     */
    @POST
    @Path("queryFinishDetailList")
    @Override
    public ResponseResult<Map<String, List<ReceiptInfoDetail>>> queryFinishDetailList(QueryDetailSearchVo searchVo) {
    	ResponseResult<Map<String,List<ReceiptInfoDetail>>> rs =new ResponseResult<Map<String,List<ReceiptInfoDetail>>>();
    	LOGGER.info("PDA入库单查询数据,请求参数json：{}", searchVo);
    	WmsPdaDetailSearchVo detailSearchVo = (WmsPdaDetailSearchVo) getReqObj(searchVo,WmsPdaDetailSearchVo.class);
    	detailSearchVo.setStorageInNo(searchVo.getInStoreNo());
    	detailSearchVo.setSearchKey(searchVo.getSearchKey());
        List<ReceiptInfoDetail> operateDetailList =  storageInService.queryPdaStorDetailList(detailSearchVo);
        Map<String,List<ReceiptInfoDetail>> result = new HashMap<String,List<ReceiptInfoDetail>>();
        result.put("finishRptGoodsInfos", operateDetailList);
        LOGGER.info("PDA入库单查询数据,返回参数json：{}", result);
        return rs.success(result);
    }
    
    /**
     * 查询没有完成入库订单详情列表
     * @param reqQueryPickListVo
     * @return
     */
    @POST
    @Path("queryUnfinishDetailList")
    @Override
    public ResponseResult<Map<String, List<ReceiptUnFinishDetail>>> queryUnfinishDetailList(QueryDetailSearchVo searchVo) {
    	ResponseResult<Map<String,List<ReceiptUnFinishDetail>>> rs =new ResponseResult<Map<String,List<ReceiptUnFinishDetail>>>();
    	LOGGER.info("PDA入库单查询数据,请求参数json：{}", searchVo);
    	WmsPdaDetailSearchVo detailSearchVo = (WmsPdaDetailSearchVo) getReqObj(searchVo,WmsPdaDetailSearchVo.class);
    	detailSearchVo.setStorageInNo(searchVo.getInStoreNo());
    	detailSearchVo.setSearchKey(searchVo.getSearchKey());
        List<ReceiptUnFinishDetail> unfinishDetailList =  storageInService.queryUnfinishDetailList(detailSearchVo);
        Map<String,List<ReceiptUnFinishDetail>> result = new HashMap<String,List<ReceiptUnFinishDetail>>();
        result.put("receiptGoodsInfos", unfinishDetailList);
        LOGGER.info("PDA入库单查询数据,返回参数json：{}", result);
        return rs.success(result);
    }
    
    /**
     * 查询收货交易列表
     * @param reqQueryPickListVo
     * @return
     */
    @POST
    @Path("queryTransactionList")
    @Override
    public ResponseResult<ReceiptDealVo> queryTransactionList(QueryDetailSearchVo searchVo) {
    	ResponseResult<ReceiptDealVo> rs =new ResponseResult<ReceiptDealVo>();
    	LOGGER.info("PDA查询收货交易列表,请求参数json：{}", searchVo);
    	WmsPdaDetailSearchVo detailSearchVo = (WmsPdaDetailSearchVo) getReqObj(searchVo,WmsPdaDetailSearchVo.class);
    	detailSearchVo.setGoodsNo(searchVo.getGoodsNo());
    	detailSearchVo.setStorageInNo(searchVo.getInStoreNo());
        ReceiptDealVo  transaction =  storageInService.queryTransactionList(detailSearchVo);
        LOGGER.info("PDA查询收货交易列表,返回参数json：{}", transaction);
        int pageNo = searchVo.getPageNo();
        if(transaction==null){
        	return rs.success();
        }else{
        	//如果的是第一页并且没有交易记录的时候,则不传递transaction数据过去。但是如果是第二页以后包括第一页的时候如果dealInfos为空则需要把transaction传递过去
	        List<ReceiptDeal>  receiptDeals = transaction.getDealInfos();
	        if(receiptDeals!=null && receiptDeals.size()>0){
	        	 return rs.success(transaction);
	        }else{
	        	if(pageNo==1){
	        		return rs.success();
	        	}else{
	        		return rs.success(transaction);
	        	}
	        }
        }
    }
    
    /**
     * 取消收货交易
     * @param reqQueryPickListVo
     * @return
     */
    @POST
    @Path("cancelDeal")
    @Override
    public ResponseResult<Map<String, String>> cancelDeal(QueryDetailSearchVo searchVo) {
    	LOGGER.info("取消收货交易json：{}", searchVo);
    	ResponseResult<Map<String,String>> rs =new ResponseResult<Map<String,String>>();
    	WmsPdaDetailSearchVo detailSearchVo = (WmsPdaDetailSearchVo) getReqObj(searchVo,WmsPdaDetailSearchVo.class);
    	detailSearchVo.setGoodsNo(searchVo.getGoodsNo());
    	detailSearchVo.setStorageInNo(searchVo.getInStoreNo());
    	detailSearchVo.setDealNo(searchVo.getDealNo());
    	try {
    		Map<String,String> result =  storageInService.cancelPdaDeal(detailSearchVo);
    		LOGGER.info("取消收货交易返回参数json：{}", result);
            String isOk = result.get("code");
            if(StringUtil.isEmpty(isOk)){
            	return rs.err();
            }else if(isOk.equals("0000")){
            	return rs.success(result);	
            }else if(isOk.equals("9999")){
            	return rs.err();	
            }else{
            	return rs.failure(isOk, result.get("message"));
            }
		} catch (Exception e) {
			e.printStackTrace();
			return rs.err();
		}
    }
    /**
     * 入账操作
     */
    @POST
    @Path("takeAccount")
    @Override
	public ResponseResult<Map<String, String>> takePdaAccount(QueryDetailSearchVo searchVo){
		LOGGER.info("入库入账请求参数json：{}", searchVo);
		ResponseResult<Map<String,String>> rs =new ResponseResult<Map<String,String>>();
		WmsPdaDetailSearchVo detailSearchVo = (WmsPdaDetailSearchVo) getReqObj(searchVo,WmsPdaDetailSearchVo.class);
		detailSearchVo.setStorageInNo(searchVo.getInStoreNo());
		detailSearchVo.setIsContinue(searchVo.getIsContinue());
		try {
			Map<String,String> result = storageInService.takePdaAccount(detailSearchVo);	
			LOGGER.info("入库入账请求返回参数json：{}", result);
			String isOk = result.get("code");
	        if(StringUtil.isEmpty(isOk)){
	        	return rs.err();
	        }else if(isOk.equals("0000")){
	        	return rs.success(result);	
	        }else if(isOk.equals("9999")){
	        	return rs.err();	
	        }else{
	        	return rs.failure(isOk, result.get("message"));
	        }
		} catch (Exception e) {
			return rs.err();
		}
	}
    /**
	 * 入库订单关闭操作
	 * @param ids
	 * @return
	 * @throws Exception
	 */
    @POST
    @Path("closeOrder")
    @Override
	public ResponseResult<Map<String, String>> closeOrder(QueryDetailSearchVo searchVo) throws Exception{
    	LOGGER.info("取消收货交易json：{}", searchVo);
    	ResponseResult<Map<String,String>> rs =new ResponseResult<Map<String,String>>();
    	WmsPdaDetailSearchVo detailSearchVo = (WmsPdaDetailSearchVo) getReqObj(searchVo,WmsPdaDetailSearchVo.class);
    	detailSearchVo.setGoodsNo(searchVo.getGoodsNo());
    	detailSearchVo.setStorageInNo(searchVo.getInStoreNo());
    	detailSearchVo.setDealNo(searchVo.getDealNo());
    	try {
    		Map<String,String> result =  storageInService.colsePdaOrder(detailSearchVo);
    		LOGGER.info("取消收货交易返回参数json：{}", result);
            String isOk = result.get("code");
            if(StringUtil.isEmpty(isOk)){
            	return rs.err();
            }else if(isOk.equals("0000")){
            	return rs.success(result);	
            }else if(isOk.equals("9999")){
            	return rs.err();	
            }else{
            	return rs.failure(isOk, result.get("message"));
            }
		} catch (Exception e) {
			return rs.err();
		}
	}
    
    /**
	 * 获取订单的收货状态
	 * @param ids
	 * @return
	 * @throws Exception
	 */
    @POST
    @Path("getState")
    @Override
	public ResponseResult<Map<String, String>> getState(QueryDetailSearchVo searchVo) throws Exception{
    	LOGGER.info("获取订单的收货状态json：{}", searchVo);
    	ResponseResult<Map<String,String>> rs =new ResponseResult<Map<String,String>>();
    	WmsPdaDetailSearchVo detailSearchVo = (WmsPdaDetailSearchVo) getReqObj(searchVo,WmsPdaDetailSearchVo.class);
    	detailSearchVo.setGoodsNo(searchVo.getGoodsNo());
    	detailSearchVo.setStorageInNo(searchVo.getInStoreNo());
    	detailSearchVo.setDealNo(searchVo.getDealNo());
    	try {
    		Map<String,String> result =  storageInService.getState(detailSearchVo);
    		LOGGER.info("获取订单的收货状态返回参数json：{}", result);
    		return rs.success(result);
		} catch (Exception e) {
			return rs.err();
		}
	}
    /**
	 * 获取待处理的任务
	 * @param ids
	 * @return
	 * @throws Exception
	 */
    @POST
    @Path("getToDoList")
    @Override
	public ResponseResult<ToDoList> getToDoList(QueryDetailSearchVo searchVo) throws Exception{
    	LOGGER.info("获取待处理的任务json：{}", searchVo);
    	ResponseResult<ToDoList> rs =new ResponseResult<ToDoList>();
    	WmsPdaDetailSearchVo detailSearchVo = (WmsPdaDetailSearchVo) getReqObj(searchVo,WmsPdaDetailSearchVo.class);
    	try {
    		ToDoList toDoList =  storageInService.getToDoList(detailSearchVo);
    		LOGGER.info("获取待处理的任务返回参数json：{}", toDoList);
    		return rs.success(toDoList);
		} catch (Exception e) {
			return rs.err();
		}
	}
    
    /**
	 * 扫描后检查商品是否有效
	 * @param model
	 * @param request
	 * @return
	 */
    @POST
    @Path("checkGoodState")
    @Override
	public ResponseResult<Map<String, String>> checkGoodState(QueryDetailSearchVo searchVo){
    	ResponseResult<Map<String,String>> rs =new ResponseResult<Map<String,String>>();
    	LOGGER.info("扫描后检查商品是否有效,请求参数json：{}", searchVo);
    	WmsPdaDetailSearchVo detailSearchVo = (WmsPdaDetailSearchVo) getReqObj(searchVo,WmsPdaDetailSearchVo.class);
    	detailSearchVo.setStorageInNo(searchVo.getInStoreNo());
    	detailSearchVo.setSkuBarCode(searchVo.getSkuBarCode());
    	Map<String,String> result  =  storageInService.checkGoodState(detailSearchVo);
    	LOGGER.info("收货操作返回的参数json：{}", result);
		String isOk = result.get("code");
        if(StringUtil.isEmpty(isOk)){
        	return rs.err();
        }else if(isOk.equals("0000")){
        	result.remove("code");
        	return rs.success(result);	
        }else if(isOk.equals("9999")){
        	return rs.err();	
        }else{
        	return rs.failure(isOk, result.get("message"));
        }
    }
    /**
	 * 开始收货请求
	 * @param model
	 * @param request
	 * @return
	 */
    @POST
    @Path("takeGoodsDetail")
    @Override
	public ResponseResult<Map<String, ReceiptUnFinishDetail>> takeGoodsDetail(QueryDetailSearchVo searchVo){
    	ResponseResult<Map<String,ReceiptUnFinishDetail>> rs =new ResponseResult<Map<String,ReceiptUnFinishDetail>>();
    	LOGGER.info("PDA入库单查询数据,请求参数json：{}", searchVo);
    	WmsPdaDetailSearchVo detailSearchVo = (WmsPdaDetailSearchVo) getReqObj(searchVo,WmsPdaDetailSearchVo.class);
    	detailSearchVo.setStorageInNo(searchVo.getInStoreNo());
    	detailSearchVo.setGoodsNo(searchVo.getGoodsNo());
        ReceiptUnFinishDetail  unfinishDetail =  storageInService.queryUnfinishDetail(detailSearchVo);
        Map<String,ReceiptUnFinishDetail> result = new HashMap<String,ReceiptUnFinishDetail>();
        result.put("receiptGoodsInfo", unfinishDetail);
        LOGGER.info("PDA入库单查询数据,返回参数json：{}", result);
        return rs.success(result);
    }
    
	/**
	 * 收货操作
	 * @param model
	 * @param request
	 * @return
	 */
    @POST
    @Path("takeGoodsOperate")
    @Override
	public ResponseResult<Map<String, String>> takegoodsOperate(SubmitReceiptDeal submitReceiptDeal){
		LOGGER.info("收货操作请求参数json：{}", submitReceiptDeal);
		ResponseResult<Map<String,String>> rs =new ResponseResult<Map<String,String>>();
		if(submitReceiptDeal!=null && StringUtils.isNotEmpty(submitReceiptDeal.getInStoreNo())){
			boolean qtyIsNull = (submitReceiptDeal.getGoodProductAmount()==null && submitReceiptDeal.getBadProductAmount()==null && submitReceiptDeal.getRejectAmount()==null) || submitReceiptDeal.getInStoreDate()==null ; 
			if(qtyIsNull){
				return rs.failure(ResultEnum.ILLEGAL_PARAM);
			}
			TakeGoodsVo takeGoodsVo = getTakeGoodsVoBySubmitReceiptDeal(submitReceiptDeal);
			try {
				Map<String,String>  resultMap = storageInService.pdaTakegoodsOperate(takeGoodsVo);
				LOGGER.info("收货操作返回的参数json：{}", resultMap);
				String isOk = resultMap.get("code");
		        if(StringUtil.isEmpty(isOk)){
		        	return rs.err();
		        }else if(isOk.equals("0000")){
		        	return rs.success(resultMap);	
		        }else if(isOk.equals("9999")){
		        	return rs.err();	
		        }else{
		        	return rs.failure(isOk, resultMap.get("message"));
		        }
			} catch (Exception e) {
				e.printStackTrace();
				return rs.err();
			}
		}else{
			return rs.failure(ResultEnum.ILLEGAL_PARAM);
		}
	}
    /**
     * 根据pda的参数转换成wms-service的实体请求对象
     * @param submitReceiptDeal
     * @return
     */
    private TakeGoodsVo getTakeGoodsVoBySubmitReceiptDeal(SubmitReceiptDeal submitReceiptDeal) {
    	TakeGoodsVo takeGoodsVo = new TakeGoodsVo();
    	AppUserVo user = UserCacheUtil.getUser(submitReceiptDeal.getuCenterId());
    	takeGoodsVo.setCreator(user.getNickName());
    	takeGoodsVo.setModifier(user.getNickName());
    	takeGoodsVo.setDeName(user.getNickName());
    	takeGoodsVo.setOperatorCode(String.valueOf(user.getOperatorId()));
    	takeGoodsVo.setBrokenQty(submitReceiptDeal.getBadProductAmount());
    	takeGoodsVo.setDeName(user.getNickName());
    	takeGoodsVo.setExpiredDate(submitReceiptDeal.getBadDate());
    	takeGoodsVo.setProductDate(submitReceiptDeal.getProductDate());
    	takeGoodsVo.setRefuseDesc(submitReceiptDeal.getRejectReason());
    	takeGoodsVo.setRefuseQty(submitReceiptDeal.getRejectAmount());
    	takeGoodsVo.setRefuseReason("10");
    	takeGoodsVo.setSkuProBatchNo(submitReceiptDeal.getProductBatchNum());
    	takeGoodsVo.setSkuQty(submitReceiptDeal.getGoodProductAmount());
    	takeGoodsVo.setStorageDate(submitReceiptDeal.getInStoreDate());
    	takeGoodsVo.setStorageInNo(submitReceiptDeal.getInStoreNo());
    	takeGoodsVo.setSkuCode(submitReceiptDeal.getGoodsNo());
		return takeGoodsVo;
	}

	/**
     * 获取查询实体
     * @param searchVo
     * @return
     */
    public  WmsStorageInSearchVo getWmsStorageInSearchVoByReq(ReqBaseVo searchVo){
    	WmsStorageInSearchVo wmsStorageInSearchVo = new WmsStorageInSearchVo();
    	AppUserVo user = UserCacheUtil.getUser(searchVo.getuCenterId());
    	wmsStorageInSearchVo.setOperatorCode(user.getOperatorId().toString());
    	wmsStorageInSearchVo.setAssignerCode(user.getEmployeeId());
    	wmsStorageInSearchVo.setPageSize(searchVo.getPageSize());
    	wmsStorageInSearchVo.setOffset((searchVo.getPageNo()-1)*searchVo.getPageSize());
    	return wmsStorageInSearchVo;
    }

    /**
     * 获取查询实体
     * @param searchVo
     * @return
     */
    public  Object getReqObj(ReqBaseVo searchVo,Class<?> cls){
    	JSONObject jsoObj = new JSONObject();
    	AppUserVo user = UserCacheUtil.getUser(searchVo.getuCenterId());
    	jsoObj.put("pageSize", searchVo.getPageSize());
    	jsoObj.put("modifier", user.getuCenterId());
    	jsoObj.put("creator", user.getNickName());
    	jsoObj.put("operatorCode", user.getOperatorId());
    	jsoObj.put("assignerCode", user.getEmployeeId());
    	jsoObj.put("offset", (searchVo.getPageNo()-1)*searchVo.getPageSize());
    	return JSONObject.toJavaObject(jsoObj, cls);
    }
}