$(document).ready(function() {
	$.fn.extend({
		animateCss: function (animationName) {
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			this.addClass('animated ' + animationName).one(animationEnd, function() {
				$(this).removeClass('animated ' + animationName);
			});
			return this;
		}
	});
	$("#fec_alta_operativa").datepicker();
	$("#fec_corte").datepicker();
	$("#fec_inicio_mes").datepicker();

	$("#fec_ini_periodo").datepicker({
		onClose : function(selectedDate) {
			$("#fec_fin_periodo").datepicker("option", "minDate", selectedDate);
		}
	});
	$("#fec_fin_periodo").datepicker({
		onClose : function(selectedDate) {
			$("#fec_fin_periodo").datepicker("option", "maxDate", selectedDate);
		}
	});

	$("#fec_ini_telebanking").datepicker({
		onClose : function(selectedDate) {
			$("#fec_ini_telebanking").datepicker("option", "maxDate", selectedDate);
		}
	});

	$("#fec_fin_telebanking").datepicker({
		onClose : function(selectedDate) {
			$("#fec_fin_telebanking").datepicker("option", "maxDate", selectedDate);
		}
	});

	$('#dg-usuarios').dialog({
		autoOpen : false,
		modal : true,
		width : 700,
		height : 570,
		dialogClass : "dg-dialog"
	});

	$('#dg-comisiones').dialog({
		autoOpen : false,
		modal : true,
		width : 700,
		height : 500,
		dialogClass : "dg-dialog"
	});

	$('#dg-comisiones-pagadas').dialog({
		autoOpen : false,
		modal : true,
		width : 900,
		height : 550,
		dialogClass : "dg-dialog"
	});

	$('#dg-comisiones-consolidado').dialog({
		autoOpen : false,
		modal : true,
		width : 1300,
		height : 550,
		dialogClass : "dg-dialog"
	});

	$('#dg-comisiones-detallado').dialog({
		autoOpen : false,
		modal : true,
		width : 1300,
		height : 550,
		dialogClass : "dg-dialog",
		open: function(){			
			CreateNuevaComisionDialogWidget();
		}
	});

	$('#dg-telebanking').dialog({
		autoOpen : false,
		modal : true,
		width : 1200,
		height : 550,
		dialogClass : "dg-dialog"
	});

	$('#dg-adjuntar').dialog({
		autoOpen : false,
		modal : true,
		width : 440,
		height : 203,
		dialogClass : "dg-dialog"
	});

	$('#dg-adjuntar-exo').dialog({
		autoOpen : false,
		modal : true,
		width : 400,
		height : 200,
		dialogClass : "dg-dialog"
	});

	buscar();

	$('#tipoTelebanking').on('change', function() {

		var tipoTelebanking = this.value;
		var estadoTelebanking = $("#estadoTelebanking").val();
		
		if (estadoTelebanking == 'PEN' && tipoTelebanking!= 'EMPTY') {
			$('#btn_generar_telebanking').show();
		}else{
			$('#btn_generar_telebanking').hide();
		}
		
		fn_filtrar_comisiones(tipoTelebanking, estadoTelebanking);
	});

	$('#estadoTelebanking').on('change', function() {
		var tipoTelebanking = $("#tipoTelebanking").val();
		var estadoTelebanking = this.value;
		
		if (estadoTelebanking == 'PEN' && tipoTelebanking!= 'EMPTY') {
			$('#btn_generar_telebanking').show();
		}else{
			$('#btn_generar_telebanking').hide();
		}

		fn_filtrar_comisiones(tipoTelebanking, estadoTelebanking);

	});
	cargarTelebanking();
	RegisterHandlebarsHelpers();
});

var $idComision;
var $dialogNuevaComision;
var $comisionViewModel;
var $dialogWidgetContainer = "#container-dg-nueva-comision";

function CreateNuevaComisionDialogWidget(){
	if($dialogNuevaComision == null){
		var source   = $("#nueva-comision-dialog-template").html();
		var template = Handlebars.compile(source);
		  
		var dialog_template = template({ data: {} });
		$($dialogWidgetContainer).append(dialog_template);
		$dialogNuevaComision = $('#dg-nueva-comision').dialog({
			autoOpen : false,
			modal : true,
			width : 550,
			height : 650,
			dialogClass : "dg-dialog",
			create: function(event, ui){
				$comisionViewModel = new NuevaComisionViewModel($(this), $idComision);
				$comisionViewModel.Initialize();
			},
			open: function(event, ui){
				if($comisionViewModel != null)
					$comisionViewModel.UpdateViewModel($idComision);
			}
		});
	}	
}

function RegisterHandlebarsHelpers(){
	Handlebars.registerHelper('first', function(items, options){
        return options.fn(items[0]);
    });
    Handlebars.registerHelper('bold', function(property){
        return new Handlebars.SafeString("<strong>" + property + "</strong");
	});
	Handlebars.registerHelper('fixed', function(property){
        return parseFloat(property, 10).toFixed(2);
    });
}

