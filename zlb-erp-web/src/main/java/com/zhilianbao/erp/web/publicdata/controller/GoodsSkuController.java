package com.zhilianbao.erp.web.publicdata.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.goods.IGoodsSkuService;
import com.zhilianbao.erp.auth.vo.goods.GoodsSkuVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 商品规格
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月13日 下午4:45:49
 */
@Controller
@RequestMapping("/publicData/goodsSku")
public class GoodsSkuController extends BaseController {
	
	@Reference
	private IGoodsSkuService goodsSkuService;
	
	/**
	 * 初始化进入商品规格列表界面
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:38:58
	 */
	@RequestMapping(value = "/init", method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		if(getOperatorId() == 0)
			return setResponseModel("publicData/goods/blank",model,request);
		return setResponseModel("publicData/goods/goodsSku",model,request);
	}
	
	/**
	 * 商品规格，树形结构
	 * @param vo
	 * @return ：ResponseResult<GoodsTypeBean>
	 * @author ：chenll
	 * @date ：2017年3月2日 下午3:16:19
	 */
	@RequestMapping(value = "/initTree",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<Map<String, Object>> initTree() {
		ViewSearchVo vo = new ViewSearchVo();
		vo.setOperatorId(getOperatorId());
		return goodsSkuService.initTree(vo);
	}
	
	/**
	 * 获取商品分类所有数据
	 * @param vo
	 * @return ：ResponseResult<GoodsTypeBean>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:39:22
	 */
	@RequestMapping(value = "/list", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<GoodsSkuVo>> list(@RequestBody ViewSearchVo vo) {
		ViewSearchVo sv = (vo != null) ? vo : new ViewSearchVo();
		sv.setOperatorId(getOperatorId());
		return goodsSkuService.queryListByPage(sv);
	}

	/**
	 * 添加商品分类
	 * @param vo
	 * @return ：ResponseResult<GoodsSkuVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:01
	 */
	@RequestMapping(value = "/addData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsSkuVo> addData(@RequestBody GoodsSkuVo vo) {
		vo.setCreator(getUserId());
		vo.setOperatorId(getOperatorId());
		return goodsSkuService.addData(vo);
	}
	/**
	 * 查询详情
	 * @param goods
	 * @return ：ResponseResult<GoodsTypeBean>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:20
	 */
	@RequestMapping(value = "/queryDetails", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsSkuVo> queryDetails(@RequestBody GoodsSkuVo vo) {
		vo.setOperatorId(getOperatorId());
		return goodsSkuService.queryDetails(vo);
	}
	/**
	 * 删除商品分类
	 * @param goods
	 * @return ：ResponseResult<GoodsSkuVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:32
	 */
	@RequestMapping(value = "/deleteData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsSkuVo> deleteData(@RequestBody GoodsSkuVo vo) {
		vo.setOperatorId(getOperatorId());
		return goodsSkuService.deleteData(vo);
	}
	
	/**
	 * 编辑商品分类
	 * @param goods
	 * @return ：ResponseResult<GoodsSkuVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:48
	 */
	@RequestMapping(value = "/updateData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsSkuVo> updateGoodsType(@RequestBody GoodsSkuVo vo) {
		vo.setCreator(getUserId());
		vo.setModifier(getUserId());
		vo.setOperatorId(getOperatorId());
		return goodsSkuService.updateData(vo);
	}
	/**
	 * 检测是否有被引用
	 * @param vo
	 * @return
	 */
	@RequestMapping(value = "/checkIsUsed", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsSkuVo> checkIsUsed(@RequestBody GoodsSkuVo vo) {
		vo.setOperatorId(getOperatorId());
		return goodsSkuService.checkIsUsed(vo);
	}
}
