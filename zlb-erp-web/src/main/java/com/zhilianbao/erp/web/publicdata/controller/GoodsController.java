package com.zhilianbao.erp.web.publicdata.controller;

import java.util.HashMap;
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
import com.zhilianbao.erp.auth.service.goods.IGoodsService;
import com.zhilianbao.erp.auth.service.parameter.ISystemDictService;
import com.zhilianbao.erp.auth.vo.goods.GoodsVo;
import com.zhilianbao.erp.auth.vo.parameter.rpc.DictVo;
import com.zhilianbao.erp.auth.vo.user.GoodsPageVo;
import com.zhilianbao.erp.common.constant.Constants;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
import com.zhilianbao.erp.web.base.BaseController;

/**
 * @company zhilianbao
 * @author 
 * @date   2016-09-02 下午 15:12:07
 * @description:商品模块
 * 
 * ★注意事项★：
 * 一、ResfullUrl定义规则:
 * 1、类的@RequestMapping命名为:该模块名或资源名
 * 2、方法的@RequestMapping命名为: /细分模块名/入参名/资源状态(使用名词，非动词)
 * 
 * 二、springMVC请求行为方法类型
 * GET（SELECT）：从服务器取出资源（一项或多项）。
 * POST（CREATE/UPDATE）：在服务器新建或修改(非幂等性)一个资源。
 * PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源,幂等性）。
 * PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
 * DELETE（DELETE）：从服务器删除资源。
 * 
 * 三、严禁在Controller层编写业务逻辑，Controller层只做单纯的入参校验或转换,
 * 业务逻辑请在service层处理.
 * 
 * 四、dao层方法定义请参照以下规则：add*、create*、modify*、delete*
 * 
 * 五、entity包下的实体类主要用于直接与数据库对接(数据库查出的数据注入entiy包下的类)
 *     pojo包下的实体类主要用于返回给终端。
 *     具体操作：数据库查出来entity后转换成pojo
 *     (数据库查出的字段不一定就是终端需要的，entity转成pojo后返回给终端)
 *     可以直接拿pojo下的实体类与数据库对接。
 *     
 * ★restClient使用步骤★：
 * 1、Method选择POST
 * 2、Header添加一组key\value,分别填入Content-Type 和 application/json;UTF-8
 * 3、Body添加一组Content-type、Charset，分别填入application/json 和 UTF-8
 * 4、Body文本框里填写参数：
	{
	"userId":53,
	"roomBackground": "http://localhost:8080/braodcastApp/resources/img/1470986972686240.jpg",
	"userLocation": "广东 深圳",
	"roomTitle": "我的直播间",
	"roomTopic": "热门直播"
    }
 */
@Controller
@RequestMapping("/publicData/goods")
public class GoodsController extends BaseController {
	
	@Reference
	private IGoodsService goodsService;
	@Reference
	private ISystemDictService systemDictService;//RPC调用获取数据字典
	
	/**
	 * 初始化进入商品列表界面
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：chenll
	 * @date ：2017年3月10日 下午2:06:22
	 */
	@RequestMapping(value = "/init",  method = RequestMethod.GET)
	public String init(Model model, HttpServletRequest request) {
		if(getOperatorId() == 0)
			return setResponseModel("publicData/goods/blank",model,request);
		return setResponseModel("publicData/goods/goodsList",model,request);
	}
	
	/**
	 * 进入新增页面
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：chenll
	 * @date ：2017年3月10日 下午2:07:03
	 */
	@RequestMapping(value = "/toAddView",  method = RequestMethod.GET)
	public String toAddView(Model model, HttpServletRequest request) {
		return setResponseModel("publicData/goods/goodsAdd",model,request);
	}
	
