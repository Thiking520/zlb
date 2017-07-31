package com.zhilianbao.erp.app.impl.cache;

import java.text.MessageFormat;

import com.zhilianbao.erp.app.vo.user.AppUserVo;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.redis.RedisCache;

/**
* @company zhilianbao
* @author chengjianhui
* @date 2017年5月9日下午2:49:49
* @description:App用户缓存工具类
*/
public class UserCacheUtil {
	public static final String USER_INFO_KEY = "USER:UserInfo:UserId:{0}";
	
	/**
	 * 通过userId获取userToken
	 * @param userId
	 * @return
	 */
	private static String getUserInfoKey(String userId){
		return MessageFormat.format(USER_INFO_KEY, userId);
	}
	
	/**
	* @Title: saveUser
	* @author chengjianhui
	* @date 2017年5月9日下午2:52:45
	* @param userId
	* @param userVo 
	* @description:缓存用户信息
	*/
	public static void saveUser(String userId,AppUserVo userVo) {
		RedisCache.set(Constants.REDIS_SELECT_0,getUserInfoKey(userId), userVo);
	}
	
	/**
	* @Title: getUser
	* @author chengjianhui
	* @date 2017年5月9日下午2:54:07
	* @param userId 
	* @description:获取用户信息
	*/
	public static AppUserVo getUser(String userId) {
		return RedisCache.get(Constants.REDIS_SELECT_0, AppUserVo.class, getUserInfoKey(userId));
	}
	
	/**
	* @Title: delUser
	* @author chengjianhui
	* @date 2017年5月9日下午3:03:30
	* @param userId 
	* @description:清除用户缓存
	*/
	public static void delUser(String userId) {
		RedisCache.del(Constants.REDIS_SELECT_0, getUserInfoKey(userId));
	}
}
