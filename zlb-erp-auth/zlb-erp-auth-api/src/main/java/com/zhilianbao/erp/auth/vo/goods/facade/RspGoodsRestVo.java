package com.zhilianbao.erp.auth.vo.goods.facade;

public class RspGoodsRestVo{

	private String goodsCode;//商品编码，唯一， 编码规则：运营商+分类+品种+商品编码
	private String title;//商品名称/商品主标题
	private String skuName;//规格
	private String packType;//默认包装，包装方式
	private String sendMode;//配送分类、配送方式
	private String sizeType;//件型分类
	private String goodsTypeName;//商品分类
	private String weight;//重量
	private String volume;//体积
	private String goodsImageUrl;//商品主图
	
	
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
	 * @return skuName 
	 */
	public String getSkuName() {
		return skuName;
	}
	/** 
	 * 设置
	 * @param skuName 
	 */
	public void setSkuName(String skuName) {
		this.skuName = skuName;
	}
	/** 
	 * 获取
	 * @return packType 
	 */
	public String getPackType() {
		return packType;
	}
	/** 
	 * 设置
	 * @param packType 
	 */
	public void setPackType(String packType) {
		this.packType = packType;
	}
	/** 
	 * 获取
	 * @return sendMode 
	 */
	public String getSendMode() {
		return sendMode;
	}
	/** 
	 * 设置
	 * @param sendMode 
	 */
	public void setSendMode(String sendMode) {
		this.sendMode = sendMode;
	}
	/** 
	 * 获取
	 * @return sizeType 
	 */
	public String getSizeType() {
		return sizeType;
	}
	/** 
	 * 设置
	 * @param sizeType 
	 */
	public void setSizeType(String sizeType) {
		this.sizeType = sizeType;
	}
	/** 
	 * 获取
	 * @return goodsTypeName 
	 */
	public String getGoodsTypeName() {
		return goodsTypeName;
	}
	/** 
	 * 设置
	 * @param goodsTypeName 
	 */
	public void setGoodsTypeName(String goodsTypeName) {
		this.goodsTypeName = goodsTypeName;
	}
	/** 
	 * 获取
	 * @return weight 
	 */
	public String getWeight() {
		return weight;
	}
	/** 
	 * 设置
	 * @param weight 
	 */
	public void setWeight(String weight) {
		this.weight = weight;
	}
	/** 
	 * 获取
	 * @return volume 
	 */
	public String getVolume() {
		return volume;
	}
	/** 
	 * 设置
	 * @param volume 
	 */
	public void setVolume(String volume) {
		this.volume = volume;
	}
	
	public String getGoodsImageUrl() {
		return goodsImageUrl;
	}
	
	public void setGoodsImageUrl(String goodsImageUrl) {
		this.goodsImageUrl = goodsImageUrl;
	}
	
}