function NuevaComisionViewModel(dialog, idComision){
	var self = this;
	const CONST_CIRCUITO_TIPO_CIRCUITO_VENTA_DIRECTA = '004';
	// const KEY_CIRCUITO_TIPO_CIRCUITO_VENTA_DIRECTA = 'CIRCUITO_TIPO_CIRCUITO_VENTA_DIRECTA';

	self.dialogWidget = dialog || false;
	self.usuarios =  [];
	self.circuitos =  [];
	self.clientes =  [];
	self.tiposTelebanking = [];

	self.idComision = idComision || false;
	self.detallesComision = {};
	self.comision = {};
	self.usuario = {};
	self.circuito = {};
	self.ordserv = {};
	self.cliente = {};
	self.pagoTemporal = {};
	self.telebanking = {};

	self.validationErrorMessages = [];
	
	self.Initialize = function(){
		self.FetchUsuariosComercial();
	};
	self.UpdateViewModel = function(idComision, $refactor){
		self.idComision = idComision || false;
		if(!self.idComision){
			throw "Can't call UpdateViewModel method. Given parameter, idcomision, is null"
			return;
		}
		$promise = self.FetchComision();
		if(typeof $refactor != 'undefined' && $refactor){
			$promise
				.then(function(){
					var source   = $("#comision-detalle-dialog-template").html();
					var template = Handlebars.compile(source);
					var $data = _.groupBy(self.detallesComision, 'user_codigo');
					var $totalSoles = 0.00;
					var $totalDolares = 0.00;
					$data_template = _.map($data, function($record, $key){
						$head = _.first($record);
						$subTotalSoles = 0.00;
						$subTotalDolares = 0.00;
						_.forEach($record, function($value){
							$montoSoles = parseFloat($value.monto_soles, 10);
							$montoDolares = parseFloat($value.monto_dolares);
							$subTotalSoles += $montoSoles;
							$subTotalDolares += $montoDolares;
						});
						$computedRecord = {
							Records: $record,
							Asesor: $head.asesor,
							Color: "",
							SubTotalSoles: $subTotalSoles,
							SubTotalDolares: $subTotalDolares,
							Count: $record.length
						};
						$totalSoles += $subTotalSoles;
						$totalDolares += $subTotalDolares;
						return $computedRecord;
					});					
					var dialog_template = template({ 
						data: $data_template,
						totalSoles: $totalSoles,
						totalDolares: $totalDolares						
					});
					$("#div_tbl_compagadas_cuerpo_3").empty();
					$("#div_tbl_compagadas_cuerpo_3").append(dialog_template);
				})
				.fail(function(error){ 
					console.log(error);
				});
		}
	};
	self.RefreshComision = function(){
		self.validationErrorMessages = [];
		self.usuario = {};
		self.circuito = {};
		self.ordserv = {};
		self.cliente = {};
		self.telebanking = {};
		self.pagoTemporal = {};
		self.comision = {
			conf_comision_id: self.idComision,
			com_tipo_cambio: 3.20
		};
	};
	self.GetDialogWidgetReady = function(){
		if(self.dialogWidget){
			var refreshDialog = function(){
				self.RefreshComision();
				form.find("input[type='hidden']").val("");
				form.find("input[type='text']").val("");
				form.find("select option:first-child").prop("selected", true);
				form.find("input#cuota").val("1");
				$cuota = form.find("input#cuota").val();
				if($cuota != null && $cuota.length > 0){
					self.comision['cuota_pago'] = parseInt($cuota);
					self.comision['cuota'] = "CUOTA " + $cuota;
				}				
				var $option = form.find("option:selected");
				$telebanking = $option.data("telebanking");
				self.telebanking = $telebanking;
			}
			self.dialogWidget.on("dialogclose", function(event, ui){
				refreshDialog();
			});
			self.dialogWidget.on("dialogbeforeclose", function(event, ui){
				console.log("beforecClose");
			});
			var form = self.dialogWidget.find("form");
			var buttonCancel = self.dialogWidget.find("button#btnCancel");
			var buttonRefresh = self.dialogWidget.find("button#btnRefresh");
			var buttonGuardar = self.dialogWidget.find("button#btnGuardar");

			var inputCuota = self.dialogWidget.find("input#cuota");
			$cuota = inputCuota.val();
			if($cuota != null && $cuota.length > 0){
				self.comision['cuota_pago'] = parseInt($cuota);
				self.comision['cuota'] = "CUOTA " + $cuota;
			}
			var inputComision = self.dialogWidget.find("input#comision");
			var inputMonto = self.dialogWidget.find("input#monto");

			var selectcomision = self.dialogWidget.find("select#tipoComision");
			buttonCancel.click(function(){				
				self.dialogWidget.dialog("close");
			});
			buttonRefresh.click(function(){
				refreshDialog();
			});
			buttonGuardar.click(function(){
				$isValid = self.Validate();				
				if(!$isValid){
					$errors = self.validationErrorMessages;					
					//$source   = $("#error-message-template").html();
					$source   = $("#alert-message-template").html();
					$template = Handlebars.compile($source);
					var error_message_template = $template({
						errors: $errors
					});
					//$("#div").empty();
					//$("#div").append(erro_message_template);
					swal({
						title: "¡Error!",
						type: 'error',						
						html: error_message_template,
						width: '400px',
						padding: 10,
						customClass: 'swal2-sm'
					});
					return;
				}

				swal({
					title: '¿Está seguro de realizar pago?',
					type: 'question',
					width: 400,
					showCancelButton: true,
					confirmButtonText: 'Pagar',
					showLoaderOnConfirm: true,
					preConfirm: function () {
						return $.Deferred(function($dfd){
							setTimeout(function() {
								self.SaveNuevaComision()
								.then(function(){
									self.UpdateViewModel(self.idComision, true);
									self.dialogWidget.dialog("close");
									$dfd.resolve({Result: 'OK', Message: 'Operación realizada correctamente'});
								})
								.fail(function(error){									
									$message = (typeof error != 'undefined') ? error.Message: 'Operacion no concluida correctamente';
									$dfd.resolve({Result: 'ERROR', Message: $message});
								});								
							}, 2000);							
						});
					},
					allowOutsideClick: false
				}).then(function ($data) {
					if(typeof $data == 'undefined'){
						swal({
							title: '¡Error!',
							type: 'error',
							text: 'Operacion no concluida correctamente. No se recibio informacion del servidor'
						});
						return;
					}

					if(typeof $data.Result != 'undefined' && $data.Result == 'OK'){
						swal({
							title: '¡Exito!',
							type: 'success',
							text: $data.Message
						});
					}else if($data.Result == 'ERROR'){
						swal({
							title: '¡Error!',
							type: 'error',
							text: $data.Message
						});
					}					
				}).catch(swal.noop);				
			});
			inputCuota.change(function(){
				$cuota = $(this).val();
				if($cuota != null && $cuota.length > 0){
					self.comision['cuota_pago'] = parseInt($cuota);
					self.comision['cuota'] = "CUOTA " + $cuota;
				}				
			});
			inputComision.change(function(){				
				self.comision['porc_comision'] = $(this).val();
			});
			inputMonto.change(function(){
				self.comision['com_acuenta'] = $(this).val();
				self.TryFetchPagoTemporal()
					.then(function(){
						self.AfterPagoTemporalIsRetrieved();
					})
					.fail(function(){
						console.log("no ready");
					});
			});
			selectcomision.change(function(){
				var $option = $(this).find("option:selected");
				$telebanking = $option.data("telebanking");
				self.telebanking = $telebanking;
			});
		}
	};
	self.SetValidations = function(){
		$('.jq-alphanumeric').filter_input({regex:'[a-zA-Z0-9& ]'});
		$('.jq-numeric').filter_input({regex:'[0-9]'});
		$('.jq-decimal').filter_input({regex:'[0-9.]'});
		$('.jq-money-allow-negatives').filter_input({regex:'[-0-9.]'});
		/*$('.jq-money-allow-negatives').on("keypress", function(e){
			$input = e.currentTarget;
			console.log(e);
			$toValidate = $input.value + e.key
			console.log($toValidate);
			//var regex = new RegExp("(-|+)?[0-9.]+"); //^-?\d*\.{0,1}\d+$
			regex = /^-?\d*\.{0,1}\d+$/;
			//console.log(regex.test());
			if(!regex.test($toValidate))
				return e.preventDefault();
			return true;
		});*/
	};
	self.Validate = function(){
		self.validationErrorMessages = [];
		$isValid = true;
		if(self.usuario == null || typeof self.usuario['cod'] == 'undefined'){
			//$errorMessage = "Could'nt find cod property in usuario object";
			$errorMessage = "No se encontro usuario. Ingrese Usuario";
			self.validationErrorMessages.push({ErrorMessage: $errorMessage});
			$isValid = false;
			//return false;
		}
		if(self.circuito == null || typeof self.circuito['circuito_id'] == 'undefined'){
			//$errorMessage = "Could'nt find circuito_id property in circuito object";
			$errorMessage = "No se encontro circuito. Ingrese Circuito";
			self.validationErrorMessages.push({ErrorMessage: $errorMessage});
			$isValid = false;
			//return false;
		}
		if(self.circuito == null || typeof self.circuito['cir_moneda'] == 'undefined'){
			//$errorMessage = "Could'nt find cir_moneda property in circuito object";
			$errorMessage = "No se encontro tipo de moneda. Ingrese Circuito";
			self.validationErrorMessages.push({ErrorMessage: $errorMessage});
			$isValid = false;
			//return false;
		}
		if(self.cliente == null || typeof self.cliente['cli_codigo'] == 'undefined'){
			//$errorMessage = "Could'nt find cli_codigo property in cliente object";
			$errorMessage = "No se encontro Cliente. Ingrese Cliente";
			self.validationErrorMessages.push({ErrorMessage: $errorMessage});
			$isValid = false;
			//return false;
		}
		if(self.ordserv == null || typeof self.ordserv['ordserv_id'] == 'undefined'){
			//$errorMessage = "Could'nt find ordserv_id property in ordserv object";
			$errorMessage = "No se encontro Orden de Servicio. Ingrese Orden de Servicio";
			self.validationErrorMessages.push({ErrorMessage: $errorMessage});
			$isValid = false;
			//return false;
		}
		if(self.telebanking == null || typeof self.telebanking['codigo'] == 'undefined'){
			//$errorMessage = "Could'nt find codigo property in telebanking object";
			$errorMessage = "No se encontro tipo de Comision. Seleccione uno";
			self.validationErrorMessages.push({ErrorMessage: $errorMessage});
			$isValid = false;
			//return false;
		}

		if(self.comision == null || typeof self.comision['porc_comision'] == 'undefined'){
			//$errorMessage = "Could'nt find porc_comision property in comision object";
			$errorMessage = "No se encontro Porcentaje de Comision. Ingrese Porcentaje";
			self.validationErrorMessages.push({ErrorMessage: $errorMessage});
			$isValid = false;
			//return false;
		}
		if(self.comision == null || typeof self.comision['com_acuenta'] == 'undefined'){
			//$errorMessage = "Could'nt find com_acuenta property in comision object";
			$errorMessage = "No se encontro Monto de Comision. Ingrese Monto";
			self.validationErrorMessages.push({ErrorMessage: $errorMessage});
			$isValid = false;
			//return false;
		}
		if(self.comision == null || typeof self.comision['cuota'] == 'undefined'){
			//$errorMessage = "Could'nt find cuota property in comision object";
			$errorMessage = "No se encontro Cuota. Ingrese Cuota";
			self.validationErrorMessages.push({ErrorMessage: $errorMessage});
			$isValid = false;
			//return false;
		}
		if(self.comision == null || typeof self.comision['cuota_pago'] == 'undefined'){
			//$errorMessage = "Could'nt find cuota_pago property in comision object";
			$errorMessage = "No se encontro Cuota de Pago. Ingrese Cuota";
			self.validationErrorMessages.push({ErrorMessage: $errorMessage});
			$isValid = false;
			//return false;
		}		
		return $isValid;
	};
	self.SaveNuevaComision = function(){
		return $.Deferred(function($dfd){
			$comision = self.BuildComisionParams();
			$data = {
				comision: $comision
			};
			if(self.pagoTemporal != null && typeof self.pagoTemporal['id_pagos_temp'] != 'undefined')
				$data['pago_temporal'] = self.pagoTemporal;
			else
				$data['ordserv'] = self.ordserv.ordserv_id;
			$.ajax({
				type : "POST",
				url : "man_conf_comisiones.php?q=nuevo_detalle_comision",
				data: $data,
				success: function(data){					
					if(typeof data.Result != 'undefined' && data.Result == 'OK'){
						$dfd.resolve(data);
					}else
						$dfd.reject(data);
				},
				error: function(){
					$dfd.reject("error");
				}
			});
		});
	};
	self.AutocompleteUsuarios = function(data){		
		if(self.usuarios){			
			$("#usuario").autocomplete({
				source: function( request, response ) {
					self.pagoTemporal = {};
					self.usuario = {};
					$("#usuario_val").val("");
					$("#asesor_val").val("");
					$.getJSON("man_conf_comisiones.php?q=listar_usuarios_comercial", { term: request.term, usuario: $('#usuario').val(), autocomplete: true }
					,function(data) {
						response( $.map( data.Records, function( item ) {
							return {
								value: item.cod,
								label: item.descrip,
								usuario: item
							}
						}));
					});
				},
				minLength: 3,
				select: function( event, ui ) {
					event.preventDefault();
					self.usuario = ui.item.usuario;
					$("#usuario_val").val(ui.item.value);
					$usuario = ui.item.label.split('-')[0].trim();
					$asesor = ui.item.label.split('-')[1].trim();
					$(this).val(ui.item.value);
					$("#asesor").val($asesor);
					$("#asesor_val").val($asesor);
					self.TryFetchPagoTemporal()
						.then(function(){
							self.AfterPagoTemporalIsRetrieved();
						})
						.fail(function(){
							console.log("no ready");
						});
				}
			});
		}			
	};
	self.FetchComision = function(){
		return $.Deferred(function($dfd){
			if(!self.idComision)
				$dfd.reject({Result: 'Error', Message: "No se encontro conf_comision_id"});
			var $data = { id_comision: self.idComision, json: true };
			$.ajax({
				type : "POST",
				url : "man_conf_comisiones.php?q=fn_reporte_com_det",
				data: $data,
				success: function(data, textStatus, xhr){
					if(typeof data.Result != 'undefined' && data.Result == 'OK'){
						self.detallesComision = data.Records;						
						$dfd.resolve(data);
					}else
						$dfd.reject(data);
				},
				error: function(jqXHR, textStatus, errorThrown){
					//var data = JSON.parse(jqXHR.responseJSON);
					$dfd.reject(errorThrown);
				}
			});
		});
	};
	self.FetchCliente = function(){
		return $.Deferred(function($dfd){
			if(!self.idComision){
				$dfd.reject({Result: 'Error', Message: "No se encontro conf_comision_id"});
				return;
			}
			if(self.cliente == null || typeof self.cliente['cli_codigo'] == 'undefined'){
				$dfd.reject({Result: 'Error', Message: "No se encontro propiedad cli_codigo en objeto circuito"});
				return;
			}

			$.ajax({
				type : "POST",
				url : "man_conf_comisiones.php?q=listar_clientes",
				data: { cliente: self.cliente.cli_codigo },
				success: function(data, textStatus, xhr){
					if(typeof data.Result != 'undefined' && data.Result == 'OK'){
						if(typeof data.Record != 'undefined')
							self.cliente = data.Record;
						$dfd.resolve(data);
					}else
						$dfd.reject(data);
				},
				error: function(jqXHR, textStatus, errorThrown){
					//var data = JSON.parse(jqXHR.responseJSON);
					$dfd.reject(errorThrown);
				}
			});
		});
	};
	self.TryFetchPagoTemporal = function(){
		return $.Deferred(function($dfd){
			if(!self.idComision){
				$dfd.reject({Result: 'Error', Message: "No se encontro conf_comision_id"});
				return;
			}
			if(self.circuito == null || typeof self.circuito['circuito_id'] == 'undefined'){
				$dfd.reject({Result: 'Error', Message: "No se encontro propiedad circuito_id en objeto circuito"});
				return;
			}
			if(self.usuario == null || typeof self.usuario['cod'] == 'undefined'){
				$dfd.reject({Result: 'Error', Message: "No se encontro propiedad cod en objeto usuario"});
				return;
			}
			if(self.comision == null || typeof self.comision['com_acuenta'] == 'undefined'){
				$dfd.reject({Result: 'Error', Message: "No se encontro propiedad com_acuenta en objeto comision"});
				return;
			}

			$data = {
				circuito: self.circuito.circuito_id,
				agente_comercial: self.usuario.cod,
				monto: self.comision.com_acuenta
			};
			$.ajax({
				type : "POST",
				url : "man_conf_comisiones.php?q=check_pagos_temporales",
				data: $data,
				success: function(data, textStatus, xhr){
					if(typeof data.Result != 'undefined' && data.Result == 'OK'){
						if(typeof data.Record != 'undefined')
							self.pagoTemporal = data.Record;
						if(typeof data.Records != 'undefined' && data.Records.length > 0)
							self.pagoTemporal = data.Records[0];
						$dfd.resolve(data);
					}else
						$dfd.reject(data);
				},
				error: function(jqXHR, textStatus, errorThrown){
					//var data = JSON.parse(jqXHR.responseJSON);
					$dfd.reject(errorThrown);
				}
			});
		});
	};
	self.TryFetchCircuitoMoneda = function(){		
		return $.Deferred(function($dfd){			
			if(self.circuito == null || typeof self.circuito['circuito_id'] == 'undefined'){
				$dfd.reject({Result: 'Error', Message: "No se encontro propiedad circuito_id en objeto circuito"});
				return;
			}
			if(self.circuito == null || typeof self.circuito['cir_tipo'] == 'undefined' || self.circuito['cir_tipo'] !== CONST_CIRCUITO_TIPO_CIRCUITO_VENTA_DIRECTA){				
				$dfd.reject({Result: 'Error', Message: "No se encontro cir_tipo valido en objeto circuito"});
				return;
			}
			if(self.ordserv == null || typeof self.ordserv['ordserv_id'] == 'undefined'){				
				$dfd.reject({Result: 'Error', Message: "No se encontro propiedad ordserv_id en objeto ordserv"});
				return;
			}
			$data = {
				circuito: self.circuito.circuito_id,
				ordserv: self.ordserv.ordserv_id
			};
			$.ajax({
				type : "POST",
				url : "man_conf_comisiones.php?q=check_circuito_moneda",
				data: $data,
				success: function(data, textStatus, xhr){
					if(typeof data.Result != 'undefined' && data.Result == 'OK'){
						if(typeof data.Record != 'undefined' && data.Record !== null){
							self.circuito.cir_moneda = data.Record['os_moneda'];
							self.circuito.sigmoneda = data.Record['sigmoneda'];
						}
						$dfd.resolve(data);
					}else
						$dfd.reject(data);
				},
				error: function(jqXHR, textStatus, errorThrown){
					//var data = JSON.parse(jqXHR.responseJSON);
					$dfd.reject(errorThrown);
				}
			});
		});		
	};

	self.AfterPagoTemporalIsRetrieved = function(){
		if(self.dialogWidget){
			var form = self.dialogWidget.find("form");
			var inputComision = form.find("input#comision");
			var inputMonto = form.find("input#monto");

			inputComision.val(self.pagoTemporal.porc_comision);
			inputMonto.val(self.pagoTemporal.monto);

			self.comision['com_acuenta'] = self.pagoTemporal.monto;
			self.comision['porc_comision'] = self.pagoTemporal.porc_comision;	
			
		}
	};

	self.AfterCircuitoMonedaIsRetrieved = function(){		
		if(self.dialogWidget){
			$moneda_codigo = self.circuito.cir_moneda;
			$sigmoneda = self.circuito.sigmoneda;
			$moneda_sign = " (" + $sigmoneda + ")";
			$moneda = ($moneda_codigo == '002') ? "DOLARES" + $moneda_sign: (($moneda_codigo == '001') ? "SOLES" + $moneda_sign: "");
			$("#moneda").val($moneda);
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			$("#moneda").addClass('animatedInput').one(animationEnd, function() {
				$(this).removeClass('animatedInput');
			});			
		}
	};

	self.FetchUsuariosComercial = function(){
		var promise = self.FetchComision()
			.then(function(){
				return $.Deferred(function($dfd){
					$.ajax({
						type : "POST",
						url : "man_conf_comisiones.php?q=listar_usuarios_comercial",
						success: function(data, textStatus, xhr){
							if(typeof data.Result != 'undefined' && data.Result == 'OK'){
								self.usuarios = data.Records;
								$dfd.resolve(data);
							}
							else
								$dfd.reject(data);
						},
						error: function(jqXHR, textStatus, errorThrown){
							//var data = JSON.parse(jqXHR.responseJSON);
							$dfd.reject(errorThrown);
						}
					});
				});
			})
			.fail(function(error){
				console.log(error);
			});	
		
		promise
			.then(function(data){
				if(typeof data.Result != 'undefined' && data.Result == 'OK'){
					self.usuarios = data.Records;
					var $autocomplete_usuarios = self.FetchTiposTelebanking()
						.then(function(data){
							var selectcomision = self.dialogWidget.find("select#tipoComision");							
							$.each(data.Records, function(key, item){
								$option = $("<option>",{
									value: item.codigo,
									text: item.descripcion									
								});
								$option.data("telebanking", item);
								selectcomision.append($option);								
							});							
							$telebanking = selectcomision.find("option:selected").data("telebanking");
							self.telebanking = $telebanking;							
							self.AutocompleteUsuarios(data);
						})
						.fail(function(error){
							console.log(error);
						});						
					var $autocomplete_clientes = $autocomplete_usuarios
						.then(self.AutocompleteClientes())
						.fail(function(error) {
							console.log(error);
						});
					var $autocomplete_circuitos = $autocomplete_clientes
						.then(self.AutocompleteCircuitos())
						.fail(function(error) {
							console.log(error);
						});
					var $autocomplete_ordservs = $autocomplete_circuitos
						.then(self.AutocompleteOrdenServicio())
						.fail(function(error) {
							console.log(error);
						});
					var $settingDialogWidget = $autocomplete_ordservs
						.then(self.GetDialogWidgetReady())
						.fail(function(error){
							console.log(error);
						});
					var $validations = $settingDialogWidget
						.then(self.SetValidations())
						.fail(function(error){
							console.log(error);
						});
				}
			})
			.fail(function(error){
				console.log(error);
			});
	};
	self.FetchTiposTelebanking = function(){
		return $.Deferred(function($dfd){
			$.ajax({
				type : "POST",
				url : "man_conf_comisiones.php?q=listar_telebanking",
				success: function(data){
					if(typeof data.Result != 'undefined' && data.Result == 'OK'){
						self.tiposTelebanking = data.Records;
						$dfd.resolve(data);
					}else
						$dfd.reject();					
				},
				error: function(){
					$dfd.reject("error");
				}
			});
		});			
	};
	self.CheckIfOrdenServicioExist = function(ordserv_id){
		return $.Deferred(function($dfd){
			var $data = { ordserv: ordserv_id, 'byCoincidence': true, json: true };
			$.ajax({
				type : "POST",
				url : "man_conf_comisiones.php?q=check_orden_servicio",
				data: $data,
				success: function(data, textStatus, xhr){
					if(typeof data.Result != 'undefined' && data.Result == 'OK'){
						//self.ordserv = data.Record;
						$dfd.resolve(data);
					}else
						$dfd.reject(data);
				},
				error: function(jqXHR, textStatus, errorThrown){
					//var data = JSON.parse(jqXHR.responseJSON);
					$dfd.reject(errorThrown);
				}
			});
		});		
	};
	self.CheckIfCircuitoExist = function(circuito_id){
		return $.Deferred(function($dfd){
			var $circuito = { circuito: circuito_id };
			$.ajax({
				type : "POST",
				url : "man_conf_comisiones.php?q=buscar_circuitos",
				data: {
					circuito: $circuito,
					'byCoincidence': true,
					'autocomplete': true,
					json: true
				},
				success: function(data, textStatus, xhr){
					if(typeof data.Result != 'undefined' && data.Result == 'OK'){
						//self.ordserv = data.Record;
						$dfd.resolve(data);
					}else
						$dfd.reject(data);
				},
				error: function(jqXHR, textStatus, errorThrown){
					//var data = JSON.parse(jqXHR.responseJSON);
					$dfd.reject(errorThrown);
				}
			});
		});		
	};
	self.BuildAutocompleteParams = function(){
		$params = {};
		if($("#cliente_val").val() != null && $("#cliente_val").val().length > 0){
			$params['cliente'] = {};
			$params['cliente']['id'] = $("#cliente_val").val();
			if($("#cliente_desc").val() != null && $("#cliente_desc").val().length > 0)
				$params['cliente']['descripcion'] = $("#cliente_desc").val();
			if($("#cliente_ruc").val() != null && $("#cliente_ruc").val().length > 0)
				$params['cliente']['ruc'] = $("#cliente_ruc").val();
		}
		if($("#usuario_val").val() != null && $("#usuario_val").val().length > 0)
			$params['agente_comercial'] = $("#usuario_val").val();
		if($("#circuito_val").val() != null && $("#circuito_val").val().length > 0)
			$params['circuito'] = $("#circuito_val").val();
		if($("#ordserv_val").val() != null && $("#ordserv_val").val().length > 0)
			$params['ordserv'] = $("#ordserv_val").val();
		return $params;
	};
	self.BuildComisionParams = function(){
		if(typeof self.comision['porc_comision'] == 'undefined')
			throw "Could'nt find porc_comision property in comision object";
		if(typeof self.comision['com_acuenta'] == 'undefined')
			throw "Could'nt find com_acuenta property in comision object";
		if(typeof self.comision['cuota'] == 'undefined')
			throw "Could'nt find cuota property in comision object";
		if(typeof self.comision['cuota_pago'] == 'undefined')
			throw "Could'nt find cuota_pago property in comision object";
		self.comision = {
			cir_codigo: self.circuito.circuito_id,
			user_codigo: self.usuario.cod,
			porc_comision: self.comision.porc_comision,
			com_acuenta: self.comision.com_acuenta,
			conf_comision_id: self.idComision,
			cuota: self.comision.cuota,
			cuota_pago: self.comision.cuota_pago,
			com_tipo_moneda: self.circuito.cir_moneda,
			com_tipo_cambio: 3.20,
			tipo_comision: self.telebanking.codigo
		};
		return self.comision;
	};
	self.AutocompleteClientes = function(){
		if(self.clientes){			
			$("#cliente").autocomplete({
				source: function( request, response ) {
					self.cliente = {};
					$("#cliente_val").val("");
					$("#cliente_ruc").val("");
					$("#cliente_desc").val("");
					$.getJSON("man_conf_comisiones.php?q=listar_clientes", { term: request.term, autocomplete: true }
					,function(data) {						
						response( $.map( data.Records, function( item ) {
							return {
								value: item.cli_codigo,
								label: item.cli_razon_social,
								cliente: item
							}
						}));
					});
				},
				minLength: 3,
				select: function( event, ui ) {
					event.preventDefault();
					self.cliente = ui.item.cliente;
					$("#cliente_val").val(ui.item.value);
					$("#cliente_ruc").val(ui.item.cliente.cli_nro_ruc);
					$("#cliente_desc").val(ui.item.cliente.cli_razon_social);
					$(this).val(ui.item.label);
				}
			});
		}			
	};
	self.AutocompleteCircuitos = function(){
		if(self.circuitos){
			$("#circuito").autocomplete({
				source: function( request, response ) {
					$circuito = self.BuildAutocompleteParams();
					$circuito['circuito'] = $('#circuito').val();
					self.pagoTemporal = {};
					self.cliente = {};
					$("#cliente").val("");
					$("#cliente_val").val("");
					$("#cliente_ruc").val("");
					$("#cliente_desc").val("");
					self.circuito = {};
					$("#circuito_val").val("");
					$.getJSON("man_conf_comisiones.php?q=buscar_circuitos", { term: request.term, circuito: $circuito, autocomplete: true }
					,function(data) {						
						var _map = function($records){
							return $.map($records, function(item){
								$circuito_desc = item.cliente_str + " - " +  item.circuito_str + " (" + item.circuito_id + ")";
								return {
									value: item.circuito_id,
									label: $circuito_desc,
									circuito: item
								}
							});
						};
						if(data.Result == 'OK' && data.TotalRecords == 0){
							self.CheckIfCircuitoExist(request.term)
								.then(function($data){
									$records = (typeof $data['Records'] != 'undefined') ? $data.Records: [$data.Record];
									response(_map($records));
								})
								.fail(function($error){
									console.log($error);
								});
						}else{
							response(_map(data.Records));
						}
					});
				},
				minLength: 3,
				select: function( event, ui ) {
					event.preventDefault();
					self.circuito = ui.item.circuito;
					(function AfterCircuitoIsSelected($el){
						if(typeof self.circuito['cliente_id'] != 'undefined'){
							self.cliente['cli_codigo'] = self.circuito.cliente_id;
							$.when(self.FetchCliente()).done(function($data){								
								if(typeof $data.Result != 'undefined' && $data.Result == 'OK'){
									$("#cliente").val(self.cliente.cli_razon_social);
									$("#cliente_val").val(self.cliente.cli_codigo);
									$("#cliente_ruc").val(self.cliente.cli_nro_ruc);
									$("#cliente_desc").val(self.cliente.cli_razon_social);
									var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
									$("#cliente").addClass('animatedInput').one(animationEnd, function() {
										$(this).removeClass('animatedInput');
									});
									//$("#cliente").animateCss('bounce');
								}else
									swal("Informacion", "warning", "No se encontro cliente asociado al circuito");
							});
						}						
						if(typeof self.circuito['cir_moneda'] != 'undefined' && typeof self.circuito['sigmoneda'] != 'undefined'){
							$moneda_codigo = self.circuito.cir_moneda;							
							if($moneda_codigo !== null && $moneda_codigo.trim() !== ""){
								self.AfterCircuitoMonedaIsRetrieved();
							}else{								
								self.TryFetchCircuitoMoneda()
								.then(function($data){
									self.AfterCircuitoMonedaIsRetrieved();
								})
								.fail(function($error){
									console.log($error);
								});
							}
						}
						$("#circuito_val").val(ui.item.value);
						$($el).val(ui.item.label);
					})(this);

					self.TryFetchPagoTemporal()
						.then(function($data){
							self.AfterPagoTemporalIsRetrieved();
						})
						.fail(function($error){
							console.log($error);
					});
				}
			});			
		}			
	};
	self.AutocompleteOrdenServicio = function(){
		if(self.clientes){			
			$("#ordserv").autocomplete({
				source: function( request, response ) {
					$ordserv = self.BuildAutocompleteParams();
					$ordserv['ordserv'] = $('#ordserv').val();
					self.ordserv = {};
					$("#ordserv_val").val("");
					$.getJSON("man_conf_comisiones.php?q=buscar_ordserv", { term: request.term, ordserv: $ordserv, autocomplete: true }
					,function(data) {
						var _map = function($records){
							return $.map($records, function(item){
								return {
									value: item.ordserv_id,
									label: item.ordserv_nro,
									ordserv: item
								}
							});
						};
						if(data.Result == 'OK' && data.TotalRecords == 0){
							self.CheckIfOrdenServicioExist(request.term)
								.then(function($data){
									$records = (typeof $data['Records'] != 'undefined') ? $data.Records: [$data.Record];
									response(_map($records));
								})
								.fail(function($error){
									console.log($error);
								});
						}else{
							response(_map(data.Records));
						}
					});
				},
				minLength: 3,
				select: function( event, ui ) {
					event.preventDefault();
					$ordserv = ui.item.ordserv;
					if($ordserv.os_estado_ordserv != 5){
						swal({
							title: '¡Error!',
							type: 'error',
							text: 'Estado del Orden de Servicio no es el adecuado'
						})
						return;
					}
					self.ordserv = ui.item.ordserv;
					$("#ordserv_val").val(ui.item.value);
					$(this).val(ui.item.label);
					self.TryFetchCircuitoMoneda()
						.then(function($data){
							self.AfterCircuitoMonedaIsRetrieved();
						})
						.fail(function($error){
							console.log($error);
						});
				}
			});			
		}			
	};
}

