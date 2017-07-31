package com.zhilianbao.erp.auth.service.goods;

import java.util.List;

import com.zhilianbao.erp.auth.vo.goods.CollGoodPriceVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsCollectionVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
/**
 * 组合商品
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月6日 下午2:44:15
 */
public interface IGoodsCollectionService {
	
	/**
	 * 修改
	 * @param vo
	 * @return ：ResponseResult<GoodsCollectionVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:46:33
	 */
	public ResponseResult<GoodsCollectionVo> updateData(CollGoodPriceVo collGoodPriceVo);

	/**
	 * 根据goodsId获取组合商品详情
	 * @param vo
	 * @return ：ResponseResult<Page<GoodsCollectionVo>>
	 * @author ：chenll
	 * @date ：2017年3月17日 下午1:58:50
	 */
	public ResponseResult<Page<GoodsCollectionVo>> queryCollectionDetailsByGoodsId(GoodsCollectionVo vo);

	/**
	 * 根据运营商id获取组合商品列表：电商平台需要调用的接口
	 * @param searchVo
	 * @return ：ResponseResult<List<GoodsCollectionVo>>
	 * @author ：chenll
	 * @date ：2017年5月25日 上午10:39:41
	 */
	public ResponseResult<List<GoodsCollectionVo>> querCollection(GoodsVo searchVo);
	
	public void add(GoodsCollectionVo vo);

}
