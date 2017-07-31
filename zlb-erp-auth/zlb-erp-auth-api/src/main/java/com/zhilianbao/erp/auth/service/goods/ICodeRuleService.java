package com.zhilianbao.erp.auth.service.goods;

import java.util.List;

import com.zhilianbao.erp.auth.vo.goods.CodeRuleVo;
import com.zhilianbao.erp.auth.vo.goods.facade.ReqCodeRuleRestVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ResponseValue;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
/**
 * 商品标签
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月6日 下午2:44:15
 */
public interface ICodeRuleService {
	
	/**
	 * 分页查询
	 * @param vo
	 * @return ：ResponseResult<Page<CodeRuleVo>>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:45:11
	 */
	public ResponseResult<Page<CodeRuleVo>> queryListByPage(ViewSearchVo vo);

	/**
	 * 查询详情
	 * @param vo
	 * @return ：ResponseResult<CodeRuleVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:45:22
	 */
	public ResponseResult<CodeRuleVo> queryDetails(CodeRuleVo vo);
	
    /**
     * 删除
     * @param vo
     * @return ：ResponseResult<CodeRuleVo>
     * @author ：chenll
     * @date ：2017年3月6日 下午2:46:12
     */
	public ResponseResult<CodeRuleVo> deleteData(CodeRuleVo vo);
	
	
	/**
	 * 修改
	 * @param vo
	 * @return ：ResponseResult<CodeRuleVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:46:33
	 */
	public ResponseResult<CodeRuleVo> updateData(List<CodeRuleVo> voList);

	/**
	 * 新增
	 * @param vo
	 * @return ：ResponseResult<CodeRuleVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:46:39
	 */
	public ResponseResult<CodeRuleVo> addData(CodeRuleVo vo);

	/**
	 * 启用
	 * @param voList
	 * @return ：vo
	 * @author ：chenll
	 * @date ：2017年4月5日 上午10:35:28
	 */
	public ResponseResult<CodeRuleVo> enabledData(CodeRuleVo vo);

	/**
	 * 根据配置数据生成单据号
	 * @param reqCodeRuleRestVo
	 * @return ：String
	 * @author ：chenll
	 * @date ：2017年4月11日 上午11:38:29
	 */
	public ResponseValue<String> getCodeNO(ReqCodeRuleRestVo reqCodeRuleRestVo);

}
