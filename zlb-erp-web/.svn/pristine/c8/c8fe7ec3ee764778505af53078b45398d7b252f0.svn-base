package com.zhilianbao.erp.web.publicdata.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.goods.IGoodsPropertyService;
import com.zhilianbao.erp.auth.service.goods.IGoodsSkuListService;
import com.zhilianbao.erp.auth.vo.goods.GoodsPropertyVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsSkuListVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 商品规格
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月13日 下午4:31:25
 */
@Controller
@RequestMapping("/publicData/goodsProperty")
public class GoodsPropertyController extends BaseController {
	
	@Reference
	private IGoodsPropertyService goodsPropertyService;
	@Reference
	private IGoodsSkuListService iGoodsSkuListService;
	
	/**
	 * 初始化进入商品分类列表界面
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:38:58
	 */
	@RequestMapping(value = "/init", method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		if(getOperatorId() == 0)
			return setResponseModel("publicData/goods/blank",model,request);
		return setResponseModel("publicData/goods/goodsProperty",model,request);
	}
	
	/**
	 * 获取商品分类所有数据
	 * @param vo
	 * @return ：ResponseResult<GoodsTypeBean>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:39:22
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<GoodsPropertyVo>> list(@RequestBody ViewSearchVo vo) {
		ViewSearchVo sv = (vo != null) ? vo : new ViewSearchVo();
		sv.setOperatorId(getOperatorId());
		return goodsPropertyService.queryListByPage(sv);
	}
	
	/**
	 * 根据商品id获取该商品属性集合
	 * @param vo
	 * @return ：ResponseResult<GoodsTypeBean>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:39:22
	 */
	@RequestMapping(value = "/queryByGoodsId", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Map<String, Object>> queryByGoodsId(@RequestBody GoodsVo vo) {
		GoodsVo sv = (vo != null) ? vo : new GoodsVo();
		sv.setOperatorId(getOperatorId());
		
		ResponseResult<List<GoodsPropertyVo>> propertyResult = goodsPropertyService.queryByGoodsId(sv);
		List<GoodsPropertyVo> propertyList = propertyResult.getData();
		
		GoodsSkuListVo goodsSkuListVo = new GoodsSkuListVo();
		goodsSkuListVo.setGoodsId(vo.getId());
		ResponseResult<Page<GoodsSkuListVo>> skuListResult = iGoodsSkuListService.querySkuDetailsByGoodsId(goodsSkuListVo);
		List<GoodsSkuListVo> skuList = null;
		if(skuListResult.getData() != null )
			skuList = skuListResult.getData().getRows();
		
		ResponseResult<Map<String, Object>> rspResult = new ResponseResult<Map<String, Object>>();
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("propertyList", propertyList);
		result.put("skuList", skuList);
		rspResult.setData(result);
		return rspResult;
	}

	/**
	 * 添加商品分类
	 * @param vo
	 * @return ：ResponseResult<GoodsPropertyVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:01
	 */
	@RequestMapping(value = "/addData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsPropertyVo> addData(@RequestBody GoodsPropertyVo vo) {
		vo.setCreator(getUserId());
		vo.setOperatorId(getOperatorId());
		return goodsPropertyService.addData(vo);
	}
	
	/**
	 * 查询详情
	 * @param goods
	 * @return ：ResponseResult<GoodsTypeBean>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:20
	 */
	@RequestMapping(value = "/queryDetails", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsPropertyVo> queryDetails(@RequestBody GoodsPropertyVo vo) {
		vo.setOperatorId(getOperatorId());
		return goodsPropertyService.queryDetails(vo);
	}
	
	/**
	 * 删除商品分类
	 * @param goods
	 * @return ：ResponseResult<GoodsPropertyVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:32
	 */
	@RequestMapping(value = "/deleteData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsPropertyVo> deleteData(@RequestBody GoodsPropertyVo vo) {
		return goodsPropertyService.deleteData(vo);
	}
	
	/**
	 * 编辑商品分类
	 * @param goods
	 * @return ：ResponseResult<GoodsPropertyVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:48
	 */
	@RequestMapping(value = "/updateData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsPropertyVo> updateGoodsType(@RequestBody GoodsPropertyVo vo) {
		vo.setCreator(getUserId());
		vo.setModifier(getUserId());
		return goodsPropertyService.updateData(vo);
	}
}
