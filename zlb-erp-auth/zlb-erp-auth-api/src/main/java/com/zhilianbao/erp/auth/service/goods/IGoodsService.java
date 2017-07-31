package com.zhilianbao.erp.auth.service.goods;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import com.zhilianbao.erp.auth.vo.goods.ErpOrderOriginalGoodsVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsVo;
import com.zhilianbao.erp.auth.vo.goods.facade.ReqGoodsRestVo;
import com.zhilianbao.erp.auth.vo.goods.facade.RspGoodsRestVo;
import com.zhilianbao.erp.auth.vo.user.GoodsPageVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;

/**
 * 商品管理业务接口
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年4月6日 下午2:12:39
 */
public interface IGoodsService {
	
	/**
	 * 组合商品页签，获取供选择的商品列表
	 * @param vo
	 * @return ：ResponseResult<Page<GoodsVo>>
	 * @author ：chenll
	 * @date ：2017年3月15日 下午2:45:44
	 */
	public ResponseResult<Page<GoodsVo>> queryGoodsListForCollection(ViewSearchVo vo);
	
	/**
	 * 分页查询商品
	 * @param vo
	 * @return ：ResponseResult<Page<GoodsVo>>
	 * @author ：chenll
	 * @date ：2017年3月15日 下午2:46:00
	 */
	public ResponseResult<Page<GoodsVo>> queryGoodsListByPage(GoodsPageVo vo);

	/**
	 * 查询商品详情
	 * @param key
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月15日 下午2:46:10
	 */
	public ResponseResult<GoodsVo> queryGoodsDetails(GoodsVo key);
	
    /**
     * 删除商品
     * @param key
     * @return ：ResponseResult<GoodsVo>
     * @author ：chenll
     * @date ：2017年3月15日 下午2:46:18
     */
	public ResponseResult<GoodsVo> deleteGoods(GoodsVo key);
	
    /**
     * 商品上架/下架
     * @param vo
     * @return ：ResponseResult<GoodsVo>
     * @author ：chenll
     * @date ：2017年3月15日 下午2:46:25
     */
	public ResponseResult<GoodsVo> updateGoodsStatus(GoodsVo vo);
	
	/**
	 * 编辑商品
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月15日 下午2:46:34
	 */
	public ResponseResult<GoodsVo> updateGoods(GoodsVo vo);

	/**
	 * 新增商品
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月15日 下午2:46:40
	 */
	public ResponseResult<GoodsVo> addGoods(GoodsVo vo);

	/**
	 * 根据商品编号，获取商品信息
	 * @param list
	 * @return ：List<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月30日 上午9:28:38
	 */
	public List<RspGoodsRestVo> mulGoodsInfo(ReqGoodsRestVo reqGoodVo);

	/**
	 * 分页 查询 商品规格 -- I_0:单品，S_1 多规格，C_2 组合, O_原始商品
	 * @param vo
	 * @return
	 */
	public ResponseResult<Page<GoodsVo>> queryGoodsListPage(ViewSearchVo vo);
	
	/**
	 * 将单品或者组合商品根据转换率以及所关联的原始商品转换为原始商品数量
	 * 
	 * @param LeyaoOrdergoods：key 商品id，long 数量
	 * @return
	 */
	public List<ErpOrderOriginalGoodsVo> convertGoodsToOriginalGoods(Map<String,BigDecimal> LeyaoOrdergoods);

	/**
	 * 根据运营商id和商品类型获取列表：电商平台需要调用的接口
	 * @param searchVo
	 * @return ：ResponseResult<List<GoodsVo>>
	 * @author ：chenll
	 * @date ：2017年5月24日 下午6:00:29
	 */
	public ResponseResult<List<GoodsVo>> querGoods(GoodsVo searchVo);
	
	/**
	 * 获得运营商最低商品id
	 * @param operatorId
	 * @return
	 */
	public int getOperatorIdMaxGoodCood(Long operatorId);
	
	public ResponseResult<GoodsVo> addEcGoods(GoodsVo vo);

	/**
	 * 转化率配置界面数据列表
	 * @param sv
	 * @return ：ResponseResult<Page<GoodsVo>>
	 * @author ：chenll
	 * @date ：2017年6月16日 下午2:27:47
	 */
	public ResponseResult<Page<GoodsVo>> goodsConversionRateListByPage(ViewSearchVo sv);
	
}
