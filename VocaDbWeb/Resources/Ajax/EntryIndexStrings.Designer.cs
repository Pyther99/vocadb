﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AjaxRes {
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
    public class EntryIndexStrings {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal EntryIndexStrings() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("VocaDb.Web.Resources.Ajax.EntryIndexStrings", typeof(EntryIndexStrings).Assembly);
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
        ///   Looks up a localized string similar to draft status.
        /// </summary>
        public static string DraftsOnlyFilter {
            get {
                return ResourceManager.GetString("DraftsOnlyFilter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to exact title &apos;{0}&apos;.
        /// </summary>
        public static string ExactTitleFilter {
            get {
                return ResourceManager.GetString("ExactTitleFilter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Filtering by.
        /// </summary>
        public static string FilterPre {
            get {
                return ResourceManager.GetString("FilterPre", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to starting with title &apos;{0}&apos;.
        /// </summary>
        public static string StartsWithTitleFilter {
            get {
                return ResourceManager.GetString("StartsWithTitleFilter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to title &apos;{0}&apos;.
        /// </summary>
        public static string TitleFilter {
            get {
                return ResourceManager.GetString("TitleFilter", resourceCulture);
            }
        }
    }
}
