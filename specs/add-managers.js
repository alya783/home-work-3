async function makeLoggingIntoSystem(login, password){
    await browser.url('https://viktor-silakov.github.io/course-sut');
    await $('#login').setValue(login);
    await $('#password').setValue(password);
    await $('button').click();
    await $('#spinner').waitForDisplayed({ reverse: true, timeout: 10500 });
}

async function addManager(email, password, address1, address2, state, zip, description, city){
    await $('//*[@id="first-nav-block"]/li[8]/a').click();
    await $('#dashboard').waitForDisplayed();
    await $('#email').setValue(email);
    await $('#password').setValue(password);
    await $('#address1').setValue(address1);
    await $('#address2').setValue(address2);
    await $('#state').selectByVisibleText(state);
    await $('#zip').setValue(zip);
    await $('#description').setValue(description);
    await $('//label[contains(text(),"Country")]').click();
    await $('#city').setValue(city);
    await $('//*[@id="autoComplete_result_0"]/mark').click();
    await $('//button[@class="btn btn-primary mt-3"]').click();
}

async function checkFormFields(rowSelector, email, address1, address2, state, zip, description, city){
    await expect($(rowSelector).$('[tabulator-field="email"]')).toHaveText(email);
    await expect($(rowSelector).$('[tabulator-field="address1"]')).toHaveText(address1);
    await expect($(rowSelector).$('[tabulator-field="address2"]')).toHaveText(address2);
    await expect($(rowSelector).$('[tabulator-field="state"]')).toHaveText(state);
    await expect($(rowSelector).$('[tabulator-field="zip"]')).toHaveText(zip);
    await expect($(rowSelector).$('[tabulator-field="description"]')).toHaveText(description);
    await expect($(rowSelector).$('[tabulator-field="city"]')).toHaveText(city);
}

describe('adding managers into list', function(){
    before(async function() {
        await makeLoggingIntoSystem('walker@jw.com', 'password');
    });

    context('Successful adding managers', function (){
        it('check first manager info', async function(){
            await addManager('astra@gmail.com', 'astra97', 'st Nelson', 
                            '5 / 10', 'Canada', '1263', 'Hard-working person', 
                            'Canada');
            await $('//*[@id="first-nav-block"]/li[10]/a').click();
            await checkFormFields('//*[@id="users-table"]/div[2]/div/div[2]', 'astra@gmail.com', 'st Nelson', 
                                '5 / 10', 'CA', '1263', 'Hard-working person', 
                                'Canada');
        });

        it('check second manager info', async function(){ 
            await addManager('karl@gmail.com', 'karl99', 'st Main', 
                            '1 / 7', 'United States', '9999', 'Stressful person', 
                            'USA');
            await $('//*[@id="first-nav-block"]/li[10]/a').click();
            await checkFormFields('//*[@id="users-table"]/div[2]/div/div[3]', 'karl@gmail.com', 'st Main', 
                                '1 / 7', 'US', '9999', 'Stressful person', 'USA');       
        });
    });
});

