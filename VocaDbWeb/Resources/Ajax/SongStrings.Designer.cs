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
    public class SongStrings {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal SongStrings() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("VocaDb.Web.Resources.Ajax.SongStrings", typeof(SongStrings).Assembly);
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
        ///   Looks up a localized string similar to Added to list.
        /// </summary>
        public static string AddedToList {
            get {
                return ResourceManager.GetString("AddedToList", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to artist &apos;{0}&apos;.
        /// </summary>
        public static string ArtistFilter {
            get {
                return ResourceManager.GetString("ArtistFilter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to PVs only.
        /// </summary>
        public static string OnlyWithPVsFilter {
            get {
                return ResourceManager.GetString("OnlyWithPVsFilter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to newer than {0}.
        /// </summary>
        public static string SinceFilter {
            get {
                return ResourceManager.GetString("SinceFilter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to song type &apos;{0}&apos;.
        /// </summary>
        public static string SongTypeFilter {
            get {
                return ResourceManager.GetString("SongTypeFilter", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Thank you for rating!.
        /// </summary>
        public static string ThanksForRating {
            get {
                return ResourceManager.GetString("ThanksForRating", resourceCulture);
            }
        }
    }
}
