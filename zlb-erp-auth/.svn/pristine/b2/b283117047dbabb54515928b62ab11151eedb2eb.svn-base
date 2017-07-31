package com.zhilianbao.erp.auth.service.goods;

import java.util.List;
import java.util.Map;

import com.zhilianbao.erp.auth.vo.goods.GoodsTypeVo;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
/**
 * 商品类型
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年2月28日 下午5:06:06
 */
public interface IGoodsTypeService {
	
	/**
	 * 删除商品类型 
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年2月28日 下午5:07:20
	 */
	public ResponseResult<GoodsTypeVo> deleteGoodsType(GoodsTypeVo vo);
	
	/**
	 * 修改商品类型
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年2月28日 下午5:09:30
	 */
	public ResponseResult<GoodsTypeVo> updateGoodsType(GoodsTypeVo vo);

	/**
	 * 添加商品类型
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年2月28日 下午5:09:44
	 */
	public ResponseResult<GoodsTypeVo> addGoodsType(GoodsTypeVo vo);

	/**
	 * 初始化进入商品分类界面，以树形结构展示
	 * @param vo
	 * @return ：List<Map<String,Object>>
	 * @author ：chenll
	 * @date ：2017年4月6日 上午11:39:57
	 */
	public List<Map<String, Object>> goodsTypeTree(ViewSearchVo vo);

	/**
	 * 获取运营商下的所有二级商品分类
	 */
	public List<GoodsTypeVo> goodsTypeSecondLevel(String operatorId);
}
