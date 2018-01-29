using Microsoft.ServiceFabric.Data;

namespace ProSAT.Processors.Common
{
    /// <summary>
    /// Reliable job with the state
    /// </summary>
    public interface IReliableJob {
        /// <summary>
        /// Sets the reliable manager on the job
        /// </summary>
        IReliableStateManager ReliableStateManager { set; }
    }
}
