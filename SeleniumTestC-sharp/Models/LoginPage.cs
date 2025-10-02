using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium;

namespace SeleniumTestC_sharp.Models
{
    public class LoginPage(IWebDriver driver) : IFindElement
    {
        public void Login(string email, string password)
        {
            GetElementById("txtEmail").SendKeys(email + Keys.Return);
            GetElementById("txtPassword").SendKeys(password);
            //Task.Delay(2000).Wait();
            GetElementByCss("input[type='submit']").Click();
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
