﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.34209
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ViewRes {
    using System;
    
    
    /// <summary>
    ///   A strongly-typed resource class, for looking up localized strings, etc.
    /// </summary>
    // This class was auto-generated by the StronglyTypedResourceBuilder
    // class via a tool like ResGen or Visual Studio.
    // To add or remove a member, edit your .ResX file then rerun ResGen
    // with the /str option, or rebuild your VS project.
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("System.Resources.Tools.StronglyTypedResourceBuilder", "4.0.0.0")]
    [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    public class EntryEditStrings {
        
        private static global::System.Resources.ResourceManager resourceMan;
        
        private static global::System.Globalization.CultureInfo resourceCulture;
        
        [global::System.Diagnostics.CodeAnalysis.SuppressMessageAttribute("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
        internal EntryEditStrings() {
        }
        
        /// <summary>
        ///   Returns the cached ResourceManager instance used by this class.
        /// </summary>
        [global::System.ComponentModel.EditorBrowsableAttribute(global::System.ComponentModel.EditorBrowsableState.Advanced)]
        public static global::System.Resources.ResourceManager ResourceManager {
            get {
                if (object.ReferenceEquals(resourceMan, null)) {
                    global::System.Resources.ResourceManager temp = new global::System.Resources.ResourceManager("VocaDb.Web.Resources.Views.Shared.EntryEditStrings", typeof(EntryEditStrings).Assembly);
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
        ///   Looks up a localized string similar to Aliases (optional).
        /// </summary>
        public static string Aliases {
            get {
                return ResourceManager.GetString("Aliases", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Aliases are additional, commonly used names for an entry. Most of the time they are not translations of the primary name, although well-known translations can be added as aliases. Aliases can be in language..
        /// </summary>
        public static string AliasesDesc {
            get {
                return ResourceManager.GetString("AliasesDesc", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Basic info.
        /// </summary>
        public static string BasicInfo {
            get {
                return ResourceManager.GetString("BasicInfo", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to {0} also edited this entry {1} minute(s) ago..
        /// </summary>
        public static string ConcurrentEditWarning {
            get {
                return ResourceManager.GetString("ConcurrentEditWarning", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to {0} is also editing this entry right now!.
        /// </summary>
        public static string ConcurrentEditWarningNow {
            get {
                return ResourceManager.GetString("ConcurrentEditWarningNow", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Original language.
        /// </summary>
        public static string DefaultLanguageSelection {
            get {
                return ResourceManager.GetString("DefaultLanguageSelection", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to External links relevant to this entry. Keep in mind no illegal/direct download links will be allowed!&lt;br /&gt;
        ///&lt;br /&gt;
        ///Fill in the URL first, and description and category will be guessed automatically if the domain is known.&lt;br /&gt;
        ///&lt;br /&gt;
        ///Official: artist&apos;s official site (usually blogs, websites, Facebook etc.).&lt;br /&gt;
        ///Commercial: authorized sales such as Amazon and CDJapan.&lt;br /&gt;
        ///Reference: fansites with useful information such as wikis.&lt;br /&gt;
        ///Other: for those that don&apos;t fit into anything above.&lt;br /&gt;.
        /// </summary>
        public static string ExternalLinksQuickHelp {
            get {
                return ResourceManager.GetString("ExternalLinksQuickHelp", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Merge.
        /// </summary>
        public static string Merge {
            get {
                return ResourceManager.GetString("Merge", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to If the original name is non-English (for example Japanese), or if the language of the name is unknown, input that into the Non-English name field. If known, input the romanized name as well. If the official name of the entry is in English, or there is a known English translation, input that into the English name field.&lt;br /&gt;
        ///&lt;br /&gt;
        ///Note that you do not need to copy the missing names from others. The system will substitute those when needed. For example, lacking a romanized name, the system will automatica [rest of string was truncated]&quot;;.
        /// </summary>
        public static string NameHelp {
            get {
                return ResourceManager.GetString("NameHelp", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Restore.
        /// </summary>
        public static string Restore {
            get {
                return ResourceManager.GetString("Restore", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Status.
        /// </summary>
        public static string Status {
            get {
                return ResourceManager.GetString("Status", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to Update notes (optional).
        /// </summary>
        public static string UpdateNotes {
            get {
                return ResourceManager.GetString("UpdateNotes", resourceCulture);
            }
        }
        
        /// <summary>
        ///   Looks up a localized string similar to External links.
        /// </summary>
        public static string WebLinks {
            get {
                return ResourceManager.GetString("WebLinks", resourceCulture);
            }
        }
    }
}
