import { Locator, expect, Page } from "@playwright/test";

export class DemoAutomationTestingRegister {
  page: Page;
  first_name: Locator;
  last_name: Locator;
  address: Locator;
  email: Locator;
  phone: Locator;
  gender: Locator;
  hobbies: Locator;
  languages: Locator;
  skills: Locator;
  country: Locator;
  select_country: Locator;
  dob_year: Locator;
  dob_month: Locator;
  dob_day: Locator;
  password: Locator;
  confirm_password: Locator;
  browse_file_button: Locator;
  refresh_button: Locator;
  submit_button: Locator;

  constructor(page: Page) {
    this.page = page;
    this.first_name = page.getByPlaceholder("First Name");
    this.last_name = page.getByPlaceholder("Last Name");
    this.address = page.locator("textarea");
    this.email = page.locator('input[type="email"]');
    this.phone = page.locator('input[type="tel"]');
    this.gender = page.getByRole("radio", { name: "Male", exact: true });
    this.hobbies = page.locator('input[@type="checkbox"]');
    this.languages = page.locator("multi-select");
    this.skills = page.locator("#Skills");
    this.country = page.locator("#countries");
    this.select_country = page.locator("span").getByRole("combobox");
    this.dob_year = page.getByPlaceholder("Year");
    this.dob_month = page.getByPlaceholder("Month");
    this.dob_day = page.getByPlaceholder("Day");
    this.password = page.locator('//*[@type="password"]').first();
    this.confirm_password = page.locator('//*[@type="password"]').last();
    this.browse_file_button = page.getByRole("button", { name: "Choose File" });
    this.refresh_button = page.getByRole("button", { name: "Refresh" });
    this.submit_button = page.getByRole("button", { name: "Submit" });
  }

  async goTo() {
    await this.page.goto("https://demo.automationtesting.in/Register.html");
  }

  async fillName(fname: string, lname: string) {
    await this.first_name.fill(fname);
    await this.last_name.fill(lname);
  }

  async fillAddress(address: string) {
    await this.address.fill(address);
  }

  async fillContact(email: string, phone: number) {
    await this.email.fill(email);
    await this.phone.fill(phone.toString());
  }

  async checkHobbies() {
    await this.hobbies.nth(0).click();
    await this.hobbies.nth(2).click();
  }

  async selectLanguages(languages: string[]) {
    await this.languages.click();
    for (const language of languages) {
      await this.page
        .getByRole("listitem")
        .filter({ hasText: language })
        .click();
    }
    await this.page.click("body");
  }

  async selectSkill(skill: string) {
    await this.skills.selectOption(skill);
  }

  async selectCountry(country: string) {
    await this.select_country.click();
    await this.page.getByRole("treeitem", { name: country }).click();
  }

  async dateOfBirth(d: number, m: string, y: number) {
    await this.dob_day.selectOption(d.toString());
    await this.dob_month.selectOption(m);
    await this.dob_year.selectOption(y.toString());
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
    await this.confirm_password.fill(password);
  }

  async uploadFile(filePath: string) {
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.browse_file_button.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }
}
