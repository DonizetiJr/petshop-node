function retornarServico(nomeCliente, nomePet, foneContato, tipoServico, data){
	let servicoPrestado;
	switch(tipoServico){
		case '1': servicoPrestado = 'Banho e Tosa';
			break;
		case '2': servicoPrestado = 'Consulta com Veterinario';
			break;
		case '3': servicoPrestado = 'Adestramento';
			break;
		case '4': servicoPrestado =  'Castração';
			break;
	}

	let servico = {
		"nomeCliente": nomeCliente,
		"nomePet": nomePet,
		"foneContato": foneContato,
		"tipoServico": servicoPrestado,
		"data": data
	}

	return servico;
}



$(function() {
	$('#datepicker').datepicker({
		format: 'dd/mm/yyyy',
		startdata: '+0d',
		autoclose: 'true'
	});

	$('#botao_submit').click(function(event) {

		/* Act on the event
		console.log($('#nomeCliente').val());
		console.log($('#nomePet').val());
		console.log($('#contatoCliente').val());
		console.log($('#select').val());
		console.log($('#datepicker').val());
		*/

		let consulta = retornarServico($('#nomeCliente').val(), $('#nomePet').val(), $('#contatoCliente').val(), $('#select').val(), $('#datepicker').val());
		console.log(consulta);
	});
});
