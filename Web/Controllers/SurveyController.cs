using System.Collections.Generic;
using Common.Utilities;
using Microsoft.AspNetCore.Mvc;
using ProSAT.Processors.Common.DataProviders.Feedback;

namespace Web.Controllers
{
    /// <summary>
    /// The main survey controller
    /// </summary>
    public class SurveyController : Controller{
        private readonly IEnumerable<IFeedbackProvider> _feedbackProviders;
        /// <summary>
        /// Creates instance of <see cref="SurveyController"/>
        /// </summary>
        public SurveyController(IEnumerable<IFeedbackProvider> feedbackProviders) {
            _feedbackProviders = feedbackProviders.NotEmpty(nameof(feedbackProviders));
        }

        /// <summary>
        /// Serves the thank you page on successful submission of survey
        /// </summary>
        /// <returns></returns>
        public IActionResult ThankYou() {
            return View("ThankYou");
        }        
    }
}
