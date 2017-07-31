package com.zhilianbao.erp.web.publicdata.controller;

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
import com.zhilianbao.erp.auth.service.goods.IGoodsTypeService;
import com.zhilianbao.erp.auth.vo.goods.GoodsTypeVo;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 商品分类管理控制器
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月1日 下午4:35:09
 */
@Controller
@RequestMapping("/publicData/goodsType")
public class GoodsTypeController extends BaseController {
	
	@Reference
	private IGoodsTypeService goodsTypeService;
	
	/**
	 * 初始化进入商品分类界面，以树形结构展示
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:38:58
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		if(getOperatorId() == 0)
			return setResponseModel("publicData/goods/blank",model,request);
		return setResponseModel("publicData/goods/goodsTypeTree",model,request);
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
	 * 添加商品分类
	 * @param vo
	 * @return ：ResponseResult<GoodsTypeVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:01
	 */
	@RequestMapping(value = "/addData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsTypeVo> addData(@RequestBody GoodsTypeVo vo) {
		vo.setCreator(getUserId());
		vo.setOperatorId(getOperatorId());
		return goodsTypeService.addGoodsType(vo);
	}
	
	/**
	 * 删除商品分类
	 * @param goods
	 * @return ：ResponseResult<GoodsTypeVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:32
	 */
	@RequestMapping(value = "/deleteData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsTypeVo> deleteData(@RequestBody GoodsTypeVo vo) {
		return goodsTypeService.deleteGoodsType(vo);
	}
	
	/**
	 * 编辑商品分类
	 * @param goods
	 * @return ：ResponseResult<GoodsTypeVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:48
	 */
	@RequestMapping(value = "/updateData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsTypeVo> updateData(@RequestBody GoodsTypeVo vo) {
		vo.setModifier(getUserId());
		return goodsTypeService.updateGoodsType(vo);
	}
	
	/**
	 * 获取当前运营商下，所有商品二级分类
	 * @return
	 */
	@RequestMapping(value = "/goodsTypeTwoLevel",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<GoodsTypeVo> goodsTypeTwoLevel() {
		return goodsTypeService.goodsTypeSecondLevel(getOperatorId().toString());
	}
	
}
