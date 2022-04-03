async function makeLoggingIntoSystem(login, password){
    await browser.url('https://viktor-silakov.github.io/course-sut');
    await $('#login').setValue(login);
    await $('#password').setValue(password);
    await $('button').click();
    await $('#spinner').waitForDisplayed({ reverse: true, timeout: 10500 });
}

describe('wait text', function(){
    before(async function() {
        await makeLoggingIntoSystem('walker@jw.com', 'password');
    });

    it('check text', async function(){
        await $('//a[@id="status"]').click();
        await $('//a[@id="status"]').waitForText('Active', 4000);
    });
})

