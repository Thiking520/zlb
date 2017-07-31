package com.zhilianbao.erp.auth.vo.goods.conversion;

import java.math.BigDecimal;
import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;
import com.zhilianbao.erp.common.vo.BaseVo;

/**
 * 单品/多规格明细
 * @Title: GoodsConversionRateBean 
 * @author: LiLinDong
 * @date: 2017年6月28日 上午9:14:49 
 * @Description:
 */
public class GoodsConversionRateVo extends BaseVo{
    

    /**
	 * 
	 */
	private static final long serialVersionUID = -7279295094032110260L;

	/**
     * 商品规格 0 单品 1 多规格商品;
     */
    private Short goodsMode;

    /**
     * t_goods 表goods_id
     */
    private String goodsId;

    /**
     * t_goods_sku_list 表id；goods_mode 是0时，此字段值为空。
     */
    private Long skuId;

    /**
     * 关联的原始商品id，t_goods_original表主键；（没有O_开头）
     */
    private Long relateOriginalGood;

    /**
     * 成品和原始商品的转换率，公式：原始商品数量=成品的数量*转换率
     */
    private BigDecimal conversionRate;
    
    private Long creator;
    private Date createTime;
    private Long modifier;
    private Date updateTime;
    
    
    public GoodsConversionRateVo() {
		// TODO Auto-generated constructor stub
	}

    /**
     * 构造对象时，初始化规格id
     * @param skuId
     */
    public GoodsConversionRateVo(Long skuId) {
		super();
		this.skuId = skuId;
		System.out.println("@42342343&&&"+skuId);
	}
    
    /**
     * 构造对象时，初始商品id
     * @param skuId
     */
	public GoodsConversionRateVo(String goodsId) {
		super();
		this.goodsId = goodsId;
	}





	/**
     * 关联的原始商品id
     */
	private String relateOriginalGoodName;

    /**
     * 获取商品规格 0 单品 1 多规格商品;
     *
     * @return goods_mode - 商品规格 0 单品 1 多规格商品;
     */
    public Short getGoodsMode() {
        return goodsMode;
    }

    /**
     * 设置商品规格 0 单品 1 多规格商品;
     *
     * @param goodsMode 商品规格 0 单品 1 多规格商品;
     */
    public void setGoodsMode(Short goodsMode) {
        this.goodsMode = goodsMode;
    }

    /**
     * 获取t_goods 表goods_id
     *
     * @return good_id - t_goods 表goods_id
     */
    public String getGoodsId() {
        return goodsId;
    }

    /**
     * 设置t_goods 表goods_id
     *
     * @param goodId t_goods 表goodsid
     */
    public void setGoodsId(String goodsId) {
        this.goodsId = goodsId;
    }

    /**
     * 获取t_goods_sku_list 表id；goods_mode 是0时，此字段值为空。
     *
     * @return sku_id - t_goods_sku_list 表id；goods_mode 是0时，此字段值为空。
     */
    public Long getSkuId() {
        return skuId;
    }

    /**
     * 设置t_goods_sku_list 表id；goods_mode 是0时，此字段值为空。
     *
     * @param skuId t_goods_sku_list 表id；goods_mode 是0时，此字段值为空。
     */
    public void setSkuId(Long skuId) {
        this.skuId = skuId;
    }

    /**
     * 获取关联的原始商品id，t_goods_original表主键；（没有O_开头）
     *
     * @return relate_original_good - 关联的原始商品id，t_goods_original表主键；（没有O_开头）
     */
    public Long getRelateOriginalGood() {
        return relateOriginalGood;
    }

    /**
     * 设置关联的原始商品id，t_goods_original表主键；（没有O_开头）
     *
     * @param relateOriginalGood 关联的原始商品id，t_goods_original表主键；（没有O_开头）
     */
    public void setRelateOriginalGood(Long relateOriginalGood) {
        this.relateOriginalGood = relateOriginalGood;
    }

    /**
     * 获取成品和原始商品的转换率，公式：原始商品数量=成品的数量*转换率
     *
     * @return conversion_rate - 成品和原始商品的转换率，公式：原始商品数量=成品的数量*转换率
     */
    public BigDecimal getConversionRate() {
        return conversionRate;
    }

    /**
     * 设置成品和原始商品的转换率，公式：原始商品数量=成品的数量*转换率
     *
     * @param conversionRate 成品和原始商品的转换率，公式：原始商品数量=成品的数量*转换率
     */
    public void setConversionRate(BigDecimal conversionRate) {
        this.conversionRate = conversionRate;
    }

	public Long getCreator() {
		return creator;
	}

	public void setCreator(Long creator) {
		this.creator = creator;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Long getModifier() {
		return modifier;
	}

	public void setModifier(Long modifier) {
		this.modifier = modifier;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	
	public String getRelateOriginalGoodName() {
		return relateOriginalGoodName;
	}

	public void setRelateOriginalGoodName(String relateOriginalGoodName) {
		this.relateOriginalGoodName = relateOriginalGoodName;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, new LogBeanNoNullStyle());
	}
}