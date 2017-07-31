package com.zhilianbao.erp.app.utils;

import com.zhilianbao.erp.app.vo.sms.ReqSmsQueryVo;
import org.apache.commons.lang.StringUtils;

/**
* @Company zhilianbao
* @Title: PdaVoUtils
* @Author kuangzengye
* @Date 2017/6/15 16:24
* @Description:处理Pda的Vo状态转换工具类
*/

public class PdaVoUtils {

    //判断是否确认装车：true已经确认，false:未装车
    //childWalbillStatus 30：已装车/已揽收 50：在途中
    public static boolean isSureTruck(String childWalbillStatus){
        if(childWalbillStatus == null){
            return false;
        }else{
          return StringUtils.equalsIgnoreCase(childWalbillStatus,"30") || StringUtils.equalsIgnoreCase(childWalbillStatus,"50");
        }
    }

    //获取分页offset
    public static Integer getOffset(ReqSmsQueryVo reqSmsQueryVo){
        return (reqSmsQueryVo.getPageNo() - 1)* reqSmsQueryVo.getPageSize();
    }
}
