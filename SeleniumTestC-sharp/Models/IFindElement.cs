using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium;

namespace SeleniumTestC_sharp.Models
{
    public interface IFindElement
    {
        IWebElement GetElementById(string id);
        IWebElement GetElementByCss(string css);
    }
}
