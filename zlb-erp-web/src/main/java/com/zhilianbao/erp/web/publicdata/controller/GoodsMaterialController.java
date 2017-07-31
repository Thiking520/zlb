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
import com.zhilianbao.erp.auth.service.goods.IGoodsMaterialService;
import com.zhilianbao.erp.auth.vo.goods.GoodsMaterialPageVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsMaterialResultVo;
import com.zhilianbao.erp.auth.vo.goods.GoodsMaterialVo;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 商品素材
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月10日 上午11:12:34
 */
@Controller
@RequestMapping("/publicData/goodsMaterial")
public class GoodsMaterialController extends BaseController {
	
	@Reference
	private IGoodsMaterialService goodsMaterialService;
	
	/**
	 * 初始化进入商品分类列表界面
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:38:58
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		if(getOperatorId() == 0)
			return setResponseModel("publicData/goods/blank",model,request);
		return setResponseModel("publicData/goods/goodsMaterialTree",model,request);
	}
	
	/**
	 * 初始化进入商品列表界面
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月10日 下午2:06:33
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsMaterialResultVo> list(@RequestBody GoodsMaterialPageVo vo) {
		GoodsMaterialPageVo sv = (vo != null) ? vo : new GoodsMaterialPageVo();
		sv.setOperatorId(getOperatorId());
		return goodsMaterialService.queryListByPage(sv);
	}

	/**
	 * 添加商品素材
	 * @param vo
	 * @return ：ResponseResult<GoodsMaterialVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:01
	 */
	@RequestMapping(value = "/addData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsMaterialVo> addData(@RequestBody GoodsMaterialVo vo) {
		vo.setUserId(getUserId());
		vo.setOperatorId(getOperatorId());
		return goodsMaterialService.addGoodsMateria(vo);
	}
	
	/**
	 * 编辑商品分类
	 * @param goods
	 * @return ：ResponseResult<GoodsMaterialVo>
	 * @author ：chenll
	 * @date ：2017年3月1日 下午4:40:48
	 */
	@RequestMapping(value = "/updateData", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsMaterialVo> updateData(@RequestBody GoodsMaterialVo vo) {
		vo.setModifier(getUserId());
		return goodsMaterialService.updateGoodsType(vo);
	}
	
	/**
	 * 删除素材图片
	 */
	@RequestMapping(value = "/deleteImg", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsMaterialVo> deleteImg(@RequestBody GoodsMaterialVo goods){
		goods.setModifier(getUserId());
		return goodsMaterialService.deleteImg(goods);
	}
	
	/**
	 * 获取uptoken 和 存储空间域名
	 * 
	 */
	@RequestMapping(value = "/getUpToken", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsMaterialVo> getUptoken(@RequestBody GoodsMaterialVo goods){
		goods.setOperatorId(getOperatorId());
		return goodsMaterialService.getUptoken(goods);
	}
}
