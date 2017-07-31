package com.zhilianbao.erp.auth.vo.user;

import com.zhilianbao.erp.common.vo.ViewSearchVo;
/**
 *
* @Title: GoodsPageVo
* @author liushilei
* @date 2017年7月11日下午5:03:22
* @description: 商品资料查询实体
 */
public class GoodsPageVo extends ViewSearchVo{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

    private String goodsCode;//商品编码

    private String goodsType;//商品
    
    private String title;//商品名称
    
    private Integer goodsMode;//商品规格 0 单品 1 多规格商品 2 组合商品
    
    private String goodsStatus;//商品状态
    
	public Integer getGoodsMode() {
		return goodsMode;
	}

	public void setGoodsMode(Integer goodsMode) {
		this.goodsMode = goodsMode;
	}

	public String getGoodsCode() {
		return goodsCode;
	}

	public void setGoodsCode(String goodsCode) {
		this.goodsCode = goodsCode;
	}

	public String getGoodsType() {
		return goodsType;
	}

	public void setGoodsType(String goodsType) {
		this.goodsType = goodsType;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getGoodsStatus() {
		return goodsStatus;
	}

	public void setGoodsStatus(String goodsStatus) {
		this.goodsStatus = goodsStatus;
	}
    
    
}
