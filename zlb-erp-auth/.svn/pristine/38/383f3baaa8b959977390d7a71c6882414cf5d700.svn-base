package com.zhilianbao.erp.auth.service.goods;

import java.util.List;

import com.zhilianbao.erp.auth.vo.goods.conversion.GoodsConversionRateResultVo;
import com.zhilianbao.erp.auth.vo.goods.conversion.GoodsConversionRateVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;

/**
 * 
 * @Title: IGoodsConversionRateService 
 * @author: LiLinDong
 * @date: 2017年6月30日 上午9:48:29 
 * @Description:
 */
public interface IGoodsConversionRateService {
	/**
	 * 根据goodsId获取多规格商品详情，每个多规格对象中都包含该多规格的原始商品转换率明细列表。
	 * @Title: goodsConversionAndRecordRateByGoodsId 
	 * @author: LiLinDong
	 * @param: 
	 * @return: ResponseResult<Page<GoodsConversionRateResultVo>>    返回类型 
	 * @Description:
	 */
	public ResponseResult<Page<GoodsConversionRateResultVo>> goodsConversionAndRecordRateByGoodsId(GoodsConversionRateVo vo);

	/**
	 * 根据多规格Id获取该多规格下所有原始商品转换率详情
	 * @Title: goodsConversionAndRecordRateByGoodsId 
	 * @author: LiLinDong
	 * @param: 
	 * @return: List<GoodsConversionRateResultVo>     返回类型 
	 * @Description:
	 */
	public GoodsConversionRateResultVo getGoodsConversionRateListBySkuId(GoodsConversionRateVo vo);

	/**
	 * 根据goodsId获取单品商品详情查询单品
	 * @Title: singleGoodsConversionByGoodsId 
	 * @author: LiLinDong
	 * @param: 
	 * @return: ResponseResult<Object>    返回类型 
	 * @Description:
	 */
	public ResponseResult<Object> singleGoodsConversionByGoodsId(GoodsConversionRateVo vo);

	/**
	 * 新增商品明细
	 * @Title: addGoodsConversionRate 
	 * @author: LiLinDong
	 * @param: 
	 * @return: ResponseResult<GoodsConversionRateVo>    返回类型 
	 * @Description:
	 */
	public ResponseResult<GoodsConversionRateVo> addGoodsConversionRate(GoodsConversionRateVo vo);
	
	/**
	 * 修改商品明细
	 * @Title: updateGoodsConversionRate 
	 * @author: LiLinDong
	 * @param: 
	 * @return: ResponseResult<GoodsConversionRateVo>    返回类型 
	 * @Description:
	 */
	public ResponseResult<GoodsConversionRateVo> updateGoodsConversionRate(GoodsConversionRateVo vo);
	
	/**
	 * 删除商品明细
	 * @Title: deleteGoodsConversionRate 
	 * @author: LiLinDong
	 * @param: 
	 * @return: ResponseResult<GoodsConversionRateVo>    返回类型 
	 * @Description:
	 */
	public ResponseResult<GoodsConversionRateVo> deleteGoodsConversionRate(GoodsConversionRateVo vo);
	
}
