package com.zhilianbao.erp.auth.vo.user;


import java.util.Date;
import java.util.List;

import com.zhilianbao.erp.common.vo.BaseVo;

public class UserVo extends BaseVo  {

	private static final long serialVersionUID = 1L;
	
	private String token;
	
	private String uniquekey;

    /**
     * 统一中心用户ID
     */
    private Long centerId;

    /**
     * 用户名，帐号
     */
    private String userName;

    /**
     * 用户密码,MD5加密
     */
    private String pwdMd5;

    /**
     * 电话号码
     */
    private String mobileNo;

    /**
     * 用户昵称
     */
    private String nickname;

    /**
     * 用户真实姓名
     */
    private String realName;

    /**
     * 邮箱地址
     */
    private String email;

    /**
     * 用户头像,100*100尺寸
     */
    private String headImage100;

    /**
     * 用户头像,200*200尺寸
     */
    private String headImage200;

    /**
     * 用户注册时间
     */
    private Date registerTime;

    /**
     * 最后登录时间
     */
    private Date lastLoginTime;

    /**
     * 启用/禁用状态，true启用，false禁用
     */
    private Boolean enabled;

    /**
     * 本条记录创建者ID
     */
    private Long creator;

    /**
     * 本条记录修改者ID
     */
    private Long modifier;

    /**
     * 本纪录创建时间
     */
    private Date createTime;

    private Date updateTime;

    /**
     * 是否删除，为true表示已删除
     */
    private Boolean deleted;
    
    private String roleName;
    
    private String createTimeStr;
    
    private String updateTimeStr;
    
    private String enabledStr;
    
    private String enName;
    
    private String cnName;
    
    private String mobileNos;
    
    private String description;
    
    private String empJobId;
    
    private String empJobName;
    
    private String empId;
    
    private String creatorStr;
    
    private String modifierStr;
    
    private String companyName;
    
    private Long roleId;
    
    private String menuName;
    
    private String point;
    
    private Long userType;
    
    private String password;
    
    private String roleList;
    
    private String pointList;
    
    private String newPwd;
    
    private List<String> ids;
    
    public List<String> getIds() {
		return ids;
	}

	public void setIds(List<String> ids) {
		this.ids = ids;
	}

	public String getNewPwd() {
		return newPwd;
	}

	public void setNewPwd(String newPwd) {
		this.newPwd = newPwd;
	}

	public String getRoleList() {
		return roleList;
	}

	public void setRoleList(String roleList) {
		this.roleList = roleList;
	}

	public String getPointList() {
		return pointList;
	}

