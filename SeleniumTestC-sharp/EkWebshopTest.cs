using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using SeleniumTestC_sharp.Models;

namespace SeleniumTestC_sharp
{
    [TestFixture]
    public class EkWebshopTest
    {
        private IWebDriver _driver;
        private string _appUrl;
        private const string Email = "test@kea.dk";
        private const string Password = "Testing";

        private SignupPage _signupPage;
        private LoginPage _loginPage;

        [SetUp]
        public void Initialize()
        {
            _driver = new ChromeDriver();
            _appUrl = "http://127.0.0.1:5500/js_webshop/index.html";
            _driver.Manage().Window.Minimize();
            _driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);

            _signupPage = new SignupPage(_driver);
            _loginPage = new LoginPage(_driver);
        }



        [Test]
        [Category("Chrome")]
        public void HappyPath()
        {
            const string productName = "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s";
            const string mensShirt = "Mens Casual Premium Slim Fit T-Shirts";
            const string productXPath = $"//article[header/h2[text()='{productName}']]";
            const string address = "Guldbergsgade 29N";
            const string postalCode = "2200";
            const string city = "Copenhagen";
            const string creditCardName = "Pernille L. Hansen";
            const string expirationDate = "December";
            const string expirationYear = "2027";
            const string cvv = "666";
            var js = (IJavaScriptExecutor)_driver;

            _driver.Url = _appUrl;
            _signupPage.Signup(Email, Password);
            //login after signup
            Task.Delay(5000).Wait();

            var loginLinks = _driver.FindElements(By.CssSelector("a[href*='login.html']"));
            if (loginLinks.Count <= 0) return;
            loginLinks[0].Click();
            _loginPage.Login(Email, Password);

            GetElementByXPath(Article(mensShirt) + "/div/button").Click();

            // Issue 7: scroll down to see the product and change quantity to 2 before adding to cart
            js.ExecuteScript("window.scrollTo(0, 1000);");
            Task.Delay(2000).Wait();
            var quantityInput = GetElementByXPath(Article(productName) + "/div/input");
            Task.Delay(500).Wait();
            quantityInput.Clear(); //TODO: Fix the issue, sometimes it does not clear the input field
            quantityInput.SendKeys("2");
            Task.Delay(2000).Wait();

            // Add to cart
            GetElementByXPath(productXPath + "/div/button").Click();

            // Issue 8: Click on "Cart"
            GetElementById("optCart").Click();

            // Issue 9: increase the units to 3 of the product SanDisk SSD PLUS 1TB
            var cartQuantityInput = GetElementByXPath($"//tr[td[text()='{productName}']]/td/input");
            Task.Delay(500).Wait();
            cartQuantityInput.Clear();//TODO: Fix the issue, sometimes it does not clear the input field
            cartQuantityInput.SendKeys("3"); 
            Task.Delay(2000).Wait();

            // Issue 10: Click on "Checkout"
            GetElementByCss("input[type='submit']").Click();

            // Issue 11: Introduce the address details
            GetElementById("txtDeliveryAddress").SendKeys(address);
            GetElementById("txtDeliveryPostalCode").SendKeys(postalCode);
            GetElementById("txtDeliveryCity").SendKeys(city);

            _driver.FindElement(By.CssSelector("input[type=checkbox]")).Click();

            GetElementById("txtCreditCardName").SendKeys(creditCardName);
            var expiryInput = GetElementById("txtExpiryDate");
            //expiryInput.SendKeys("2027-12"); # This does not work well with the date input field
            js.ExecuteScript("arguments[0].value='2027-12';", expiryInput); 
            Task.Delay(500).Wait();
            GetElementById("txtCVV").SendKeys(cvv);
            Task.Delay(2000).Wait();

            // Issue 12: Click on "Place Purchase"
            //_driver.FindElement(By.CssSelector("input[value='Place Purchase']")).Click();
            GetElementByCss("input[value='Place Purchase']").Click();

            // Issue 13: Click on Cart and verify that it is empty and leave the model
            GetElementById("optCart").Click();
            const string emptyCard = "The cart is empty. Please add some products to the cart.";
            var cartTable = GetElementByXPath("//section/p");
            Assert.That(cartTable.Text, Is.EqualTo(emptyCard));
            Task.Delay(2000).Wait();
            var alertCloseButton = GetElementByCss("button[title='Close Alert']");
            if (alertCloseButton.Displayed)
                alertCloseButton.Click();
            Task.Delay(2000).Wait();

            // Finally, logout
            GetElementByCss("a[title='Log out']").Click();

            //Check that log in link is displayed
            Assert.That(GetElementByCss("a[href='login.html']").Displayed, Is.True);


        }

        [TearDown]
        public void CleanUp()
        {
            _driver.Quit();
            _driver.Dispose();
        }
        private IWebElement GetElementByXPath(string xpath)
        {
            return _driver.FindElement(By.XPath(xpath));
        }
        private static string Article(string productName)
        {
            return $"//article[header/h2[text()='{productName}']]";
        }
        private IWebElement GetElementById(string id)
        {
            return _driver.FindElement(By.Id(id));
        }
        private IWebElement GetElementByCss(string css)
        {
            return _driver.FindElement(By.CssSelector(css));
        }
    }
}