function fn_limpiar(form_id) {
	$('#' + form_id).each(function() {
		this.reset();
	});
}

function editar_conf_comision(codigo) {
	window.location.href = 'man_conf_comisiones.php?q=editar_conf_comision&id=' + codigo;
}

function agrega_con_comision() {
	window.location.href = 'man_conf_comisiones.php?q=agregar_conf_comision';
}

function detalle_conf_comision(codigo) {
	window.location.href = 'man_conf_comisiones.php?q=detalle_conf_comision&id=' + codigo;
}

function buscar() {
	var dataString = "q=listar&" + $('#frm-busqueda').serialize();
	$.ajax({
		type : "POST",
		url : "man_conf_comisiones.php",
		data : dataString,
		success : function(data) {
			$('#tbl-detalle').html(data);
		}
	});
}

function procesar_usuarios(codigo) {
	$("#frm-usuarios .tb-gr-contenido tbody").empty();
	$("#h_id_conf").val(codigo);
	$.post('man_conf_comisiones.php?q=listar_usuarios_comision', {
		id : codigo
	}, function(data) {
		$("#frm-usuarios .tb-gr-contenido tbody").append(data.result);
	}, 'json');

	$('#dg-usuarios').dialog('open');
}

function fn_procesar_comisiones(conf_comision) {
	/*
	 * var url_d1 = "q=listar_comisiones_asesores&conf_comision="+conf_comision; var url_d2 = "q=contar_comisiones_asesores&conf_comision="+conf_comision;
	 * 
	 * $.ajax({ type: "POST", url: "man_conf_comisiones.php", data: url_d1, success: function(data){ $('#div_tbl_comisiones_cuerpo').html(data); $('#id_proceso').val(conf_comision); $.ajax({ type:
	 * "POST", url: "man_conf_comisiones.php", data: url_d2, success: function(data){ $('#hid_list_com').val(data); } }); } });
	 */
	try {
		$('#id_proceso').val(conf_comision);
		/* Verificamos si se genero anteriormente el listado */
		var _url = "q=nro_comisiones_generadas&comision_id=" + conf_comision;
		$.ajax({
			type : "POST",
			url : "man_conf_comisiones.php",
			data : _url,
			success : function(data) {
				$('#hid_list_com').val(data);
			}
		});

		if ($('#hid_list_com').val() == 0) {
			if (confirm('¿Desea Generar el Listado de Comisiones?')) {
				var urldatos = "q=generar_listado_comisiones&id_comision=" + conf_comision;
				$.ajax({
					type : "POST",
					url : "man_conf_comisiones.php",
					data : urldatos,
					success : function(data) {
						var nro = data.split('#');
						$('#hid_list_com').val(nro[1]);
						alert(data);
						// Listamos las Comisiones Generadas
						fn_listar_comisiones_asesores(conf_comision);
					}
				});
			}
		} else {
			fn_listar_comisiones_asesores(conf_comision);
		}
		$('#dg-comisiones').dialog('open');
	} catch (e) {
		alert(e);
	}
}

