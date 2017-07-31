package com.zhilianbao.erp.auth.service.goods;

import com.zhilianbao.erp.auth.vo.goods.GoodsMaterialPageVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsMaterialResultVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsMaterialVo;
import com.zhilianbao.erp.common.vo.ResponseResult;
/**
 * 商品类型
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年2月28日 下午5:06:06
 */
public interface IGoodsMaterialService {
	
	/**
	 * 分页查询商品素材
	 * @param vo
	 * @return ：ResponseResult<GoodsMaterialResultVo>
	 * @author ：chenll
	 * @date ：2017年3月14日 上午9:22:48
	 */
	public ResponseResult<GoodsMaterialResultVo> queryListByPage(GoodsMaterialPageVo vo);
	
	/**
	 * 修改商品素材
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年2月28日 下午5:09:30
	 */
	public ResponseResult<GoodsMaterialVo> updateGoodsType(GoodsMaterialVo vo);

	/**
	 * 添加商品素材
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年2月28日 下午5:09:44
	 */
	public ResponseResult<GoodsMaterialVo> addGoodsMateria(GoodsMaterialVo vo);

	/**
	 * 删除商品素材图片
	 * @param goods
	 * @return ：ResponseResult<GoodsMaterialVo>
	 * @author ：chenll
	 * @date ：2017年4月6日 下午2:15:34
	 */
	public ResponseResult<GoodsMaterialVo> deleteImg(GoodsMaterialVo goods);

	/**
	 * 获取uptoken 和 存储空间域名
	 * @param goods
	 * @return ：ResponseResult<GoodsMaterialVo>
	 * @author ：chenll
	 * @date ：2017年4月6日 下午2:54:27
	 */
	public ResponseResult<GoodsMaterialVo> getUptoken(GoodsMaterialVo goods);

}
