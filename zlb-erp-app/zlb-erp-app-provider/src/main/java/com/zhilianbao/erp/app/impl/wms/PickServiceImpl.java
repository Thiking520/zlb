package com.zhilianbao.erp.app.impl.wms;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import com.zhilianbao.erp.app.impl.cache.UserCacheUtil;
import com.zhilianbao.erp.app.service.wms.IPickService;
import com.zhilianbao.erp.app.vo.user.AppUserVo;
import com.zhilianbao.erp.app.vo.wms.*;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zlb.erp.wms.core.api.service.IWmsPickService;
import com.zlb.erp.wms.core.api.vo.WmsPickSearchVo;
import com.zlb.erp.wms.core.api.vo.pda.PdaPickInfoVo;
import com.zlb.erp.wms.core.api.vo.pda.PdaPickSkuVo;
import com.zlb.erp.wms.core.api.vo.pda.PdaSurePickSearchVo;
import org.springframework.stereotype.Service;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by jiangfubing on 2017/7/6.
 */
@Service
@Path("pick")
@Consumes({MediaType.APPLICATION_JSON, MediaType.TEXT_XML})
@Produces({ContentType.APPLICATION_JSON_UTF_8, ContentType.TEXT_XML_UTF_8})
public class PickServiceImpl implements IPickService {
    @Reference
    private IWmsPickService wmsPickService;
    /**
     * 查询未完成拣货单列表
     * @param reqQueryPickListVo
     * @return
     */
    @POST
    @Path("queryNotPickList")
    @Override
    public ResponseResult<RspQueryPickListVo> queryNotTruckInfo(ReqQueryPickListVo reqQueryPickListVo) {
        ResponseResult<RspQueryPickListVo> rs =new ResponseResult<RspQueryPickListVo>();
        WmsPickSearchVo searchVo =new WmsPickSearchVo();
        AppUserVo user = UserCacheUtil.getUser(reqQueryPickListVo.getuCenterId());
        searchVo.setPickEmpCode(user.getEmployeeId());
        searchVo.setOperatorCode(user.getOperatorId().toString());
        searchVo.setState("20");
        searchVo.setPageSize(reqQueryPickListVo.getPageSize());
        searchVo.setOffset(reqQueryPickListVo.getPageNo());
        searchVo.setCurrentPage((reqQueryPickListVo.getPageNo()-1)*reqQueryPickListVo.getPageSize());
        List<PdaPickInfoVo> pickInfoVoList =  wmsPickService.PdaPickListPage(searchVo);
        return rs.success(new RspQueryPickListVo(pickInfoVoList));
    }

    /**
     * 查询完成的拣货单列表
     * @param reqQueryPickListVo
     * @return
     */
    @POST
    @Path("queryPickList")
    @Override
    public ResponseResult<RspQueryPickListVo> queryInTruckInfo(ReqQueryPickListVo reqQueryPickListVo) {
        ResponseResult<RspQueryPickListVo> rs =new ResponseResult<RspQueryPickListVo>();
        WmsPickSearchVo searchVo =new WmsPickSearchVo();
        //设置登录用户名
        AppUserVo user = UserCacheUtil.getUser(reqQueryPickListVo.getuCenterId());
        searchVo.setPickEmpCode(user.getEmployeeId());
        searchVo.setOperatorCode(user.getOperatorId().toString());
        searchVo.setState("80");
        searchVo.setPageSize(reqQueryPickListVo.getPageSize());
        searchVo.setCurrentPage((reqQueryPickListVo.getPageNo()-1)*reqQueryPickListVo.getPageSize());
        List<PdaPickInfoVo> pickInfoVoList =  wmsPickService.PdaPickListPage(searchVo);
        return rs.success(new RspQueryPickListVo(pickInfoVoList));
    }