function fn_listar_comisiones_asesores(conf_comision_id) {
	try {
		var dataString = "q=listar_comisiones_asesores&conf_comision=" + conf_comision_id;
		$.ajax({
			type : "POST",
			url : "man_conf_comisiones.php",
			data : dataString,
			success : function(data) {
				$('#div_tbl_comisiones_cuerpo').html(data);
			}
		});
	} catch (e) {
		alert(e);
	}
}

function agregacion_usuarios() {
	var cod = $("#h_id_conf").val();
	window.open("buscar_usuarios.php?h_id_conf=" + cod, "_blank", "top=20,left=20,width=510px,height=385,scrollbars=no,resizable=1");
}

function toggle(source) {
	checkboxes = document.getElementsByName('chk_usr[]');
	for (var i = 0, n = checkboxes.length; i < n; i++) {
		checkboxes[i].checked = source.checked;
	}
}

function fn_seleccionar_todos(Obj, Objname) {
	try {
		var num = document.getElementsByName(Objname).length;
		if (Obj.checked) {
			for (i = 0; i < num; i++) {
				document.getElementsByName(Objname)[i].checked = true;
				// document.getElementsByName(Objname)[i].value=1;
			}
		} else {
			for (i = 0; i < num; i++) {
				document.getElementsByName(Objname)[i].checked = false;
				// document.getElementsByName(Objname)[i].value=3;
			}
		}
	} catch (e) {
		alert(e);
	}
}

