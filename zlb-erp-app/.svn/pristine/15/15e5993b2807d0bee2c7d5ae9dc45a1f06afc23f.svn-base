package com.zhilianbao.erp.app.service.wms;

import com.zhilianbao.erp.app.vo.wms.*;
import com.zhilianbao.erp.common.vo.ResponseResult;

/**
 * Created by jiangfubing on 2017/7/6.
 * 拣货单接口
 */
public interface IPickService {
    /**
     * 查询未完成拣货单列表
     * @param reqQueryPickListVo
     * @return
     */
    public ResponseResult<RspQueryPickListVo> queryNotTruckInfo(ReqQueryPickListVo reqQueryPickListVo);

    /**
     * 查询已经完成的拣货单列表
     * @param reqQueryPickListVo
     * @return
     */
    public ResponseResult<RspQueryPickListVo> queryInTruckInfo(ReqQueryPickListVo reqQueryPickListVo);

    /**
     * 搜索查询拣货列表
     * @param reqQueryPickListVo
     * @return
     */
    public ResponseResult<RspQueryPickListVo> searchFinishPickInfo(ReqQueryPickListVo reqQueryPickListVo);

    /**
     * 确认拣货完成接口
     * @param reqSurePick
     * @return
     */
    public ResponseResult<RspQueryPickListVo> surePick(ReqSurePick reqSurePick);

    /**
     * 查询未完成的拣货单商品列表
     * @param reqQueryPickGoodsList
     * @return
     */
    public ResponseResult<RspQueryPickGoodsList> queryNotPickGoodsList(ReqQueryPickGoodsList reqQueryPickGoodsList);
    /**
     * 查询完成的拣货单商品列表
     * @param reqQueryPickGoodsList
     * @return
     */
    public ResponseResult<RspQueryPickGoodsList> queryFinishPickGoodsList(ReqQueryPickGoodsList reqQueryPickGoodsList);
}
