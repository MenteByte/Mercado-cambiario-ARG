function fetchFinancialData() {
    fetch('https://api.bluelytics.com.ar/v2/latest')
        .then(response => response.json())
        .then(data => {
            
            const dolarOficialVenta = data.oficial.value_sell;
            const dolarBlueVenta = data.blue.value_sell;
            const dolarBrecha = ((dolarBlueVenta - dolarOficialVenta) / dolarOficialVenta) * 100;
            document.getElementById('dolar-brecha').innerHTML = `Brecha Dólar: <span class="rojo">${dolarBrecha.toFixed(2)}%</span>`;
        
            const euroOficialVenta = data.oficial_euro.value_sell;
            const euroBlueVenta = data.blue_euro.value_sell;
            const euroBrecha = ((euroBlueVenta - euroOficialVenta) / euroOficialVenta) * 100;
            document.getElementById('euro-brecha').innerHTML = `Brecha Euro: <span class="rojo">${euroBrecha.toFixed(2)}%</span>`;

            // Dólar Oficial
            document.getElementById('official-buy').textContent = `Valor de Compra: ${data.oficial.value_buy}`;
            document.getElementById('official-avg').textContent = `Valor Promedio: ${data.oficial.value_avg}`;
            document.getElementById('official-sell').textContent = `Valor de Venta: ${data.oficial.value_sell}`;

            // Dólar Blue
            document.getElementById('blue-buy').textContent = `Valor de Compra: ${data.blue.value_buy}`;
            document.getElementById('blue-avg').textContent = `Valor Promedio: ${data.blue.value_avg}`;
            document.getElementById('blue-sell').textContent = `Valor de Venta: ${data.blue.value_sell}`;

            // Euro Oficial
            document.getElementById('euro-official-buy').textContent = `Valor de Compra: ${data.oficial_euro.value_buy}`;
            document.getElementById('euro-official-avg').textContent = `Valor Promedio: ${data.oficial_euro.value_avg}`;
            document.getElementById('euro-official-sell').textContent = `Valor de Venta: ${data.oficial_euro.value_sell}`;

            // Euro Blue
            document.getElementById('euro-blue-buy').textContent = `Valor de Compra: ${data.blue_euro.value_buy}`;
            document.getElementById('euro-blue-avg').textContent = `Valor Promedio: ${data.blue_euro.value_avg}`;
            document.getElementById('euro-blue-sell').textContent = `Valor de Venta: ${data.blue_euro.value_sell}`;
        })
        .catch(error => {
            console.error('Error al obtener los valores:', error);
        });
}

function convertCurrencyBlue() {
    const amount = parseFloat(document.getElementById('amount').value);
    const currency = document.getElementById('currency').value;
    const targetCurrency = document.getElementById('target-currency').value;

    fetch('https://api.bluelytics.com.ar/v2/latest')
        .then(response => response.json())
        .then(data => {
            let convertedAmount = 0;

            if (currency === 'ars' && targetCurrency === 'usd') {
                convertedAmount = amount / data.blue.value_buy;
                document.getElementById('converted-amount-blue').textContent = `Equivalente en USD: $${convertedAmount.toFixed(2)}`;
            } else if (currency === 'ars' && targetCurrency === 'eur') {
                convertedAmount = amount / data.blue_euro.value_buy;
                document.getElementById('converted-amount-blue').textContent = `Equivalente en EUR: €${convertedAmount.toFixed(2)}`;
            } else if (currency === 'usd' && targetCurrency === 'ars') {
                convertedAmount = amount * data.blue.value_sell;
                document.getElementById('converted-amount-blue').textContent = `Equivalente en ARS: $${convertedAmount.toFixed(2)}`;
            } else if (currency === 'eur' && targetCurrency === 'ars') {
                convertedAmount = amount * data.blue_euro.value_sell;
                document.getElementById('converted-amount-blue').textContent = `Equivalente en ARS: $${convertedAmount.toFixed(2)}`;
            } else {
                document.getElementById('converted-amount-blue').textContent = 'Conversión no disponible';
            }
        })
        .catch(error => {
            console.error('Error al obtener los valores:', error);
        });
}

function convertCurrencyOficial() {
    const amount = parseFloat(document.getElementById('amountOficial').value);
    const currency = document.getElementById('currencyOficial').value;
    const targetCurrency = document.getElementById('target-currencyOficial').value;

    fetch('https://api.bluelytics.com.ar/v2/latest')
        .then(response => response.json())
        .then(data => {
            let convertedAmount = 0;

            if (currency === 'ars' && targetCurrency === 'usd') {
                convertedAmount = amount / data.oficial.value_buy;
                document.getElementById('converted-amount-oficial').textContent = `Equivalente en USD: $${convertedAmount.toFixed(2)}`;
            } else if (currency === 'ars' && targetCurrency === 'eur') {
                convertedAmount = amount / data.oficial_euro.value_buy;
                document.getElementById('converted-amount-oficial').textContent = `Equivalente en EUR: €${convertedAmount.toFixed(2)}`;
            } else if (currency === 'usd' && targetCurrency === 'ars') {
                convertedAmount = amount * data.oficial.value_sell;
                document.getElementById('converted-amount-oficial').textContent = `Equivalente en ARS: $${convertedAmount.toFixed(2)}`;
            } else if (currency === 'eur' && targetCurrency === 'ars') {
                convertedAmount = amount * data.oficial_euro.value_sell;
                document.getElementById('converted-amount-oficial').textContent = `Equivalente en ARS: $${convertedAmount.toFixed(2)}`;
            } else {
                document.getElementById('converted-amount-oficial').textContent = 'Conversión no disponible';
            }
        })
        .catch(error => {
            console.error('Error al obtener los valores:', error);
        });
}



window.onload = function () {
    fetchFinancialData();
};
