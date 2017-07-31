package org.soa.test.activemq;

import java.io.Serializable;
import java.util.Date;

public class StudentInfo implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -5568602446045293114L;
	private int id;
	private String StdName;
	private String stdNo;
	private Date enterDate;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getStdName() {
		return StdName;
	}
	public void setStdName(String stdName) {
		StdName = stdName;
	}
	public String getStdNo() {
		return stdNo;
	}
	public void setStdNo(String stdNo) {
		this.stdNo = stdNo;
	}
	public Date getEnterDate() {
		return enterDate;
	}
	public void setEnterDate(Date enterDate) {
		this.enterDate = enterDate;
	}
	
	
}
