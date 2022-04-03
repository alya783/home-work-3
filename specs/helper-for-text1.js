async function makeLoggingIntoSystem(login, password){
    await browser.url('https://viktor-silakov.github.io/course-sut');
    await $('#login').setValue(login);
    await $('#password').setValue(password);
    await $('button').click();
    await $('#spinner').waitForDisplayed({ reverse: true, timeout: 10500 });
}

async function waitForText(selector, text, timeout){
    await browser.waitUntil(
        async () => {
            const elemDisplayed = await $(selector).waitForDisplayed();
            const elemText = await $(selector).getText();
            return elemDisplayed && elemText === text;
        }, {timeout: timeout}
    )
}

describe('wait text', function(){
    before(async function() {
        await makeLoggingIntoSystem('walker@jw.com', 'password');
    });

    it('check text', async function(){
        await $('//a[@id="status"]').click();
        await waitForText('//a[@id="status"]', 'Active', 4000);
    });
})

