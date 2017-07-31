package com.zhilianbao.erp.web.publicdata.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.goods.IGoodsPriceService;
import com.zhilianbao.erp.auth.vo.goods.GoodsPriceVo;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 商品价格表
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月14日 下午2:04:18
 */
@Controller
@RequestMapping("/publicData/goodsPrice")
public class GoodsPriceController extends BaseController {
	
	@Reference
	private IGoodsPriceService goodsPriceService;
	
	/**
	 * 根据商品id获取该商品价格
	 * @param vo
	 * @return ：ResponseResult<GoodsTypeBean>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:39:22
	 */
	@RequestMapping(value = "/getPriceByGoodsId", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<List<GoodsPriceVo>> getPriceByGoodsId(@RequestBody GoodsPriceVo vo) {
		GoodsPriceVo sv = (vo != null) ? vo : new GoodsPriceVo();
		return goodsPriceService.getPriceByGoodsId(sv);
	}
	
	/**
	 * 编辑商品分类
	 * @param goods
	 * @return ：ResponseResult<GoodsPriceVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:48
	 */
	@RequestMapping(value = "/updateData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsPriceVo> updateGoodsType(@RequestBody List<GoodsPriceVo> voList) {
		for(GoodsPriceVo vo : voList){
			vo.setCreator(getUserId());
			vo.setModifier(getUserId());
		}
		return goodsPriceService.updateData(voList);
	}
}
