using System.Threading.Tasks;
using ProSAT.Processors.Common.ObjectModel;

namespace ProSAT.Processors.Common.DataProviders.Feedback
{
    /// <summary>
    /// Feedback provider
    /// </summary>
    public interface IFeedbackProvider {
        /// <summary>
        /// Save email feedback. The code does not wait on the success status because the email redirect needs to reply quickly.
        /// </summary>
        /// <param name="emailFeedback">email Feedback</param>
        /// <param name="rating">feedback rating</param>
        Task<bool> SaveEmailFeedback(EmailFeedback emailFeedback, int rating);
    }
}
