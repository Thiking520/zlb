package com.zhilianbao.erp.auth.service.goods;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zhilianbao.erp.auth.vo.goods.GoodsSkuVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
/**
 * 商品规格
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月13日 下午4:32:03
 */
public interface IGoodsSkuService {
	
	/**
	 * 
	 * @param vo
	 * @return ：ResponseResult<Page<GoodsSkuVo>>
	 * @author ：chenll
	 * @date ：2017年3月4日 上午9:52:46
	 */
	public ResponseResult<Page<GoodsSkuVo>> queryListByPage(ViewSearchVo vo);
	
	/**
	 * 查询详情
	 * @param key
	 * @return ：ResponseResult<GoodsSkuVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午3:53:32
	 */
	public ResponseResult<GoodsSkuVo> queryDetails(GoodsSkuVo vo);
	/**
	 * 删除
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月4日 上午10:14:30
	 */
	public ResponseResult<GoodsSkuVo> deleteData(GoodsSkuVo vo);
	/**
	 * 修改商品类型
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年2月28日 下午5:09:30
	 */
	public ResponseResult<GoodsSkuVo> updateData(GoodsSkuVo vo);

	/**
	 * 添加商品类型
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年2月28日 下午5:09:44
	 */
	public ResponseResult<GoodsSkuVo> addData(GoodsSkuVo vo);

	/**
	 * 树形结构
	 * @param vo
	 * @return ：List<Map<String,Object>>
	 * @author ：chenll
	 * @date ：2017年3月16日 下午2:01:33
	 */
	public List<Map<String, Object>> initTree(ViewSearchVo vo);

	/**
	 * 根据运营商id获取所有规格信息：电商平台需要调用的接口
	 * @param operatorId
	 * @return ：ResponseResult<GoodsSkuVo>
	 * @author ：chenll
	 * @date ：2017年5月24日 下午3:38:58
	 */
	public ResponseResult<List<GoodsSkuVo>> queryAll(Long operatorId,Long pid);

	/**
	 * 检测是否有被引用
	 * @param vo
	 * @return
	 */
	public ResponseResult<GoodsSkuVo> checkIsUsed(GoodsSkuVo vo);
	
}