    /**
     * 搜索查询拣货但列表
     * @param reqQueryPickListVo
     * @return
     */
    @POST
    @Path("searchFinishPickInfo")
    @Override
    public ResponseResult<RspQueryPickListVo> searchFinishPickInfo(ReqQueryPickListVo reqQueryPickListVo) {
        ResponseResult<RspQueryPickListVo> rs =new ResponseResult<RspQueryPickListVo>();
        WmsPickSearchVo searchVo =new WmsPickSearchVo();
        //设置登录用户名
        AppUserVo user = UserCacheUtil.getUser(reqQueryPickListVo.getuCenterId());
        searchVo.setPickEmpCode(user.getEmployeeId());
        searchVo.setOperatorCode(user.getOperatorId().toString());
        searchVo.setState("99");
        searchVo.setPickCode(reqQueryPickListVo.getPickNoTag());
        searchVo.setPageSize(reqQueryPickListVo.getPageSize());
        searchVo.setCurrentPage((reqQueryPickListVo.getPageNo()-1)*reqQueryPickListVo.getPageSize());
        List<PdaPickInfoVo> pickInfoVoList =  wmsPickService.PdaPickListPage(searchVo);
        return rs.success(new RspQueryPickListVo(pickInfoVoList));
    }

    /**
     * 确认拣货完成接口
     * @param reqSurePick
     * @return
     */
    @POST
    @Path("surePick")
    @Override
    public ResponseResult surePick(ReqSurePick reqSurePick) {
        ResponseResult<RspSurePick> responseResult =new ResponseResult<RspSurePick>();
        PdaSurePickSearchVo searchVo = new PdaSurePickSearchVo();
        AppUserVo user = UserCacheUtil.getUser(reqSurePick.getuCenterId());
        searchVo.setUserId(user.getEmployeeId());
        searchVo.setOperatorCode(user.getOperatorId().toString());
        searchVo.setPickCode(reqSurePick.getPickNo());
        searchVo.setGoodsNo(reqSurePick.getGoodsNo());
        searchVo.setPickLocation(reqSurePick.getPickLocation());
        int flag=wmsPickService.pdaSurePick(searchVo);
        if(flag==0){
            return responseResult.success(new RspSurePick("99"));
        }else {
            return responseResult.err();
        }
    }
    /**
     * 查询未完成的拣货单对应商品列表
     * @param reqQueryPickGoodsList
     * @return
     */
    @POST
    @Path("queryNotPickGoodsList")
    @Override
    public ResponseResult<RspQueryPickGoodsList> queryNotPickGoodsList(ReqQueryPickGoodsList reqQueryPickGoodsList) {
        ResponseResult<RspQueryPickGoodsList> rs =new ResponseResult<RspQueryPickGoodsList>();
        PdaSurePickSearchVo searchVo =new PdaSurePickSearchVo();
        AppUserVo user = UserCacheUtil.getUser(reqQueryPickGoodsList.getuCenterId());
        searchVo.setUserId(user.getEmployeeId());
        searchVo.setPickCode(reqQueryPickGoodsList.getPickNo());
        searchVo.setOperatorCode(user.getOperatorId().toString());
        searchVo.setPageSize(reqQueryPickGoodsList.getPageSize());
        searchVo.setCurrentPage((reqQueryPickGoodsList.getPageNo()-1)*reqQueryPickGoodsList.getPageSize());
        List<PdaPickSkuVo> pickSkuVos =  wmsPickService.pdaPickGoodsList(searchVo);
        return rs.success(new RspQueryPickGoodsList(pickSkuVos));
    }

    /**
     * 查询已经完成的拣货单商品对应列表
     * @param reqQueryPickGoodsList
     * @return
     */
    @POST
    @Path("queryFinishPickGoodsList")
    @Override
    public ResponseResult<RspQueryPickGoodsList> queryFinishPickGoodsList(ReqQueryPickGoodsList reqQueryPickGoodsList) {
        ResponseResult<RspQueryPickGoodsList> rs =new ResponseResult<RspQueryPickGoodsList>();
        PdaSurePickSearchVo searchVo =new PdaSurePickSearchVo();
        AppUserVo user = UserCacheUtil.getUser(reqQueryPickGoodsList.getuCenterId());
        searchVo.setUserId(user.getEmployeeId());
        searchVo.setOperatorCode(user.getOperatorId().toString());
        searchVo.setPickCode(reqQueryPickGoodsList.getPickNo());
        searchVo.setPageSize(reqQueryPickGoodsList.getPageSize());
        searchVo.setCurrentPage((reqQueryPickGoodsList.getPageNo()-1)*reqQueryPickGoodsList.getPageSize());
        List<PdaPickSkuVo> pickSkuVos =  wmsPickService.pdaPickGoodsList(searchVo);
        return rs.success(new RspQueryPickGoodsList(pickSkuVos));
    }

}