function fn_chk_seleccionado(Obj) {
	try {
		if (Obj.checked == false) {
			document.getElementById('chk_todos').checked = false;
		}
	} catch (e) {
		alert(e);
	}
}

function fn_invertir_valores(Objname) {
	try {
		var num = document.getElementsByName(Objname).length;
		for (i = 0; i < num; i++) {
			document.getElementsByName(Objname)[i].checked = document.getElementsByName(Objname)[i].checked == true ? false : true;
		}
	} catch (e) {
		alert(e);
	}
}

function fn_nro_seleccionados(op, Objname) {
	try {
		var num = 0;
		var v_selec = 0;
		var i = 0;
		num = document.getElementsByName(Objname).length;
		switch (op) {
		case 1:
			v_selec = num;
			break;
		case 2:
			for (i = 0; i < num; i++) {
				if (document.getElementsByName(Objname)[i].checked) {
					v_selec++;
				}
			}
			break;
		}
		return v_selec;
	} catch (e) {
		alert(e);
	}
}

function fn_genera_listado_comisiones() {
	try {
		/*
		 * if($('#hid_list_com').val()==0){ var urldatos="q=generar_listado_comisiones&id_comision="+$('#id_proceso').val(); $.ajax({ type: "POST", url: "man_conf_comisiones.php", data: urldatos,
		 * success: function(data){ var nro = data.split('#'); $('#hid_list_com').val(nro[1]); alert(data); var dataString = "q=listar_comisiones_asesores&conf_comision="+$('#id_proceso').val();
		 * $.ajax({ type: "POST", url: "man_conf_comisiones.php", data: dataString, success: function(data){ $('#div_tbl_comisiones_cuerpo').html(data); } }); } }); } else{ throw 'No puede generar
		 * nuevamente el listado'; }
		 */
	} catch (e) {
		alert(e);
	}

}

