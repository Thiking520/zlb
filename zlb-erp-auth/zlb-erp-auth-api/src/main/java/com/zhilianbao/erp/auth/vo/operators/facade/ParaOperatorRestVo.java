package com.zhilianbao.erp.auth.vo.operators.facade;

import java.util.List;

import com.zhilianbao.erp.common.vo.BaseRestVo;

public class ParaOperatorRestVo extends BaseRestVo {

	private static final long serialVersionUID = 1L;
	
	private List<Long> list;

	public List<Long> getList() {
		return list;
	}

	public void setList(List<Long> list) {
		this.list = list;
	}
	
}
