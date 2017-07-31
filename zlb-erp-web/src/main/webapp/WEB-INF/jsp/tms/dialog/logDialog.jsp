<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="UTF-8" %>


		
		
		<div class="modal fade" id="logDialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel02" aria-hidden="true">
			<div class="modal-dialog modal-dialog-width-900">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel02">
							操作日志<input type="hidden" id="bill_1">
						</h4>
					</div>
					<div class="modal-body">
						<div>
							<table id="logTable" style="min-width: 800px;"></table>
						</div>
					</div>
						<div class="modal-footer">
					<button type="button" class="btn btn-default"
						data-dismiss="modal">关闭</button>
				</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>