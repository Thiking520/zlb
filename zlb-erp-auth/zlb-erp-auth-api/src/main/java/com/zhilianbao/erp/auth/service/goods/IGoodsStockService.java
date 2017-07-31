package com.zhilianbao.erp.auth.service.goods;

import com.zhilianbao.erp.auth.vo.goods.GoodsStockVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsVo;
import com.zhilianbao.erp.common.vo.ResponseResult;
/**
 * 商品价格
 * @date ：2017年3月14日 下午2:05:14
 */
public interface IGoodsStockService {
	
	/**
	 * 根据商品id获取该商品价格
	 * @param vo
	 * @return ：ResponseResult<GoodsStockVo>
	 * @author ：chenll
	 * @date ：2017年3月14日 下午2:49:22
	 */
	public ResponseResult<GoodsStockVo> getStockByGoodsId(GoodsVo vo);
	
	/**
	 * 修改商品类型
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年2月28日 下午5:09:30
	 */
	public ResponseResult<GoodsStockVo> updateData(GoodsStockVo vo);

}
