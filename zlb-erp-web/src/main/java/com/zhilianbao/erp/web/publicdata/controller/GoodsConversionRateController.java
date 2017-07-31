package com.zhilianbao.erp.web.publicdata.controller;


import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.goods.IGoodsConversionRateService;
import com.zhilianbao.erp.auth.vo.goods.conversion.GoodsConversionRateResultVo;
import com.zhilianbao.erp.auth.vo.goods.conversion.GoodsConversionRateVo;
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
@RequestMapping("/publicData/GoodsConversionRate")
public class GoodsConversionRateController extends BaseController {
	
	@Reference
	private IGoodsConversionRateService goodsConversionRateService;
	
	/**
	 * 根据goodsId获取多规格商品详情
	 * @param vo
	 * @return ：ResponseResult<GoodsSkuListVo>
	 * @author ：LiLinDong
	 * @date ：2017年7月3日
	 */
	@RequestMapping(value = "/goodsConversionAndRecordRateByGoodsId",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<GoodsConversionRateResultVo>> goodsConversionAndRecordRateByGoodsId(@RequestBody GoodsConversionRateVo vo) {
		return goodsConversionRateService.goodsConversionAndRecordRateByGoodsId(vo);
	}
	
	/**
	 * 根据goodsId获取多规格商品详情
	 * @param vo
	 * @return ：ResponseResult<GoodsSkuListVo>
	 * @author ：LiLinDong
	 * @date ：2017年7月3日
	 */
	@RequestMapping(value = "/singleGoodsConversionByGoodsId",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Object> singleGoodsConversionByGoodsId(@RequestBody GoodsConversionRateVo vo) {
		return goodsConversionRateService.singleGoodsConversionByGoodsId(vo);
	}
	
	/**
	 * 新增单品或多规格商品详情
	 * @param vo
	 * @return ：ResponseResult<GoodsSkuListVo>
	 * @author ：LiLinDong
	 * @date ：2017年7月4日 上午9:44:00
	 */
	@RequestMapping(value = "/addGoodsConversionRate",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsConversionRateVo> addGoodsConversionRate(@RequestBody GoodsConversionRateVo vo) {
		vo.setCreator(getUserId());
		return goodsConversionRateService.addGoodsConversionRate(vo);
	}
	
	/**
	 * 修改单品或者多规格商品详情
	 * @param vo
	 * @return ：ResponseResult<GoodsSkuListVo>
	 * @author ：LiLinDong
	 * @date ：2017年7月4日 上午9:44:00
	 */
	@RequestMapping(value = "/updateGoodsConversionRate",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsConversionRateVo> updateGoodsConversionRate(@RequestBody GoodsConversionRateVo vo) {
		vo.setModifier(getUserId());
		return goodsConversionRateService.updateGoodsConversionRate(vo);
	}
	
	/**
	 * 删除单品或者多规格商品详情
	 * @param vo
	 * @return ：ResponseResult<GoodsSkuListVo>
	 * @author ：LiLinDong
	 * @date ：2017年7月4日 上午9:44:00
	 */
	@RequestMapping(value = "/deleteGoodsConversionRate",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsConversionRateVo> deleteGoodsConversionRate(@RequestBody GoodsConversionRateVo vo) {
		return goodsConversionRateService.deleteGoodsConversionRate(vo);
	}
	
}
