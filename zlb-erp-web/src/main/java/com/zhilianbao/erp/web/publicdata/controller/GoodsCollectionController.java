package com.zhilianbao.erp.web.publicdata.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.goods.IGoodsCollectionService;
import com.zhilianbao.erp.auth.vo.goods.CollGoodPriceVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsCollectionVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 组合商品
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月15日 下午2:19:48
 */
@Controller
@RequestMapping("/publicData/goodsCollection")
public class GoodsCollectionController extends BaseController {
	
	@Reference
	private IGoodsCollectionService goodsCollectionService;

	/**
	 * 根据goodsId获取组合商品详情
	 * @param vo
	 * @return ：ResponseResult<GoodsSkuListVo>
	 * @author ：chenll
	 * @date ：2017年3月17日 上午10:08:13
	 */
	@RequestMapping(value = "/queryCollectionDetailsByGoodsId",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<GoodsCollectionVo>> queryCollectionDetailsByGoodsId(@RequestBody GoodsCollectionVo vo) {
		return goodsCollectionService.queryCollectionDetailsByGoodsId(vo);
	}

	/**
	 * 修改
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:50:40
	 */
	@RequestMapping(value = "/updateData",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsCollectionVo> updateData(@RequestBody CollGoodPriceVo collGoodPriceVo) {
		collGoodPriceVo.setCreator(getUserId());
		return goodsCollectionService.updateData(collGoodPriceVo);
	}
	
}
