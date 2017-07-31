package com.zhilianbao.erp.auth.service.user.facade;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.alibaba.dubbo.rpc.protocol.rest.support.ContentType;
import com.zhilianbao.erp.auth.vo.user.RetUserVo;
import com.zhilianbao.erp.auth.vo.user.UserRoleListVo;
import com.zhilianbao.erp.auth.vo.user.UserVo;
import com.zhilianbao.erp.auth.vo.user.facade.ParaUserNameRestVo;
import com.zhilianbao.erp.auth.vo.user.facade.ParaUserRestVo;
import com.zhilianbao.erp.common.vo.ResponseValue;

@Path("user")
@Consumes({MediaType.APPLICATION_JSON})
@Produces({ContentType.APPLICATION_JSON_UTF_8})
public interface IUserRestService {
	
	/***
	 * 获取多用户信息
	 * @param paraUserRestVo
	 * @return
	 */
	@POST
	@Path("mulName")
	public ResponseValue<List<RetUserVo>> mulUserName(ParaUserRestVo paraUserRestVo);
	
	/***
	 * 获取用户信息
	 * @param paraUserNameRestVo
	 * @return
	 */
	@POST
	@Path("name")
	public ResponseValue<RetUserVo> userName(ParaUserNameRestVo paraUserNameRestVo);

	public UserRoleListVo findByUCenterId(UserVo userAdminVo);
	
}
