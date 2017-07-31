package com.zhilianbao.erp.auth.vo.parameter.rpc;

import java.util.Comparator;

public class DictBeanComparator implements Comparator<DictVo> {

	@Override
	public int compare(DictVo o1, DictVo o2) {
		if (o1.getDictOrder() != null && o2.getDictOrder() != null) {
			return o1.getDictOrder() > o2.getDictOrder() ? 1
					: (o1.getDictOrder() == o2.getDictOrder() ? 0 : -1);
		} else if (o1.getDictOrder() != null) {
			return 1;
		} else if (o1.getDictOrder() != null) {
			return -1;
		}
		return 0;
	}

}
