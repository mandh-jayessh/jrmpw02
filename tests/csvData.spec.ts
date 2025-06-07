import { test, expect } from "@playwright/test";
import { DemoAutomationTestingRegister } from "../pages/demo_automationTesting_register";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

const filePath = path.join(
  process.cwd(),
  "data",
  "demo_automationTesting_register.csv"
);
const csvContent = fs.readFileSync(filePath, "utf8");

const registerData = parse(csvContent, {
  columns: true,
  skip_empty_lines: true,
});

test.describe("Fill Details Using CSV on demo automation testing register site", () => {
  let register: DemoAutomationTestingRegister;

  test.beforeEach(async ({ page }) => {
    register = new DemoAutomationTestingRegister(page);
    await test.step("Navigate to Register Page", async () => {
      await register.goTo();
    });
    await test.step("Verify Page Title", async () => {
      await expect(page).toHaveTitle("Register");
    });
  });

  test("Fill Details CSV", async ({ page }) => {
    await register.fillName(registerData[0].fname, registerData[0].lname);
    await register.fillAddress(registerData[0].address);
    await register.fillContact(registerData[0].email, registerData[0].phone);
    const hobbies = registerData[0].hobbies
      ? registerData[0].hobbies.split("|").map((hob: string) => hob.trim())
      : [];
    await register.checkHobbies(hobbies);
    const languages = registerData[0].languages
      ? registerData[0].languages.split("|").map((lang: string) => lang.trim())
      : [];
    await register.selectLanguages(languages);
    await register.selectSkill(registerData[0].skill);
    await register.selectCountry(registerData[0].country);
    await register.uploadFile(registerData[0].filePath);
    await register.dateOfBirth(
      registerData[0].day,
      registerData[0].month,
      registerData[0].year
    );
    await register.fillPassword(registerData[0].password);
    await register.refresh();
  });

  for (const user of registerData) {
    const hobbies = registerData[0].hobbies
      ? registerData[0].hobbies.split("|").map((hob: string) => hob.trim())
      : [];
    const languages = user.languages
      ? user.languages.split("|").map((lang: string) => lang.trim())
      : [];

    test(`Fill Details for ${user.fname} ${user.lname}`, async ({ page }) => {
      await test.step("Fill Details", async () => {
        await register.fillName(user.fname, user.lname);
        await register.fillAddress(user.address);
        await register.fillContact(user.email, user.phone);
        await register.checkHobbies(hobbies);
        await register.selectLanguages(languages);
        await register.selectSkill(user.skill);
        await register.selectCountry(user.country);
        await register.dateOfBirth(
          Number(user.day),
          user.month,
          Number(user.year)
        );
        await register.fillPassword(user.password);
      });
      await test.step("Browse File and Upload", async () => {
        await register.uploadFile(user.filePath);
      });
      await test.step("Clear the Provided Details", async () => {
        await register.refresh();
      });
    });
  }
});
