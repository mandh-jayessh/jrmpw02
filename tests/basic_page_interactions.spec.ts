import { test, expect } from "@playwright/test";
import { RediffLogin } from "../pages/rediff_login";
import { RediffSignUp } from "../pages/rediff_signup";
import signupData from "../data/rediff_signup_data.json";

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
  test(`Simple Login Test with user: ${data.user}`, async ({ page }) => {
    await test.step("Launch demo guru new tours Login Page", async () => {
      await page.goto("https://demo.guru99.com/test/newtours/");
    });
    await test.step("Provide Credentials and Sign in", async () => {
      await page.locator("[name='userName']").fill(data.user);
      await page.locator("[name='password']").fill(data.password);
      await page.locator("[name='submit']").click();
    });
    await test.step(`Verify Login is Successfull for user: ${data.user}`, async () => {
      await expect(page.locator("h3")).toHaveText("Login Successfully");
    });
    await test.step("Sign Off", async () => {
      await page.getByRole("link", { name: "SIGN-OFF" }).click();
      await page.close();
    });
  });
});

test.describe("Rediff Tests", () => {
  let rediffLogIn: RediffLogin;
  let rediffSignUp: RediffSignUp;

  test.beforeEach("Navigate to Rediff Site", async ({ page }) => {
    rediffLogIn = new RediffLogin(page);
    rediffSignUp = new RediffSignUp(page);
    test.slow();
    await test.step("Navigate To Rediff Sign Up Page", async () => {
      await rediffLogIn.gotoRediffLoginPage();
      await rediffLogIn.click_new_id_link();
      await page.waitForLoadState("load");
    });
    await test.step("Verify Sign Up Page Title", async () => {
      await expect(page).toHaveTitle("Rediffmail Free Unlimited Storage");
      await expect(page).toHaveTitle(/Rediffmail Free/);
    });
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
    await test.step("Capture Screenshot on SignUp Page Launch", async () => {
      await page.screenshot({
        path: "./screenshots/rediff_details_empty.png",
        fullPage: true,
      });
    });
    await test.step("Fill Sign Up Details", async () => {
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
    });

    await test.step("Capture Screenshot of Filled up Form", async () => {
      await page.screenshot({
        path: `./screenshots/rediff_details_filledUp.png`,
        fullPage: true,
      });
    });
  });

  test.afterEach("Tear Down", async ({ page }, testInfo) => {
    await test.step("Close Page", async () => {
      await page.close();
    });
    await test.step("Log Test Status", async () => {
      if (testInfo.status === "passed") {
        console.log(`Test Passed: ${testInfo.title}`);
      } else if (testInfo.status === "failed") {
        console.log(`Test Failed: ${testInfo.title}`);
      }
    });
  });
});
