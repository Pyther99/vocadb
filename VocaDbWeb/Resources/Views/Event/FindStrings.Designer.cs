﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ViewRes.Event {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "15.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public class FindStrings {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal FindStrings() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("VocaDb.Web.Resources.Views.Event.FindStrings", typeof(FindStrings).Assembly);
                    resourceMan = temp;
                }
                return resourceMan;
            }
        }
        
        /// <summary>
        ///   Overrides the current thread's CurrentUICulture property for all
        ///   resource lookups using this strongly typed resource class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Globalization.CultureInfo Culture {
            get {
                return resourceCulture;
            }
            set {
                resourceCulture = value;
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Create event.
        /// </summary>
        public static string CreateEvent {
            get {
                return ResourceManager.GetString("CreateEvent", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Sorry, an event with this name could not be found. It probably hasn&apos;t been added to the database yet..
        /// </summary>
        public static string EventNotFound {
            get {
                return ResourceManager.GetString("EventNotFound", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Find event.
        /// </summary>
        public static string FindEvent {
            get {
                return ResourceManager.GetString("FindEvent", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to number.
        /// </summary>
        public static string Number {
            get {
                return ResourceManager.GetString("Number", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Series.
        /// </summary>
        public static string Series {
            get {
                return ResourceManager.GetString("Series", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Ungrouped event named:.
        /// </summary>
        public static string UngroupedEventNamed {
            get {
                return ResourceManager.GetString("UngroupedEventNamed", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to You may add the event to the database..
        /// </summary>
        public static string YouMayAddTheEvent {
            get {
                return ResourceManager.GetString("YouMayAddTheEvent", resourceCulture);
            }
        }
    }
}
