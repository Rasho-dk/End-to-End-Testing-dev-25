using OpenQA.Selenium;

namespace SeleniumTestC_sharp.Models
{
    public class SignupPage(IWebDriver driver) : IFindElement
    {
        public void Signup(string email, string password)
        {
            GetElementById("optSignup").Click();
            GetElementById("txtEmail").SendKeys(email + Keys.Return);
            GetElementById("txtPassword").SendKeys(password + Keys.Return);
            GetElementById("txtRepeatPassword").SendKeys(password);
            Task.Delay(8000).Wait();
            GetElementByCss("input[type='submit']").Click();
            //TODO: "button[title='close alert']"
        }

        public IWebElement GetElementById(string id)
        {
            return driver.FindElement(By.Id(id));
        }

        public IWebElement GetElementByCss(string css)
        {
            return driver.FindElement(By.CssSelector(css));
        }

    }
}
