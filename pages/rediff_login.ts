import { Locator, expect, Page } from "@playwright/test";

export class RediffLogin {
page: Page
create_new_id_link: Locator

    constructor(page:Page){
        this.page = page
        this.create_new_id_link = page.getByRole("link", { name: "Get a new Rediffmail ID" })
    }


    async gotoRediffLoginPage(){
        await this.page.goto("https://mail.rediff.com/cgi-bin/login.cgi");
    }

    async click_new_id_link(){
        await this.create_new_id_link.click()
    }
}