	/**
	 * 售卖单位/库存单位下拉列表
	 * @param model
	 * @param request
	 * @return ：ResponseResult<Map<String,Object>>
	 * @author ：chenll
	 * @date ：2017年4月6日 上午11:13:46
	 */
	@ResponseBody
	@RequestMapping(value = "/initDropDown",  method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseResult<Map<String,Object>> initDropDown(Model model, HttpServletRequest request) {
		ResponseResult<Map<String, Object>> rspResult = new ResponseResult<Map<String, Object>>();
		List<DictVo> goodsUnitList = systemDictService.getDictList(getOperatorId(), Constants.GOODS_UNIT).getData();
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("goodsUnitList", goodsUnitList);
		rspResult.setData(result);
		return rspResult;
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
	public ResponseResult<Page<GoodsVo>> list(@RequestBody GoodsPageVo vo) {
		GoodsPageVo sv = (vo != null) ? vo : new GoodsPageVo();
		sv.setOperatorId(getOperatorId());
		return goodsService.queryGoodsListByPage(sv);
	}

	/**
	 * 组合商品页签，获取供选择的商品列表
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月15日 下午2:42:27
	 */
	@RequestMapping(value = "/queryGoodsListForCollection",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<GoodsVo>> queryGoodsListForCollection(@RequestBody ViewSearchVo vo) {
		ViewSearchVo sv = (vo != null) ? vo : new ViewSearchVo();
		sv.setOperatorId(getOperatorId());
		return goodsService.queryGoodsListForCollection(sv);
	}
	
	/**
	 * 新增商品
	 * @param goods
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月10日 下午2:07:23
	 */
	@RequestMapping(value = "/addData")
	@ResponseBody
	public ResponseResult<GoodsVo> addData(@RequestBody GoodsVo goods) {
		goods.setOperatorId(getOperatorId());
		goods.setCreator(getUserId());
		goods.setModifier(getUserId());
		return goodsService.addGoods(goods);
	}

	/**
	 * 商品上架/下架
	 * @param goods
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月10日 下午2:08:11
	 */
	@RequestMapping(value = "/updateStatus",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsVo> updateStatus(@RequestBody GoodsVo goods) {
		goods.setOperatorId(getOperatorId());
		return goodsService.updateGoodsStatus(goods);
	}
	
	/**
	 * 查询商品详情
	 * @param goods
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月10日 下午2:08:46
	 */
	@RequestMapping(value = "/queryDetails",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsVo> queryDetails(@RequestBody GoodsVo vo) {
		vo.setOperatorId(getOperatorId());
		return goodsService.queryGoodsDetails(vo);
	}
	
	/**
	 * 删除商品
	 * @param goods
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月10日 下午2:08:59
	 */
	@RequestMapping(value = "/deleteData",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsVo> deleteData(@RequestBody GoodsVo vo) {
		return goodsService.deleteGoods(vo);
	}
	
	/**
	 * 修改/编辑商品
	 * @param goods
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月10日 下午2:09:13
	 */
	@RequestMapping(value = "/updateData",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<GoodsVo> updateData(@RequestBody GoodsVo vo) {
		vo.setModifier(getUserId());
		return goodsService.updateGoods(vo);
	}
	
	/**
	 * 进入转化率配置界面
	 * @param model
	 * @param request
	 * @return ：String
	 * @author ：chenll
	 * @date ：2017年6月16日 下午2:21:48
	 */
	@RequestMapping(value = "/goodsConversionRateInit",  method = RequestMethod.GET)
	public String goodsConversionRateInit(Model model, HttpServletRequest request) {
		if(getOperatorId() == 0)
			return setResponseModel("publicData/goods/blank",model,request);
		return setResponseModel("publicData/goods/goodsConversionRate",model,request);
	}
	
	/**
	 * 转化率配置界面数据列表
	 * @param vo
	 * @return ：ResponseResult<Page<GoodsVo>>
	 * @author ：chenll
	 * @date ：2017年6月16日 下午2:25:02
	 */
	@RequestMapping(value = "/goodsConversionRateListByPage",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<GoodsVo>> goodsConversionRateListByPage(@RequestBody ViewSearchVo vo) {
		ViewSearchVo sv = (vo != null) ? vo : new ViewSearchVo();
		sv.setOperatorId(getOperatorId());
		return goodsService.goodsConversionRateListByPage(sv);
	}
	
	
}
