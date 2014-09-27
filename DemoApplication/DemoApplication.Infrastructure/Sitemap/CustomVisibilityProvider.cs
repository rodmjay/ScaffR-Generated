using System.Collections.Generic;
using System.Web;
using MvcSiteMapProvider;
using MvcSiteMapProvider.Extensibility;

namespace DemoApplication.Infrastructure.Sitemap
{
    public class MyCustomVisibilityProvider : ISiteMapNodeVisibilityProvider
    {
        public bool IsVisible(SiteMapNode node, HttpContext context, IDictionary<string, object> sourceMetadata)
        {
            // Convert to MvcSiteMapNode
            var mvcNode = node as MvcSiteMapNode;
            if (mvcNode == null)
            {
                return true;
            }

            // Is a visibility attribute specified?
            string visibility = mvcNode["visibility"];
            if (string.IsNullOrEmpty(visibility))
            {
                return true;
            }
            visibility = visibility.Trim();

            var htmlHelper = sourceMetadata["htmlHelper"] as string;




            //process visibility
            switch (visibility)
            {
                case "Condition1":
                    //...
                    return false;

                case "Condition2":
                    //...
                    return false;
            }

            return true;
        }
    }
}