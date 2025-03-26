import { Page, Locator, expect } from "@playwright/test";

export class RediffSignUp {
  page: Page;
  full_name: Locator;
  rediffmal_id: Locator;
  check_availibility: Locator;
  id_availibility_text: Locator;
  first_available_id: Locator;
  password: Locator;
  retype_password: Locator;
  no_altn_id_checkbox: Locator;
  security_question: Locator;
  security_answer: Locator;
  maiden_name: Locator;
  mobile_no: Locator;
  day_dob: Locator;
  month_dob: Locator;
  year_dob: Locator;
  city: Locator;

  constructor(page: Page) {
    this.page = page;
    this.full_name = page.locator("[name^='name']");
    this.rediffmal_id = page.locator("[name*='login']");
    this.check_availibility = page.locator("//input[@class='btn_checkavail']");
    this.id_availibility_text = page
      .getByText("Sorry, the ID that you are looking for is taken.")
      .or(page.getByText("Yippie! The ID you've chosen is available."));
    this.first_available_id = page.locator('[id="radio_login"]').first();
    this.password = page.locator("#newpasswd");
    this.retype_password = page
      .locator('[type="password"]')
      .and(page.locator("#newpasswd1"));
    this.no_altn_id_checkbox = page.locator('[type="checkbox"]');
    this.security_question = page.locator('select[name^="hintq"]');
    this.security_answer = page.locator('input[name^="hinta"]');
    this.maiden_name = page
      .locator('[type="text"]')
      .and(page.locator("[name^=mothername]"));
    this.mobile_no = page.locator("//*[@id='mobno']");
    this.day_dob = page.locator('select[name^="DOB_Day"]');
    this.month_dob = page.locator('select[name^="DOB_Month"]');
    this.year_dob = page.locator('select[name^="DOB_Year"]');
    this.city = page.locator('//select[contains(@name,"city")]');
  }

  async enter_name(name) {
    await this.full_name.fill(name);
  }

  async enter_id(id) {
    await this.rediffmal_id.fill(id);
    await this.check_availibility.click();
    await this.id_availibility_text.waitFor({ state: "visible" });
    if (await this.first_available_id.isVisible()) {
      await this.first_available_id.click();
    }
  }

  async enter_password(password) {
    await this.password.fill(password);
    await this.retype_password.fill(password);
  }

  async checkbox_true() {
    await this.no_altn_id_checkbox.check();
    await expect(this.no_altn_id_checkbox).toBeChecked();
  }

  async select_question(question) {
    await this.security_question.selectOption(question);
    await expect(this.security_question).toHaveValue(question);
  }

  async enter_security_answer(answer) {
    await this.security_answer.fill(answer);
  }

  async enter_maiden_name(maidenName) {
    await this.maiden_name.fill(maidenName);
  }

  async enter_mobile(mobile_no) {
    await this.mobile_no.fill(mobile_no);
  }

  async select_birth_date(date, month, year) {
    await this.day_dob.selectOption(date);
    await this.month_dob.selectOption(month);
    await this.year_dob.selectOption(year);
  }

  async select_city(city) {
    this.city.selectOption(city);
  }
}
