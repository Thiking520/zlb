package com.zhilianbao.erp.auth.service.goods;

import java.util.List;

import com.zhilianbao.erp.auth.vo.goods.GoodsSkuListVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsVo;
import com.zhilianbao.erp.auth.vo.goods.facade.ResGoodsSkuListVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
/**
 * 多规格商品
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月16日 下午7:17:24
 */
public interface IGoodsSkuListService {
	
	/**
	 * 根据goodsId获取多规格商品详情
	 * @param vo
	 * @return ：ResponseResult<Page<GoodsSkuListVo>>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:45:11
	 */
	public ResponseResult<Page<GoodsSkuListVo>> querySkuDetailsByGoodsId(GoodsSkuListVo vo);
	
	/**
	 * 修改
	 * @param vo
	 * @return ：ResponseResult<GoodsSkuListVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:46:33
	 */
	public ResponseResult<GoodsSkuListVo> updateData(List<GoodsSkuListVo> voList);
	
	public GoodsSkuListVo queryGoodsSkuListById(Long id) ;

	/**
	 * 根据运营商id获取多规格商品列表：电商平台需要调用的接口
	 * @param searchVo
	 * @return ：ResponseResult<List<ResGoodsSkuListVo>>
	 * @author ：chenll
	 * @date ：2017年5月25日 下午3:35:49
	 */
	public ResponseResult<List<ResGoodsSkuListVo>> querSku(GoodsVo searchVo);

	/**
	 * 根据goodsId获取多规格商品详情：电商平台需要调用的接口
	 * @param searchVo
	 * @return ：ResponseResult<ResGoodsSkuListVo>
	 * @author ：chenll
	 * @date ：2017年6月1日 下午3:23:45
	 */
	public ResponseResult<List<ResGoodsSkuListVo>> querSkuDetail(GoodsVo searchVo);

	public void add(GoodsSkuListVo vo);

}
