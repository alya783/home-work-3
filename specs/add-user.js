const userData = {
    "email": "anya21@gmail.com",
    "password": "123456",
    "address1": "st Main",
    "address2": "4/10",
    "city": "USA",
    "zip": 2244,
    "anual": 50000,
    "description": "Love cats",
}

async function makeLoggingIntoSystem(login, password){
    await browser.url('https://viktor-silakov.github.io/course-sut');
    await $('#login').setValue(login);
    await $('#password').setValue(password);
    await $('button').click();
    await $('#spinner').waitForDisplayed({ reverse: true, timeout: 10500 });
}

async function fillFormUsingJson(str){
    const convetToString = JSON.stringify(str);
    const parsedString = JSON.parse(convetToString);
    for(const key in parsedString){
    	await $(`#${key}`).setValue(parsedString[key]);
    }
}

describe('adding user into list', function(){
    before(async function() {
        await makeLoggingIntoSystem('walker@jw.com', 'password');
        await $('//*[@id="first-nav-block"]/li[7]/a').click();
        await $('#dashboard').waitForDisplayed(); 
    });

    it('add user', async function(){ 
        await fillFormUsingJson(userData);
        await $('//button[@class="btn btn-primary mt-3"]').click();
        await $('//*[@id="users-table"]').waitForDisplayed(); 
    });
})