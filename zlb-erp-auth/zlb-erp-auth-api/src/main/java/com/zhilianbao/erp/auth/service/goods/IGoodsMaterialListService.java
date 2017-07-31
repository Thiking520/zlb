package com.zhilianbao.erp.auth.service.goods;

import java.util.List;

import com.zhilianbao.erp.auth.vo.goods.GoodsMaterialListVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
/**
 * 商品与商品素材中间表
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月10日 上午10:40:14
 */
public interface IGoodsMaterialListService {
	
	/**
	 * 根据商品id获取该商品素材集合
	 * @param vo
	 * @return ：ResponseResult<Page<GoodsMaterialListVo>>
	 * @author ：chenll
	 * @date ：2017年3月4日 上午9:52:46
	 */
	public ResponseResult<Page<GoodsMaterialListVo>> getMaterialListByGoodsId(GoodsMaterialListVo vo);

	/**
	 * 修改商品类型
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年2月28日 下午5:09:30
	 */
	public ResponseResult<GoodsMaterialListVo> updateData(List<GoodsMaterialListVo> voList);

	/**
	 * 删除商品素材关联
	 * @param vo
	 * @return ：ResponseResult<GoodsMaterialListVo>
	 * @author ：chenll
	 * @date ：2017年4月25日 下午2:31:26
	 */
	public ResponseResult<GoodsMaterialListVo> deleteData(GoodsMaterialListVo vo);

}