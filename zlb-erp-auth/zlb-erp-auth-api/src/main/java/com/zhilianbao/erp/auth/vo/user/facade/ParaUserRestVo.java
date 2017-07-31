package com.zhilianbao.erp.auth.vo.user.facade;

import java.util.List;

import com.zhilianbao.erp.common.vo.BaseRestVo;

public class ParaUserRestVo extends BaseRestVo {

	private static final long serialVersionUID = 1L;
	
	private List<Long> list;

	public List<Long> getList() {
		return list;
	}

	public void setList(List<Long> list) {
		this.list = list;
	}

}
