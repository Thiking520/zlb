package com.zhilianbao.erp.web.pms.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.pms.core.api.service.IOrderWavePickingService;
import com.zlb.erp.pms.core.api.vo.OrderWavePickingSearchVo;
import com.zlb.erp.pms.core.api.vo.OrderWavePickingVo;
import com.zlb.erp.pms.core.api.vo.ResponseResult;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by jiangfubing on 2017/5/18.
 */
@Controller
@RequestMapping("/orderWavePicking")
public class OrderWavePickingController extends BaseController {
    @Reference
    IOrderWavePickingService orderWavePickingService;
    @RequestMapping(value = "/init", method = RequestMethod.GET)
    public String init(Model model, HttpServletRequest request) {
        return setResponseModel("pms/orderWavePicking", model, request);
    }

    /**
     * 波次列表
     * @param searchVo
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<OrderWavePickingVo> list(@RequestBody OrderWavePickingSearchVo searchVo) {
        String operatorId= getOperatorId()+""; //运营商ID
        searchVo.setOperatorCode(operatorId);
        OrderWavePickingSearchVo sv = (searchVo != null) ? searchVo : new OrderWavePickingSearchVo();
        return orderWavePickingService.queryOrderWavePickingList(sv);
    }

    /**
     * 添加和修改波次
     * @param wavePickingVo
     * @return
     */
    @RequestMapping(value = "/saveUpdate", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<OrderWavePickingVo> saveUpdate(@RequestBody OrderWavePickingVo wavePickingVo) {
        wavePickingVo.setCreateName(getUserName()); //登录用户名
        String operatorId= getOperatorId()+""; //运营商ID
        wavePickingVo.setOperatorCode(operatorId);
        wavePickingVo.setOperator(getSelfOperatorName());
        return orderWavePickingService.savUpdateOrderWave(wavePickingVo);
    }

    /**
     * 删除波次
     * @param
     * @return
     */
    @RequestMapping(value = "/delete", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<OrderWavePickingVo> delete( String id) {
        return orderWavePickingService.deleteOrderWave(id);
    }
    /**
     * 删除波次
     * @param
     * @return
     */
    @RequestMapping(value = "/search", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<OrderWavePickingVo> search( String id) {
        return orderWavePickingService.searchOrderWave(id);
    }

}
