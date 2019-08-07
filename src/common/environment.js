const environment = {
    server: { port: 8080 },
    data: new Date().toLocaleString('pt-BR', {hour12: false, year: 'numeric',  month: '2-digit',  day: '2-digit',  hour: '2-digit',  minute: '2-digit',  second: '2-digit',  timeZone: 'America/Sao_Paulo'}) 
}


module.exports = environment