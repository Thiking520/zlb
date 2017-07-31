package com.zhilianbao.erp.app.service.wms;

import java.util.List;
import java.util.Map;

import com.zhilianbao.erp.app.vo.wms.QueryDetailSearchVo;
import com.zhilianbao.erp.app.vo.wms.SubmitReceiptDeal;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.pda.ReceiptDealVo;
import com.zlb.erp.wms.core.api.vo.pda.ReceiptInfo;
import com.zlb.erp.wms.core.api.vo.pda.ReceiptInfoDetail;
import com.zlb.erp.wms.core.api.vo.pda.ReceiptUnFinishDetail;
import com.zlb.erp.wms.core.api.vo.pda.ToDoList;

/**
 * 
* @Title: ITakeOpreateService
* @author liushilei
* @date 2017年7月19日下午4:25:45
* @description:
 */
public interface ITakeOpreateService {

	ResponseResult<Map<String, List<ReceiptInfo>>> queryFinshList(QueryDetailSearchVo searchVo);

	ResponseResult<Map<String, List<ReceiptInfo>>> queryUnfinished(QueryDetailSearchVo searchVo);

	ResponseResult<Map<String, List<ReceiptInfo>>> queryList(QueryDetailSearchVo searchVo);

	ResponseResult<Map<String, List<ReceiptInfoDetail>>> queryFinishDetailList(QueryDetailSearchVo searchVo);

	ResponseResult<Map<String, List<ReceiptUnFinishDetail>>> queryUnfinishDetailList(QueryDetailSearchVo searchVo);

	ResponseResult<ReceiptDealVo> queryTransactionList(QueryDetailSearchVo searchVo);

	ResponseResult<Map<String, String>> cancelDeal(QueryDetailSearchVo searchVo);

	ResponseResult<Map<String, String>> takePdaAccount(QueryDetailSearchVo searchVo);

	ResponseResult<Map<String, String>> closeOrder(QueryDetailSearchVo searchVo) throws Exception;

	ResponseResult<Map<String, String>> takegoodsOperate(SubmitReceiptDeal submitReceiptDeal);

	ResponseResult<Map<String, ReceiptUnFinishDetail>> takeGoodsDetail(QueryDetailSearchVo searchVo);

	ResponseResult<Map<String, String>> getState(QueryDetailSearchVo searchVo) throws Exception;

	ResponseResult<Map<String, String>> checkGoodState(QueryDetailSearchVo searchVo);

	ResponseResult<ToDoList> getToDoList(QueryDetailSearchVo searchVo) throws Exception;

}
