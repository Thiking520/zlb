package com.zhilianbao.erp.auth.service.operators;

import java.util.List;

import com.zhilianbao.erp.auth.vo.operators.OperatorVo;
import com.zhilianbao.erp.auth.vo.operators.ParaOperatorVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseValue;
import com.zhilianbao.erp.common.vo.StatusVo;

public interface IOperatorService {
	/***
	 * 查询运营商列表
	 * @param paraOperatorVo
	 * @return
	 */
	public ResponseValue<Page<OperatorVo>> qryOperator(ParaOperatorVo paraOperatorVo);
	/***
	 * 增加运营商
	 * @param operatorVo
	 * @return
	 */
	public ResponseValue<String> addOperator(OperatorVo operatorVo);
	/***
	 * 进入编辑运营商数据
	 * @param operatorVo
	 * @return
	 */
	public ResponseValue<OperatorVo> loadOperatorUpdate(OperatorVo operatorVo);
	/***
	 * 编辑运营商
	 * @param operatorVo
	 * @return
	 */
	public ResponseValue<String> updateOperator(OperatorVo operatorVo);
	/***
	 * 生效，失效
	 * @param statusVo
	 * @return
	 */
	public ResponseValue<String> updateStatusOperator(StatusVo statusVo);
	/***
	 * 获取多个运营商信息
	 * @param list
	 * @return
	 */
	public List<OperatorVo> mulOperatorName(List<Long> list);
	
	/**
	 * 获取所有有效的运营商
	 * @return
	 */
	public List<OperatorVo> queryAllEnableOperators();
}
