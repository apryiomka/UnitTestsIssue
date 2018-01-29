using System;
using System.Collections;

namespace Common.Utilities
{
    /// <summary>
    /// Useful utility extensions 
    /// </summary>
    public static class UtilityExtensions {
       
        /// <summary>
        /// Checks the object against null
        /// </summary>
        /// <param name="collection">The collection</param>
        /// <param name="name">The name of the parameter</param>
        /// <exception cref="ArgumentException"></exception>
        public static T NotEmpty<T>(this T collection, string name) where T : IEnumerable
        {
            if (collection == null) throw new ArgumentNullException(name);

            var enumerator = collection.GetEnumerator();
            if (!enumerator.MoveNext()) throw new ArgumentException("The collection contains no elements", name);

            return collection;
        }        
    }
}
