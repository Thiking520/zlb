
/************* 如何将分支代码合并到主干 *************/
参考：http://www.cnblogs.com/andy2simple/p/5386256.html

1.分支代码提交
2.本地切换回主干。
3.merge 选择merge type 为 Reintegrate a branch
4.下一步，选择需要合并的分支。
5.合并完毕后，切换回主干。

备注：
主干地址：http://119.147.36.44:8080/svn/sxyyzc-web/zlb-erp-web;
分支地址：http://119.147.36.44:8080/svn/sxyyzc-web/branches/erp-web0410;


/************* 如何本地切换分支和主干 *************/
项目右键，选择team ->切换——》输入主干或者分支的URL地址


*************如何启动web *************
0.	启动zookeeper
1.	启动权限的dubbo服务提	者：
	/zlb-erp-auth-provider/src/test/java/com/zhilianbao/erp/auth/server/Server.java
	
2.启动PMS或者wms的服务dubbo提供者：
/wms-console/src/test/java/com/zlb/erp/wms/dubbo/test/DubboProvider.java

3.一键启动jetty web容器：双击文件maven.package.bat。
4.浏览器输入地址：http://127.0.0.1/zlb-erp-web/login/init

备注：PMS|WMS若有新的接口api，需要先执行maven.install.bat 进行打包部署jar。

*************开发erp-web的pms&wms功能 *************
1.java controller代码
2.jsp 代码 zlb-erp-web/src/main/webapp/WEB-INF/jsp
3.js 代码zlb-erp-web/src/main/webapp/resources/js/business/wms
4.服务消费者dubbo 配置文件：zlb-erp-web/src/main/resources/dubbo-consumer/wms/dubbo-wms.xml