function fn_genera_comisiones() {
	try {
		var dataString = "q=autorizar_pago_comision&" + $('#frm-pago-comisiones').serialize();
		var dataString2 = "q=pagar_comision&id_comision=" + $('#id_proceso').val();
		// if($('#hid_list_com').val()>0){
		if (confirm("¿Desea Confirmar el Pago de Comision a los Usuarios Seleccionados?")) {
			if ($('#chk_todos').is(':checked')) {
				// alert('Pagara Todos');
				$.ajax({
					type : "POST",
					url : "man_conf_comisiones.php",
					data : dataString2,
					success : function(data) {
						alert(data);
						$('#dg-comisiones').dialog('close');
					}
				});
			} else {
				// Cambiamos el estado de aquellas comisiones que no seran
				// pagadas
				fn_invertir_valores('chk_comisiones[]');
				$.ajax({
					type : "POST",
					url : "man_conf_comisiones.php",
					data : dataString,
					success : function(data) {
						// Una vez actualizadas las comisiones que no se
						// pagaran se procedera a realizar
						// el pago correspondiente
						$.ajax({
							type : "POST",
							url : "man_conf_comisiones.php",
							data : dataString2,
							success : function(data) {
								alert(data);
								$('#dg-comisiones').dialog('close');
							}
						});
					}
				});
			}
		}
		/*
		 * } else{ throw 'No Existe una Lista Generada'; }
		 */
	} catch (e) {
		alert(e);
	}
}

function fn_anular_periodo(Obj) {
	try {
		if (confirm('¿Desea Anular el Periodo Seleccionado?')) {
			var url_data = "q=anular_periodo&id_comision=" + Obj;
			$.ajax({
				type : "POST",
				url : "man_conf_comisiones.php",
				data : url_data,
				success : function(data) {
					alert(data);
				}
			});
		}
	} catch (e) {
		alert(e);
	}
}

function fn_activa_periodo(Obj) {
	try {
		if (confirm('¿Desea Activar el Periodo?')) {
			var url_data = "q=activa_periodo&id_comision=" + Obj;
			var url_data2 = "q=listar";
			$.ajax({
				type : "POST",
				url : "man_conf_comisiones.php",
				data : url_data,
				success : function(data) {
					alert(data);
					$.ajax({
						type : "POST",
						url : "man_conf_comisiones.php",
						data : url_data2,
						success : function(data) {
							$('#tbl-detalle').html(data);
						}
					});
				}
			});
		}
	} catch (e) {
		alert(e);
	}
}

function fn_ver_reporte_usr_com(id_comision, nomb, fech) {
	try {
		var url_data = "q=fn_ver_reporte_usr_com&id_comision=" + id_comision;
		$.ajax({
			type : "POST",
			url : "man_conf_comisiones.php",
			data : url_data,
			success : function(data) {
				$('#dg-comisiones-consolidado').dialog('open');
				$('#div_tbl_compagadas_cuerpo_2').html(data.rows);
				$('#v_id_comision').val(data.id_comision);

				$("#dg-comisiones-consolidado").dialog("option", "title", "Consolidado Comisiones " + fech);
				$("#dg-comisiones-consolidado-title").val("Consolidado Comisiones " + fech);
			}
		})
	} catch (e) {
		alert(e);
	}
}

