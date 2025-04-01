import { Locator, expect, Page } from "@playwright/test";

export class JavascriptAlertsPage {
  page: Page;
  main_content: Locator;
  alert_button: Locator;
  confirm_button: Locator;
  prompt_button: Locator;
  alerts_page_result: Locator;

  constructor(page: Page) {
    this.page = page;
    this.main_content = page.locator("#content");
    this.alert_button = page.locator("text=Click for JS Alert");
    this.confirm_button = page.locator("text=Click for JS Confirm");
    this.prompt_button = page.locator("text=Click for JS Prompt");
    this.alerts_page_result = page.locator("#result");
  }

  async gotoIHAlerts() {
    await this.page.goto(
      "https://the-internet.herokuapp.com/javascript_alerts"
    );
    await expect(this.page).toHaveURL(/javascript_alerts/)
    await expect(this.main_content).toBeVisible();
  }

  async clickForAlert() {
    await this.alert_button.click();
  }

  async clickForConfirm() {
    await this.confirm_button.click();
  }

  async clickForPrompt() {
    await this.prompt_button.click();
  }

  async result_validation(text) {
    await this.alerts_page_result.waitFor({ state: "visible" });
    await expect(this.alerts_page_result).toHaveText(text);
  }
}
