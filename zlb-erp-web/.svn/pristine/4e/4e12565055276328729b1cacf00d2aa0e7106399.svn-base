package com.zhilianbao.erp.web.publicdata.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.goods.IGoodsTagService;
import com.zhilianbao.erp.auth.vo.goods.GoodsTagVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 商品标签
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月6日 下午2:42:45
 */
@Controller
@RequestMapping("/publicData/goodsTag")
public class GoodsTagController extends BaseController {
	
	@Reference
	private IGoodsTagService goodsTagService;
	
	/**
	 * 进入列表页
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:48:54
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		if(getOperatorId() == 0)
			return setResponseModel("publicData/goods/blank",model,request);
		return setResponseModel("publicData/goods/goodsTag",model,request);
	}
	
	/**
	 * 分页查询列表
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:49:11
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<GoodsTagVo>> list(@RequestBody ViewSearchVo vo) {
		ViewSearchVo sv = (vo != null) ? vo : new ViewSearchVo();
		sv.setOperatorId(getOperatorId());
		return goodsTagService.queryListByPage(sv);
	}

	/**
	 * 新增
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:49:23
	 */
	@RequestMapping(value = "/addData")
	@ResponseBody
	public ResponseResult<GoodsTagVo> addData(@RequestBody GoodsTagVo vo) {
		vo.setCreator(getUserId());
		vo.setOperatorId(getOperatorId());
		return goodsTagService.addData(vo);
	}

	/**
	 * 查询详情
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:49:49
	 */
	@RequestMapping(value = "/queryDetails",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsTagVo> queryDetails(@RequestBody GoodsTagVo vo) {
		return goodsTagService.queryDetails(vo);
	}
	
	/**
	 * 删除
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:50:07
	 */
	@RequestMapping(value = "/deleteData",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsTagVo> deleteData(@RequestBody GoodsTagVo vo) {
		return goodsTagService.deleteData(vo);
	}
	
	/**
	 * 修改
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:50:40
	 */
	@RequestMapping(value = "/updateData",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsTagVo> updateData(@RequestBody GoodsTagVo vo) {
		vo.setModifier(getUserId());
		return goodsTagService.updateData(vo);
	}
	
}