function fn_reporte_com_det(id_comision, nomb, fech) {
	try {
		var url_data = "q=fn_reporte_com_det&id_comision=" + id_comision;
		$idComision = id_comision;
		$.ajax({
			type : "POST",
			url : "man_conf_comisiones.php",
			data : url_data,
			success : function(data) {
				$('#dg-comisiones-detallado').dialog('open');
				$('#div_tbl_compagadas_cuerpo_3').html(data);
				$idComision = parseInt($('#div_tbl_compagadas_cuerpo_3').find("#v_id_comision").val(), 10);				
				$("#dg-comisiones-detallado").dialog("option", "title", "Detalle Comisiones " + fech);
			}
		})
	} catch (e) {
		alert(e);
	}
}

function fn_telebanking() {

	$('#dg-telebanking').dialog('open');

}

function fn_reporte_com_det_excel() {
	var id_com = document.getElementById("v_id_comision").value;
	location.href = 'man_conf_comisiones.php?q=fn_reporte_com_det_excel&id_comision=' + id_com;
}

function fn_reporte_com_con_excel() {
	var id_com = document.getElementById("v_id_comision").value;
	location.href = 'man_conf_comisiones.php?q=fn_reporte_com_con_excel&id_comision=' + id_com;
}

function fn_reporte_com_con_telebanking() {

	var tipo_telebanking = $("#tipoTelebanking").val();
	var tipo_telebanking_titulo = $("#tipoTelebanking option:selected" ).text();
	var estado_telebanking = $("#estadoTelebanking").val();

	if (tipo_telebanking == "EMPTY") {

		$("#dg-confirm-message").text("Seleccionar el tipo de Telebanking.");
		// Confirmation
		$("#dg-confirm").dialog({
			resizable : false,
			height : "auto",
			width : 300,
			modal : true,
			buttons : {
				Aceptar : function() {
					$(this).dialog("close");
				}
			}
		});

	} else {

		$("#dg-confirm-message").text("¿Seguro de generar los archivos?");
		// Confirmation
		$("#dg-confirm").dialog(
				{
					resizable : false,
					height : "auto",
					width : 300,
					modal : true,
					buttons : {
						Aceptar : function() {
							// Genera los archivos

							$(this).dialog("close");
							$("#prg-telebanking").progressbar({
								value : false
							});
							$("#dg-loading").dialog({
								resizable : false,
								height : "auto",
								width : 300,
								modal : true,
								dialogClass : 'no-close'
							});

							var id_com = document.getElementById("v_id_comision").value;
							var max_amount_mn = $("#amountMnTelebanking").val();
							var max_amount_me = $("#amountMeTelebanking").val();
							max_amount_mn = max_amount_mn.replace(' ', '');
							max_amount_me = max_amount_me.replace(' ', '');

							var tipo_comision = $("#v_tipo_comision").val();
							var periodo_comision = $("#v_periodo_comision").val();

							var url_data = 'q=fn_reporte_com_con_telebanking&id_comision=' + id_com + '&max_amount_mn=' + max_amount_mn + '&max_amount_me=' + max_amount_me + '&tipo_comision='
									+ tipo_comision + '&tipo_telebanking=' + tipo_telebanking + '&estado_telebanking=' + estado_telebanking + '&periodo_comision=' + periodo_comision
									+ '&tipo_telebanking_titulo=' + tipo_telebanking_titulo;

							$.ajax({
								type : "POST",
								url : "man_conf_comisiones.php",
								data : url_data,
								success : function(data) {
									$('#div_tbl_compagadas_cuerpo_2').html(data.rows);
									$('#div_tbl_compagadas_total_2').html(data.total);
									$('#v_id_comision').val(data.id_comision);
									$("#dg-loading").dialog("close");
									// Generacion completa
									$("#dg-confirm-message").text("Se generado exitosamente los archivos de Telebanking. Por favor de revisar su correo.");
									// Confirmation
									$("#dg-confirm").dialog({
										resizable : false,
										height : "auto",
										width : 300,
										modal : true,
										buttons : {
											Aceptar : function() {
												$(this).dialog("close");
											}
										}
									});

								}
							});
						},
						Cancelar : function() {
							$(this).dialog("close");
						}
					}
				});

	}

}

function fn_generar_excel_telebanking() {

	var tipo_telebanking = $("#tipoTelebanking").val();
	var estado_telebanking = $("#estadoTelebanking").val();

	if (tipo_telebanking == "EMPTY") {
		$("#dg-confirm-message").text("Seleccionar el tipo de Telebanking.");
		// Confirmation
		$("#dg-confirm").dialog({
			resizable : false,
			height : "auto",
			width : 300,
			modal : true,
			buttons : {
				Aceptar : function() {
					$(this).dialog("close");
				}
			}
		});

	} else {
		var id_com = document.getElementById("v_id_comision").value;
		location.href = 'man_conf_comisiones.php?q=fn_generar_excel_telebanking&id_comision=' + id_com + '&tipo_telebanking=' + tipo_telebanking + '&estado_telebanking=' + estado_telebanking;
	}
}


function enviar_correo() {
	var dias_id 		= $("#dias_id").val();
	var dia_id 		= $("#dia_id").val();
	var hora_id 		= $("#hora_id").val();
	var id_comision 		= $("#id_comision").val();

var rpta = confirm("¿Esta seguro de enviar correo?");
	
	if (rpta) {
		location.href = 'man_conf_comisiones.php?q=enviar_correo&dias_id='+ dias_id + '&hora_id='+ hora_id + '&id_comision='+ id_comision + '&dia_id='+ dia_id;
	}
	
}

function fn_enviar_correos_comision() {

	var id_com = document.getElementById("v_id_comision").value;
	location.href = 'man_conf_comisiones.php?q=fn_enviar_correos_comision&id_comision=' + id_com;
	
}


function fn_buscar_archivos_telebanking() {
	var fecIni = $("#fec_ini_telebanking").val();
	var fecFin = $("#fec_fin_telebanking").val();

	// Validation of the range of dates
	var dateFecIni = Date.parse(fecIni.substring(6, 10) + "-" + fecIni.substring(3, 5) + "-" + fecIni.substring(0, 2));
	var dateFecFin = Date.parse(fecFin.substring(6, 10) + "-" + fecFin.substring(3, 5) + "-" + fecFin.substring(0, 2));
	var rangeDate = dateFecFin - dateFecIni;
	if (rangeDate < 0) {

		$("#dg-confirm-message").text("El rango de fechas no es valido.");
		// Confirmation
		$("#dg-confirm").dialog({
			resizable : false,
			height : "auto",
			width : 300,
			modal : true,
			buttons : {
				Aceptar : function() {
					$(this).dialog("close");
				}
			}
		});
		return;
	} else {
		var url_data = 'q=fn_buscar_archivos_telebanking&fec_ini=' + fecIni + ' 00:00:00&fec_fin=' + fecFin + ' 23:59:00';
		$.ajax({
			type : "POST",
			url : "man_conf_comisiones.php",
			data : url_data,
			success : function(data) {
				$('#div_tbl_archivos_telebanking_cuerpo').html(data);
			}
		});
	}

}

function fn_download_archivo_telebanking(filename, count) {
	$("#operacionTelebanking" + count).show();
	$("#guardarTelebanking" + count).show();
	$(".downloadTelebanking").hide();
	$(".editTelebanking").hide();
	$(".rechazarTelebanking").hide();
	location.href = 'man_conf_comisiones.php?q=fn_download_archivo_telebanking&filename=' + filename;
}

function cambiar_retencion_telebanking(param) {
	var chk = jQuery(param);

	$.post("man_conf_comisiones.php?q=cambiar_retencion_telebanking", {
		user_dni : chk.data("options").dni,
		conf_comision_id : chk.data("options").idcomi,
		tipo_moneda : chk.data("options").moneda,
		retencion_impuesto : chk.is(":checked"),
		user_codigo : chk.data("options").usuario,
		tipo_telebanking : chk.data("options").tipo
	}, function(data) {
		console.log(data);
		if (data.status) {
			$("#dg-confirm-message").text("Se cambio el estado de la retención.");
			// Confirmation
			$("#dg-confirm").dialog({
				resizable : false,
				height : "auto",
				width : 300,
				modal : true,
				buttons : {
					Aceptar : function() {
						$(this).dialog("close");
					}
				}
			});
		} else {
			$("#dg-confirm-message").text("Hubo un problema al cambiar la retención.");
			// Confirmation
			$("#dg-confirm").dialog({
				resizable : false,
				height : "auto",
				width : 300,
				modal : true,
				buttons : {
					Aceptar : function() {
						$(this).dialog("close");
					}
				}
			});
		}
	}, "json");
}

