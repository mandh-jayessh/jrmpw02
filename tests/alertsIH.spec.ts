import { test, expect } from "@playwright/test";
import { JavascriptAlertsPage } from "../pages/alerts_IH";
import alertData from "../data/alert_data.json";

test.describe("Handling Alerts and Dialogs", () => {
  let javascriptAlerts: JavascriptAlertsPage;

  test.beforeEach(
    "Launch JS Alerts in Internet Herokuapp",
    async ({ page }) => {
      javascriptAlerts = new JavascriptAlertsPage(page);
      await javascriptAlerts.gotoIHAlerts();
    }
  );

  test("Alert - Click OK", async ({ page }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual(alertData.alert_box_text);
      await dialog.accept();
    });
    await javascriptAlerts.clickForAlert();
    await javascriptAlerts.result_validation(alertData.alert_success_message);
  });

  test("Confirm - Click OK", async ({ page }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual(alertData.confirm_box_text);
      await dialog.accept();
    });
    await javascriptAlerts.clickForConfirm();
    await javascriptAlerts.result_validation(alertData.confirm_ok_message);
  });

  test("Confirm - Click Cancel", async ({ page }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual(alertData.confirm_box_text);
      await dialog.dismiss();
    });
    await javascriptAlerts.clickForConfirm();
    await javascriptAlerts.result_validation(alertData.confirm_cancel_message);
  });

  test("Prompt - Input text in prompt, Click OK and Validate Input Text", async ({
    page,
  }) => {
    page.on("dialog", async (dialog) => {
      expect(dialog.message()).toEqual(alertData.prompt_box_text);
      await dialog.accept(alertData.prompt_input_text);
    });
    await javascriptAlerts.clickForPrompt();
    await javascriptAlerts.result_validation(
      `You entered: ${alertData.prompt_input_text}`
    );
  });

  test.afterEach("Close everything", async ({ page }, testInfo) => {
    await page.goBack();
    await page.close();
    await test.step("Log Test Status", async () => {
      if (testInfo.status === "passed") {
        console.log(`Test Passed: ${testInfo.title}`);
      } else if (testInfo.status === "failed") {
        console.log(`Test Failed: ${testInfo.title}`);
      }
    });
  });
});
