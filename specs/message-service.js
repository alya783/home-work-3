const {
    startClientPC,
    startSatelite,
    stopClientPC,
    stopEarthServer,
    stopSatelite,
    stopMarsServer,
    startEarthServer,
    startMarsServer,
    sendMessage,
    assertResponse
} = require('./stubs/messageservice.stubs');

// REMOVE THE BELOW CODE BEFORE START THE EXERCISE

function startAllNodes() {
    startClientPC();
    const earthToken = startEarthServer();
    const marsToken = startMarsServer();
    startSatelite();
    return {
        earth: earthToken,
        mars: marsToken,
    }
}

function startNodesWithoutSatelite() {
    startClientPC();
    const earthToken = startEarthServer();
    const marsToken = startMarsServer();
    return {
        earth: earthToken,
        mars: marsToken,
    }
}

function stopAllNodes(){
    stopMarsServer();
    stopEarthServer();
    stopSatelite();
    stopClientPC();
}

describe('Message Sending', function () {
    
    afterEach(function() {
        stopAllNodes();
    });
    
    context('Successful message sending ', function () { 
        it('should send message to Mars without error', function () {
            // Успешная отправка сообщений на сервер Марса
            let tokens = startAllNodes();
            const response = sendMessage('Hello', 'Mars', tokens.mars);
            assertResponse(response, 'Success');
        });

        it('should send message to Earth without error', function () {
            // Успешная отправка сообщений на сервер Земли
            let tokens = startAllNodes();
            const response = sendMessage('Hello', 'Earth', tokens.earth);
            assertResponse(response, 'Success');
        });
    })
    
    context('Sending messages with invalid tokens', function(){
            //Отправка сообщений на сервер Земли с невалидным токеном
        it('should send message to Earth with "Security Error"', function () {
            startAllNodes();
            const response = sendMessage('Hello', 'Earth', 'X0000');
            assertResponse(response, 'Security Error');
        });
            //Отправка сообщений на сервер Марса с невалидным токеном
        it('should send message to Mars with "Security Error"', function () {
            startAllNodes();
            const response = sendMessage('Hello', 'Mars', 'X6777');
            assertResponse(response, 'Security Error');
        });
    });

    context('Sending messages with disconnected satelite', function(){
            //Отправка сообщений на сервер Марса с валидным токеном  и отключенным спутником
        it('should send message to Mars without connection to satelite', function () {
            let tokens = startNodesWithoutSatelite();
            const response = sendMessage('Hello', 'Mars', tokens.mars);
            assertResponse(response, 'Service is unavailable');
        });
            //Отправка сообщений на сервер Марса с невалидным токеном и отключенным спутником
        it('should send message to Mars without connection to satelite and invalid token', function () {
            startNodesWithoutSatelite();
            const response = sendMessage('Hello', 'Mars', 'P4792');
            assertResponse(response, 'Service is unavailable');
        });
    });      
})



