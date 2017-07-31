package com.zhilianbao.erp.auth.vo.goods;

import java.math.BigDecimal;
import java.util.List;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.zhilianbao.erp.common.util.LogBeanNoNullStyle;
import com.zhilianbao.erp.common.vo.BaseVo;

public class GoodsSkuListVo extends BaseVo{

	private static final long serialVersionUID = -6654080176640980805L;

	private Long goodsId;//外键 t_goods
    private Long recordId;//外键 t_goods_sku_record
    private Long goodsStockId;//外键 t_goods_stock
	private Integer skuStore;//规格占用库存
	private String skuSubtitle;//规格商品副标题
	private Integer stockType;//库存类型 1 独立库存 2 共享库存

	// -----------------添加多规格商品用到的字段-----------------
	private String skuIds;
	private String skuNames;
	private GoodsStockVo stockVo;
	
	// -----------------查询多规格商品详情用到的字段-----------------
    // 商品表t_goods
	private String goodsCode;//商品编码，唯一， 编码规则：运营商+分类+品种+商品编码
	private String title;//商品名称/商品主标题
	
	// 价格表t_goods_price
	private BigDecimal costPrice;//成本价
	private BigDecimal storePrice;//门店售价
	private BigDecimal suggestPrice;//建议售价
	private BigDecimal mallPrice;//商城售价
	
	// t_goods_sku_recode表
	private List<GoodsSkuRecodeVo> skuList;
	
    //界面上删除的子项
    private Long[] deleteIds;
    
	private Integer defaultOriginalGood;//界面“是否生成默认关联的原始商品”字段，数据库不需存储

	/** 
	 * 获取
	 * @return deleteIds 
	 */
	public Long[] getDeleteIds() {
		return deleteIds;
	}



	public BigDecimal getSuggestPrice() {
		return suggestPrice;
	}



	public void setSuggestPrice(BigDecimal suggestPrice) {
		this.suggestPrice = suggestPrice;
	}



	public BigDecimal getMallPrice() {
		return mallPrice;
	}



	public void setMallPrice(BigDecimal mallPrice) {
		this.mallPrice = mallPrice;
	}



	/** 
	 * 设置
	 * @param deleteIds 
	 */
	public void setDeleteIds(Long[] deleteIds) {
		this.deleteIds = deleteIds;
	}



	/** 
	 * 获取
	 * @return skuIds 
	 */
	public String getSkuIds() {
		return skuIds;
	}



	/** 
	 * 设置
	 * @param skuIds 
	 */
	public void setSkuIds(String skuIds) {
		this.skuIds = skuIds;
	}


	/** 
	 * 获取
	 * @return stockVo 
	 */
	public GoodsStockVo getStockVo() {
		return stockVo;
	}



	/** 
	 * 设置
	 * @param stockVo 
	 */
	public void setStockVo(GoodsStockVo stockVo) {
		this.stockVo = stockVo;
	}



	/** 
	 * 获取
	 * @return goodsId 
	 */
	public Long getGoodsId() {
		return goodsId;
	}



	/** 
	 * 设置
	 * @param goodsId 
	 */
	public void setGoodsId(Long goodsId) {
		this.goodsId = goodsId;
	}



	/** 
	 * 获取
	 * @return recordId 
	 */
	public Long getRecordId() {
		return recordId;
	}



	/** 
	 * 设置
	 * @param recordId 
	 */
	public void setRecordId(Long recordId) {
		this.recordId = recordId;
	}



	/** 
	 * 获取
	 * @return goodsStockId 
	 */
	public Long getGoodsStockId() {
		return goodsStockId;
	}



	/** 
	 * 设置
	 * @param goodsStockId 
	 */
	public void setGoodsStockId(Long goodsStockId) {
		this.goodsStockId = goodsStockId;
	}



	/** 
	 * 获取
	 * @return skuStore 
	 */
	public Integer getSkuStore() {
		return skuStore;
	}



	/** 
	 * 设置
	 * @param skuStore 
	 */
	public void setSkuStore(Integer skuStore) {
		this.skuStore = skuStore;
	}



	/** 
	 * 获取
	 * @return skuSubtitle 
	 */
	public String getSkuSubtitle() {
		return skuSubtitle;
	}



	/** 
	 * 设置
	 * @param skuSubtitle 
	 */
	public void setSkuSubtitle(String skuSubtitle) {
		this.skuSubtitle = skuSubtitle;
	}


	/** 
	 * 获取
	 * @return stockType 
	 */
	public Integer getStockType() {
		return stockType;
	}



	/** 
	 * 设置
	 * @param stockType 
	 */
	public void setStockType(Integer stockType) {
		this.stockType = stockType;
	}

	
	/** 
	 * 获取
	 * @return goodsCode 
	 */
	public String getGoodsCode() {
		return goodsCode;
	}



	/** 
	 * 设置
	 * @param goodsCode 
	 */
	public void setGoodsCode(String goodsCode) {
		this.goodsCode = goodsCode;
	}



	/** 
	 * 获取
	 * @return title 
	 */
	public String getTitle() {
		return title;
	}



	/** 
	 * 设置
	 * @param title 
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	
	
	/** 
	 * 获取
	 * @return costPrice 
	 */
	public BigDecimal getCostPrice() {
		return costPrice;
	}



	/** 
	 * 设置
	 * @param costPrice 
	 */
	public void setCostPrice(BigDecimal costPrice) {
		this.costPrice = costPrice;
	}



	/** 
	 * 获取
	 * @return storePrice 
	 */
	public BigDecimal getStorePrice() {
		return storePrice;
	}



	/** 
	 * 设置
	 * @param storePrice 
	 */
	public void setStorePrice(BigDecimal storePrice) {
		this.storePrice = storePrice;
	}



	/** 
	 * 获取
	 * @return skuList 
	 */
	public List<GoodsSkuRecodeVo> getSkuList() {
		return skuList;
	}



	/** 
	 * 设置
	 * @param skuList 
	 */
	public void setSkuList(List<GoodsSkuRecodeVo> skuList) {
		this.skuList = skuList;
	}
	


	/** 
	 * 获取
	 * @return defaultOriginalGood 
	 */
	public Integer getDefaultOriginalGood() {
		return defaultOriginalGood;
	}


	/** 
	 * 设置
	 * @param defaultOriginalGood 
	 */
	public void setDefaultOriginalGood(Integer defaultOriginalGood) {
		this.defaultOriginalGood = defaultOriginalGood;
	}


	public String getSkuNames() {
		return skuNames;
	}



	public void setSkuNames(String skuNames) {
		this.skuNames = skuNames;
	}



	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, new LogBeanNoNullStyle());
	}
}
