package com.zhilianbao.erp.auth.service.goods;

import java.util.List;

import com.zhilianbao.erp.auth.vo.goods.GoodsPriceVo;
import com.zhilianbao.erp.common.vo.ResponseResult;
/**
 * 商品价格
 * @date ：2017年3月14日 下午2:05:14
 */
public interface IGoodsPriceService {
	
	/**
	 * 根据商品id获取该商品价格
	 * @param vo
	 * @return ：ResponseResult<List<GoodsPriceVo>>
	 * @author ：chenll
	 * @date ：2017年3月14日 下午2:49:22
	 */
	public ResponseResult<List<GoodsPriceVo>> getPriceByGoodsId(GoodsPriceVo vo);
	
	/**
	 * 修改商品类型
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年2月28日 下午5:09:30
	 */
	public ResponseResult<GoodsPriceVo> updateData(List<GoodsPriceVo> voList);

	/**
	 * 根据运营商查询所有
	 * @return ：ResponseResult<List<GoodsPriceVo>>
	 * @author ：chenll
	 * @date ：2017年6月2日 上午10:08:25
	 */
	public ResponseResult<List<GoodsPriceVo>> queryAll();

}
