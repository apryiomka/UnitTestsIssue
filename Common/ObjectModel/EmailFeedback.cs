using System;

namespace ProSAT.Processors.Common.ObjectModel {
    /// <summary>
    /// Email Feedback object
    /// </summary>
    public class EmailFeedback {
        //EL.[ScopeIdentifier],EL.[DestinationURL],EL.[SendDate],EL.[RootEmailTemplateName],EL.[EmailTemplateName],@CurrentDT AS ClickDateTime,ES.[EmailContent],ES.[EmailTrackingGuid]

        /// <summary>
        /// Tenant Id
        /// </summary>
        public Guid TenantId { get; set; }

        /// <summary>
        /// Destination Url
        /// </summary>
        public string DestinationUrl { get; set; }

        /// <summary>
        /// Send date
        /// </summary>
        public DateTime SendDate { get; set; }

        /// <summary>
        /// Root email template name
        /// </summary>
        public string RootEmailTemplateName { get; set; }

        /// <summary>
        /// Email template name
        /// </summary>
        public string EmailTemplateName { get; set; }

        /// <summary>
        /// Click date time
        /// </summary>
        public DateTime ClickDate { get; set; }

        /// <summary>
        /// Email content
        /// </summary>
        public string EmailContent { get; set; }

        /// <summary>
        /// Email Tracking Id
        /// </summary>
        public string EmailTrackingId { get; set; }
    }
}
