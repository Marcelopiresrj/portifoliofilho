import { useState, useEffect } from 'react';
import { Mail, Twitter, Youtube, MessageSquare } from 'lucide-react';
import { fetchSiteSettings } from '../lib/supabase';

export default function Contact() {
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60");
  const [isLoading, setIsLoading] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [contactInfo, setContactInfo] = useState({
    email: "",
    twitter: "",
    youtube: "",
    discord: ""
  });

  useEffect(() => {
    fetchSiteSettings().then(data => {
      if (data) {
        if (data.profile_photo_url) setProfilePhotoUrl(data.profile_photo_url);
        setContactInfo({
          email: data.contact_email || "",
          twitter: data.contact_twitter || "",
          youtube: data.contact_youtube || "",
          discord: data.contact_discord || ""
        });
      }
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setIsLoading(false);
    });
  }, []);

  const handleCopy = (field: string, text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const links = [
    { name: "Email", icon: Mail, bg: "bg-[#e56b6b]", hover: "hover:bg-[#d65f5f]", isCopy: true, copyText: contactInfo.email },
    { name: "Twitter/X", icon: Twitter, bg: "bg-[#59c36a]", hover: "hover:bg-[#4db25d]", isCopy: false, href: contactInfo.twitter },
    { name: "Youtube", icon: Youtube, bg: "bg-[#ff8b60]", hover: "hover:bg-[#ef7a50]", isCopy: false, href: contactInfo.youtube },
    { name: "Discord", icon: MessageSquare, bg: "bg-[#2ebdf4]", hover: "hover:bg-[#25a9df]", isCopy: true, copyText: contactInfo.discord },
  ];

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] p-8 text-white relative">
      {/* Profile Image */}
      <div className="mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
          {isLoading ? (
            <div className="w-full h-full bg-white/10 animate-pulse" />
          ) : (
            <img 
              src={profilePhotoUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Text Content */}
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Let's Work Together</h2>
        <p className="text-gray-400 text-[15px] leading-relaxed">
          Got an idea? A raw video needing editing? I'm in.
        </p>
      </div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-4 gap-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isCopied = copiedField === link.name;
          
          if (link.isCopy) {
            return (
              <button 
                key={link.name}
                onClick={() => handleCopy(link.name, link.copyText || '')}
                className={`${link.bg} ${link.hover} rounded-2xl p-4 h-28 flex flex-col justify-between transition-transform duration-300 hover:scale-105 active:scale-95 shadow-md text-left`}
              >
                <Icon className="w-6 h-6 text-white" />
                <span className="text-white font-medium text-sm transition-all">{isCopied ? "Copied" : link.name}</span>
              </button>
            );
          }

          return (
            <a 
              key={link.name}
              href={link.href || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.bg} ${link.hover} rounded-2xl p-4 h-28 flex flex-col justify-between transition-transform duration-300 hover:scale-105 active:scale-95 shadow-md`}
            >
              <Icon className="w-6 h-6 text-white" />
              <span className="text-white font-medium text-sm">{link.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
