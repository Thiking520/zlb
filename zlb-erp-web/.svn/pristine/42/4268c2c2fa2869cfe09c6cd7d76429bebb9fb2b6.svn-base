package com.zhilianbao.erp.web.publicdata.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.goods.IGoodsPropertyListService;
import com.zhilianbao.erp.auth.vo.goods.GoodsPropertyListVo;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 商品与商品属性中间表
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月10日 上午10:36:34
 */
@Controller
@RequestMapping("/publicData/goodsPropertyList")
public class GoodsPropertyListController extends BaseController {
	
	@Reference
	private IGoodsPropertyListService goodsPropertyListService;
	
	/**
	 * 编辑商品分类
	 * @param goods
	 * @return ：ResponseResult<GoodsPropertyListVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:48
	 */
	@RequestMapping(value = "/updateData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsPropertyListVo> updateGoodsType(@RequestBody List<GoodsPropertyListVo> voList) {
		return goodsPropertyListService.updateData(voList);
	}
}
