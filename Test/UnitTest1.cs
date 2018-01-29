using System.Threading.Tasks;
using ProSAT.Processors.Common.DataProviders.Feedback;
using ProSAT.Processors.Common.ObjectModel;
using Web.Controllers;
using Xunit;

namespace Test
{
    public class UnitTest1  {

        [Fact]
        [Trait("Controllers", "")]
        public void SurveyController_ThankYou_Page()
        {
            var controller = new SurveyController(new IFeedbackProvider[] { new FeedBackMock() });
        }

        public class FeedBackMock : IFeedbackProvider
        {
            public Task<bool> SaveEmailFeedback(EmailFeedback emailFeedback, int rating)
            {
                throw new System.NotImplementedException();
            }
        }
    }
}
