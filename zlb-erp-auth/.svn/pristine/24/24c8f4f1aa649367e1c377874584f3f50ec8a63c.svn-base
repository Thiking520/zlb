package com.zhilianbao.erp.auth.vo.goods.conversion;

import java.util.List;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhilianbao.erp.auth.vo.goods.GoodsSkuRecodeVo;
import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;
import com.zhilianbao.erp.common.vo.BaseVo;

/**
 * 单品/多规格明细
 * 
 * @Title: GoodsConversionRateBean
 * @author: LiLinDong
 * @date: 2017年6月28日 上午9:14:49
 * @Description:
 */
public class GoodsConversionRateResultVo extends BaseVo {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3104622943013445445L;
	
	/**
	 * 售卖商品ID
	 */
	private Long goodsId;
	/**
	 * 外键 t_goods_sku_record
	 */
	private Long recordId;
	/**
	 * 外键 t_goods_stock
	 */
    private Long goodsStockId;
	/**
	 * 规格商品副标题
	 */
	private String skuSubtitle;
	
	/**
	 * t_goods_sku_recode表，根据recode_id查询
	 */
	private List<GoodsSkuRecodeVo> skuList;
	/**
	 * 根据sku_id查询出的集合
	 */
	private List<GoodsConversionRateVo> conversionRateList;

	/**
	 * 获取商品id
	 * 
	 * @return goodsId
	 */
	public Long getGoodsId() {
		return goodsId;
	}

	/**
	 * 设置商品id
	 * 
	 * @param goodsId
	 */
	public void setGoodsId(Long goodsId) {
		this.goodsId = goodsId;
	}

	/**
	 * 获取
	 * 
	 * @return recordId
	 */
	public Long getRecordId() {
		return recordId;
	}

	/**
	 * 设置
	 * 
	 * @param recordId
	 */
	public void setRecordId(Long recordId) {
		this.recordId = recordId;
	}

	/**
	 * 获取外键 t_goods_stock
	 * @Title: getGoodsStockId 
	 * @author: LiLinDong
	 * @param: 
	 * @return: Long    返回类型 
	 * @Description:
	 */
	public Long getGoodsStockId() {
		return goodsStockId;
	}

	/**
	 * 设置外键 t_goods_stock
	 * @Title: setGoodsStockId 
	 * @author: LiLinDong
	 * @param: 
	 * @return: void    返回类型 
	 * @Description:
	 */
	public void setGoodsStockId(Long goodsStockId) {
		this.goodsStockId = goodsStockId;
	}

	public String getSkuSubtitle() {
		return skuSubtitle;
	}

	public void setSkuSubtitle(String skuSubtitle) {
		this.skuSubtitle = skuSubtitle;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, new LogBeanNoNullStyle());
	}

	/**
	 * 获取根据 record_id查询出的数据
	 * 
	 * @Title: getSkuList
	 * @author: LiLinDong
	 * @param:
	 * @return: List<GoodsSkuRecodeVo> 返回类型
	 * @Description:
	 */
	public List<GoodsSkuRecodeVo> getSkuList() {
		return skuList;
	}

	/**
	 * 设置根据 record_id查询出的数据
	 * 
	 * @Title: setSkuList
	 * @author: LiLinDong
	 * @param:
	 * @return: void 返回类型
	 * @Description:
	 */
	public void setSkuList(List<GoodsSkuRecodeVo> skuList) {
		this.skuList = skuList;
	}

	/**
	 * 获取根据 goods_id查询出的数据
	 * @Title: getConversionRateList 
	 * @author: LiLinDong
	 * @param: 
	 * @return: List<GoodsConversionRateVo>    返回类型 
	 * @Description:
	 */
	public List<GoodsConversionRateVo> getConversionRateList() {
		return conversionRateList;
	}

	/**
	 * 设置根据 goods_id查询出的数据
	 * @Title: setConversionRateList 
	 * @author: LiLinDong
	 * @param: 
	 * @return: void    返回类型 
	 * @Description:
	 */
	public void setConversionRateList(List<GoodsConversionRateVo> conversionRateList) {
		this.conversionRateList = conversionRateList;
	}
}