	public void setPointList(String pointList) {
		this.pointList = pointList;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getUserType() {
		return userType;
	}

	public void setUserType(Long userType) {
		this.userType = userType;
	}

	public String getPoint() {
		return point;
	}

	public void setPoint(String point) {
		this.point = point;
	}

	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getCreatorStr() {
		return creatorStr;
	}

	public void setCreatorStr(String creatorStr) {
		this.creatorStr = creatorStr;
	}

	public String getModifierStr() {
		return modifierStr;
	}

	public void setModifierStr(String modifierStr) {
		this.modifierStr = modifierStr;
	}

	public UserVo(){}
    
    public UserVo(String userName){
    	this.userName = userName;
    }

    public String getEmpId() {
		return empId;
	}

	public void setEmpId(String empId) {
		this.empId = empId;
	}

	public String getEmpJobId() {
		return empJobId;
	}

	public void setEmpJobId(String empJobId) {
		this.empJobId = empJobId;
	}

	public String getEmpJobName() {
		return empJobName;
	}

	public void setEmpJobName(String empJobName) {
		this.empJobName = empJobName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getEnName() {
		return enName;
	}

	public void setEnName(String enName) {
		this.enName = enName;
	}

	public String getCnName() {
		return cnName;
	}

	public void setCnName(String cnName) {
		this.cnName = cnName;
	}

	public String getMobileNos() {
		return mobileNos;
	}

	public void setMobileNos(String mobileNos) {
		this.mobileNos = mobileNos;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getCreateTimeStr() {
		return createTimeStr;
	}

	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
	}

	public String getUpdateTimeStr() {
		return updateTimeStr;
	}

	public void setUpdateTimeStr(String updateTimeStr) {
		this.updateTimeStr = updateTimeStr;
	}

	public String getEnabledStr() {
		return enabledStr;
	}

	public void setEnabledStr(String enabledStr) {
		this.enabledStr = enabledStr;
	}

	/**
     * 获取对外展示的唯一Key值
     *
     * @return uniqueKey - 对外展示的唯一Key值
     */
    public String getUniquekey() {
        return uniquekey;
    }

    /**
     * 设置对外展示的唯一Key值
     *
     * @param uniquekey 对外展示的唯一Key值
     */
    public void setUniquekey(String uniquekey) {
        this.uniquekey = uniquekey;
    }


    /**
     * 获取统一中心用户ID
     *
     * @return center_id - 统一中心用户ID
     */
    public Long getCenterId() {
        return centerId;
    }

    /**
     * 设置统一中心用户ID
     *
     * @param centerId 统一中心用户ID
     */
    public void setCenterId(Long centerId) {
        this.centerId = centerId;
    }

    /**
     * 获取用户名，帐号
     *
     * @return user_name - 用户名，帐号
     */
    public String getUserName() {
        return userName;
    }

    /**
     * 设置用户名，帐号
     *
     * @param userName 用户名，帐号
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * 获取用户密码,MD5加密
     *
     * @return pwd_md5 - 用户密码,MD5加密
     */
    public String getPwdMd5() {
        return pwdMd5;
    }

    /**
     * 设置用户密码,MD5加密
     *
     * @param pwdMd5 用户密码,MD5加密
     */
    public void setPwdMd5(String pwdMd5) {
        this.pwdMd5 = pwdMd5;
    }

    /**
     * 获取电话号码
     *
     * @return mobile_no - 电话号码
     */
    public String getMobileNo() {
        return mobileNo;
    }

    /**
     * 设置电话号码
     *
     * @param mobileNo 电话号码
     */
    public void setMobileNo(String mobileNo) {
        this.mobileNo = mobileNo;
    }

    /**
     * 获取用户昵称
     *
     * @return nickname - 用户昵称
     */
    public String getNickname() {
        return nickname;
    }

    /**
     * 设置用户昵称
     *
     * @param nickname 用户昵称
     */
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    /**
     * 获取用户真实姓名
     *
     * @return real_name - 用户真实姓名
     */
    public String getRealName() {
        return realName;
    }

    /**
     * 设置用户真实姓名
     *
     * @param realName 用户真实姓名
     */
    public void setRealName(String realName) {
        this.realName = realName;
    }

    /**
     * 获取邮箱地址
     *
     * @return email - 邮箱地址
     */
    public String getEmail() {
        return email;
    }

    /**
     * 设置邮箱地址
     *
     * @param email 邮箱地址
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * 获取用户头像,100*100尺寸
     *
     * @return head_image_100 - 用户头像,100*100尺寸
     */
    public String getHeadImage100() {
        return headImage100;
    }

    /**
     * 设置用户头像,100*100尺寸
     *
     * @param headImage100 用户头像,100*100尺寸
     */
    public void setHeadImage100(String headImage100) {
        this.headImage100 = headImage100;
    }

    /**
     * 获取用户头像,200*200尺寸
     *
     * @return head_image_200 - 用户头像,200*200尺寸
     */
    public String getHeadImage200() {
        return headImage200;
    }

    /**
     * 设置用户头像,200*200尺寸
     *
     * @param headImage200 用户头像,200*200尺寸
     */
    public void setHeadImage200(String headImage200) {
        this.headImage200 = headImage200;
    }

    /**
     * 获取用户注册时间
     *
     * @return register_time - 用户注册时间
     */
    public Date getRegisterTime() {
        return registerTime;
    }

    /**
     * 设置用户注册时间
     *
     * @param registerTime 用户注册时间
     */
    public void setRegisterTime(Date registerTime) {
        this.registerTime = registerTime;
    }

    /**
     * 获取最后登录时间
     *
     * @return last_login_time - 最后登录时间
     */
    public Date getLastLoginTime() {
        return lastLoginTime;
    }

    /**
     * 设置最后登录时间
     *
     * @param lastLoginTime 最后登录时间
     */
    public void setLastLoginTime(Date lastLoginTime) {
        this.lastLoginTime = lastLoginTime;
    }

    /**
     * 获取启用/禁用状态，true启用，false禁用
     *
     * @return enabled - 启用/禁用状态，true启用，false禁用
     */
    public Boolean getEnabled() {
        return enabled;
    }

    /**
     * 设置启用/禁用状态，true启用，false禁用
     *
     * @param enabled 启用/禁用状态，true启用，false禁用
     */
    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    /**
     * 获取本条记录创建者ID
     *
     * @return creator - 本条记录创建者ID
     */
    public Long getCreator() {
        return creator;
    }

    /**
     * 设置本条记录创建者ID
     *
     * @param creator 本条记录创建者ID
     */
    public void setCreator(Long creator) {
        this.creator = creator;
    }

    /**
     * 获取本条记录修改者ID
     *
     * @return modifier - 本条记录修改者ID
     */
    public Long getModifier() {
        return modifier;
    }

    /**
     * 设置本条记录修改者ID
     *
     * @param modifier 本条记录修改者ID
     */
    public void setModifier(Long modifier) {
        this.modifier = modifier;
    }

    /**
     * 获取本纪录创建时间
     *
     * @return create_time - 本纪录创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置本纪录创建时间
     *
     * @param createTime 本纪录创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * @return update_time
     */
    public Date getUpdateTime() {
        return updateTime;
    }

    /**
     * @param updateTime
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    /**
     * 获取是否删除，为true表示已删除
     *
     * @return deleted - 是否删除，为true表示已删除
     */
    public Boolean getDeleted() {
        return deleted;
    }

    /**
     * 设置是否删除，为true表示已删除
     *
     * @param deleted 是否删除，为true表示已删除
     */
    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}

}
