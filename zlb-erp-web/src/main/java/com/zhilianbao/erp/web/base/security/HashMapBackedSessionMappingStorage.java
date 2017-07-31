package com.zhilianbao.erp.web.base.security;

import org.apache.shiro.session.Session;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;


/**
* @company zhilianbao
* @author chengjianhui
* @date 2017年3月22日上午8:50:40
* @description:存储ticket到sessionID的映射
*/
public final class HashMapBackedSessionMappingStorage {
	
    /**
     * Maps the ID from the CAS server to the Session ID.
     */
    private final Map<String,Serializable> MANAGED_SESSIONS_ID = new HashMap<String,Serializable>();

	public synchronized void addSessionById(String mappingId, Session session) {
        MANAGED_SESSIONS_ID.put(mappingId, session.getId());

	}                               

	public synchronized Serializable getSessionIDByMappingId(String mappingId) {
        return MANAGED_SESSIONS_ID.get(mappingId);
	}
}