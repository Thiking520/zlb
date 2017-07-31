package com.zhilianbao.erp.auth.vo.goods.facade;

import java.util.List;

import com.zhilianbao.erp.common.vo.BaseRestVo;

public class ReqGoodsRestVo extends BaseRestVo {

	private static final long serialVersionUID = 1L;
	
	private List<ReqGoodsInfoVo> list;

	/** 
	 * 获取
	 * @return list 
	 */
	public List<ReqGoodsInfoVo> getList() {
		return list;
	}

	/** 
	 * 设置
	 * @param list 
	 */
	public void setList(List<ReqGoodsInfoVo> list) {
		this.list = list;
	}
	
	
}
