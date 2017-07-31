package com.zhilianbao.erp.auth.vo.goods;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;
import com.zhilianbao.erp.common.vo.BaseVo;

public class GoodsVo extends BaseVo{

	private static final long serialVersionUID = -6654080176640980805L;
	
	private Long goodsType;
	private String goodsCode;//商品编码，唯一， 编码规则：运营商+分类+品种+商品编码
	private String title;//商品名称/商品主标题
	private String slaveTitle;//商品副标题
	private Integer goodsMode;//商品规格 0 单品 1 多规格商品 2 组合商品
	private Integer stockType;//库存类型 0 无限制  1 独立库存
	private String goodsDesc;//商品简介
	private Integer sortIndex;//排序
	private Integer goodsStatus;//状态，0：新品  1：已上架  2：已下架  3：已删除
	private String goodsImageUrl;//商品主图
	
	// t_goods_stock
	private String saleUnitName;//售卖单位
	private BigDecimal suggestPrice;//建议售价
	private BigDecimal mallPrice;//商城售价
	private String conversionRates;//
	private String relateOriginalGoods;
	
	private Long creator;
	@JSONField (format="yyyy-MM-dd HH:mm:ss")
    private Date createTime;
    private Long modifier;
    @JSONField (format="yyyy-MM-dd HH:mm:ss")
    private Date updateTime;
    
    private Long typeId;
    private String typeName;
    
    // -----------------商品标签-----------------
    private List<GoodsTagVo> tagList;
    
    
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
	public Integer getStockType() {
		return stockType;
	}
	public void setStockType(Integer stockType) {
		this.stockType = stockType;
	}
	/** 
	 * 获取
	 * @return goodsType 
	 */
	public Long getGoodsType() {
		return goodsType;
	}
	/** 
	 * 设置
	 * @param goodsType 
	 */
	public void setGoodsType(Long goodsType) {
		this.goodsType = goodsType;
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
	 * @return slaveTitle 
	 */
	public String getSlaveTitle() {
		return slaveTitle;
	}
	/** 
	 * 设置
	 * @param slaveTitle 
	 */
	public void setSlaveTitle(String slaveTitle) {
		this.slaveTitle = slaveTitle;
	}
	/** 
	 * 获取
	 * @return goodsMode 
	 */
	public Integer getGoodsMode() {
		return goodsMode;
	}
	/** 
	 * 设置
	 * @param goodsMode 
	 */
	public void setGoodsMode(Integer goodsMode) {
		this.goodsMode = goodsMode;
	}
	/** 
	 * 获取
	 * @return goodsDesc 
	 */
	public String getGoodsDesc() {
		return goodsDesc;
	}
	/** 
	 * 设置
	 * @param goodsDesc 
	 */
	public void setGoodsDesc(String goodsDesc) {
		this.goodsDesc = goodsDesc;
	}
	/** 
	 * 获取
	 * @return sortIndex 
	 */
	public Integer getSortIndex() {
		return sortIndex;
	}
	/** 
	 * 设置
	 * @param sortIndex 
	 */
	public void setSortIndex(Integer sortIndex) {
		this.sortIndex = sortIndex;
	}
	/** 
	 * 获取
	 * @return goodsStatus 
	 */
	public Integer getGoodsStatus() {
		return goodsStatus;
	}
	/** 
	 * 设置
	 * @param goodsStatus 
	 */
	public void setGoodsStatus(Integer goodsStatus) {
		this.goodsStatus = goodsStatus;
	}
	/** 
	 * 获取
	 * @return goodsImageUrl 
	 */
	public String getGoodsImageUrl() {
		return goodsImageUrl;
	}
	/** 
	 * 设置
	 * @param goodsImageUrl 
	 */
	public void setGoodsImageUrl(String goodsImageUrl) {
		this.goodsImageUrl = goodsImageUrl;
	}
	/** 
	 * 获取
	 * @return saleUnitName 
	 */
	public String getSaleUnitName() {
		return saleUnitName;
	}
	/** 
	 * 设置
	 * @param saleUnitName 
	 */
	public void setSaleUnitName(String saleUnitName) {
		this.saleUnitName = saleUnitName;
	}
	
	public String getConversionRates() {
		return conversionRates;
	}
	public void setConversionRates(String conversionRates) {
		this.conversionRates = conversionRates;
	}
	public String getRelateOriginalGoods() {
		return relateOriginalGoods;
	}
	public void setRelateOriginalGoods(String relateOriginalGoods) {
		this.relateOriginalGoods = relateOriginalGoods;
	}
	
	/** 
	 * 获取
	 * @return creator 
	 */
	public Long getCreator() {
		return creator;
	}
	/** 
	 * 设置
	 * @param creator 
	 */
	public void setCreator(Long creator) {
		this.creator = creator;
	}
	/** 
	 * 获取
	 * @return createTime 
	 */
	public Date getCreateTime() {
		return createTime;
	}
	/** 
	 * 设置
	 * @param createTime 
	 */
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	/** 
	 * 获取
	 * @return modifier 
	 */
	public Long getModifier() {
		return modifier;
	}
	/** 
	 * 设置
	 * @param modifier 
	 */
	public void setModifier(Long modifier) {
		this.modifier = modifier;
	}
	/** 
	 * 获取
	 * @return updateTime 
	 */
	public Date getUpdateTime() {
		return updateTime;
	}
	/** 
	 * 设置
	 * @param updateTime 
	 */
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	
	/** 
	 * 获取
	 * @return typeId 
	 */
	public Long getTypeId() {
		return typeId;
	}
	/** 
	 * 设置
	 * @param typeId 
	 */
	public void setTypeId(Long typeId) {
		this.typeId = typeId;
	}
	/** 
	 * 获取
	 * @return typeName 
	 */
	public String getTypeName() {
		return typeName;
	}
	/** 
	 * 设置
	 * @param typeName 
	 */
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	/** 
	 * 获取
	 * @return tagList 
	 */
	public List<GoodsTagVo> getTagList() {
		return tagList;
	}
	/** 
	 * 设置
	 * @param tagList 
	 */
	public void setTagList(List<GoodsTagVo> tagList) {
		this.tagList = tagList;
	}
}