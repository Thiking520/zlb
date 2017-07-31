package com.zhilianbao.erp.web.publicdata.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.goods.IGoodsStockService;
import com.zhilianbao.erp.auth.vo.goods.GoodsStockVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsVo;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 商品库存表
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月14日 下午5:31:14
 */
@Controller
@RequestMapping("/publicData/goodsStock")
public class GoodsStockController extends BaseController {
	
	@Reference
	private IGoodsStockService goodsStockService;
	
	/**
	 * 根据商品id获取该商品库存
	 * @param vo
	 * @return ：ResponseResult<GoodsTypeBean>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:39:22
	 */
	@RequestMapping(value = "/getStockByGoodsId", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsStockVo> getStockByGoodsId(@RequestBody GoodsVo vo) {
		GoodsVo sv = (vo != null) ? vo : new GoodsVo();
		return goodsStockService.getStockByGoodsId(sv);
	}
	
	/**
	 * 编辑
	 * @param goods
	 * @return ：ResponseResult<GoodsStockVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:48
	 */
	@RequestMapping(value = "/updateData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsStockVo> updateData(@RequestBody GoodsStockVo vo) {
		vo.setOperatorId(getOperatorId());
		vo.setCreator(getUserId());
		vo.setModifier(getUserId());
		return goodsStockService.updateData(vo);
	}
}