function cargarTelebanking() {
	var tipoTelebanking = $("#tipoTelebanking").val();
	var estadoTelebanking = $("#estadoTelebanking").val();
	var permisosTelebanking = $("#restricciones").val();
	if (permisosTelebanking == 'cons') {
		tipoTelebanking = 'EMPTY';
		estadoTelebanking = 'ALL';
		$('.div-cont-cuerpo').hide();
	}

	var url_data = 'q=fn_ver_reporte_usr_com&id_comision=' + $("#v_id_comision").val() + '&tipo_comision=' + tipoTelebanking + '&estado_telebanking=' + estadoTelebanking;
	$.ajax({
		type : "POST",
		url : "man_conf_comisiones.php",
		data : url_data,
		success : function(data) {
			$('#div_tbl_compagadas_cuerpo_2').html(data.rows);
			$('#div_tbl_compagadas_total_2').html(data.total);
			$('#v_id_comision').val(data.id_comision);

		}
	});
}

function fn_filtrar_comisiones(tipoTelebanking, estadoTelebanking) {
	var request_method = 'q=fn_ver_reporte_usr_com';
	if (tipoTelebanking != "EMPTY") {
		request_method = 'q=fn_ver_reporte_usr_com_filtrado';
	}

	var url_data = request_method + '&id_comision=' + $("#v_id_comision").val() + '&tipo_comision=' + tipoTelebanking + '&estado_telebanking=' + estadoTelebanking;
	$.ajax({
		type : "POST",
		url : "man_conf_comisiones.php",
		data : url_data,
		success : function(data) {

			$('#div_tbl_compagadas_cuerpo_2').html(data.rows);
			$('#div_tbl_compagadas_total_2').html(data.total);
			$('#v_id_comision').val(data.id_comision);

		}
	});

}

function fn_editar_operacion_telebanking(filename, count) {

	$("#operacionTelebanking" + count).show();
	$("#guardarTelebanking" + count).show();
	$("#operacionTelebankingText" + count).hide();
	$(".downloadTelebanking").hide();
	$(".editTelebanking").hide();
}

function fn_registrar_operacion_telebanking(filename, count, tipo_moneda) {

	var operacion_telebanking = $("#operacionTelebanking" + count).val();
	if (operacion_telebanking.trim() == '') {

		$("#dg-confirm-message").text("El número de operación no es valido.");
		// Confirmation
		$("#dg-confirm").dialog({
			resizable : false,
			height : "auto",
			width : 300,
			modal : true,
			buttons : {
				Aceptar : function() {
					$(this).dialog("close");
				}
			}
		});
		return;
	}

	var fecIni = $("#fec_ini_telebanking").val();
	var fecFin = $("#fec_fin_telebanking").val();

	// Validation of the range of dates
	var dateFecIni = Date.parse(fecIni.substring(6, 10) + "-" + fecIni.substring(3, 5) + "-" + fecIni.substring(0, 2));
	var dateFecFin = Date.parse(fecFin.substring(6, 10) + "-" + fecFin.substring(3, 5) + "-" + fecFin.substring(0, 2));
	var rangeDate = dateFecFin - dateFecIni;
	if (rangeDate < 0) {

		$("#dg-confirm-message").text("El rango de fechas no es valido.");
		// Confirmation
		$("#dg-confirm").dialog({
			resizable : false,
			height : "auto",
			width : 300,
			modal : true,
			buttons : {
				Aceptar : function() {
					$(this).dialog("close");
				}
			}
		});
		return;
	} else {
		var url_data = 'q=fn_registrar_operacion_telebanking&filename=' + filename + '&operacion_telebanking=' + operacion_telebanking + '&fec_ini=' + fecIni + ' 00:00:00&fec_fin=' + fecFin
				+ ' 23:59:00&tipo_moneda=' + tipo_moneda;
		$.ajax({
			type : "POST",
			url : "man_conf_comisiones.php",
			data : url_data,
			success : function(data) {
				$('#div_tbl_archivos_telebanking_cuerpo').html(data);
				$("#dg-confirm-message").text("Se registrado exitosamente la operación telebanking.");
				// Confirmation
				$("#dg-confirm").dialog({
					resizable : false,
					height : "auto",
					width : 300,
					modal : true,
					buttons : {
						Aceptar : function() {
							$(this).dialog("close");
						}
					}
				});
			}
		});
	}
}

function fn_rechazar_telebanking(filename, count, tipo_moneda) {

	var fecIni = $("#fec_ini_telebanking").val();
	var fecFin = $("#fec_fin_telebanking").val();

	// Validation of the range of dates
	var dateFecIni = Date.parse(fecIni.substring(6, 10) + "-" + fecIni.substring(3, 5) + "-" + fecIni.substring(0, 2));
	var dateFecFin = Date.parse(fecFin.substring(6, 10) + "-" + fecFin.substring(3, 5) + "-" + fecFin.substring(0, 2));
	var rangeDate = dateFecFin - dateFecIni;
	if (rangeDate < 0) {

		$("#dg-confirm-message").text("El rango de fechas no es valido.");
		// Confirmation
		$("#dg-confirm").dialog({
			resizable : false,
			height : "auto",
			width : 300,
			modal : true,
			buttons : {
				Aceptar : function() {
					$(this).dialog("close");
				}
			}
		});
		return;
	} else {

		$("#dg-confirm-message").text("¿Seguro de rechazar el Telebanking?");
		// Confirmation
		$("#dg-confirm").dialog({
			resizable : false,
			height : "auto",
			width : 300,
			modal : true,
			buttons : {
				Aceptar : function() {
					var url_data = 'q=fn_rechazar_operacion_telebanking&filename=' + filename + '&fec_ini=' + fecIni + ' 00:00:00&fec_fin=' + fecFin + ' 23:59:00&tipo_moneda=' + tipo_moneda;
					$.ajax({
						type : "POST",
						url : "man_conf_comisiones.php",
						data : url_data,
						success : function(data) {
							$('#div_tbl_archivos_telebanking_cuerpo').html(data);
							$("#dg-confirm-message").text("Se rechazó exitosamente el telebanking.");
							// Confirmation
							$("#dg-confirm").dialog({
								resizable : false,
								height : "auto",
								width : 300,
								modal : true,
								buttons : {
									Aceptar : function() {
										$(this).dialog("close");
									}
								}
							});
						}
					});

				},
				Cancelar : function() {
					$(this).dialog("close");
				}
			}
		});

	}
}

function fn_quitar_asesor() {
	try {
		var v_selec = fn_nro_seleccionados(2, 'chk_usr[]');
		if (v_selec > 0) {
			if (confirm('¿Esta seguro de Quitar a los Asesores Seleccionados?')) {
				var url_data = "q=eliminar_usuarios_comision&" + $('#frm-usuarios').serialize();
				$.ajax({
					type : "POST",
					url : "man_conf_comisiones.php",
					data : url_data,
					success : function(data) {
						alert(data);
					}
				});
			}
		} else {
			throw 'No ha seleccionado un Asesor';
		}
	} catch (e) {
		alert(e);
	}
}

function fn_ver_listado_comisiones(comision_id) {
	try {
		var dataString = "q=comisiones_pagadas&comision_id=" + comision_id;
		$.ajax({
			type : "POST",
			url : "man_conf_comisiones.php",
			data : dataString,
			success : function(data) {
				$('#dg-comisiones-pagadas').dialog('open');
				$('#div_tbl_compagadas_cuerpo').html(data);
			}
		});
	} catch (e) {
		alert(e);
	}
}