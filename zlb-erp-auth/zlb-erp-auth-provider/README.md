=========================表结构修改====================================
2017-7-21
auth》原始商品添加图片url（originalGoodsAddImgUrl）：
ALTER TABLE `t_goods_original`
ADD COLUMN `img_url`  varchar(100) NULL COMMENT '材料图片路径' AFTER `unit_desc`;