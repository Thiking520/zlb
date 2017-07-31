package com.zhilianbao.erp.auth.service.goods;

import com.zhilianbao.erp.auth.vo.goods.GoodsOriginalBatchImportVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsOriginalVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;

/**
 * 原始商品业务处理接口
 * @Company: 智联宝 
 * @author ：lilindong
 * @date ：2017年5月17日 11:40
 */
public interface IGoodsOriginalService {
	
	/**
	 * 
	 * @param vo
	 * @return ：ResponseResult<Page<GoodsOriginalVo>>
	 * @author ：luliang
	 * @date ：2017年5月18日
	 */
	public ResponseResult<Page<GoodsOriginalVo>> queryListByPage(ViewSearchVo vo);
	
	/**
	 * 查询详情
	 * @param key
	 * @return ：ResponseResult<GoodsOriginalVo>
	 * @author ：luliang
	 * @date ：2017年5月18日
	 */
	public ResponseResult<GoodsOriginalVo> queryDetails(GoodsOriginalVo vo);
	/**
	 * 删除
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：luliang
	 * @date ：2017年5月18日
	 */
	public ResponseResult<GoodsOriginalVo> deleteData(GoodsOriginalVo vo);
	/**
	 * 修改商品类型
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：luliang
	 * @date ：2017年5月18日
	 */
	public ResponseResult<GoodsOriginalVo> updateData(GoodsOriginalVo vo);

	/**
	 * 添加商品类型
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：luliang
	 * @date ：2017年5月18日
	 */
	public ResponseResult<GoodsOriginalVo> addData(GoodsOriginalVo vo);
	
	/**
	 * 供PMS调用,同步新原始商品到PMS
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：luliang
	 * @date ：2017年5月18日
	 */
	public ResponseResult<Object> synNewGoodsToPms();
	
	public ResponseResult<GoodsOriginalVo> goodsOriginalBatchImport(GoodsOriginalBatchImportVo vo);

}