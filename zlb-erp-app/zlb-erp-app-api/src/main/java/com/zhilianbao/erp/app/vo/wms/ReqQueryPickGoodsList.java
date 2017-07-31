package com.zhilianbao.erp.app.vo.wms;

import com.zhilianbao.erp.app.vo.ReqBaseVo;

import java.io.Serializable;

/**
 * 拣货单商品列表查询Vo
 * Created by jiangfubing on 2017/7/10.
 */
public class ReqQueryPickGoodsList extends ReqBaseVo implements Serializable {

    private static final long serialVersionUID = 8991959236986722167L;

    public String getPickNo() {
        return pickNo;
    }

    public void setPickNo(String pickNo) {
        this.pickNo = pickNo;
    }

    private String pickNo;

}
