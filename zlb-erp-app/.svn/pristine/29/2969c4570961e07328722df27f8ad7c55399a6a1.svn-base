package com.zhilianbao.erp.app.service.sms;

import com.zhilianbao.erp.app.vo.ReqBaseVo;
import com.zhilianbao.erp.app.vo.sms.ReqPdaSmsTemplateVo;
import com.zhilianbao.erp.app.vo.sms.ReqResendSmsVo;
import com.zhilianbao.erp.app.vo.sms.ReqSmsQueryVo;
import com.zhilianbao.erp.common.vo.ResponseResult;

import java.util.Map;

/**
* @company zhilianbao
* @title: IPdaSmsService
* @author kuangzengye
* @date 2017/6/15 16:22
* @description:短信通知业务Service
*/

public interface IPdaSmsService {
	
    public ResponseResult<String> pusSms(ReqBaseVo rbv);

    /**
    * @author kuangzengye
    * @date 2017/6/15 16:51
    * @description:查询装箱单列表接口
    */
    public ResponseResult<Map<String,Object>> queryPackingList(ReqSmsQueryVo reqSmsQueryVo);

    /**
    * @author kuangzengye
    * @date 2017/6/15 16:51
    * @description:搜索需要发送短信运单列表接口
    */
    public ResponseResult<Map<String,Object>> querySendSmsWaybillList(ReqSmsQueryVo reqSmsQueryVo);

    /**
    * @author kuangzengye
    * @date 2017/6/16 15:19
    * @description:发送短信接口
    */
    public ResponseResult<Map<String,Object>> sendSms(ReqPdaSmsTemplateVo reqPdaSmsTemplateVo);

    /**
    * @author kuangzengye
    * @date 2017/6/19 9:37
    * @description:查询已经发送短信列表接口
    */
    public ResponseResult<Map<String,Object>> querySentSmsList(ReqSmsQueryVo reqSmsQueryVo);

    /**
    * @author kuangzengye
    * @date 2017/6/19 11:13
    * @description:查询短信模版列表接口
    */
    public ResponseResult<Map<String,Object>> querySmsTemplateList(ReqSmsQueryVo reqSmsQueryVo);

    /**
    * @author kuangzengye
    * @date 2017/6/19 11:39
    * @description:查询已经发送短信对应接收人接口
    */
    public ResponseResult<Map<String,Object>> querySentSmsWaybillList(ReqSmsQueryVo reqSmsQueryVo);

    /**
    * @author kuangzengye
    * @date 2017/6/23 9:10
    * @description:重发短信--支持批量跟单个重发
    */
    public ResponseResult<Map<String,Object>> resendSms(ReqResendSmsVo reqResendSmsVo);

}
