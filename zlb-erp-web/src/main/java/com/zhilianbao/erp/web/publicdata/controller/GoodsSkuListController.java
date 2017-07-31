package com.zhilianbao.erp.web.publicdata.controller;

import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.goods.IGoodsSkuListService;
import com.zhilianbao.erp.auth.vo.goods.GoodsSkuListVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsStockVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 多规格商品
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月16日 下午7:14:08
 */
@Controller
@RequestMapping("/publicData/goodsSkuList")
public class GoodsSkuListController extends BaseController {
	
	@Reference
	private IGoodsSkuListService goodsSkuListService;

	/**
	 * 根据goodsId获取多规格商品详情
	 * @param vo
	 * @return ：ResponseResult<GoodsSkuListVo>
	 * @author ：chenll
	 * @date ：2017年3月17日 上午10:08:13
	 */
	@RequestMapping(value = "/querySkuDetailsByGoodsId",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<GoodsSkuListVo>> querySkuDetailsByGoodsId(@RequestBody GoodsSkuListVo vo) {
		return goodsSkuListService.querySkuDetailsByGoodsId(vo);
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
	public ResponseResult<GoodsSkuListVo> updateData(@RequestBody List<GoodsSkuListVo> voList) {
		for(GoodsSkuListVo vo : voList){
			GoodsStockVo stockVo = vo.getStockVo();
			stockVo.setOperatorId(getOperatorId());
			stockVo.setCreator(getUserId());
			stockVo.setModifier(getUserId());
		}
		return goodsSkuListService.updateData(voList);
	}
}
