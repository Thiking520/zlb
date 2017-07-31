package com.zhilianbao.erp.web.wms.controller.mastdata;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.goods.IGoodsTypeService;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
import com.zhilianbao.erp.web.base.BaseController;
import com.zlb.erp.pms.core.api.service.ISupplierService;
import com.zlb.erp.pms.core.api.vo.PmsSupplierSearchVo;
import com.zlb.erp.pms.core.api.vo.PmsSupplierVo;
import com.zlb.erp.wms.core.api.service.ISkuManageService;
import com.zlb.erp.wms.core.api.vo.ResponseResult;
import com.zlb.erp.wms.core.api.vo.SkuManageSearchVo;
import com.zlb.erp.wms.core.api.vo.SkuManageVo;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.File;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

/**
 * wms条形码控制层
 * Created by jiangfubing on 2017/7/26.
 */
@Controller
@RequestMapping("wms/skuManage")
public class SkuManageController extends BaseController {
	protected Logger LOGGER = LoggerFactory.getLogger(getClass());
	  
    @Reference
    ISkuManageService skuManageService;
    
    @Reference
    ISupplierService supplierService;
    
	@Reference
	IGoodsTypeService goodsTypeService;
	
    @RequestMapping(value = "/init",  method = RequestMethod.GET)
    public String init(Model model, HttpServletRequest request){
        return setResponseModel("wms/mastdata/skuManage",model,request);
    }

    /**
     * 查询列表
     * @param searchVo
     * @return
     */
    @RequestMapping(value = "/list", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<SkuManageVo> list(@RequestBody SkuManageSearchVo searchVo) {
        String operatorId= getOperatorId()+""; //运营商ID
        searchVo.setOperatCode(operatorId);
        SkuManageSearchVo  sv = (searchVo != null) ? searchVo : new SkuManageSearchVo();
        return skuManageService.queryListByPage(sv);
    }
    /**
     * 添加和修改
     * @param skuManageVo
     * @return
     */
    @RequestMapping(value = "/saveUpdate", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseResult<SkuManageVo> saveUpdate(@RequestBody SkuManageVo skuManageVo) {
        skuManageVo.setCreator(getUserName()); //登录用户名
        String operatorId= getOperatorId()+""; //运营商ID
        skuManageVo.setOperatCode(operatorId);
        skuManageVo.setWarehouseName(getCookieWName());
        skuManageVo.setWarehouseCode(getCookieWCode());
        skuManageVo.setOperatName(getSelfOperatorName());
        return skuManageService.savUpdateSkuManage(skuManageVo);
    }
    
    /**
     * 查询供应商列表
     * @param searchVo
     * @return
     */
    @RequestMapping(value = "/supplierList", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public com.zlb.erp.pms.core.api.vo.ResponseResult<PmsSupplierVo> list(@RequestBody PmsSupplierSearchVo searchVo) {
        searchVo.setOperatorId(getOperatorId().toString());
        return supplierService.querySupplierListByPage(searchVo);
    }
    
	/**
	 * 商品类型，树形结构
	 * @param vo
	 * @return ：ResponseResult<GoodsTypeBean>
	 * @author ：chenll
	 * @date ：2017年3月2日 下午3:16:19
	 */
	@RequestMapping(value = "/goodsTypeTree",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Map<String, Object>> goodsTypeTree() {
		ViewSearchVo vo = new ViewSearchVo();
		vo.setOperatorId(getOperatorId());
		return goodsTypeService.goodsTypeTree(vo);
	}
	
	
    /**
     * 查询供应商列表
     * @param searchVo
     * @return
     */
	@RequestMapping(value = "/printSku", method = RequestMethod.GET)
    public String printSku(@RequestParam(value = "skuBarCode", required = true) String skuBarCode,Model model) {
    	LOGGER.info("条码打印请求参数json：{}", skuBarCode);
        String[] skuBarCodes = skuBarCode.split(",");
        String warehouseCode = getCookieWCode();
        List<SkuManageVo> listSku = skuManageService.printSkuManage(skuBarCodes, warehouseCode);
        
        JRDataSource jrDataSource = new JRBeanCollectionDataSource(listSku);
        // 动态指定报表模板url
        model.addAttribute("url", "/WEB-INF/jasper/rptSkuBarCode.jasper");
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
}
