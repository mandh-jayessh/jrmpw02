import { test, expect } from "@playwright/test";
import { RediffLogin } from "../pages/rediff_login";
import { RediffSignUp } from "../pages/rediff_signup";
import signupData from "../data/rediff_signup_data.json";

test("Simple Login Test", async ({ page }) => {
  await page.goto("https://demo.guru99.com/test/newtours/");
  await page.locator("[name='userName']").fill("test");
  await page.locator("[name='password']").fill("test");
  await page.locator("[name='submit']").click();
  await page.close();
});

const credentials = [
  {
    user: "test",
    password: "test",
  },
  {
    user: "selenium",
    password: "selenium",
  },
];

credentials.forEach((data) => {
  test(`Simple Login Test with use: ${data.user}`, async ({ page }) => {
    await page.goto("https://demo.guru99.com/test/newtours/");
    await page.locator("[name='userName']").fill(data.user);
    await page.locator("[name='password']").fill(data.password);
    await page.locator("[name='submit']").click();
    await expect(page.locator("h3")).toHaveText("Login Successfully");
    await page.getByRole("link", { name: "SIGN-OFF" }).click();
    await page.close();
  });
});

test.describe("Rediff Tests", () => {
  let redifflogIn: RediffLogin;
  let rediffSignUp: RediffSignUp;

  test.beforeEach("Launch WebPage", async ({ page }) => {
    redifflogIn = new RediffLogin(page);
    rediffSignUp = new RediffSignUp(page);
    test.slow();
    await redifflogIn.gotoRediffLoginPage();
    await redifflogIn.click_new_id_link();
    await expect(page).toHaveTitle("Rediffmail Free Unlimited Storage");
    await expect(page).toHaveTitle(/Rediffmail Free/);
    await page.waitForLoadState("networkidle");
  });

  test.skip("Rediff SignUp Fill up details", async ({ page }) => {
    await page.locator("[name^='name']").fill("Joe");
    await page.locator("[name*='login']").fill("J");
    await page.locator("//input[@value='Check availability']").click();
    await page
      .getByText("Sorry, the ID that you are looking for is taken.")
      .or(page.getByText("Yippie! The ID you've chosen is available."))
      .waitFor({ state: "visible" });
    if (await page.locator('[id="radio_login"]').first().isVisible()) {
      await page.locator('[id="radio_login"]').first().click();
    }
    await page.locator("#newpasswd").fill("1Columbo!");
    await page
      .locator('[type="password"]')
      .and(page.locator("#newpasswd1"))
      .fill("1Columbo!");
    await page.getByTitle("Show password").last().click();
    // await page.getByTitle("Show password").locator("nth=1").click()
    await page.locator('[type="checkbox"]').check();
    await expect(page.locator('[type="checkbox"]')).toBeChecked();
    await page
      .locator('select[name^="hintq"]')
      .selectOption("What is the name of your first school?");
    await expect(
      page.locator('//select[starts-with(@name,"hintq")]')
    ).toHaveValue("What is the name of your first school?");
    await page.locator('input[name^="hinta"]').fill("Sample Answer");
    await page
      .locator('[type="text"]')
      .and(page.locator("[name^=mothername]"))
      .fill("Sample Maiden Name");
    await page.locator("//*[@id='mobno']").fill("9898989898");
    await page.locator('select[name^="DOB_Day"]').selectOption({ index: 5 });
    await page.locator('select[name^="DOB_Month"]').selectOption("OCT");
    await page.locator('select[name^="DOB_Year"]').selectOption("2009");
    await page
      .locator('//select[contains(@name,"city")]')
      .selectOption("Bhopal");
  });

  test("Rediff SignUp Fill up details using POM", async ({ page }) => {
    test.setTimeout(45 * 1000);
    await page.screenshot({
      path: "./screenshots/rediff_details_empty.png",
      fullPage: true,
    });
    await page.pause();
    await rediffSignUp.enter_name(signupData.name);
    await rediffSignUp.enter_id(signupData.id);
    await rediffSignUp.enter_password(signupData.password);
    await rediffSignUp.checkbox_true();
    await rediffSignUp.select_question(signupData.question);
    await rediffSignUp.enter_security_answer(signupData.answer);
    await rediffSignUp.enter_maiden_name(signupData.maidenName);
    await rediffSignUp.enter_mobile(signupData.mobile_no);
    await rediffSignUp.select_birth_date(
      signupData.date,
      signupData.month,
      signupData.year
    );
    await rediffSignUp.select_city(signupData.city);
    await page.screenshot({
      path: `./screenshots/rediff_details_filledUp.png`,
      fullPage: true,
    });
  });

  test.afterEach("Close", async ({ page }, testInfo) => {
    await page.close();
    if (testInfo.status === "passed") {
      console.log(`Test Passed: ${testInfo.title}`);
    } else if (testInfo.status === "failed") {
      console.log(`Test Failed: ${testInfo.title}`);
    }
  });
});
