package com.zhilianbao.erp.web.publicdata.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.goods.IGoodsMaterialListService;
import com.zhilianbao.erp.auth.vo.goods.GoodsMaterialListVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 商品与商品素材中间表
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月14日 下午7:06:21
 */
@Controller
@RequestMapping("/publicData/goodsMaterialList")
public class GoodsMaterialListController extends BaseController {
	
	@Reference
	private IGoodsMaterialListService goodsMaterialListService;
	
	/**
	 * 根据商品id获取该商品图片或详情集合
	 * @param vo
	 * @return ：ResponseResult<GoodsTypeBean>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:39:22
	 */
	@RequestMapping(value = "/getMaterialListByGoodsId", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<GoodsMaterialListVo>> getMaterialListByGoodsId(@RequestBody GoodsMaterialListVo vo) {
		GoodsMaterialListVo sv = (vo != null) ? vo : new GoodsMaterialListVo();
		return goodsMaterialListService.getMaterialListByGoodsId(sv);
	}

	/**
	 * 编辑商品分类
	 * @param goods
	 * @return ：ResponseResult<GoodsMaterialListVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:48
	 */
	@RequestMapping(value = "/updateData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsMaterialListVo> updateGoodsType(@RequestBody List<GoodsMaterialListVo> voList) {
		return goodsMaterialListService.updateData(voList);
	}
	
	/**
	 * 删除商品素材关联
	 */
	@RequestMapping(value = "/deleteData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsMaterialListVo> deleteData(@RequestBody GoodsMaterialListVo vo){
		return goodsMaterialListService.deleteData(vo);
	}
}
