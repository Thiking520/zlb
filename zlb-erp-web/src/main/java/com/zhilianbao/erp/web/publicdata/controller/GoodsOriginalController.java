package com.zhilianbao.erp.web.publicdata.controller;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.http.HttpResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.goods.IGoodsOriginalService;
import com.zhilianbao.erp.auth.service.parameter.ISystemDictService;
import com.zhilianbao.erp.auth.vo.goods.GoodsOriginalBatchImportVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsOriginalVo;
import com.zhilianbao.erp.auth.vo.parameter.rpc.DictVo;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 原始商品
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月10日 上午11:12:34
 */
@Controller
@RequestMapping("/publicData/goodsOriginal")
public class GoodsOriginalController extends BaseController {

	@Reference
	private IGoodsOriginalService goodsOriginalService;
	@Reference
	private ISystemDictService systemDictService;//RPC调用获取数据字典
	/**
	 * 初始化进入原始商品列表界面
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：luliang
	 * @date ：2017年5月18日 
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		if(getOperatorId() == 0)
			return setResponseModel("publicData/goodsOriginal/blank",model,request);
		return setResponseModel("publicData/goods/goodsOriginalList",model,request);
	}
	
	/**
	 * 进入新增页面
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：luliang
	 * @date ：2017年5月18日 
	 */
	@RequestMapping(value = "/toAddView",  method = RequestMethod.GET)
	public String toAddView(Model model, HttpServletRequest request) {
		return setResponseModel("publicData/goods/goodsOriginalAdd",model,request);
	}

	/**
	 * 原始商品单位下拉列表
	 * @param model
	 * @param request
	 * @return ：ResponseResult<Map<String,Object>>
	 * @author ：chenll
	 * @date ：2017年4月6日 上午11:13:46
	 */
	@ResponseBody
	@RequestMapping(value = "/initDropDown",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseResult<Map<String,Object>> initDropDown(Model model, HttpServletRequest request) {
		ResponseResult<Map<String, Object>> rspResult = new ResponseResult<Map<String, Object>>();
		List<DictVo> goodsUnitList = systemDictService.getDictList(getOperatorId(), Constants.ORIGIN_GOODS_UNIT).getData();
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("goodsUnitList", goodsUnitList);
		rspResult.setData(result);
		return rspResult;
	}
	
	/**
	 * 初始化进入原始商品列表界面
	 * @param vo
	 * @return ：ResponseResult<GoodsOriginalVo>
	 * @author ：luliang
	 * @date ：2017年5月18日 
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<GoodsOriginalVo>> list(@RequestBody ViewSearchVo vo) {
		ViewSearchVo sv = (vo != null) ? vo : new ViewSearchVo();
		String searchKey = sv.getSearchKey();
		if(StringUtils.isNotEmpty(searchKey)&&searchKey.length()>=2&&searchKey.contains("O_")){
			searchKey = searchKey.substring(2);
			sv.setSearchKey(searchKey);
		}
		sv.setOperatorId(getOperatorId());
		return goodsOriginalService.queryListByPage(sv);
	}

	
	/**
	 * 新增原始商品
	 * @param goods
	 * @return ：ResponseResult<GoodsOriginalVo>
	 * @author ：luliang
	 * @date ：2017年5月18日 
	 */
	@RequestMapping(value = "/addData")
	@ResponseBody
	public ResponseResult<GoodsOriginalVo> addData(@RequestBody GoodsOriginalVo goods) {
		goods.setOperatorId(getOperatorId());
		goods.setOperatorName(getSelfOperatorName());
		goods.setCreator(getUserId());
		goods.setModifier(getUserId());
		return goodsOriginalService.addData(goods);
	}

	/**
	 * 查询原始商品详情
	 * @param goods
	 * @return ：ResponseResult<GoodsOriginalVo>
	 * @author ：luliang
	 * @date ：2017年5月18日 
	 */
	@RequestMapping(value = "/queryDetails",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsOriginalVo> queryDetails(@RequestBody GoodsOriginalVo vo) {
		vo.setOperatorId(getOperatorId());
		
		ResponseResult<GoodsOriginalVo> res = goodsOriginalService.queryDetails(vo);
		
		return res;
	}
	
	/**
	 * 删除原始商品
	 * @param goods
	 * @return ：ResponseResult<GoodsOriginalVo>
	 * @author ：luliang
	 * @date ：2017年5月18日 
	 */
	@RequestMapping(value = "/deleteData",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsOriginalVo> deleteData(@RequestBody GoodsOriginalVo vo) {
		return goodsOriginalService.deleteData(vo);
	}
	
	/**
	 * 修改/编辑原始商品
	 * @param goods
	 * @return ：ResponseResult<GoodsOriginalVo>
	 * @author ：luliang
	 * @date ：2017年5月18日 
	 */
	@RequestMapping(value = "/updateData",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsOriginalVo> updateData(@RequestBody GoodsOriginalVo vo) {
		vo.setModifier(getUserId());
		return goodsOriginalService.updateData(vo);
	}
	
	/**
	 * 进入批量导入原始商品界面
	 * @Title: goodsOriginalBatchImport 
	 * @author: LiLinDong
	 * @param: 
	 * @return: String    返回类型 
	 * @Description:
	 */
	@RequestMapping(value = "/goodsOriginalBatchImportInit",  method = RequestMethod.GET)
	public String goodsOriginalBatchImportInit(Model model, HttpServletRequest request) {
		return setResponseModel("publicData/goods/goodsOriginalBatchImport",model,request);
	}
	
	/**
	 * 批量导入数据
	 * @param goods
	 * @return ：ResponseResult<GoodsOriginalVo>
	 * @author ：LiLinDong
	 * @date ：2017年7月13日 
	 */
	@RequestMapping(value = "/GoodsOriginalBatchImport",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsOriginalVo> goodsOriginalBatchImport(@RequestBody GoodsOriginalBatchImportVo vo) {
		vo.setOperatorId(getOperatorId());
		vo.setUserId(getUserId());
		vo.setOperatorName(getSelfOperatorName());
		return goodsOriginalService.goodsOriginalBatchImport(vo); 
	}
}
