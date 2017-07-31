package com.zhilianbao.erp.web.publicdata.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.config.annotation.Reference;
import com.zhilianbao.erp.auth.service.goods.ICodeRuleItemService;
import com.zhilianbao.erp.auth.vo.goods.CodeRuleItemVo;
import com.zhilianbao.erp.common.vo.Page;
import com.zhilianbao.erp.common.vo.ResponseResult;
import com.zhilianbao.erp.common.vo.ViewSearchVo;
import com.zhilianbao.erp.web.base.BaseController;
/**
 * 编码规则项
 * @Company: 智联宝 
 * @author ：chenll
 * @date ：2017年3月6日 下午2:42:45
 */
@Controller
@RequestMapping("/publicData/codeRuleItem")
public class CodeRuleItemController extends BaseController {
	
	@Reference
	private ICodeRuleItemService iCodeRuleItemService;
	
	/**
	 * 分页查询列表
	 * @param vo
	 * @return ：ResponseResult<GoodsVo>
	 * @author ：chenll
	 * @date ：2017年3月6日 下午2:49:11
	 */
	@RequestMapping(value = "/list",  method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public ResponseResult<Page<CodeRuleItemVo>> list(@RequestBody ViewSearchVo vo) {
		ViewSearchVo sv = (vo != null) ? vo : new ViewSearchVo();
		return iCodeRuleItemService.queryListByPage(sv);
	}
}
