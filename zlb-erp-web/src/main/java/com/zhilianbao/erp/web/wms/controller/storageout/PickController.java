package com.zhilianbao.erp.web.wms.controller.storageout;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.parameter.ISystemParamService;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.util.office.PoiExcelUtils;
import com.zhilianbao.erp.web.base.BaseController;
import com.zhilianbao.erp.web.wms.util.ExcelTitleMap;
import com.zhilianbao.erp.web.wms.util.ExportToExcelUtil;
import com.zlb.erp.wms.core.api.service.IWmsPickService;
import com.zlb.erp.wms.core.api.vo.*;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * wms拣货单控制层
 * Created by jiangfubing on 2017/4/13.
 */
@Controller
@RequestMapping("wms/pick")
public class PickController extends BaseController {
    protected Logger LOGGER = LoggerFactory.getLogger(getClass());
    @Reference
    IWmsPickService wmsPickService;
    @Reference
    private ISystemParamService systemParamService;

    @RequestMapping(value = "/init", method = RequestMethod.GET)
    public String init(Model model, HttpServletRequest request) {
        return setResponseModel("wms/storageout/pickList", model, request);
    }

    /**
     * 拣货单列表查询分页
     *
     * @param searchVo
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsPickVo> list(@RequestBody WmsPickSearchVo searchVo) {
        LOGGER.info("分页查询拣货单数据，请求参数json：{}", searchVo);
        searchVo.setOperatorCode(getOperatorId().toString());
        searchVo.setWarehouseCode(getCookieWCode());
        ResponseResult<WmsPickVo> wmsPickVoResponseResult = wmsPickService.queryPickListByPage(searchVo);
        return wmsPickVoResponseResult;
    }

    /**
     * 拣货单分派
     *
     * @param
     * @return
     */
    @RequestMapping(value = "/pickIsSate", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsPickVo> pickIsSate(String ids, String pickName, String pickEmpCode, String pickCode) {
        if (StringUtils.isNotEmpty("ids")) {
            String[] confrimIds = ids.split(",");
            String[] pickCodes = pickCode.split(",");
            String operatorId = getOperatorId() + "";
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("operatCode", operatorId);
            param.put("ids", confrimIds);
            param.put("userName", getUserName());
            param.put("pickName", pickName);
            param.put("pickEmpCode", pickEmpCode);
            param.put("pickCode", pickCodes);
            return wmsPickService.pickIsStateFp(param);
        } else {
            return new ResponseResult<WmsPickVo>(ResultEnum.ILLEGAL_PARAM);
        }
    }

    /**
     * 拣货完成确认
     *
     * @param ids
     * @return
     */
    @RequestMapping(value = "/pickComplete", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsPickVo> pickComplete(String ids, String pickCode) {
        if (StringUtils.isNotEmpty("ids")) {
            String[] confrimIds = ids.split(",");
            String[] pickCodes = pickCode.split(",");
            String operatorId = getOperatorId() + "";
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("userName", getUserName());
            param.put("operatCode", operatorId);
            param.put("ids", confrimIds);
            param.put("pickCode", pickCodes);
            return wmsPickService.pickComplete(param);
        } else {
            return new ResponseResult<WmsPickVo>(ResultEnum.ILLEGAL_PARAM);
        }
    }

    /**
     * 作废拣货单
     *
     * @param ids
     * @return
     */
    @RequestMapping(value = "/pickCancellation", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsPickVo> pickCancellation(String ids) {
        if (StringUtils.isNotEmpty("ids")) {
            String[] confrimIds = ids.split(",");
            String operatorId = getOperatorId() + "";
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("operatCode", operatorId);
            param.put("ids", confrimIds);
            return wmsPickService.pickCancellation(param);
        } else {
            return new ResponseResult<WmsPickVo>(ResultEnum.ILLEGAL_PARAM);
        }
    }

    /**
     * 取消拣货单分派
     *
     * @param ids
     * @return
     */
    @RequestMapping(value = "/piclkCancelAssign", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsPickVo> piclkCancelAssign(String ids, String pickCode) {
        if (StringUtils.isNotEmpty("ids")) {
            String[] confrimIds = ids.split(",");
            String[] pickCodes = pickCode.split(",");
            String operatorId = getOperatorId() + "";
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("userName", getUserName());
            param.put("operatCode", operatorId);
            param.put("ids", confrimIds);
            param.put("pickCode", pickCodes);
            return wmsPickService.piclkCancelAssign(param);
        } else {
            return new ResponseResult<WmsPickVo>(ResultEnum.ILLEGAL_PARAM);
        }
    }

    /**
     * 拣货单批量导出
     *
     * @param searchVo
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/pickExport", method = RequestMethod.POST)
    public void deliveryorderListExport(WmsPickSearchVo searchVo, HttpServletResponse response) {
        LOGGER.info("导出拣货单数据，请求参数json：{}", searchVo);
        long operatorId = getOperatorId();
        searchVo.setOperatorCode(operatorId + "");
        searchVo.setWarehouseCode(getCookieWCode());
        try {
            searchVo.setOperatorCode(getOperatorId().toString());
            List<WmsPickVo> pickVos = wmsPickService.pickListExport(searchVo);
            String fileName = "拣货单列表";
            PoiExcelUtils.setDownFileCommonHttpHeader(response,fileName,request);
            ExportToExcelUtil.writeExecl(pickVos, ExcelTitleMap.PICK_STORTITLE, fileName, response.getOutputStream());
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.info("导出拣货单数据出错json：{}", e.getMessage());
        }
    }


    /**
     * @param
     * @Title: pickBillBatchPrint
     * @author yp
     * @date 2017年4月12日上午9:36:18
     * @description:拣货清单打印
     */
    @RequestMapping(value = "/print/pick", method = RequestMethod.GET)
    public String operationBillBatchPrint(@RequestParam(value = "pickCode", required = true) String pickCode, Model model) {
        LOGGER.info("拣货清单打印请求参数json：{}", pickCode);
        String[] idArray = pickCode.split(",");
        String flag = "0";
        List<WmsPickPrintVo> batchPrintResult = wmsPickService.pickBillBatchPrint(idArray, flag);
        // 报表数据源
        JRDataSource jrDataSource = new JRBeanCollectionDataSource(batchPrintResult);
        // 动态指定报表模板url
        model.addAttribute("url", "/WEB-INF/jasper/rptPicking.jasper");
        model.addAttribute("format", "pdf"); // 报表格式
        model.addAttribute("jrMainDataSource", jrDataSource);

        //传入自定义的参数
        //动态获取jasper目录路径
        String jasperPath = System.getProperty(Constants.WEB_ROOT) +
                "WEB-INF" + File.separator + "jasper" + File.separator;
        //传递子报表目录路径
        model.addAttribute("SUBREPORT_DIR", jasperPath);
        return "iReportView"; // 对应jasper-defs.xml中的bean id
    }

    /**
     * @param pickCode
     * @Title: shoppingPrint
     * @author yp
     * @date 2017年4月12日上午9:36:18
     * @description:购物清单打印
     */
    @RequestMapping(value = "/print/shopping", method = RequestMethod.GET)
    public String shoppingPrint(@RequestParam(value = "pickCode", required = true) String pickCode, Model model) {
        LOGGER.info("购物清单打印请求参数json：{}", pickCode);
        String[] idArray = pickCode.split(",");
        List<ShoppingListVo> batchPrintResult = wmsPickService.shoppingListPrint(idArray);
        // 报表数据源
        JRDataSource jrDataSource = new JRBeanCollectionDataSource(batchPrintResult);
        // 动态指定报表模板url
        model.addAttribute("url", "/WEB-INF/jasper/rptInventory.jasper");
        model.addAttribute("format", "pdf"); // 报表格式
        model.addAttribute("jrMainDataSource", jrDataSource);

        //传入自定义的参数
        //动态获取jasper目录路径
        String jasperPath = System.getProperty(Constants.WEB_ROOT) +
                "WEB-INF" + File.separator + "jasper" + File.separator;
        //传递子报表目录路径
        model.addAttribute("SUBREPORT_DIR", jasperPath);
        return "iReportView"; // 对应jasper-defs.xml中的bean id
    }

    /**
     * 出库面单打印
     *
     * @param pickCode
     * @param model
     * @return
     */
    @RequestMapping(value = "/print/express", method = RequestMethod.GET)
    public String expressPrint(@RequestParam(value = "pickCode", required = true) String pickCode, @RequestParam(value = "flag", required = true) String flag, Model model) {
        LOGGER.info("面单打印请求参数json：{}", pickCode);
        String[] idArray = pickCode.split(",");
        List<ShoppingListVo> batchPrintResult = wmsPickService.expressPrint(idArray, flag);
        // 报表数据源
        JRDataSource jrDataSource = new JRBeanCollectionDataSource(batchPrintResult);
        // 动态指定报表模板url
        model.addAttribute("url", "/WEB-INF/jasper/rptExpress.jasper");
        model.addAttribute("format", "pdf"); // 报表格式
        model.addAttribute("jrMainDataSource", jrDataSource);

        //传入自定义的参数
        //动态获取jasper目录路径
        String jasperPath = System.getProperty(Constants.WEB_ROOT) +
                "WEB-INF" + File.separator + "jasper" + File.separator;
        //传递子报表目录路径
        model.addAttribute("SUBREPORT_DIR", jasperPath);
        return "iReportView"; // 对应jasper-defs.xml中的bean id
    }

    /**
     * 拣货明细
     * @param pickCode
     * @param
     * @return
     */
    @RequestMapping(value = "/pickDetail", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<WmsPickPrintVo> pickDetail(String pickCode) {
        if (StringUtils.isNotEmpty("pickCode")) {
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("userName", getUserName());
            String[] pickCodes = {pickCode};
            String flag = "1";
            List<WmsPickPrintVo> batchPrintResult = wmsPickService.pickBillBatchPrint(pickCodes, flag);
            ResponseResult responseResult = new ResponseResult();
            responseResult.setData(batchPrintResult);
            responseResult.success();
            return responseResult;
        } else {
            return new ResponseResult<WmsPickPrintVo>(ResultEnum.ILLEGAL_PARAM);
        }
    }
}
