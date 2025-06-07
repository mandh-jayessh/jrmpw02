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

test.describe("", () => {
  let register: DemoAutomationTestingRegister;
  test("Fill Details", async ({ page }) => {
    register = new DemoAutomationTestingRegister(page);
    await register.goTo();
    await page.pause();
    await register.fillName("Playwright", "Typescript");
    await register.fillAddress("India is my address");
    await register.fillContact("test@test.com", 1234567890);
    await register.checkHobbies();
    await register.selectLanguages(["English", "Hindi"]);
    await register.selectSkill("Ruby");
    await register.selectCountry("India");
    await register.uploadFile("data/fileToUpload/TextFile.txt");
    await register.dateOfBirth(31, "December", 2015);
    await register.fillPassword("@$%tY12as");
  });

  test("Fill Details CSV", async ({ page }) => {
    register = new DemoAutomationTestingRegister(page);
    await register.goTo();
    await register.fillName(registerData[0].fname, registerData[0].lname);
    await register.fillAddress(registerData[0].address);
    await register.fillContact(registerData[0].email, registerData[0].phone);
    // await register.checkHobbies();
    const languages = registerData[0].languages
      ? registerData[0].languages.split("|").map((lang: string) => lang.trim())
      : [];
    await register.selectLanguages(languages);
    await register.selectSkill(registerData[0].skill);
    await register.selectCountry(registerData[0].country);
    await register.uploadFile("data/fileToUpload/TextFile.txt");
    await register.dateOfBirth(
      registerData[0].day,
      registerData[0].month,
      registerData[0].year
    );
    await register.fillPassword(registerData[0].password);
  });

  for (const user of registerData) {
    const languages = user.languages
      ? user.languages.split("|").map((lang: string) => lang.trim())
      : [];

    test.only(`Fill Details for ${user.fname} ${user.lname}`, async ({
      page,
    }) => {
      register = new DemoAutomationTestingRegister(page);
      await register.goTo();

      await register.fillName(user.fname, user.lname);
      await register.fillAddress(user.address);
      await register.fillContact(user.email, user.phone);
      // await register.checkHobbies();
      await register.selectLanguages(languages);
      await register.selectSkill(user.skill);
      await register.selectCountry(user.country);
      await register.uploadFile("data/fileToUpload/TextFile.txt");
      await register.dateOfBirth(
        Number(user.day),
        user.month,
        Number(user.year)
      );
      await register.fillPassword(user.password);
    });
  }
});
