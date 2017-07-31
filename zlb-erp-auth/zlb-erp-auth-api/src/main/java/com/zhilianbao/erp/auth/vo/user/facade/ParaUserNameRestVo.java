package com.zhilianbao.erp.auth.vo.user.facade;

import com.zhilianbao.erp.common.vo.BaseRestVo;

public class ParaUserNameRestVo extends BaseRestVo {

	private static final long serialVersionUID = 1L;
	
	private Long userId;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

}
