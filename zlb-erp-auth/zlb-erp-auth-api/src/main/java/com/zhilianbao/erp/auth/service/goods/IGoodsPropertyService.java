package com.zhilianbao.erp.auth.service.goods;

import java.util.List;

import com.zhilianbao.erp.auth.vo.goods.GoodsPropertyVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
/**
 * 商品属性
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月4日 上午9:52:21
 */
public interface IGoodsPropertyService {
	
	/**
	 * 
	 * @param vo
	 * @return ：ResponseResult<Page<GoodsPropertyVo>>
	 * @author ：chenll
	 * @date ：2017年3月4日 上午9:52:46
	 */
	public ResponseResult<Page<GoodsPropertyVo>> queryListByPage(ViewSearchVo vo);
	
	/**
	 * 查询详情
	 * @param key
	 * @return ：ResponseResult<GoodsPropertyVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午3:53:32
	 */
	public ResponseResult<GoodsPropertyVo> queryDetails(GoodsPropertyVo vo);
	/**
	 * 删除
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月4日 上午10:14:30
	 */
	public ResponseResult<GoodsPropertyVo> deleteData(GoodsPropertyVo vo);
	/**
	 * 修改商品类型
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年2月28日 下午5:09:30
	 */
	public ResponseResult<GoodsPropertyVo> updateData(GoodsPropertyVo vo);

	/**
	 * 添加商品类型
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年2月28日 下午5:09:44
	 */
	public ResponseResult<GoodsPropertyVo> addData(GoodsPropertyVo vo);

	/**
	 * 根据商品id获取该商品属性集合
	 * @param sv
	 * @return ：ResponseResult<List<GoodsPropertyVo>>
	 * @author ：chenll
	 * @date ：2017年3月23日 上午9:59:25
	 */
	public ResponseResult<List<GoodsPropertyVo>> queryByGoodsId(GoodsVo sv);

}