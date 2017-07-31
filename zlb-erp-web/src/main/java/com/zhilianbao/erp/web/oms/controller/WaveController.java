package com.zhilianbao.erp.web.oms.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.oms.service.IWaveService;
import com.zhilianbao.erp.oms.vo.OperatorWaveVo;
import com.zhilianbao.erp.oms.vo.WaveSearchVo;
import com.zhilianbao.erp.oms.vo.WaveVo;
import com.zhilianbao.erp.web.base.BaseController;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/wave")
public class WaveController extends BaseController{

    @Reference
    private IWaveService waveService;

    /**
     * @author kuangzengye
     * @date 2017/7/10 16:58
     * @description:初始化订单波次页面
     */
    @RequestMapping(value = "/init",  method = RequestMethod.GET)
    public String initWave(Model model, HttpServletRequest request) {
        return setResponseModel("oms/waveList",model,request);
    }

    /**
     * @author kuangzengye
     * @date 2017/7/10 15:23
     * @description:查询波次列表
     */
//	@Auth
    @RequestMapping(value = "/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<Page<WaveVo>> queryWaveList(@RequestBody WaveSearchVo vo) {
        vo.setOperatorId(getOperatorId());
        return waveService.queryWaveListByPage(vo);
    }

    //	@Auth
    @RequestMapping(value = "/save",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult saveWave(@RequestBody WaveVo vo) {
        vo.setOperatorId(getOperatorId());
        vo.setCreator(getUserId());
        vo.setCreateName(getUserName());
        return waveService.saveOrUpdateWave(vo);
    }

    //	@Auth
    @RequestMapping(value = "/update",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult updateWave(@RequestBody WaveVo vo) {
        vo.setOperatorId(getOperatorId());
        vo.setModifier(getUserId());
        vo.setUpdateName(getUserName());
        return waveService.saveOrUpdateWave(vo);
    }

    /**
    * @author kuangzengye
    * @date 2017/7/14 14:28
    * @description:启用波次管理
    */
    @RequestMapping(value = "/enable",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult enableOperatorWave(@RequestBody OperatorWaveVo vo) {
        vo.setOperatorId(getOperatorId());
        vo.setCreator(getUserId());
        vo.setCreateName(getUserName());
        vo.setWaveEnabled(true);
        return waveService.enableOrDisableOperatorWave(vo);
    }

    /**
    * @author kuangzengye
    * @date 2017/7/14 14:29
    * @description:禁用波次管理
    */
    @RequestMapping(value = "/disable",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult disableOperatorWave(@RequestBody OperatorWaveVo vo) {
        vo.setOperatorId(getOperatorId());
        vo.setModifier(getUserId());
        vo.setUpdateName(getUserName());
        vo.setWaveEnabled(false);
        return waveService.enableOrDisableOperatorWave(vo);
    }

    //	@Auth
    @RequestMapping(value = "/delete",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult deleteWave(@RequestBody WaveVo vo) {
        return waveService.deleteWave(vo);
    }

    //	@Auth
    @RequestMapping(value = "/query",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult queryWave(@RequestBody WaveVo vo) {
        vo.setOperatorId(getOperatorId());
        return waveService.queryWaveById(vo);
    }

    @RequestMapping(value = "/queryOperatorWave",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<OperatorWaveVo> queryOperatorWave(@RequestBody OperatorWaveVo vo) {
        vo.setOperatorId(getOperatorId());
        return waveService.queryOperatorWave(vo);
    }
}
