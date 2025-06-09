import { test, expect, Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.waitForLoadState('load')
  await expect(page).toHaveTitle("Automation Testing Practice");
});

test("Locate Static Table and Count total rows as well as columns", async ({ page }) => {
  const bookTable: Locator = page.locator("//*[@name = 'BookTable']");
  const bookTableRows: Locator = bookTable.locator("tr");
  const bookTableColumns: Locator = bookTableRows.locator("th");
  await expect(bookTable).toBeAttached();
  console.log("Total Rows:", await bookTableRows.count());
  console.log("Total Columns:", await bookTableColumns.count());
});

test("Fetch Row Values on Basis of One of Cell Value for Dynamic Table", async ({ page }) => {
  const tableBrowser: string = "Chrome";  
  const dynamicTable: Locator = page.locator("//*[@id = 'taskTable']");
  const dynamicTableHeaderRows: Locator = dynamicTable.locator("thead").locator("tr");
  const dynamicTableRows: Locator = dynamicTable.locator("tbody").locator("tr");
  const dynamicTableColumns: Locator = dynamicTable.locator("thead").locator("th");
  await expect(dynamicTable).toBeAttached();
  console.log("Total Rows:", await dynamicTableRows.count());
  console.log("Total Columns:", await dynamicTableColumns.count());

  for (let i = 2; i <= (await dynamicTableRows.count()); i++) {
    if (
      (await page.locator(`//*[@id='taskTable']/tbody/tr[${i}]/td[1]`).textContent()) === tableBrowser) {
      let identifiedRow = i;
      await page.pause()
      for(let j=1;j<=await dynamicTableColumns.count();j++)
      {
        console.log( await dynamicTableHeaderRows.locator(`th:nth-child(${j})`).textContent(), await page.locator(`//*[@id='taskTable']/tbody/tr[${identifiedRow}]/td[${j}]`).textContent()
      );
    
      }
    }
  }
});
