import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://ui.vision/demo/webtest/frames/");
  await expect(page).toHaveTitle("Frames - Web Automation Test");
});

test("Frame Handling Using Page.Frame()", async ({ page }) => {
  const allFrames = page.frames();
  const allFramesCount = allFrames.length;
  console.log("Total Frames Count is " + allFramesCount);
  const frame = page.frame({ url: "https://ui.vision/demo/webtest/frames/frame_1.html" });
  await frame.locator('input[name="mytext1"]').fill("Playwright");
});

test("Frame Handling Using Page.FrameLocator()", async ({ page }) => {
  const frame = page.frameLocator('frame[src="frame_1.html"]');
  await frame.locator('input[name="mytext1"]').fill("Playwright");
});

test("Nested Frame Handling - Fill Form present on iframe inside frame", async ({ page }) => {
  const frame3 = page.frame({ url: "https://ui.vision/demo/webtest/frames/frame_3.html" });
  const childFrames = frame3.childFrames();
  console.log("Number of Child Frames " + childFrames.length);
  await childFrames[0].getByRole("radio", { name: "Hi, I am the UI.Vision IDE" }).click();
  const checkboxNames = [
    "Web Testing",
    "Form Autofilling",
    "General Web Automation",
  ];
  for (const name of checkboxNames) {
    await childFrames[0].getByRole("checkbox", { name }).click();
  }
  await childFrames[0].getByText("Choose").click({ force: true });
  await page.waitForTimeout(1000);
  await childFrames[0].getByRole("option", { name: "Yes" }).locator("span").click({ force: true });
  await childFrames[0].getByRole("button", { name: "Next" }).click({ force: true });
  await childFrames[0].getByRole("textbox", { name: "Enter a short text" }).waitFor();
  await childFrames[0].getByRole("textbox", { name: "Enter a short text" }).fill("Short");
  await childFrames[0].getByRole("textbox", { name: "Enter a long answer" }).fill("Long");
  await childFrames[0].getByRole("button", { name: "Submit" }).click({ force: true });
  await expect(childFrames[0].locator("div.vHW8K")).toContainText(
    "Thank you for testing the UI.Vision RPA software! As this is just a test form, all submitted data is automatically deleted"
  );
});
