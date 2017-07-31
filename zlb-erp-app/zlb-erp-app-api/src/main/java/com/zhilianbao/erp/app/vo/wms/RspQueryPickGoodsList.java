package com.zhilianbao.erp.app.vo.wms;

import com.zlb.erp.wms.core.api.vo.pda.PdaPickSkuVo;

import java.io.Serializable;
import java.util.List;

/**
 * 查询拣货单对应商品列表响应vo
 * Created by jiangfubing on 2017/7/10.
 */
public class RspQueryPickGoodsList implements Serializable {
    private static final long serialVersionUID = 842018617178679446L;

    public RspQueryPickGoodsList(List<PdaPickSkuVo> pickSkuVos) {
        super();
        this.pickSkuVos = pickSkuVos;
    }

    public List<PdaPickSkuVo> getPickSkuVos() {
        return pickSkuVos;
    }

    public void setPickSkuVos(List<PdaPickSkuVo> pickSkuVos) {
        this.pickSkuVos = pickSkuVos;
    }

    private List<PdaPickSkuVo> pickSkuVos;
}
